import { spawn } from "node:child_process";
import { arch, platform } from "node:process";

const platformMapping = {
  linux: "unknown-linux",
  darwin: "apple-darwin",
  win32: "pc-windows",
};

const archMapping = {
  ia32: "i686",
  x64: "x86_64",
  arm: "armv7",
  arm64: "aarch64",
};

// ignoring musl for now
// for more precise detection we can use https://github.com/lovell/detect-libc
const envMapping = {
  linux: "gnu",
  darwin: undefined,
  win32: "msvc",
};

export const processToTargetTripple = (proc = { arch, platform }) => ({
  arch: archMapping[proc.arch],
  os: platformMapping[proc.platform],
  env: envMapping[proc.platform],
});

export const executablePath = (proc = { arch, platform }) => {
  let path = "src-tauri/target/release/cyto-snap";
  if (proc.platform === "win32") path += ".exe";
  return path
};

export const cytoSnap = (src, dst) => {
  return new Promise((resolve, reject) => {
    const srcStdin = typeof src !== "string";
    const args = [];
    if (!srcStdin) args.push("-s", "test/" + src);
    if (dst) args.push("-d", "test/" + dst);

    const bin = spawn(executablePath(), args, {
      windowsHide: true,
      // cwd: cwd(),
    });
    bin.stdout.on("data", (data) => reject(`stdout: ${data}`));
    bin.stderr.on("data", (data) => reject(`stderr: ${data}`));
    bin.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`child process exited with code ${code}`);
      }
    });
    if (srcStdin) bin.stdin.write(JSON.stringify(src));
  });
};
