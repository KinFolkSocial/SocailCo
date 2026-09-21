"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const NewsletterSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  // Honeypot — real users never fill this in; bots that autofill every field do.
  company: z.string().max(0).optional(),
});

type NewsletterValues = z.infer<typeof NewsletterSchema>;

/**
 * Footer newsletter signup. Client-side validated and ready to wire to a
 * destination service.
 */
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterValues>({ resolver: zodResolver(NewsletterSchema) });

  const onSubmit = async (data: NewsletterValues) => {
    if (data.company) return; // honeypot tripped — silently drop
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return <p className="font-body text-body text-amber">You&apos;re on the list.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          className="w-full border-b border-smoke bg-transparent py-2 font-body text-body text-bone outline-none placeholder:text-smoke focus:border-amber"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "newsletter-email-error" : undefined}
          {...register("email")}
        />
        <div aria-hidden="true" className="h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="newsletter-company">Company</label>
          <input
            id="newsletter-company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>
        {errors.email && (
          <p id="newsletter-email-error" role="alert" className="mt-1 font-body text-sm text-clay">
            {errors.email.message}
          </p>
        )}
      </div>
      <Button type="submit" variant="secondary" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Sign up"}
      </Button>
    </form>
  );
}
