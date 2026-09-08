// Random-source abstraction: cryptographic when available (native Hermes + web),
// with a deterministic mulberry32 for seeded tests/replay.

export type Rng = () => number; // returns float in [0, 1)

export function cryptoRandom(): number {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] / 4294967296;
  }
  return Math.random();
}

export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomInt(maxExclusive: number, rng: Rng = cryptoRandom): number {
  if (maxExclusive <= 1) return 0;
  return Math.floor(rng() * maxExclusive);
}
