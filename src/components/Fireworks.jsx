import { useEffect, useRef } from "react";

export default function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let breite = (canvas.width = window.innerWidth);
    let hoehe = (canvas.height = window.innerHeight);

    const farben = ["#e10600", "#ffd700", "#1e90ff", "#ffffff", "#39ff14", "#ff5fa2", "#ff8c00"];
    let raketen = [];
    let partikel = [];
    let animationId;

    function starteRakete() {
      raketen.push({
        x: Math.random() * breite,
        y: hoehe,
        zielY: Math.random() * hoehe * 0.45 + hoehe * 0.08,
        vy: -(Math.random() * 3 + 9),
        farbe: farben[Math.floor(Math.random() * farben.length)],
      });
    }

    function explodieren(x, y, farbe) {
      const anzahl = 70;
      for (let i = 0; i < anzahl; i++) {
        const winkel = (Math.PI * 2 / anzahl) * i;
        const tempo = Math.random() * 4 + 2;
        partikel.push({
          x, y,
          vx: Math.cos(winkel) * tempo,
          vy: Math.sin(winkel) * tempo,
          alpha: 1,
          farbe,
        });
      }
    }

    function zeichne() {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(10, 10, 20, 0.25)";
      ctx.fillRect(0, 0, breite, hoehe);
      ctx.globalCompositeOperation = "lighter";

      for (let i = raketen.length - 1; i >= 0; i--) {
        const r = raketen[i];
        r.y += r.vy;
        ctx.fillStyle = r.farbe;
        ctx.fillRect(r.x, r.y, 3, 9);
        if (r.y <= r.zielY) {
          explodieren(r.x, r.y, r.farbe);
          raketen.splice(i, 1);
        }
      }

      for (let i = partikel.length - 1; i >= 0; i--) {
        const p = partikel[i];
        p.vy += 0.05;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.012;
        if (p.alpha <= 0) {
          partikel.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.farbe;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(zeichne);
    }

    const intervall = setInterval(starteRakete, 450);
    starteRakete();
    zeichne();

    function beiResize() {
      breite = canvas.width = window.innerWidth;
      hoehe = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", beiResize);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(intervall);
      window.removeEventListener("resize", beiResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fireworks-canvas" />;
}
