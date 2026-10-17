import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const standaloneDir = path.join(rootDir, ".next", "standalone");

console.log("Preparing Hostinger deployment bundle...");

if (!fs.existsSync(standaloneDir)) {
  console.error("Error: .next/standalone does not exist. Please run 'next build' first.");
  process.exit(1);
}

// 1. Copy public/ -> .next/standalone/public
const publicSrc = path.join(rootDir, "public");
const publicDest = path.join(standaloneDir, "public");
if (fs.existsSync(publicSrc)) {
  console.log("Copying public folder to standalone bundle...");
  fs.cpSync(publicSrc, publicDest, { recursive: true });
}

// 2. Copy .next/static/ -> .next/standalone/.next/static
const staticSrc = path.join(rootDir, ".next", "static");
const staticDest = path.join(standaloneDir, ".next", "static");
if (fs.existsSync(staticSrc)) {
  console.log("Copying .next/static to standalone bundle...");
  fs.cpSync(staticSrc, staticDest, { recursive: true });
}

// 3. Create .env for production from .env.local if present
const envLocalSrc = path.join(rootDir, ".env.local");
const envDest = path.join(standaloneDir, ".env");
if (fs.existsSync(envLocalSrc)) {
  console.log("Creating production .env in standalone bundle...");
  fs.copyFileSync(envLocalSrc, envDest);
}

console.log("Standalone bundle assembled at: .next/standalone");

// 4. Create deployment zip for easy upload to Hostinger File Manager
const zipName = "hostinger-deploy.zip";
const zipPath = path.join(rootDir, zipName);
console.log(`Creating ${zipName} for one-click upload to Hostinger...`);

try {
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  // Using Get-ChildItem -Force to include hidden directories like .next
  const psCmd = `powershell -NoProfile -Command "Get-ChildItem -Path '${standaloneDir}' -Force | Compress-Archive -DestinationPath '${zipPath}' -Force"`;
  execSync(psCmd, { stdio: "inherit" });
  console.log(`\nDeployment zip created successfully: ${zipPath}`);
} catch (err) {
  console.warn("Could not create .zip automatically via Compress-Archive:", err.message);
  console.log("You can manually upload the contents of .next/standalone/ to Hostinger.");
}

console.log("\nHostinger preparation complete!");
