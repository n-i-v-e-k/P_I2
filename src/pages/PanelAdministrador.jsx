import React, { useState } from 'react';
import { MESAS_RESTAURANTE, HORARIOS_DISPONIBLES } from '../data/constantes';

export default function PanelAdministrador({
  reservas,
  mesasBloqueadas,
  bloquearMesa,
  rehabilitarMesa,
  agregarReserva,
  actualizarReserva,
  eliminarReserva,
  cerrarSesion,
  volverWeb
}) {
  const hoy = new Date().toISOString().split("T")[0];
  const [seccionActiva, setSeccionActiva] = useState("operaciones");
  const [fechaFiltro, setFechaFiltro] = useState(hoy);

  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idReservaEdicion, setIdReservaEdicion] = useState(null);

  const [filtroMostrarPagos, setFiltroMostrarPagos] = useState("Pendientes de validación");
  const [reservaParaRevisar, setReservaParaRevisar] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    fecha: hoy,
    hora: "13:00",
    personas: "2 personas",
    mesa: "Mesa 1",
    notas: "",
    estado: "Confirmada",
    medioPago: "Efectivo / Presencial",
    nroOperacion: "---"
  });

  const [modalBloqueoAbierto, setModalBloqueoAbierto] = useState(false);
  const [mesaParaBloquear, setMesaParaBloquear] = useState("Mesa 1");
  const [motivoIncidente, setMotivoIncidente] = useState("Copa rota / rotura de mobiliario");
  const [cancelarReservasExistentes, setCancelarReservasExistentes] = useState(true);

  const reservasDelDia = reservas.filter((r) => r.fecha === fechaFiltro);
  const bloqueadasDelDia = mesasBloqueadas.filter((b) => b.fecha === fechaFiltro);

  const reservasPendientesCount = reservas.filter(r => r.estado === "Pendiente de validación").length;

  const reservasFiltradasOperaciones = reservas.filter((r) => {
    const coincideTexto =
      r.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      r.telefono.includes(filtroTexto) ||
      r.mesa.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      (r.nroOperacion && r.nroOperacion.includes(filtroTexto));
    const coincideEstado = filtroEstado === "Todos" || r.estado === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  const reservasParaValidar = reservas.filter((r) => {
    if (filtroMostrarPagos === "Todos") return true;
    return r.estado === filtroMostrarPagos;
  });

  const totalReservasDia = reservasDelDia.length;
  const comensalesEsperados = reservasDelDia.reduce((acc, r) => acc + (parseInt(r.personas) || 1), 0);
  const mesasOcupadasCount = new Set(reservasDelDia.filter(r => r.estado !== "Cancelada").map((r) => r.mesa)).size;
  const mesasInhabilitadasCount = bloqueadasDelDia.length;
  const mesasOperativasTotal = MESAS_RESTAURANTE.length - mesasInhabilitadasCount;
  const porcentajeOcupacion = mesasOperativasTotal > 0 ? Math.round((mesasOcupadasCount / mesasOperativasTotal) * 100) : 100;

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setIdReservaEdicion(null);
    setFormData({
      nombre: "",
      telefono: "",
      email: "",
      fecha: fechaFiltro,
      hora: "13:00",
      personas: "2 personas",
      mesa: "Mesa 1",
      notas: "Registrado por recepción",
      estado: "Confirmada",
      medioPago: "Presencial / Salón",
      nroOperacion: "MANUAL-" + Math.floor(1000 + Math.random() * 9000)
    });
    setModalAbierto(true);
  };

  const abrirModalEditar = (reserva) => {
    setModoEdicion(true);
    setIdReservaEdicion(reserva.id);
    setFormData({
      nombre: reserva.nombre,
      telefono: reserva.telefono,
      email: reserva.email,
      fecha: reserva.fecha,
      hora: reserva.hora,
      personas: reserva.personas,
      mesa: reserva.mesa,
      notas: reserva.notas || "",
      estado: reserva.estado || "Confirmada",
      medioPago: reserva.medioPago || "Yape",
      nroOperacion: reserva.nroOperacion || "S/N"
    });
    setModalAbierto(true);
  };

  const manejarGuardar = (e) => {
    e.preventDefault();

    const mesaEstaBloqueada = mesasBloqueadas.some(
      (b) => b.fecha === formData.fecha && b.mesa === formData.mesa
    );
    if (mesaEstaBloqueada) {
      alert(`⚠️ Mesa Bloqueada: La ${formData.mesa} se encuentra fuera de servicio durante el día ${formData.fecha}.`);
      return;
    }

    const conflicto = reservas.some(
      (r) =>
        r.id !== idReservaEdicion &&
        r.fecha === formData.fecha &&
        r.hora === formData.hora &&
        r.mesa === formData.mesa &&
        r.estado !== "Cancelada"
    );

    if (conflicto) {
      alert(`⚠️ Conflicto de Salón: La ${formData.mesa} ya se encuentra ocupada a las ${formData.hora} para el día ${formData.fecha}.`);
      return;
    }

    if (modoEdicion) {
      actualizarReserva({ ...formData, id: idReservaEdicion });
    } else {
      agregarReserva({ ...formData, id: Date.now() });
    }
    setModalAbierto(false);
  };

  const ejecutarBloqueo = (e) => {
    e.preventDefault();
    bloquearMesa(fechaFiltro, mesaParaBloquear, motivoIncidente, cancelarReservasExistentes);
    setModalBloqueoAbierto(false);
  };

  const aprobarPagoYConfirmar = (reserva) => {
    actualizarReserva({
      ...reserva,
      estado: "Confirmada",
      notas: `${reserva.notas ? reserva.notas + " | " : ""}Garantía S/ 100 validada por administración`
    });
    setReservaParaRevisar(null);
    alert(`✓ Pago validado con éxito. Se ha confirmado la ${reserva.mesa} para ${reserva.nombre}.`);
  };

  const rechazarPago = (reserva) => {
    if (window.confirm(`¿Deseas marcar como cancelada la reserva de ${reserva.nombre} por comprobante no válido?`)) {
      actualizarReserva({
        ...reserva,
        estado: "Cancelada",
        notas: `${reserva.notas ? reserva.notas + " | " : ""}Comprobante rechazado por administración`
      });
      setReservaParaRevisar(null);
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo-badge" style={{ width: "46px", height: "46px" }}>
            <span>Inka</span>
            <small>ADMIN</small>
          </div>
          <div>
            <h4 style={{ color: "#d4af37", fontSize: "0.95rem", margin: 0 }}>Inka Sabores</h4>
            <small style={{ color: "#777", fontSize: "0.7rem" }}>9 Mesas · Salón Central</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => setSeccionActiva("operaciones")}
            className={`sidebar-btn ${seccionActiva === "operaciones" ? "activo" : ""}`}
          >
            <span>Operaciones</span>
          </button>

          <button
            onClick={() => setSeccionActiva("dashboard")}
            className={`sidebar-btn ${seccionActiva === "dashboard" ? "activo" : ""}`}
          >
            <span>Dashboard & KPIs</span>
          </button>

          <button
            onClick={() => setSeccionActiva("matriz")}
            className={`sidebar-btn ${seccionActiva === "matriz" ? "activo" : ""}`}
          >
            <span>Matriz de Salón (9)</span>
          </button>

          <button
            onClick={() => setSeccionActiva("validar-pagos")}
            className={`sidebar-btn btn-sidebar-validar ${seccionActiva === "validar-pagos" ? "activo" : ""}`}
          >
            <span>Validar Pagos {reservasPendientesCount > 0 ? reservasPendientesCount : ""}</span>
          </button>

          <button
            onClick={() => setSeccionActiva("bloqueos")}
            className={`sidebar-btn ${seccionActiva === "bloqueos" ? "activo" : ""}`}
          >
            <span>Mesas</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={volverWeb} className="sidebar-link-btn">
            Ir a la Web Pública
          </button>
          <button onClick={cerrarSesion} className="sidebar-logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="admin-main-content">
        {seccionActiva === "validar-pagos" && (
          <div className="seccion-validar-pagos-view">
            <div className="validar-pagos-header-row">
              <div>
                <span className="subtitle-garantia-italica">Garantía de Reserva</span>
                <h2 className="title-validacion-pagos">Validación de Pagos</h2>
                <p className="desc-validacion-pagos">
                  Revisa el comprobante de S/ 100 (Yape o transferencia) y confirma la reserva enviando un correo al cliente.
                </p>
              </div>

              <div className="filtro-mostrar-dropdown">
                <label>MOSTRAR:</label>
                <select
                  value={filtroMostrarPagos}
                  onChange={(e) => setFiltroMostrarPagos(e.target.value)}
                >
                  <option value="Pendientes de validación">Pendientes de validación</option>
                  <option value="Confirmada">Confirmadas</option>
                  <option value="Todos">Todos</option>
                </select>
              </div>
            </div>

            <div className="tabla-validar-container">
              <table className="tabla-validar-pagos">
                <thead>
                  <tr>
                    <th>CLIENTE</th>
                    <th>FECHA & HORA</th>
                    <th>MESA</th>
                    <th>PAGO</th>
                    <th>ESTADO</th>
                    <th>ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasParaValidar.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#888" }}>
                        No hay reservas en estado "{filtroMostrarPagos}".
                      </td>
                    </tr>
                  ) : (
                    reservasParaValidar.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <strong className="nombre-cliente-td">{r.nombre}</strong>
                          <span className="correo-cliente-td">{r.email}</span>
                        </td>
                        <td>
                          <span>{r.fecha}</span>
                          <span style={{ display: "block" }}>{r.hora} hrs</span>
                        </td>
                        <td>
                          <span className="pill-mesa-gris">{r.mesa}</span>
                        </td>
                        <td>
                          <span>S/ {r.montoGarantia || 100}· {r.medioPago || "Yape"}</span>
                          <span style={{ display: "block", color: "#888", fontSize: "0.75rem" }}>
                            Op. {r.nroOperacion || "04587123"}
                          </span>
                        </td>
                        <td>
                          <span className={`pill-estado-validacion ${r.estado ? r.estado.toLowerCase().replace(/ /g, "-") : "pendiente-de-validación"}`}>
                            {r.estado ? r.estado.toUpperCase() : "PENDIENTE DE VALIDACIÓN"}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => setReservaParaRevisar(r)}
                            className="btn-revisar-comprobante"
                          >
                            Revisar comprobante
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reservaParaRevisar && (
          <div className="modal-backdrop">
            <div className="bg-card modal-content" style={{ maxWidth: "520px", borderTop: "4px solid #d4af37" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px" }}>
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#d4af37" }}>
                  Comprobante de Pago — {reservaParaRevisar.nombre}
                </h3>
                <button onClick={() => setReservaParaRevisar(null)} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#888" }}>✕</button>
              </div>

              <div style={{ background: "#1c1c20", padding: "14px", borderRadius: "6px", marginBottom: "15px", fontSize: "0.85rem", color: "#e0e0e0" }}>
                <p style={{ margin: "0 0 5px" }}><strong>Monto de Garantía:</strong> S/ {reservaParaRevisar.montoGarantia || 100}.00</p>
                <p style={{ margin: "0 0 5px" }}><strong>Medio de Pago:</strong> {reservaParaRevisar.medioPago || "Yape"}</p>
                <p style={{ margin: "0 0 5px" }}><strong>N° de Operación:</strong> {reservaParaRevisar.nroOperacion || "04587123"}</p>
                <p style={{ margin: "0" }}><strong>Mesa Asignada:</strong> {reservaParaRevisar.mesa} ({reservaParaRevisar.fecha} - {reservaParaRevisar.hora} hrs)</p>
              </div>

              <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "15px", textAlign: "center", background: "#16161a", marginBottom: "20px" }}>
                <span style={{ display: "block", fontSize: "0.75rem", color: "#888", marginBottom: "8px" }}>Vista del Voucher adjuntado por el comensal:</span>
                <div style={{ width: "100%", height: "160px", background: "#0c0c0e", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", border: "1px dashed rgba(212,175,55,0.3)", color: "#d4af37", fontSize: "0.85rem" }}>
                  🧾 Voucher Yape/BCP verificado (Op. {reservaParaRevisar.nroOperacion || "04587123"})
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => aprobarPagoYConfirmar(reservaParaRevisar)}
                  className="btn btn-gold"
                  style={{ flex: 1.5, padding: "12px", borderRadius: "6px", fontWeight: "600" }}
                >
                  ✓ Aprobar y Confirmar Reserva
                </button>
                <button
                  onClick={() => rechazarPago(reservaParaRevisar)}
                  className="btn"
                  style={{ background: "rgba(231,76,60,0.15)", border: "1px solid #e74c3c", color: "#ff7675", padding: "12px", borderRadius: "6px", fontWeight: "600" }}
                >
                  Rechazar
                </button>
                <button
                  onClick={() => setReservaParaRevisar(null)}
                  className="btn btn-outline"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {seccionActiva === "operaciones" && (
          <div>
            <div className="admin-topbar">
              <div>
                <span className="subtitle-cursive" style={{ fontSize: "1.3rem" }}>Módulo de Control</span>
                <h2 style={{ color: "#d4af37", fontSize: "1.8rem" }}>Operaciones y Reservas</h2>
                <p style={{ color: "#888", fontSize: "0.85rem" }}>
                  Crear, actualizar estados y eliminar reservas de las 9 mesas del restaurante.
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={abrirModalCrear} className="btn btn-gold">
                  + Nueva Reserva (Create)
                </button>
                <button onClick={() => window.print()} className="btn btn-outline">
                  🖨️ Exportar / Imprimir
                </button>
              </div>
            </div>

            <div className="bg-card" style={{ padding: "18px 20px", marginBottom: "25px", display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: "220px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "5px" }}>BUSCADOR:</label>
                <input
                  type="text"
                  placeholder="Buscar por cliente, N° operación, teléfono o mesa..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", background: "#0c0c0e", border: "1px solid #2a2a2e", borderRadius: "4px", color: "#fff", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "5px" }}>FILTRAR ESTADO:</label>
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  style={{ padding: "9px 12px", background: "#0c0c0e", border: "1px solid #2a2a2e", borderRadius: "4px", color: "#fff" }}
                >
                  <option value="Todos">Todos los estados</option>
                  <option value="Pendiente de validación">Pendiente de validación</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="En Mesa">En Mesa</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
            </div>

            <div className="bg-card" style={{ overflowX: "auto", borderRadius: "8px" }}>
              <table className="tabla-crud">
                <thead>
                  <tr>
                    <th>CLIENTE</th>
                    <th>FECHA & HORA</th>
                    <th>MESA</th>
                    <th>PAGO / GARANTÍA</th>
                    <th>ESTADO</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasFiltradasOperaciones.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "35px", color: "#777" }}>
                        No se encontraron reservas con los filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    reservasFiltradasOperaciones.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <strong>{r.nombre}</strong>
                          <small style={{ display: "block", color: "#aaa" }}>📞 {r.telefono}</small>
                          {r.notas && <small style={{ display: "block", color: "#f3e5ab" }}>"{r.notas}"</small>}
                        </td>
                        <td>{r.fecha} <br /> <span style={{ color: "#d4af37" }}>{r.hora} hrs</span></td>
                        <td>
                          <span className="badge-mesa">{r.mesa}</span>
                          <small style={{ display: "block", color: "#777", marginTop: "2px" }}>{r.personas}</small>
                        </td>
                        <td>
                          <strong style={{ color: "#2ecc71" }}>S/ {r.montoGarantia || 100}</strong>
                          <small style={{ display: "block", color: "#d4af37" }}>{r.medioPago || "Yape"}</small>
                          <small style={{ color: "#888" }}>Op: {r.nroOperacion || "---"}</small>
                        </td>
                        <td>
                          <span className={`badge-estado ${r.estado ? r.estado.toLowerCase().replace(/ /g, "-") : "confirmada"}`}>
                            {r.estado || "Confirmada"}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            <button
                              onClick={() => abrirModalEditar(r)}
                              className="btn-accion-edit"
                              title="Editar reserva"
                            >
                              ✏️ Editar
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`¿Deseas eliminar la reserva de ${r.nombre}?`)) {
                                  eliminarReserva(r.id);
                                }
                              }}
                              className="btn-accion-delete"
                              title="Eliminar reserva"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {seccionActiva === "bloqueos" && (
          <div>
            <div className="admin-topbar">
              <div>
                <span className="subtitle-cursive" style={{ fontSize: "1.3rem" }}>Gestión de Salón</span>
                <h2 style={{ color: "#d4af37", fontSize: "1.8rem" }}>Control de Incidentes & Bloqueo de Mesas</h2>
                <p style={{ color: "#888", fontSize: "0.85rem" }}>
                  Inhabilita o rehabilita una mesa completa por todo el día debido a incidentes.
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "4px" }}>FECHA:</label>
                <input
                  type="date"
                  value={fechaFiltro}
                  onChange={(e) => setFechaFiltro(e.target.value)}
                  className="admin-date-input"
                />
              </div>
            </div>

            {bloqueadasDelDia.length > 0 && (
              <div style={{ background: "rgba(231,76,60,0.12)", border: "1px solid #e74c3c", padding: "16px 20px", borderRadius: "8px", marginBottom: "25px", color: "#ff8b8b" }}>
                <strong>⚠️ {bloqueadasDelDia.length} mesa(s) fuera de servicio para el {fechaFiltro}:</strong>
                <ul style={{ marginTop: "8px", paddingLeft: "20px", fontSize: "0.85rem" }}>
                  {bloqueadasDelDia.map(b => (
                    <li key={b.id}>
                      <strong>{b.mesa}:</strong> {b.motivo} — <button onClick={() => rehabilitarMesa(b.id)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", textDecoration: "underline", padding: "0 4px" }}>Rehabilitar mesa ahora</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid-mesas-dashboard">
              {MESAS_RESTAURANTE.map((mesa) => {
                const bloqueo = bloqueadasDelDia.find((b) => b.mesa === mesa);
                const reservasAfectadas = reservasDelDia.filter((r) => r.mesa === mesa && r.estado !== "Cancelada");

                return (
                  <div
                    key={mesa}
                    className={`mesa-box-card ${bloqueo ? "mesa-bloqueada-box" : "mesa-libre-box"}`}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <strong style={{ fontSize: "1.05rem" }}>{mesa}</strong>
                      <span className={`badge-estado ${bloqueo ? "cancelada" : "confirmada"}`}>
                        {bloqueo ? "⛔ FUERA DE SERVICIO" : "✅ OPERATIVA"}
                      </span>
                    </div>

                    {bloqueo ? (
                      <div style={{ marginBottom: "15px" }}>
                        <small style={{ color: "#ff7675", display: "block", marginBottom: "4px" }}>Incidente:</small>
                        <p style={{ fontSize: "0.82rem", color: "#ccc", margin: 0, fontStyle: "italic" }}>"{bloqueo.motivo}"</p>
                      </div>
                    ) : (
                      <div style={{ marginBottom: "15px" }}>
                        <small style={{ color: "#2ecc71", display: "block" }}>Disponible para reservas.</small>
                        <small style={{ color: "#888" }}>{reservasAfectadas.length} reservas registradas hoy.</small>
                      </div>
                    )}

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px" }}>
                      {bloqueo ? (
                        <button onClick={() => rehabilitarMesa(bloqueo.id)} className="btn btn-gold" style={{ width: "100%", padding: "8px", fontSize: "0.78rem" }}>
                          ✓ Rehabilitar Mesa
                        </button>
                      ) : (
                        <button
                          onClick={() => { setMesaParaBloquear(mesa); setModalBloqueoAbierto(true); }}
                          className="btn-accion-delete"
                          style={{ width: "100%", padding: "8px", fontSize: "0.78rem", cursor: "pointer", display: "block", textAlign: "center" }}
                        >
                          ⛔ Bloquear Mesa por Incidente
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {seccionActiva === "dashboard" && (
          <div>
            <div className="admin-topbar">
              <div>
                <span className="subtitle-cursive" style={{ fontSize: "1.3rem" }}>Métricas Ejecutivas</span>
                <h2 style={{ color: "#d4af37", fontSize: "1.8rem" }}>Dashboard de Salón</h2>
                <p style={{ color: "#888", fontSize: "0.85rem" }}>
                  Análisis de ocupación, comensales proyectados e ingresos por garantía (S/ 100).
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "4px" }}>FECHA ANALIZADA:</label>
                <input
                  type="date"
                  value={fechaFiltro}
                  onChange={(e) => setFechaFiltro(e.target.value)}
                  className="admin-date-input"
                />
              </div>
            </div>

            <div className="grid grid-3" style={{ gap: "20px", marginBottom: "30px" }}>
              <div className="kpi-card" style={{ borderLeft: "4px solid #d4af37" }}>
                <div className="kpi-icon">🍽️</div>
                <div className="kpi-content">
                  <span className="kpi-label">OCUPACIÓN DE MESAS</span>
                  <h4 className="kpi-value">{mesasOcupadasCount} / {mesasOperativasTotal} operativas</h4>
                  <div className="kpi-bar-bg">
                    <div className="kpi-bar-fill" style={{ width: `${porcentajeOcupacion}%` }}></div>
                  </div>
                  <small className="kpi-subtext">{mesasInhabilitadasCount > 0 ? `(${mesasInhabilitadasCount} bloqueadas)` : "100% mesas operativas"}</small>
                </div>
              </div>

              <div className="kpi-card" style={{ borderLeft: "4px solid #2ecc71" }}>
                <div className="kpi-icon">👥</div>
                <div className="kpi-content">
                  <span className="kpi-label">COMENSALES DEL DÍA</span>
                  <h4 className="kpi-value" style={{ color: "#2ecc71" }}>{comensalesEsperados} personas</h4>
                  <small className="kpi-subtext" style={{ marginTop: "10px", display: "block" }}>
                    Proyección de vajilla y mise-en-place
                  </small>
                </div>
              </div>

              <div className="kpi-card" style={{ borderLeft: "4px solid #3498db" }}>
                <div className="kpi-icon">💰</div>
                <div className="kpi-content">
                  <span className="kpi-label">GARANTÍAS RECAUDADAS</span>
                  <h4 className="kpi-value" style={{ color: "#3498db" }}>S/ {totalReservasDia * 100}</h4>
                  <small className="kpi-subtext" style={{ marginTop: "10px", display: "block" }}>
                    {totalReservasDia} reservas registradas
                  </small>
                </div>
              </div>
            </div>

            <div className="bg-card" style={{ padding: "25px" }}>
              <h3 style={{ color: "#d4af37", marginBottom: "15px", fontFamily: "'Cinzel', serif" }}>
                MAPA EN TIEMPO REAL DEL SALÓN (9 MESAS)
              </h3>
              <div className="grid-mesas-dashboard">
                {MESAS_RESTAURANTE.map((mesa) => {
                  const bloqueo = bloqueadasDelDia.find(b => b.mesa === mesa);
                  const reservaActiva = reservasDelDia.find(r => r.mesa === mesa && r.estado !== "Cancelada");
                  return (
                    <div
                      key={mesa}
                      className={`mesa-box-card ${bloqueo ? "mesa-bloqueada-box" : reservaActiva ? "mesa-ocupada-box" : "mesa-libre-box"}`}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <strong>{mesa}</strong>
                        <span>{bloqueo ? "⛔ Bloqueada" : reservaActiva ? "🔴 Ocupada" : "🟢 Libre"}</span>
                      </div>
                      {bloqueo ? (
                        <small style={{ color: "#ff7675" }}>{bloqueo.motivo}</small>
                      ) : reservaActiva ? (
                        <div>
                          <small style={{ color: "#d4af37" }}>{reservaActiva.hora} hrs</small><br />
                          <small style={{ color: "#fff" }}>{reservaActiva.nombre}</small><br />
                          <small style={{ color: "#aaa" }}>{reservaActiva.personas}</small>
                        </div>
                      ) : (
                        <small style={{ color: "#888" }}>Disponible</small>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {seccionActiva === "matriz" && (
          <div>
            <div className="admin-topbar">
              <div>
                <span className="subtitle-cursive" style={{ fontSize: "1.3rem" }}>Ocupación de Espacios</span>
                <h2 style={{ color: "#d4af37", fontSize: "1.8rem" }}>Matriz de Salón (9 Mesas)</h2>
                <p style={{ color: "#888", fontSize: "0.85rem" }}>
                  Revisa qué mesas y turnos están libres, ocupados o fuera de servicio.
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "4px" }}>FECHA:</label>
                <input
                  type="date"
                  value={fechaFiltro}
                  onChange={(e) => setFechaFiltro(e.target.value)}
                  className="admin-date-input"
                />
              </div>
            </div>

            <div className="calendario-wrapper bg-card">
              <table className="calendario-tabla">
                <thead>
                  <tr>
                    <th>HORARIO</th>
                    {MESAS_RESTAURANTE.map((mesa) => {
                      const bloqueada = bloqueadasDelDia.some(b => b.mesa === mesa);
                      return (
                        <th key={mesa}>
                          {mesa} {bloqueada ? "⛔" : ""}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {HORARIOS_DISPONIBLES.map((hora) => (
                    <tr key={hora}>
                      <td className="hora-celda">{hora} hrs</td>
                      {MESAS_RESTAURANTE.map((mesa) => {
                        const bloqueo = bloqueadasDelDia.find(b => b.mesa === mesa);
                        const reservaEncontrada = reservasDelDia.find(
                          (r) => r.hora === hora && r.mesa === mesa && r.estado !== "Cancelada"
                        );

                        if (bloqueo) {
                          return (
                            <td key={mesa} className="celda-bloqueada" title={bloqueo.motivo}>
                              <strong style={{ color: "#ff7675" }}>⛔ Fuera de servicio</strong>
                              <small style={{ color: "#aaa", display: "block" }}>Incidente</small>
                            </td>
                          );
                        }

                        return (
                          <td
                            key={mesa}
                            className={`estado-celda ${reservaEncontrada ? "celda-ocupada" : "celda-libre"}`}
                          >
                            {reservaEncontrada ? (
                              <div>
                                <strong>{reservaEncontrada.nombre}</strong>
                                <small>{reservaEncontrada.personas}</small>
                              </div>
                            ) : (
                              <span>Disponible</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {modalAbierto && (
        <div className="modal-backdrop">
          <div className="bg-card modal-content">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #2a2a2e", paddingBottom: "10px" }}>
              <h3 style={{ color: "#d4af37", margin: 0, fontFamily: "'Cinzel', serif" }}>
                {modoEdicion ? "✏️ Modificar Reserva (Update)" : "+ Registrar Reserva (Create)"}
              </h3>
              <button onClick={() => setModalAbierto(false)} style={{ background: "none", border: "none", color: "#888", fontSize: "1.3rem", cursor: "pointer" }}>✕</button>
            </div>

            <form onSubmit={manejarGuardar}>
              <div className="form-row-2">
                <div className="form-group" style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "4px" }}>Nombre del Cliente</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                    style={{ width: "100%", padding: "8px 10px", background: "#0c0c0e", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "4px" }}>Teléfono</label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    required
                    style={{ width: "100%", padding: "8px 10px", background: "#0c0c0e", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                  />
                </div>
              </div>

              <div className="form-row-3" style={{ marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "4px" }}>Fecha</label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    required
                    style={{ width: "100%", padding: "8px", background: "#0c0c0e", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "4px" }}>Hora</label>
                  <select
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    style={{ width: "100%", padding: "8px", background: "#0c0c0e", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                  >
                    {HORARIOS_DISPONIBLES.map(h => <option key={h} value={h}>{h} hrs</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "4px" }}>Mesa</label>
                  <select
                    value={formData.mesa}
                    onChange={(e) => setFormData({ ...formData, mesa: e.target.value })}
                    style={{ width: "100%", padding: "8px", background: "#0c0c0e", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                  >
                    {MESAS_RESTAURANTE.map(mesa => (
                      <option key={mesa} value={mesa}>
                        {mesa}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row-2" style={{ marginBottom: "15px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "4px" }}>Personas</label>
                  <select
                    value={formData.personas}
                    onChange={(e) => setFormData({ ...formData, personas: e.target.value })}
                    style={{ width: "100%", padding: "8px", background: "#0c0c0e", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                  >
                    <option value="1 persona">1 persona</option>
                    <option value="2 personas">2 personas</option>
                    <option value="4 personas">4 personas</option>
                    <option value="6 personas">6 personas</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "4px" }}>Estado</label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    style={{ width: "100%", padding: "8px", background: "#0c0c0e", border: "1px solid #333", color: "#fff", borderRadius: "4px" }}
                  >
                    <option value="Pendiente de validación">Pendiente de validación</option>
                    <option value="Confirmada">Confirmada</option>
                    <option value="En Mesa">En Mesa</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" className="btn btn-gold" style={{ flex: 1, padding: "11px" }}>
                  {modoEdicion ? "Guardar Cambios" : "Crear Reserva"}
                </button>
                <button type="button" onClick={() => setModalAbierto(false)} className="btn btn-outline">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL BLOQUEO INCIDENTE */}
      {modalBloqueoAbierto && (
        <div className="modal-backdrop">
          <div className="bg-card modal-content" style={{ borderTop: "3px solid #e74c3c" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h3 style={{ color: "#e74c3c", margin: 0, fontSize: "1.2rem" }}>
                ⛔ Reportar Incidente y Cancelar Mesa
              </h3>
              <button onClick={() => setModalBloqueoAbierto(false)} style={{ background: "none", border: "none", color: "#888", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>

            <p style={{ color: "#aaa", fontSize: "0.82rem", marginBottom: "20px" }}>
              Al bloquear la <strong>{mesaParaBloquear}</strong> para el <strong>{fechaFiltro}</strong>, quedará fuera de servicio para todo el día y ningún cliente podrá seleccionarla.
            </p>

            <form onSubmit={ejecutarBloqueo}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#d4af37", marginBottom: "5px" }}>
                  Motivo del Incidente:
                </label>
                <select
                  value={motivoIncidente}
                  onChange={(e) => setMotivoIncidente(e.target.value)}
                  style={{ width: "100%", padding: "10px", background: "#0c0c0e", border: "1px solid #333", color: "#fff", borderRadius: "4px", marginBottom: "10px" }}
                >
                  <option value="Rotura de copa o vajilla / limpieza profunda">Rotura de copa o vajilla / limpieza profunda</option>
                  <option value="Derrame de bebidas o líquidos en tapicería">Derrame de bebidas o líquidos en tapicería</option>
                  <option value="Pata inestable / rotura de mesa o silla">Pata inestable / rotura de mesa o silla</option>
                  <option value="Mantenimiento, lijado o barnizado de madera">Mantenimiento, lijado o barnizado de madera</option>
                  <option value="Reserva exclusiva para evento privado">Reserva exclusiva para evento privado</option>
                </select>
              </div>

              <label className="checkbox-label" style={{ color: "#ff8b8b", fontSize: "0.8rem", marginBottom: "20px" }}>
                <input
                  type="checkbox"
                  checked={cancelarReservasExistentes}
                  onChange={(e) => setCancelarReservasExistentes(e.target.checked)}
                />
                <span>Cancelar automáticamente las reservas activas en esta mesa para hoy</span>
              </label>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" className="btn-accion-delete" style={{ flex: 1, padding: "12px", fontSize: "0.85rem" }}>
                  Confirmar Bloqueo de Mesa
                </button>
                <button type="button" onClick={() => setModalBloqueoAbierto(false)} className="btn btn-outline">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

