import * as local from "./localDriversApi.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const USE_LOCAL = import.meta.env.VITE_USE_LOCAL_DB === "true";

export async function getAllDrivers() {
  if (USE_LOCAL) return local.getAllDrivers();
  const response = await fetch(`${API_URL}/drivers`);
  if (!response.ok) {
    throw new Error("Fahrer konnten nicht geladen werden");
  }
  return response.json();
}

export async function getDriver(id) {
  if (USE_LOCAL) return local.getDriver(id);
  const response = await fetch(`${API_URL}/drivers/${id}`);
  if (response.status === 404) {
    throw new Error("Fahrer nicht gefunden");
  }
  if (!response.ok) {
    throw new Error("Fahrer konnte nicht geladen werden");
  }
  return response.json();
}

export async function createDriver(driver) {
  if (USE_LOCAL) return local.createDriver(driver);
  const response = await fetch(`${API_URL}/drivers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(driver),
  });
  if (response.status === 400) {
    throw new Error("Ungültige Daten");
  }
  if (!response.ok) {
    throw new Error("Fahrer konnte nicht gespeichert werden");
  }
  return response.json();
}

export async function updateDriver(id, driver) {
  if (USE_LOCAL) return local.updateDriver(id, driver);
  const response = await fetch(`${API_URL}/drivers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(driver),
  });
  if (response.status === 404) {
    throw new Error("Fahrer nicht gefunden");
  }
  if (!response.ok) {
    throw new Error("Fahrer konnte nicht aktualisiert werden");
  }
  return response.json();
}

export async function deleteDriver(id) {
  if (USE_LOCAL) return local.deleteDriver(id);
  const response = await fetch(`${API_URL}/drivers/${id}`, {
    method: "DELETE",
  });
  if (response.status === 404) {
    throw new Error("Fahrer nicht gefunden");
  }
  if (!response.ok) {
    throw new Error("Fahrer konnte nicht gelöscht werden");
  }
  return true;
}
