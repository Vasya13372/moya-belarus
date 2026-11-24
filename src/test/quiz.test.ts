import { describe, expect, it } from "vitest";
import { pickQuestions, QUESTIONS } from "@/lib/quiz";

describe("quiz", () => {
  it("picks 10 distinct questions per round", () => {
    const qs = pickQuestions(10);
    expect(qs).toHaveLength(10);
    expect(new Set(qs.map((q) => q.q)).size).toBe(10);
  });
  it("keeps the correct answer after shuffling options", () => {
    for (const q of pickQuestions(QUESTIONS.length)) {
      const orig = QUESTIONS.find((o) => o.q === q.q)!;
      expect(q.options[q.answer]).toBe(orig.options[orig.answer]);
    }
  });
});
