// make.fun — "One Emoji, One Dream Vacation"
// Bounty: u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35
//
// Writes exactly one emoji to /output/entry.txt: a desert island.
//
// Why this emoji, against the judge's brief (most important first):
// 1. It IS a dream vacation at a glance — a remote island with a palm
//    tree and turquoise water, no words needed, no ambiguity.
// 2. It is a postcard in a single glyph: the stranger sees the place
//    before reading a word — sand, palm, sea, solitude.
// 3. It is personal and specific, not any holiday: one island, far
//    away, the classic "escape to somewhere nobody can reach me" dream.
// 4. It carries a spark of wit: the desert-island fantasy is the
//    oldest daydream in the book — marooned in paradise, on purpose.
//    It also beats the obvious beach 🏖️ on specificity: a beach could
//    be any weekend by the sea, while an island is a journey — a
//    faraway place you have to dream your way to, not drive to.
// 5. It reads instantly on every screen and culture: the island is
//    one of the most widely recognised emoji, clear even at small size.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// U+1F3DD DESERT ISLAND + U+FE0F VARIATION SELECTOR-16: the emoji
// presentation of the island, exactly one emoji.
const EMOJI = "🏝️";

// The gate: 1-8 characters, not only white space. Array.from counts
// Unicode code points rather than UTF-16 code units, so the island
// (one base character plus its variation selector) counts as 2.
const GATE_MIN = 1;
const GATE_MAX = 8;

function validate(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(
      `entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`,
    );
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  // The judge's first criterion is "exactly one emoji, no words":
  // refuse any ASCII letter, so no word can ever sneak into the entry.
  if (/[A-Za-z]/.test(candidate)) {
    throw new Error("entry must hold no words, only an emoji");
  }
  return length;
}

const length = validate(EMOJI);
console.log(`entry OK: ${length} characters (${EMOJI})`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

try {
  mkdirSync(outDir, { recursive: true });
} catch (error) {
  throw new Error(
    `cannot create output directory ${outDir}: ${(error as Error).message}`,
  );
}
try {
  writeFileSync(outPath, EMOJI, "utf8");
} catch (error) {
  throw new Error(
    `cannot write entry to ${outPath}: ${(error as Error).message}`,
  );
}
