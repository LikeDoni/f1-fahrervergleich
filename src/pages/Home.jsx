import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Willkommen beim F1 Fahrervergleich</h1>
      <p>Vergleiche zwei Fahrer oder verwalte die Fahrerliste.</p>
      <div className="card-row">
        <Link to="/vergleich" className="big-card">
          <h2>Vergleichen</h2>
          <p>Zwei Fahrer auswählen und Punkte gegenüberstellen.</p>
        </Link>
        <Link to="/admin" className="big-card">
          <h2>Verwaltung</h2>
          <p>Fahrer anlegen, bearbeiten oder löschen.</p>
        </Link>
      </div>
    </div>
  );
}
