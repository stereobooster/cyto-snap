import test from "node:test";
import assert from "node:assert/strict";
import { compare } from "odiff-bin";
import { mkdirSync, existsSync } from "node:fs";
import { cytoSnap } from "../index.js";

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
  if (reason === "pixel-diff") match = rest.diffPercentage <= 0.6;
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

test("graph 3", async () => {
  await cytoSnap("data/g3.json", "tmp/g3.png");
  await assertEqualImages("g3.png");
});

test("graph 4", async () => {
  await cytoSnap("data/g4.json", "tmp/g4.png");
  await assertEqualImages("g4.png");
});

test("graph 5", async () => {
  await cytoSnap("data/g5.json", "tmp/g5.png");
  await assertEqualImages("g5.png");
});

test("graph 6", async () => {
  await cytoSnap("data/g6.json", "tmp/g6.png");
  await assertEqualImages("g6.png");
});

test("graph 7", async () => {
  await cytoSnap("data/g7.json", "tmp/g7.png");
  await assertEqualImages("g7.png");
});

test("graph 8", async (t) => {
  t.skip("elk doesn't work");
  // await cytoSnap("data/g8.json", "tmp/g8.png");
  // await assertEqualImages("g8.png");
});

test("graph 9", async () => {
  await cytoSnap("data/g9.json", "tmp/g9.png");
  await assertEqualImages("g9.png");
});

test("graph 10", async (t) => {
  t.skip(
    "impossible to test force layout, because it produce different layout every time"
  );
  // await cytoSnap("data/g10.json", "tmp/g10.png");
  // await assertEqualImages("g10.png");
});

test("graph 11", async (t) => {
  await cytoSnap("data/g11.json", "tmp/g11.png");
  await assertEqualImages("g11.png");
});
