import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDrivers, deleteDriver } from "../api/driversApi.js";

export default function AdminPage() {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState("");

  function ladeFahrer() {
    getAllDrivers()
      .then(setDrivers)
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    ladeFahrer();
  }, []);

  async function handleDelete(driver) {
    const ok = window.confirm(`Fahrer "${driver.name}" wirklich löschen?`);
    if (!ok) return;
    try {
      await deleteDriver(driver.id);
      ladeFahrer();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Fahrer verwalten</h1>
        <Link to="/admin/neu" className="btn">+ Neuer Fahrer</Link>
      </div>

      {error && <p className="error">⚠️ {error}</p>}

      <table className="driver-table">
        <thead>
          <tr>
            <th>Name</th><th>Team</th><th>Punkte</th><th>Status</th><th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.team}</td>
              <td>{d.points}</td>
              <td>{d.status}</td>
              <td>
                <Link to={`/admin/bearbeiten/${d.id}`} className="link">Bearbeiten</Link>
                <button className="link danger" onClick={() => handleDelete(d)}>Löschen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
