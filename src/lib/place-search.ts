export type Place = {
  id: number;
  title: string;
  description?: string;
  extract: string;
  image?: string;
  lat?: number;
  lon?: number;
  url: string;
};

const API = "https://ru.wikipedia.org/w/api.php";

export function searchUrl(q: string, limit = 6) {
  const p = new URLSearchParams({
    action: "query", format: "json", origin: "*", generator: "search",
    gsrsearch: q, gsrlimit: String(limit * 2), prop: "pageimages|extracts|coordinates|description",
    exintro: "1", explaintext: "1", exsentences: "3", exlimit: "20",
    piprop: "thumbnail", pithumbsize: "1000", pilimit: "20", colimit: "20",
  });
  return `${API}?${p}`;
}

export function suggestUrl(q: string) {
  const p = new URLSearchParams({
    action: "query", format: "json", origin: "*", generator: "prefixsearch", gpssearch: q, gpslimit: "40",
    gpsnamespace: "0", prop: "coordinates|description", colimit: "max",
  });
  return `${API}?${p}`;
}

export function parseSuggest(json: unknown, limit = 6): string[] {
  const list = parseSearch(json).filter((p) => p.lat !== undefined);
  const by = (p: Place) => (/Беларус|Белорус/i.test(p.description ?? "") || isInBelarus(p) ? 0 : 1);
  return list.map((p, i) => ({ p, i })).sort((a, b) => by(a.p) - by(b.p) || a.i - b.i).slice(0, limit).map((x) => x.p.title);
}

export function isInBelarus(p: Place) {
  return p.lat !== undefined && p.lon !== undefined && p.lat > 51.2 && p.lat < 56.2 && p.lon > 23.1 && p.lon < 32.8;
}

type RawPage = {
  pageid: number; title: string; index?: number; description?: string; extract?: string;
  thumbnail?: { source: string }; coordinates?: { lat: number; lon: number }[];
};

export function parseSearch(json: unknown): Place[] {
  const pages = (json as { query?: { pages?: Record<string, RawPage> } })?.query?.pages;
  if (!pages) return [];
  return Object.values(pages)
    .filter((p) => !/страница значений/i.test(p.description ?? "") && !/\(значения\)/.test(p.title))
    .sort((a, b) => (a.index ?? 99) - (b.index ?? 99))
    .map((p) => {
      const c = p.coordinates?.[0];
      const place: Place = {
        id: p.pageid,
        title: p.title,
        extract: (p.extract ?? "").replace(/\s*\([^)]*\)/, "").trim(),
        url: `https://ru.wikipedia.org/wiki/${encodeURIComponent(p.title.replace(/ /g, "_"))}`,
      };
      if (p.description) place.description = p.description;
      if (p.thumbnail) place.image = p.thumbnail.source;
      if (c) { place.lat = c.lat; place.lon = c.lon; }
      return place;
    });
}

export function mapEmbedUrl(lat: number, lon: number, d = 0.08) {
  const bbox = [lon - d, lat - d * 0.6, lon + d, lat + d * 0.6].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
}

export function rankPlaces(list: Place[], q: string, limit = 6): Place[] {
  const needle = q.toLowerCase().slice(0, Math.max(4, q.length - 2));
  const places = list.filter((p) => p.lat !== undefined);
  const score = (p: Place) => (p.title.toLowerCase().includes(needle) ? 0 : 2) + (isInBelarus(p) ? 0 : 1);
  return places.map((p, i) => ({ p, i })).sort((a, b) => score(a.p) - score(b.p) || a.i - b.i).slice(0, limit).map((x) => x.p);
}
