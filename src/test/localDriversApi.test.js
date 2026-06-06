import { describe, it, expect, beforeEach } from "vitest";
import {
  getAllDrivers,
  getDriver,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../api/localDriversApi.js";

describe("localDriversApi (Demo-Modus)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("seedet beim ersten Laden die Fahrer aus db.json", async () => {
    const drivers = await getAllDrivers();
    expect(drivers.length).toBeGreaterThan(1);
    expect(drivers[0]).toHaveProperty("name");
  });

  it("legt einen neuen Fahrer mit eigener ID an und speichert ihn", async () => {
    const vorher = await getAllDrivers();
    const neu = await createDriver({ name: "Test Fahrer", team: "Testus", points: 10, status: "aktiv" });

    expect(neu.id).toBeDefined();
    expect(neu.name).toBe("Test Fahrer");

    const nachher = await getAllDrivers();
    expect(nachher.length).toBe(vorher.length + 1);
  });

  it("aktualisiert einen bestehenden Fahrer", async () => {
    const neu = await createDriver({ name: "Alt", team: "X", points: 1, status: "aktiv" });
    const updated = await updateDriver(neu.id, { name: "Neu", team: "Y", points: 99, status: "inaktiv" });

    expect(updated.id).toBe(neu.id);
    expect(updated.name).toBe("Neu");

    const geladen = await getDriver(neu.id);
    expect(geladen.points).toBe(99);
  });

  it("löscht einen Fahrer", async () => {
    const neu = await createDriver({ name: "Weg", team: "Z", points: 0, status: "aktiv" });
    await deleteDriver(neu.id);
    await expect(getDriver(neu.id)).rejects.toThrow("Fahrer nicht gefunden");
  });

  it("wirft einen Fehler beim Laden eines unbekannten Fahrers", async () => {
    await expect(getDriver("999999")).rejects.toThrow("Fahrer nicht gefunden");
  });
});
