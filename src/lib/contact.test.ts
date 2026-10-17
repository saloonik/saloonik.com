import { describe, expect, it } from "vitest";
import { rateLimit, validateContact } from "./contact";

const valid = {
  name: "Anna Nowak",
  email: "anna@salon.pl",
  phone: "",
  company: "",
  topic: "Pytanie o program",
  message: "Czy mogę przenieść klientów z Excela?",
};

describe("validateContact", () => {
  it("przepuszcza poprawną wiadomość i przycina spacje", () => {
    const { data, errors } = validateContact({ ...valid, name: "  Anna  " });
    expect(errors).toEqual({});
    expect(data.name).toBe("Anna");
  });

  it("odrzuca braki, zły e-mail, obcy temat i za długą treść", () => {
    const { errors } = validateContact({
      ...valid,
      name: "",
      email: "anna@",
      phone: "abc",
      topic: "Spam",
      message: "x".repeat(4001),
    });
    expect(Object.keys(errors).sort()).toEqual(
      ["email", "message", "name", "phone", "topic"].sort(),
    );
  });

  it("nie wywraca się na pustym wejściu", () => {
    expect(Object.keys(validateContact(null).errors).length).toBeGreaterThan(0);
  });
});

describe("rateLimit", () => {
  it("wpuszcza max zapytań w oknie, potem blokuje, po oknie znowu wpuszcza", () => {
    const allowed = () => rateLimit("1.2.3.4", 2, 1000, 0);
    expect([allowed(), allowed(), allowed()]).toEqual([true, true, false]);
    expect(rateLimit("5.6.7.8", 2, 1000, 0)).toBe(true);
    expect(rateLimit("1.2.3.4", 2, 1000, 1000)).toBe(true);
  });
});
