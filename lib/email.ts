import nodemailer from "nodemailer";
import {
  InquiryValues,
  eventTypeOptions,
  guestCountOptions,
  budgetRangeOptions,
} from "@/lib/inquiry";

function getLabel(
  options: { value: string; label: string }[],
  value: string,
): string {
  return options.find((opt) => opt.value === value)?.label ?? value;
}

const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
const smtpPort = Number(process.env.SMTP_PORT) || 465;
const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";
const notificationEmailTo =
  process.env.NOTIFICATION_EMAIL_TO || process.env.SMTP_USER || "";

export async function sendInquiryEmailNotification(inquiry: InquiryValues) {
  if (!smtpUser || !smtpPass) {
    console.warn(
      "[Email] Hostinger SMTP credentials (SMTP_USER / SMTP_PASS) not set in environment. Skipping email dispatch.",
    );
    return { success: false, reason: "SMTP credentials not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const eventTypeLabel = getLabel(eventTypeOptions, inquiry.eventType);
  const guestCountLabel = getLabel(guestCountOptions, inquiry.guestCount);
  const budgetRangeLabel = getLabel(budgetRangeOptions, inquiry.budgetRange);

  // 1. Team Notification Email HTML
  const teamHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f5f0; color: #1a1918; margin: 0; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5dfd3; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .header { background-color: #1a1918; color: #f7f5f0; padding: 32px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
          .header p { margin: 6px 0 0 0; color: #c4b69c; font-size: 13px; font-style: italic; }
          .content { padding: 32px; }
          .badge { display: inline-block; background: #f2ede4; color: #6b5c43; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 20px; }
          .field-group { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f2ede4; }
          .field-group:last-child { border-bottom: none; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8c8273; margin-bottom: 4px; font-weight: 600; }
          .value { font-size: 16px; color: #1a1918; font-weight: 400; line-height: 1.5; }
          .details-box { background: #f9f8f5; border-left: 3px solid #8c8273; padding: 16px; font-size: 15px; color: #333; line-height: 1.6; white-space: pre-wrap; }
          .footer { background: #f9f8f5; border-top: 1px solid #e5dfd3; padding: 20px; text-align: center; font-size: 12px; color: #8c8273; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Kinfolk Social Co.</h1>
            <p>New Client Inquiry Received</p>
          </div>
          <div class="content">
            <span class="badge">${eventTypeLabel}</span>
            <div class="field-group">
              <div class="label">Client Name</div>
              <div class="value"><strong>${inquiry.name}</strong></div>
            </div>
            <div class="field-group">
              <div class="label">Contact Email</div>
              <div class="value"><a href="mailto:${inquiry.email}" style="color: #1a1918; text-decoration: underline;">${inquiry.email}</a></div>
            </div>
            <div class="field-group">
              <div class="label">Phone Number</div>
              <div class="value"><a href="tel:${inquiry.phone}" style="color: #1a1918; text-decoration: none;">${inquiry.phone}</a></div>
            </div>
            <div class="field-group">
              <div class="label">Target Date</div>
              <div class="value">${inquiry.eventDate}</div>
            </div>
            <div class="field-group">
              <div class="label">Location / Venue</div>
              <div class="value">${inquiry.location}</div>
            </div>
            <div class="field-group">
              <div class="label">Guest Count</div>
              <div class="value">${guestCountLabel}</div>
            </div>
            <div class="field-group">
              <div class="label">Budget Range</div>
              <div class="value">${budgetRangeLabel}</div>
            </div>
            <div class="field-group">
              <div class="label">Event Vision & Details</div>
              <div class="details-box">${inquiry.details}</div>
            </div>
          </div>
          <div class="footer">
            Submitted via Kinfolk Social Co website contact form
          </div>
        </div>
      </body>
    </html>
  `;

  // 2. Client Confirmation Email HTML
  const clientHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f5f0; color: #1a1918; margin: 0; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5dfd3; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .header { background-color: #1a1918; color: #f7f5f0; padding: 40px 32px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; }
          .header p { margin: 8px 0 0 0; color: #c4b69c; font-size: 14px; font-style: italic; }
          .content { padding: 40px 32px; line-height: 1.7; color: #333; }
          .content p { margin-bottom: 20px; font-size: 16px; }
          .highlight { background: #f9f8f5; border-left: 3px solid #1a1918; padding: 16px; font-style: italic; margin: 24px 0; color: #555; }
          .footer { background: #f9f8f5; border-top: 1px solid #e5dfd3; padding: 24px; text-align: center; font-size: 13px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Kinfolk Social Co.</h1>
            <p>Thank You For Reaching Out</p>
          </div>
          <div class="content">
            <p>Hi ${inquiry.name},</p>
            <p>Thank you for inquiring about your upcoming <strong>${eventTypeLabel.toLowerCase()}</strong>! We've received your details and are excited to learn more about your vision.</p>
            
            <div class="highlight">
              "We believe every celebration should feel seamless, elevated, and uniquely yours."
            </div>

            <p>Our team is reviewing your inquiry details and will be in touch within 24 to 48 business hours to discuss the next steps.</p>

            <p>Warm regards,<br><strong>Kinfolk Social Co. Team</strong></p>
          </div>
          <div class="footer">
            &copy; Kinfolk Social Co. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    // Dispatch Team Alert
    const teamInfo = await transporter.sendMail({
      from: `"Kinfolk Social Co. Website" <${smtpUser}>`,
      to: notificationEmailTo || smtpUser,
      replyTo: `"${inquiry.name}" <${inquiry.email}>`,
      subject: `New Inquiry: ${inquiry.name} (${eventTypeLabel})`,
      html: teamHtml,
    });

    console.log("[Email] Team notification sent:", teamInfo.messageId);

    // Dispatch Client Confirmation
    try {
      await transporter.sendMail({
        from: `"Kinfolk Social Co." <${smtpUser}>`,
        to: inquiry.email,
        subject: `We received your inquiry — Kinfolk Social Co.`,
        html: clientHtml,
      });
      console.log("[Email] Client confirmation sent to:", inquiry.email);
    } catch (clientErr) {
      console.error("[Email] Failed to send client confirmation:", clientErr);
    }

    return { success: true, messageId: teamInfo.messageId };
  } catch (error) {
    console.error("[Email] Error sending team email via Hostinger SMTP:", error);
    return { success: false, error };
  }
}
