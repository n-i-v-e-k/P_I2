import React from 'react';
import { useState } from "react";

// ==========================================
// COMPONENTE: NAVBAR
// ==========================================
export default function Navbar({ vistaActual, setVistaActual, totalReservas, adminAutenticado }) {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  const irA = (vista, seccion = null) => {
    setVistaActual(vista);
    setMenuMovilAbierto(false);
    if (seccion) {
      setTimeout(() => {
        const el = document.getElementById(seccion);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <div className="logo" style={{ cursor: "pointer" }} onClick={() => irA("cliente", "inicio")}>
          <div className="logo-badge">
            <span>Inka</span>
            <small>SABORES</small>
          </div>
        </div>

        <nav className={`nav-links ${menuMovilAbierto ? "active" : ""}`}>
          <a href="#menu" onClick={(e) => { e.preventDefault(); irA("cliente", "menu"); }}>MENÚ</a>
          <a href="#especialidades" onClick={(e) => { e.preventDefault(); irA("cliente", "especialidades"); }}>ESPECIALIDADES</a>
          <a href="#alta-cocina" onClick={(e) => { e.preventDefault(); irA("cliente", "alta-cocina"); }}>EVENTOS</a>
          <a href="#nosotros" onClick={(e) => { e.preventDefault(); irA("cliente", "nosotros"); }}>NOSOTROS</a>
          <a href="#reserva" onClick={(e) => { e.preventDefault(); irA("cliente", "reserva"); }}>RESERVAR</a>
          <button
            onClick={() => irA("contacto")}
            className="nav-link-btn"
            style={{ color: vistaActual === "contacto" ? "#d4af37" : "#cccccc" }}
          >
            CONTACTO / RECLAMOS
          </button>
        </nav>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={() => setVistaActual(vistaActual === "admin" ? "cliente" : "admin")}
            className="btn btn-outline"
            style={{
              cursor: "pointer",
              background: vistaActual === "admin" ? "#d4af37" : "transparent",
              color: vistaActual === "admin" ? "#000" : "#d4af37"
            }}
          >
            {vistaActual === "admin" ? "← VOLVER A LA WEB" : `LOGIN ADMIN ${adminAutenticado ? `(${totalReservas})` : ""}`}
          </button>

          <button
            onClick={() => irA("cliente", "reserva")}
            className="btn btn-gold"
          >
            RESERVAR MESA
          </button>

          <div
            className="menu-toggle"
            onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
