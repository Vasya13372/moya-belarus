import { describe, expect, it } from "vitest";
import { parseSearch, rankPlaces } from "@/lib/place-search";

describe("parseSearch", () => {
  it("orders results by search rank and keeps coordinates", () => {
    const r = parseSearch({ query: { pages: {
      "2": { pageid: 2, title: "Мир", index: 2 },
      "1": { pageid: 1, title: "Браслав", index: 1, coordinates: [{ lat: 55.6, lon: 27.05 }] },
    } } });
    expect(r.map((p) => p.title)).toEqual(["Браслав", "Мир"]);
    expect(r[0]?.lat).toBe(55.6);
  });
  it("returns empty list when nothing found", () => {
    expect(parseSearch({ batchcomplete: "" })).toEqual([]);
  });
});

describe("rankPlaces", () => {
  it("puts places named like the query before other matches", () => {
    const r = rankPlaces([
      { id: 1, title: "Полоцк", extract: "", url: "", lat: 1, lon: 1 },
      { id: 2, title: "Браславские озёра", extract: "", url: "", lat: 1, lon: 1 },
    ], "Браслав");
    expect(r[0]?.title).toBe("Браславские озёра");
  });
});

describe("place-only results", () => {
  it("drops people and other articles without coordinates", () => {
    const r = rankPlaces([
      { id: 1, title: "Брежнев, Леонид Ильич", extract: "", url: "" },
      { id: 2, title: "Брест", extract: "", url: "", lat: 52.09, lon: 23.69 },
    ], "Бре");
    expect(r.map((p) => p.title)).toEqual(["Брест"]);
  });
});
