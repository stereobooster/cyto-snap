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

const assertEqualImages = async (file) => {
  let { match, reason, ...rest } = await compare(
    "test/data/" + file,
    "test/tmp/" + file,
    "test/diff/" + file,
    {
      antialiasing: true,
      diffColor: "#00ff00",
      outputDiffMask: true,
    }
  );
  if (reason === "pixel-diff") match = rest.diffPercentage < 0.05;
  if (!match) console.log(rest);
  assert.equal(match, true, reason);
};

if (!existsSync("test/tmp")) mkdirSync("test/tmp");
if (!existsSync("test/diff")) mkdirSync("test/diff");

test("graph 1", async () => {
  await cytoSnap("data/g1.json", "tmp/g1.png");
  await assertEqualImages("g1.png");
});

test("graph 2", async () => {
  await cytoSnap("data/g2.json", "tmp/g2.png");
  await assertEqualImages("g2.png");
});
