import React from 'react';
import { useState, useEffect } from "react";
import { MESAS_RESTAURANTE, HORARIOS_DISPONIBLES } from "../data/constantes";
import ModalPagoGarantia from "./ModalPagoGarantia";

// ================================
// COMPONENTE: FORMULARIO CLIENTE 
// ================================
export default function SeccionReserva({ reservas, mesasBloqueadas, agregarReserva }) {
  const hoy = new Date().toISOString().split("T")[0];

  const [fecha, setFecha] = useState(hoy);
  const [hora, setHora] = useState("19:00");
  const [personas, setPersonas] = useState("4 personas");
  const [mesaSeleccionada, setMesaSeleccionada] = useState("Mesa 5");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [notas, setNotas] = useState("");
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);

  const [mesasNoDisponibles, setMesasNoDisponibles] = useState([]);
  const [modalPagoVisible, setModalPagoVisible] = useState(false);
  const [datosPreReserva, setDatosPreReserva] = useState(null);
  const [bannerPendiente, setBannerPendiente] = useState(null);

  useEffect(() => {
    const bloqueadasTodoElDia = mesasBloqueadas
      .filter((b) => b.fecha === fecha)
      .map((b) => b.mesa);

    const ocupadasEnEseHorario = reservas
      .filter((r) => r.fecha === fecha && r.hora === hora && r.estado !== "Cancelada")
      .map((r) => r.mesa);

    const todasInhabilitadas = [...new Set([...bloqueadasTodoElDia, ...ocupadasEnEseHorario])];
    setMesasNoDisponibles(todasInhabilitadas);

    if (todasInhabilitadas.includes(mesaSeleccionada)) {
      const primeraLibre = MESAS_RESTAURANTE.find((m) => !todasInhabilitadas.includes(m));
      setMesaSeleccionada(primeraLibre || "");
    }
  }, [fecha, hora, reservas, mesasBloqueadas, mesaSeleccionada]);

  const iniciarProcesoReserva = (e) => {
    e.preventDefault();
    if (!mesaSeleccionada) {
      alert("No hay mesas disponibles en este turno. Por favor selecciona otra hora o fecha.");
      return;
    }

    setDatosPreReserva({
      fecha,
      hora,
      personas,
      mesa: mesaSeleccionada,
      nombre,
      telefono,
      email,
      notas
    });
    setModalPagoVisible(true);
  };

  const finalizarReservaConPago = (datosPago) => {
    const nuevaReserva = {
      id: Date.now(),
      ...datosPreReserva,
      ...datosPago,
      estado: "Pendiente de validación"
    };

    agregarReserva(nuevaReserva);
    setModalPagoVisible(false);

    setBannerPendiente({
      nombre: datosPreReserva.nombre,
      fecha: datosPreReserva.fecha,
      hora: datosPreReserva.hora,
      mesa: datosPreReserva.mesa,
      monto: datosPago.montoGarantia,
      email: datosPreReserva.email
    });

    window.scrollTo({
      top: document.getElementById("reserva").offsetTop - 40,
      behavior: "smooth"
    });
  };

  const mesasLibresCount = MESAS_RESTAURANTE.length - mesasNoDisponibles.length;

  return (
    <section className="section section-dark" id="reserva">
      <div className="container">
        <div className="section-title">
          <span className="subtitle-cursive">Experiencia Peruana</span>
          <h2>Reserva tu Mesa</h2>
          <p>Gestiona tu reserva en tiempo real seleccionando cualquiera de nuestras 9 mesas disponibles.</p>
        </div>

        <div className="reserva-split-card">
          <div className="reserva-img-col">
            <div className="reserva-img-overlay">
              <div className="logo-badge" style={{ marginBottom: "auto" }}>
                <span>Inka</span>
                <small>SABORES</small>
              </div>
              <div>
                <span className="reserva-tag">LIMA · COCINA PERUANA AUTÉNTICA</span>
                <h3 className="reserva-hero-title">Tu mesa te espera.</h3>
                <p className="reserva-hero-sub">
                  Sabores tradicionales, sobremesas sin prisa y una mesa preparada para ti.
                </p>
              </div>
            </div>
          </div>

          <div className="reserva-form-col">
            <span className="form-small-title">RESERVAS</span>
            <h3 className="form-main-title">Reserva tu experiencia</h3>
            <p className="form-subtitle">
              Completa los datos y selecciona una mesa disponible en tiempo real.
            </p>

            {bannerPendiente && (
              <div className="alerta-pendiente-box">
                ¡Gracias, {bannerPendiente.nombre}! Recibimos tu reserva para el {bannerPendiente.fecha} a las {bannerPendiente.hora} en la {bannerPendiente.mesa} y tu comprobante de S/ {bannerPendiente.monto}. Tu reserva queda pendiente de validación: te enviaremos la confirmación a {bannerPendiente.email}.
              </div>
            )}

            <form onSubmit={iniciarProcesoReserva} className="inka-form">
              <div className="form-row-3">
                <div className="form-group">
                  <label>Fecha</label>
                  <input
                    type="date"
                    min={hoy}
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Hora</label>
                  <select value={hora} onChange={(e) => setHora(e.target.value)}>
                    {HORARIOS_DISPONIBLES.map((h) => (
                      <option key={h} value={h}>{h} hrs</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Personas</label>
                  <select value={personas} onChange={(e) => setPersonas(e.target.value)}>
                    <option value="1 persona">1 persona</option>
                    <option value="2 personas">2 personas</option>
                    <option value="4 personas">4 personas</option>
                    <option value="6 personas">6 personas</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "18px" }}>
                <label>
                  Selecciona tu Mesa ({mesasLibresCount} disponibles para {personas} a las {hora})
                </label>
                <div className="mesas-grid-selector">
                  {MESAS_RESTAURANTE.map((mesa) => {
                    const estaBloqueadaPorIncidente = mesasBloqueadas.some((b) => b.fecha === fecha && b.mesa === mesa);
                    const estaOcupadaPorReserva = reservas.some((r) => r.fecha === fecha && r.hora === hora && r.mesa === mesa && r.estado !== "Cancelada");
                    const noDisponible = estaBloqueadaPorIncidente || estaOcupadaPorReserva;
                    const estaSeleccionada = mesaSeleccionada === mesa;

                    return (
                      <button
                        type="button"
                        key={mesa}
                        disabled={noDisponible}
                        onClick={() => setMesaSeleccionada(mesa)}
                        className={`mesa-chip ${noDisponible ? "ocupada" : ""} ${estaSeleccionada ? "seleccionada" : ""}`}
                      >
                        {mesa} {estaBloqueadaPorIncidente ? "(Fuera de servicio)" : estaOcupadaPorReserva ? "(Ocupada)" : "✓"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Nombre y apellidos</label>
                  <input
                    type="text"
                    placeholder="Ej. María García"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    placeholder="+51 999 888 777"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="cliente@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label>¿Algo que debamos saber? <small>(Opcional)</small></label>
                <input
                  type="text"
                  placeholder="Alergias, ocasión especial, accesibilidad..."
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={aceptaPoliticas}
                  onChange={(e) => setAceptaPoliticas(e.target.checked)}
                  required
                />
                <span>Acepto la política de privacidad y el tratamiento de mis datos para gestionar la reserva.</span>
              </label>

              <button
                type="submit"
                className="btn btn-gold btn-submit-reserva"
                disabled={mesasNoDisponibles.length === MESAS_RESTAURANTE.length}
              >
                <span>Solicitar reserva</span>
                <span>→</span>
              </button>

              <div className="form-footer-notes">
                <span>Garantía de S/ 100 descontable de tu consumo</span>
                <span>¿Prefieres llamar? +51 1 471 2850</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {modalPagoVisible && datosPreReserva && (
        <ModalPagoGarantia
          datosPreReserva={datosPreReserva}
          onConfirmarPago={finalizarReservaConPago}
          onCerrar={() => setModalPagoVisible(false)}
        />
      )}
    </section>
  );
}
