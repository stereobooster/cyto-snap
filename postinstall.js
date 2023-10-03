import { arch, platform, exit } from "node:process";
import { existsSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from 'node:url';
import { executablePath } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, executablePath({ arch, platform }));

console.log(path)

if (!existsSync(path)) {
  console.log("There is no precompiled binary for your OS/architecture. Sorry");
  exit(1);
}

copyFileSync(path, resolve(__dirname, "bin/cyto-snap"));
