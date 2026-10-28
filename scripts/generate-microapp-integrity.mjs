import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entryPath = path.join(repoRoot, "dist-microapp", "xoos-microapp.js");
const manifestPath = path.join(repoRoot, "dist-microapp", "xoos-manifest.json");

const entryBytes = await readFile(entryPath);
const sha256 = createHash("sha256").update(entryBytes).digest("hex");

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
manifest.entry = "xoos-microapp.js";
manifest.integrity = {
  algorithm: "sha256",
  value: sha256,
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`sha256:${sha256}`);
