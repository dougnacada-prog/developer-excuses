import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: one line, the funniest excuse a developer gives when
// code breaks in production. The twist a developer recognises: the code
// only ever worked because its only user was the developer — the moment
// anyone else uses it, correctly, it falls over. Fresh (no "works on my
// machine", no DNS, no cache), sounds like something a dev would actually
// say out loud, and lands on a single read.
const entry =
  "It's not broken in production — it's the first time anyone but me used it, and they used it correctly.";

// Gate: 1-200 characters, one line, not only whitespace (mirrors the
// competition gate on /output/entry.txt). Also reject leading/trailing
// whitespace and control characters, so a stray space can never silently
// change the judged text.
if (
  !/^[^\n]{1,200}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  /[\u0000-\u001f\u007f]/.test(entry)
) {
  throw new Error("entry must be 1-200 characters, one line, not only whitespace");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
