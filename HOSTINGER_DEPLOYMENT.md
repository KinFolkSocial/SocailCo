# Hostinger Deployment Guide — Kinfolk Social Co.

This guide walks through deploying the Kinfolk Social Co. Next.js website to **Hostinger Cloud / Business Web Hosting** using the **hPanel Node.js Application Manager**.

---

## 1. What was prepared for you

1. **`next.config.ts` configured for standalone output**:
   `output: "standalone"` produces a self-contained Node.js server that only includes production dependencies.
2. **Automated packaging script**:
   Running `npm run build:hostinger` builds the application, bundles static assets (`/public` and `.next/static`), and packages everything into **`hostinger-deploy.zip`** (around ~27MB).
3. **Local test verified**:
   The standalone server was booted and verified locally running `node server.js`.

---

## 2. Deployment Workflow Options

You have two simple ways to deploy:
- **Method A (Direct GitHub Pull via hPanel Git)**: Pull directly from GitHub to Hostinger.
- **Method B (Standalone Zip Upload)**: Upload `hostinger-deploy.zip` built locally (recommended if server build memory is limited).

---

## 3. Method A: Deploying via GitHub & Hostinger hPanel Git

### Step 1: Push your latest code to GitHub
Your code is hosted at: `https://github.com/KinFolkSocial/SocailCo.git`
Whenever you make updates, push them to `main`:
```bash
git add .
git commit -m "Update site"
git push origin main
```

### Step 2: Connect GitHub in Hostinger hPanel
1. In Hostinger hPanel, go to **Advanced** -> **Git**.
2. Under **Create a New Repository**:
   - **Repository:** `https://github.com/KinFolkSocial/SocailCo.git`
   - **Branch:** `main`
   - **Install directory:** `/public_html` (or your chosen subfolder)
3. Click **Create**. Hostinger will pull the repository files from GitHub.
4. Hostinger provides an **Auto-Deployment Webhook**. You can copy this URL, go to your GitHub repo -> **Settings** -> **Webhooks** -> **Add webhook**, paste the URL, and select `application/json`. From then on, every `git push origin main` triggers an automatic pull on Hostinger!

### Step 3: Install & Build on Hostinger
1. In hPanel, go to **Websites** -> **Manage** -> **Node.js**.
2. Select Node.js version **20.x** (or 22.x).
3. Set **Application Root** to the folder where the Git repo was cloned (e.g. `public_html`).
4. Set **Application Startup File** to `server.js` (or run `npm run build:hostinger` to create `server.js`).
5. Click **NPM Install** in hPanel to install dependencies.
6. Add your Environment Variables in the Node.js settings (see Section 5 below).
7. Start/Restart the application.

---

## 4. Method B: Deploying via `hostinger-deploy.zip` (Pre-Built Bundle)

Because Next.js builds can sometimes exceed the memory limits of shared cloud environments during `npm run build`, building locally and uploading the standalone bundle is the most bulletproof approach:

### Step 2: Set up the Node.js Application
1. In the left-hand search bar in hPanel, search for **Node.js** (or locate it under the *Advanced* or *Websites* menu).
2. Click **Create Application** (or configure existing):
   - **Node.js Version**: Select **20.x** (or **22.x**).
   - **Application Mode**: **Production**.
   - **Application Root**: Set to `public_html` (or `domains/kinfolksocialco.com/public_html`).
   - **Application Startup File**: Enter `server.js`.
   - **Application URL**: Select your domain (`kinfolksocialco.com`).
3. Click **Save** or **Create**.

### Step 3: Upload and Extract `hostinger-deploy.zip`
1. In hPanel, go to **Files** -> **File Manager** (Access files of your domain).
2. Navigate to your **Application Root** folder (e.g., `public_html`).
3. *Note:* If Hostinger placed default placeholder files (like `default.php` or `index.html`), delete them.
4. Click the **Upload** icon at the top right of File Manager.
5. Select **`hostinger-deploy.zip`** from your computer:
   ```
   X:\Kinfolk Social Co\Website\hostinger-deploy.zip
   ```
6. Once the upload finishes, right-click `hostinger-deploy.zip` in File Manager and choose **Extract**.
7. Extract directly into the current folder (`.`).
8. You should now see:
   - `server.js`
   - `.next/`
   - `public/`
   - `node_modules/`
   - `package.json`
   - `.env`
9. You can delete `hostinger-deploy.zip` from File Manager to free up disk space.

### Step 4: Verify Environment Variables
Open the `.env` file in File Manager or configure the **Environment Variables** tab in the hPanel Node.js section to ensure the following are set:

```env
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://joyubfcoznfagghtrobv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveXViZmNvem5mYWdnaHRyb2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMTA3MTQsImV4cCI6MjEwNTU4NjcxNH0.p9-6S2QHpUiqletK9Avv9lbpqIT8GilVGuSSxnVbhnw

# Hostinger SMTP Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=kinfolks@kinfolksocialco.com
SMTP_PASS=WhyAskWhy2043%%
NOTIFICATION_EMAIL_TO=kinfolks@kinfolksocialco.com
```

### Step 5: Start / Restart the Node.js App
1. Go back to the **Node.js** section in hPanel.
2. Click **Restart** (or **Start**).
3. The application status should display **Running**.
4. Visit your domain in your browser to verify the site is live!
5. Test submitting the `/contact` form to verify Supabase storage and Hostinger SMTP email dispatch.

---

## 3. How to Deploy Future Updates

Whenever you make changes to the website code or content:

1. In your local terminal, run:
   ```bash
   npm run build:hostinger
   ```
2. Upload the updated `hostinger-deploy.zip` via Hostinger File Manager.
3. Extract it, overwriting existing files.
4. Click **Restart** in the hPanel Node.js manager.
