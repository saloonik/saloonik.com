import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { siteConfig } from "../config/site";
import { getFeature } from "./features";
import { industries } from "./industries";

// Google cuts titles at ~60 chars and descriptions at ~155; " | Saloonik" is appended to titles.
const TITLE_MAX = 60 - ` | ${siteConfig.name}`.length;
const DESCRIPTION_MAX = 155;

describe("industry SEO", () => {
  it.each(industries)("$slug fits search snippet limits", (i) => {
    expect(i.metaTitle.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(i.metaDescription.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });

  it("has unique slugs, titles and descriptions", () => {
    for (const key of ["slug", "metaTitle", "metaDescription"] as const) {
      const values = industries.map((i) => i[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("has a photo file for every industry", () => {
    for (const i of industries)
      expect(existsSync(`public${i.photo?.src}`), i.slug).toBe(true);
  });

  it("keeps the default description within limits", () => {
    expect(siteConfig.description.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });
});

describe("industry features", () => {
  it("only links to features that exist", () => {
    for (const i of industries)
      for (const id of i.featureIds)
        expect(getFeature(id), `${i.slug}: ${id}`).toBeDefined();
  });
});
