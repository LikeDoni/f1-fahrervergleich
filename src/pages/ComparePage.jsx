import { useEffect, useState } from "react";
import { getAllDrivers } from "../api/driversApi.js";
import { checkGuess, pickTwoDrivers } from "../utils/compare.js";
import Fireworks from "../components/Fireworks.jsx";

export default function ComparePage() {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState("");

  const [status, setStatus] = useState("idle");
  const [paar, setPaar] = useState(null);

  useEffect(() => {
    getAllDrivers()
      .then(setDrivers)
      .catch((err) => setError(err.message));
  }, []);

  function starten() {
    const neu = pickTwoDrivers(drivers);
    if (!neu) {
      setError("Es braucht mindestens zwei Fahrer mit unterschiedlichen Punkten.");
      return;
    }
    setPaar(neu);
    setStatus("guessing");
  }

  function raten(tipp) {
    const richtig = checkGuess(tipp, paar.driverA, paar.driverB);
    setStatus(richtig ? "won" : "lost");
  }

  if (error) {
    return <p className="error">⚠️ {error}</p>;
  }

  return (
    <div className="game">
      <h1>Fahrer-Ratespiel</h1>

      {status === "idle" && (
        <div className="start-box">
          <p>Errätst du, welcher Fahrer mehr Punkte hat?</p>
          <button className="btn big" onClick={starten}>Start</button>
        </div>
      )}

      {(status === "guessing" || status === "lost") && paar && (
        <div className="compare-result">
          <div className="driver-card">
            <h3>{paar.driverA.name}</h3>
            <p>{paar.driverA.team}</p>
            <p className="points">{paar.driverA.points} Punkte</p>
          </div>
          <div className="driver-card">
            <h3>{paar.driverB.name}</h3>
            <p>{paar.driverB.team}</p>
            {status === "guessing" ? (
              <p className="points hidden">? Punkte</p>
            ) : (
              <p className="points">{paar.driverB.points} Punkte</p>
            )}
          </div>
        </div>
      )}

      {status === "guessing" && (
        <div className="guess-box">
          <p>Hat <strong>{paar.driverB.name}</strong> mehr oder weniger Punkte
            als <strong>{paar.driverA.name}</strong>?</p>
          <div className="guess-buttons">
            <button className="btn" onClick={() => raten("mehr")}>Mehr ⬆️</button>
            <button className="btn" onClick={() => raten("weniger")}>Weniger ⬇️</button>
          </div>
        </div>
      )}

      {status === "lost" && (
        <div className="result-box">
          <h2 className="lose-text">💥 Verloren!</h2>
          <p>Leider falsch geraten.</p>
          <button className="btn" onClick={starten}>Weiter</button>
        </div>
      )}

      {status === "won" && (
        <div className="celebration">
          <Fireworks />
          <div className="racetrack">
            <span className="car">🏎️</span>
          </div>
          <div className="celebration-content">
            <h2 className="win-text">🎉 Richtig! 🎉</h2>
            <p>
              {paar.driverB.name} hat {paar.driverB.points} Punkte –
              dein Tipp war richtig!
            </p>
            <button className="btn big" onClick={starten}>Weiter</button>
          </div>
        </div>
      )}
    </div>
  );
}
