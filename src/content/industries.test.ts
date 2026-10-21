import { describe, expect, it } from "vitest";
import { industries } from "./industries";

describe("industries", () => {
  it("usługi z mockupu wizyty są w szablonie usług branży", () => {
    for (const { slug, visit, services } of industries)
      for (const name of visit.services)
        expect(
          services.map((s) => s.name),
          slug,
        ).toContain(name);
  });
});
