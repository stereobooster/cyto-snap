import { getTarget } from "../index.js";
import { arch, platform } from "node:process";
process.stdout.write(getTarget({ arch, platform }));
