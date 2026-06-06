import seed from "../../db.json";

const STORAGE_KEY = "f1_drivers_v2";

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return seed.drivers ?? [];
    }
  }
  const initial = seed.drivers ?? [];
  save(initial);
  return initial;
}

function save(drivers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drivers));
}

function nextId(drivers) {
  const max = drivers.reduce((m, d) => Math.max(m, Number(d.id) || 0), 0);
  return String(max + 1);
}

export async function getAllDrivers() {
  return load();
}

export async function getDriver(id) {
  const driver = load().find((d) => String(d.id) === String(id));
  if (!driver) {
    throw new Error("Fahrer nicht gefunden");
  }
  return driver;
}

export async function createDriver(driver) {
  const drivers = load();
  const neu = { ...driver, id: nextId(drivers) };
  save([...drivers, neu]);
  return neu;
}

export async function updateDriver(id, driver) {
  const drivers = load();
  const exists = drivers.some((d) => String(d.id) === String(id));
  if (!exists) {
    throw new Error("Fahrer nicht gefunden");
  }
  const updated = { ...driver, id: String(id) };
  save(drivers.map((d) => (String(d.id) === String(id) ? updated : d)));
  return updated;
}

export async function deleteDriver(id) {
  const drivers = load();
  const exists = drivers.some((d) => String(d.id) === String(id));
  if (!exists) {
    throw new Error("Fahrer nicht gefunden");
  }
  save(drivers.filter((d) => String(d.id) !== String(id)));
  return true;
}
