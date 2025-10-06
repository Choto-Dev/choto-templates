#!/usr/bin/env node

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

function askConfirmation(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      // biome-ignore lint/performance/useTopLevelRegex: <"No big deal">
      resolve(/^y$/i.test(answer.trim()));
    });
  });
}

async function main() {
  console.log(
    "WARNING: This will remove all containers and container data, and will reset the .env file. This action cannot be undone!"
  );

  const confirmed = await askConfirmation(
    "Are you sure you want to proceed? (y/N) "
  );

  if (!confirmed) {
    console.log("Operation cancelled.");
    process.exit(1);
  }

  console.log("Stopping and removing all containers...");
  try {
    execSync(
      "docker compose -f docker-compose.yml -f ./dev/docker-compose.dev.yml -f docker-compose.s3.yml down -v --remove-orphans",
      { stdio: "inherit" }
    );
  } catch (error) {
    console.error("Failed to stop and remove containers:", error);
  }

  console.log("Cleaning up bind-mounted directories...");
  const bindMounts = ["./volumes/db/data", "./volumes/storage"];

  for (const dir of bindMounts) {
    if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
      console.log(`Deleting ${dir}...`);
      fs.rmSync(dir, { recursive: true, force: true });
    } else {
      console.log(
        `Directory ${dir} does not exist. Skipping bind mount deletion step...`
      );
    }
  }

  console.log("Resetting .env file...");
  const envFile = path.resolve(".env");
  const envExampleFile = path.resolve(".env.example");

  if (fs.existsSync(envFile)) {
    console.log("Removing existing .env file...");
    fs.rmSync(envFile);
  } else {
    console.log("No .env file found. Skipping .env removal step...");
  }

  if (fs.existsSync(envExampleFile)) {
    console.log("Copying .env.example to .env...");
    fs.copyFileSync(envExampleFile, envFile);
  } else {
    console.log(".env.example file not found. Skipping .env reset step...");
  }

  console.log("Cleanup complete!");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
