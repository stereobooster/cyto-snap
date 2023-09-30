import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cwd } from "node:process";
import { compare } from "odiff-bin";
import { mkdirSync, existsSync } from "node:fs";

// TODO: make it a lib and detect executable depending on os/architecture
const cytoSnap = (src, dst) => {
  return new Promise((resolve, reject) => {
    const srcStdin = typeof src !== "string";
    const args = [];
    if (!srcStdin) args.push("-s", "test/" + src);
    if (dst) args.push("-d", "test/" + dst);

    const bin = spawn("src-tauri/target/release/cyto-snap", args, {
      windowsHide: true,
      cwd: cwd(),
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

const assertEqualImages = async (f1, f2) => {
  const { match, reason } = await compare(
    "test/" + f1,
    "test/" + f2,
    "test/" + f1 + "diff"
  );
  assert.equal(match, true, reason);
};

if (!existsSync("test/tmp")) mkdirSync("test/tmp");

test("graph 1", async () => {
  await cytoSnap("data/g1.json", "tmp/g1.png");
  await assertEqualImages("data/g1.png", "tmp/g1.png");
});
