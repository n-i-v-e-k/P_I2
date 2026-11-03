import React from 'react';
import { useState } from "react";

// ==========================================
// COMPONENTE: MODAL DE PAGO
// ==========================================
export default function ModalPagoGarantia({ datosPreReserva, onConfirmarPago, onCerrar }) {
  const [medioPago, setMedioPago] = useState("Yape");
  const [nroOperacion, setNroOperacion] = useState("04587123");
  const [comprobanteAdjunto, setComprobanteAdjunto] = useState(null);
  const [aceptaValidacion, setAceptaValidacion] = useState(false);

  const manejarArchivo = (e) => {
    if (e.target.files && e.target.files[0]) {
      setComprobanteAdjunto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const ejecutarPago = (e) => {
    e.preventDefault();
    if (!aceptaValidacion) {
      alert("Por favor confirma que entiendes que la reserva queda pendiente de validación.");
      return;
    }
    onConfirmarPago({
      medioPago,
      nroOperacion,
      montoGarantia: 100,
      comprobanteUrl: comprobanteAdjunto || "comprobante_simulado.jpg"
    });
  };

  return (
    <div className="pago-modal-backdrop">
      <div className="pago-modal-window">
        <div className="pago-modal-header">
          <h3>Asegura tu reserva</h3>
          <button onClick={onCerrar} className="btn-cerrar-modal">✕</button>
        </div>

        <div className="pago-box-garantia">
          <span className="pago-label-garantia">GARANTÍA DE RESERVA</span>
          <span className="pago-monto-garantia">S/ 100.00</span>
        </div>

        <p className="pago-desc-texto">
          Al llegar y consumir, estos S/ 100 se descontarán del total de tu cuenta. Este pago solo sirve para asegurar que la reserva es real. No es un cobro adicional.
        </p>

        <div className="pago-resumen-pill">
          {datosPreReserva.fecha} · {datosPreReserva.hora} hrs · {datosPreReserva.mesa} · {datosPreReserva.personas} · {datosPreReserva.nombre}
        </div>

        <div className="pago-grid-cuentas">
          <div className="pago-cuenta-item">
            <span className="cuenta-label">YAPE</span>
            <strong className="cuenta-valor">987 654 321</strong>
          </div>

          <div className="pago-cuenta-item">
            <span className="cuenta-label">TRANSFERENCIA BCP</span>
            <strong className="cuenta-valor">191-00000000-0-00</strong>
            <small className="cuenta-sub">CCI 002-191-000000000000-00</small>
          </div>

          <div className="pago-cuenta-item">
            <span className="cuenta-label">TITULAR</span>
            <strong className="cuenta-valor">Inka Sabores S.A.C.</strong>
          </div>
        </div>

        <span className="pago-nota-ejemplo">* Datos de cuenta de ejemplo.</span>

        <form onSubmit={ejecutarPago}>
          <div className="pago-form-row">
            <div className="pago-input-col">
              <label>Medio de pago</label>
              <select value={medioPago} onChange={(e) => setMedioPago(e.target.value)}>
                <option value="Yape">Yape</option>
                <option value="Transferencia BCP">Transferencia BCP</option>
                <option value="Plin">Plin</option>
              </select>
            </div>

            <div className="pago-input-col">
              <label>N° de operación</label>
              <input
                type="text"
                value={nroOperacion}
                onChange={(e) => setNroOperacion(e.target.value)}
                placeholder="04587123"
                required
              />
            </div>
          </div>

          <div className="pago-upload-container">
            <label className="pago-upload-box">
              {comprobanteAdjunto ? (
                <img src={comprobanteAdjunto} alt="Voucher" className="pago-voucher-preview" />
              ) : (
                <div className="pago-upload-placeholder">
                  <div className="pago-icon-cross"></div>
                  <span>Vista previa del comprobante</span>
                  <small style={{ color: "#777", display: "block", marginTop: "4px" }}>
                    (Haz clic para adjuntar comprobante)
                  </small>
                </div>
              )}
              <input type="file" accept="image/*" onChange={manejarArchivo} style={{ display: "none" }} />
            </label>
          </div>

          <label className="pago-checkbox-row">
            <input
              type="checkbox"
              checked={aceptaValidacion}
              onChange={(e) => setAceptaValidacion(e.target.checked)}
              required
            />
            <span>
              Entiendo que mi reserva quedará pendiente hasta que el restaurante valide el pago y me envíe un correo de confirmación.
            </span>
          </label>

          <div className="pago-botones-footer">
            <button type="submit" className="btn-pago-confirmar">
              Enviar comprobante y reservar
            </button>
            <button type="button" onClick={onCerrar} className="btn-pago-cancelar">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

