import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkGuess, validateDriver } from "../utils/compare.js";

describe("checkGuess", () => {
  it("erkennt einen richtigen 'mehr'-Tipp", () => {
    const a = { name: "Lando", points: 1100 };
    const b = { name: "Lewis", points: 4800 };
    expect(checkGuess("mehr", a, b)).toBe(true);
  });

  it("erkennt einen falschen 'mehr'-Tipp", () => {
    const a = { name: "Max", points: 2900 };
    const b = { name: "Oscar", points: 700 };
    expect(checkGuess("mehr", a, b)).toBe(false);
  });
});

describe("validateDriver", () => {
  it("meldet einen Fehler, wenn der Name leer ist", () => {
    const errors = validateDriver({ name: "", team: "Ferrari", points: 100 });
    expect(errors.name).toBeDefined();
  });

  it("meldet keinen Fehler bei gültigen Daten", () => {
    const errors = validateDriver({ name: "Max", team: "Red Bull", points: 200 });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

describe("getAllDrivers", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
  });

  it("ruft den /drivers-Endpoint auf", async () => {
    const { getAllDrivers } = await import("../api/driversApi.js");
    await getAllDrivers();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/drivers"));
  });
});
