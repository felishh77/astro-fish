#!/usr/bin/env node
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function run(cmd, options = {}) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { stdio: "inherit", ...options });
}

try {
  console.log("🚀 Running changeset...");
  run("npx changeset");

  console.log("📦 Staging changes...");
  run("git add .");

  console.log("📝 Creating conventional commit using Commitizen...");
  run("cd package && npx cz");

  console.log("⬆️ Pushing to remote...");
  run("git push");

  console.log("📤 Publishing astro-fish from package/ ...");
  const pkgDir = path.resolve(__dirname, "..", "package");
  run("pnpm publish --access public", { cwd: pkgDir });

  console.log("\n🎉 Done! astro-fish published successfully.");
} catch (err) {
  console.error("\n❌ Release failed!", err);
  process.exit(1);
}
