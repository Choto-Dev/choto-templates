#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * Create a .env file from .env.example if .env file does not exist.
 * @returns Void
 */
async function createEnv() {
  const envPath = path.resolve(".env");
  if (existsSync(envPath)) {
    return;
  }

  const envExamplePath = path.resolve(".env.example");
  const content = await fs.readFile(envExamplePath, "utf-8");
  await fs.writeFile(envPath, content, "utf-8");
}

const composeFiles = [
  "-f",
  "docker-compose.yml",
  "-f",
  "./dev/docker-compose.dev.yml",
  "-f",
  "docker-compose.s3.yml",
];

/**
 * Run docker up command.
 * @returns Promise
 */
function runDockerUp() {
  return new Promise<void>((resolve, reject) => {
    const upProcess = spawn(
      "docker",
      ["compose", ...composeFiles, "up", "-d"],
      {
        stdio: "inherit",
      }
    );

    upProcess.on("exit", (code) => {
      if (code === 0) {
        console.log("Docker compose started successfully.");
        resolve();
      } else {
        reject(new Error(`docker compose up failed with code ${code}`));
      }
    });
  });
}

/**
 * Run docker stop command.
 * @returns Promise
 */
function runDockerStop() {
  return new Promise<void>((resolve, reject) => {
    console.log("\nStopping docker compose services...");
    const stopProcess = spawn("docker", ["compose", ...composeFiles, "stop"], {
      stdio: "inherit",
    });

    stopProcess.on("exit", (code) => {
      if (code === 0) {
        console.log("Docker compose stop exited with code 0");
        resolve();
        process.exit(0);
      } else {
        reject(new Error(`docker compose stop failed with code ${code}`));
        process.exit(code);
      }
    });
  });
}

async function main() {
  try {
    await createEnv();

    await runDockerUp();

    // Keep process running until Ctrl+C or SIGTERM
    const shutdown = async () => {
      await runDockerStop();
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    console.log("");
    console.log("   Local Dev Services");
    console.log("   - Supabase Dashboard:   http://localhost:8000/");
    console.log("   - Supabase Username:    supabase");
    console.log(
      "   - Supabase Password:    this_password_is_insecure_and_should_be_updated"
    );
    console.log("");
    console.log("   - Minio Storage Dashboard: http://localhost:9001/");
    console.log("   - Minio Storage Username:  supa-storage");
    console.log("   - Minio Storage Password:  secret1234");
    console.log("");
    console.log("   - Inbucket Main Server: http://localhost:9001/");
    console.log("");

    console.log("Press Ctrl+C to stop the containers...");

    // Keeps Node alive without hogging CPU
    process.stdin.resume();
  } catch (err) {
    console.error("Failed to start docker compose:", err);
    process.exit(1);
  }
}

main();
