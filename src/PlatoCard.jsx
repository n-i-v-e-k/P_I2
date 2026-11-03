import React from 'react';

// ==========================================
// COMPONENTE: TARJETA DE PLATO
// ==========================================
export default function PlatoCard({ plato, onReservarClick }) {
  return (
    <div className="card bg-card">
      <div className="card-img">
        <img src={plato.imagen} alt={plato.nombre} />
      </div>
      <div className="card-body">
        <h3>{plato.nombre}</h3>
        <p>{plato.descripcion}</p>
        <div className="rating">★★★★★</div>
        <button onClick={onReservarClick} className="btn-outline" style={{ cursor: "pointer" }}>
          RESERVAR AHORA —
        </button>
      </div>
    </div>
  );
}
