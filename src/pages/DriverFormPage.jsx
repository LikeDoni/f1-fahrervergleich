import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDriver, createDriver, updateDriver } from "../api/driversApi.js";
import { validateDriver } from "../utils/compare.js";

export default function DriverFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const istBearbeiten = Boolean(id);

  const [form, setForm] = useState({ name: "", team: "", points: 0, status: "aktiv" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (istBearbeiten) {
      getDriver(id)
        .then((d) => setForm(d))
        .catch((err) => setApiError(err.message));
    }
  }, [id, istBearbeiten]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const gefunden = validateDriver(form);
    setErrors(gefunden);
    if (Object.keys(gefunden).length > 0) return;

    const driver = { ...form, points: Number(form.points) };

    try {
      if (istBearbeiten) {
        await updateDriver(id, driver);
      } else {
        await createDriver(driver);
      }
      navigate("/admin");
    } catch (err) {
      setApiError(err.message);
    }
  }

  return (
    <div>
      <h1>{istBearbeiten ? "Fahrer bearbeiten" : "Neuer Fahrer"}</h1>
      {apiError && <p className="error">⚠️ {apiError}</p>}

      <form onSubmit={handleSubmit} className="driver-form">
        <label>
          Name *
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>

        <label>
          Team *
          <input name="team" value={form.team} onChange={handleChange} />
          {errors.team && <span className="field-error">{errors.team}</span>}
        </label>

        <label>
          Punkte
          <input name="points" type="number" value={form.points} onChange={handleChange} />
          {errors.points && <span className="field-error">{errors.points}</span>}
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="aktiv">aktiv</option>
            <option value="inaktiv">inaktiv</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit" className="btn">Speichern</button>
          <button type="button" className="btn secondary" onClick={() => navigate("/admin")}>
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}
