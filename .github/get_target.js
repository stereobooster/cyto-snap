import { getTarget } from "../index.js";

process.stderr.write(
  JSON.stringify({
    platform: process.platform,
    arch: process.arch,
  })
);
process.stderr.write("\n");
process.stdout.write(getTarget(process));
