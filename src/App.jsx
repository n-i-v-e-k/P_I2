import React, { useState, useEffect } from 'react';

// ==========================================
// CONFIGURACIÓN DE LAS 9 MESAS
// ==========================================
const MESAS_RESTAURANTE = [
  { id: "Mesa 1", nombre: "Mesa 1", cap: "2p" },
  { id: "Mesa 2", nombre: "Mesa 2", cap: "2p" },
  { id: "Mesa 3", nombre: "Mesa 3", cap: "2p" },
  { id: "Mesa 4", nombre: "Mesa 4", cap: "4p" },
  { id: "Mesa 5", nombre: "Mesa 5", cap: "4p" },
  { id: "Mesa 6", nombre: "Mesa 6", cap: "4p" },
  { id: "Mesa 7", nombre: "Mesa 7", cap: "4p" },
  { id: "Mesa 8", nombre: "Mesa 8", cap: "6p" },
  { id: "Mesa 9", nombre: "Mesa 9", cap: "6p" }
];

const HORARIOS_DISPONIBLES = ["13:00", "14:00", "15:00", "19:00", "20:00", "21:00"];

const PLATOS_DEL_DIA = [
  {
    id: 1,
    nombre: "CEVICHE CLÁSICO IMPERIAL",
    descripcion: "Pesca del día marinada en limón de Piura, ají limo, cebolla roja, camote glaseado y choclo tierno.",
    imagen: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    nombre: "LOMO SALTADO AL WOK",
    descripcion: "Trozos de lomo fino flambeados al pisco con cebolla, tomate, ají amarillo y papas nativas.",
    imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    nombre: "CAUSA LIMEÑA DE PULPO",
    descripcion: "Masa suave de papa amarilla con ají amarillo, rellena de palta y coronada con pulpo al olivo.",
    imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  }
];

const ESPECIALIDADES = [
  {
    id: 101,
    categoria: "Especialidades",
    nombre: "ARROZ CON MARISCOS",
    descripcion: "Arroz cremoso al ají panca y coral de camarones con mariscos frescos de nuestro litoral.",
    precio: "S/ 55",
    imagen: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80",
    fullWidth: false
  },
  {
    id: 102,
    categoria: "Especialidades",
    nombre: "AJÍ DE GALLINA TRADICIONAL",
    descripcion: "Pechuga deshilachada en crema de ají amarillo, pecanas, queso parmesano y papas amarillas.",
    precio: "S/ 45",
    imagen: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80",
    fullWidth: false
  },
  {
    id: 103,
    categoria: "Especialidades",
    nombre: "SECO DE RES A LA NORTEÑA",
    descripcion: "Asado de tira cocido lentamente en chicha de jora y culantro, acompañado de frejoles y yuca.",
    precio: "S/ 58",
    imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80",
    fullWidth: true
  },
  {
    id: 104,
    categoria: "Carnes y Brasas",
    nombre: "ANTICUCHOS DE CORAZÓN",
    descripcion: "Brochetas marinadas en ají panca y especias andinas, servidas con papa dorada y choclo.",
    precio: "S/ 42",
    imagen: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=400&q=80",
    fullWidth: false
  },
  {
    id: 105,
    categoria: "Carnes y Brasas",
    nombre: "PACHAMANCA A LA OLLA",
    descripcion: "Tres carnes maceradas en chincho y huacatay con habas, camote y humita dulce.",
    precio: "S/ 65",
    imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
    fullWidth: false
  },
  {
    id: 106,
    categoria: "Cócteles",
    nombre: "PISCO SOUR CATEDRAL",
    descripcion: "Pisco quebranta seleccionado, jugo de limón fresco, jarabe de goma y amargo de angostura.",
    precio: "S/ 32",
    imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80",
    fullWidth: false
  },
  {
    id: 107,
    categoria: "Cócteles",
    nombre: "CHILCANO DE MARACUYÁ",
    descripcion: "Refrescante combinación de pisco acholado, macerado de maracuyá, ginger ale y hielo.",
    precio: "S/ 28",
    imagen: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
    fullWidth: false
  }
];

// ==========================================
// COMPONENTE 1: NAVBAR
// ==========================================
function Navbar({ vistaActual, setVistaActual, totalReservas, adminAutenticado }) {
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

// ==========================================
// COMPONENTE 2: TARJETA DE PLATO
// ==========================================
function PlatoCard({ plato, onReservarClick }) {
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

// ==========================================
// COMPONENTE 3: MODAL DE PAGO (CAPTURA 04)
// ==========================================
function ModalPagoGarantia({ datosPreReserva, onConfirmarPago, onCerrar }) {
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

// ==========================================
// COMPONENTE 4: FORMULARIO CLIENTE (CAPTURA 05)
// ==========================================
function SeccionReserva({ reservas, mesasBloqueadas, agregarReserva }) {
  const hoy = new Date().toISOString().split("T")[0];

  const [fecha, setFecha] = useState(hoy);
  const [hora, setHora] = useState("19:00");
  const [personas, setPersonas] = useState("4 personas");
  const [mesaSeleccionada, setMesaSeleccionada] = useState("Mesa 5");
  const [nombre, setNombre] = useState("María García");
  const [telefono, setTelefono] = useState("+51 999 888 777");
  const [email, setEmail] = useState("maria@correo.com");
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
      const primeraLibre = MESAS_RESTAURANTE.find((m) => !todasInhabilitadas.includes(m.id));
      setMesaSeleccionada(primeraLibre ? primeraLibre.id : "");
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
                  {MESAS_RESTAURANTE.map((m) => {
                    const estaBloqueadaPorIncidente = mesasBloqueadas.some((b) => b.fecha === fecha && b.mesa === m.id);
                    const estaOcupadaPorReserva = reservas.some((r) => r.fecha === fecha && r.hora === hora && r.mesa === m.id && r.estado !== "Cancelada");
                    const noDisponible = estaBloqueadaPorIncidente || estaOcupadaPorReserva;
                    const estaSeleccionada = mesaSeleccionada === m.id;

                    return (
                      <button
                        type="button"
                        key={m.id}
                        disabled={noDisponible}
                        onClick={() => setMesaSeleccionada(m.id)}
                        className={`mesa-chip ${noDisponible ? "ocupada" : ""} ${estaSeleccionada ? "seleccionada" : ""}`}
                      >
                        {m.nombre} · {m.cap} {estaBloqueadaPorIncidente ? "(Fuera de servicio)" : estaOcupadaPorReserva ? "(Ocupada)" : "✓"}
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

// ==========================================
// COMPONENTE 5: LOGIN ADMINISTRADOR
// ==========================================
function LoginAdminModal({ onLoginExitoso, onVolverMenu }) {
  const [usuario, setUsuario] = useState("admin@inkasabores.pe");
  const [password, setPassword] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();
    if ((usuario === "admin@inkasabores.pe" || usuario === "admin") && password === "inka123") {
      setErrorLogin("");
      onLoginExitoso();
    } else {
      setErrorLogin("Credenciales incorrectas. (Usa: admin@inkasabores.pe / inka123)");
    }
  };

  return (
    <div className="admin-login-fullscreen">
      <div className="admin-login-window">
        <div className="admin-login-left">
          <div className="admin-logo-circle">
            <div className="admin-logo-circle-inner">
              <span className="admin-sun-icon">☀️</span>
            </div>
          </div>
          <div className="admin-left-text">
            <h2>INKA SABORES</h2>
            <h3>Panel de administración</h3>
            <p>
              Solo el personal autorizado puede ingresar.<br />
              Los clientes navegan la web con acceso libre.
            </p>
          </div>
        </div>

        <div className="admin-login-right">
          <div className="admin-form-box">
            <h2 className="admin-title">ACCESO ADMINISTRADOR</h2>
            <p className="admin-sub">Ingresa tus credenciales para gestionar el salón de 9 mesas.</p>

            {errorLogin && (
              <div className="admin-error-badge">
                {errorLogin}
              </div>
            )}

            <form onSubmit={manejarSubmit}>
              <div className="admin-input-group">
                <label>Usuario o correo</label>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="admin@inkasabores.pe"
                  required
                />
              </div>

              <div className="admin-input-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="admin-options-row">
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={recordarme}
                    onChange={(e) => setRecordarme(e.target.checked)}
                  />
                  <span>Recordarme</span>
                </label>
                <a href="#olvide" onClick={(e) => { e.preventDefault(); alert("Clave por defecto: inka123"); }} className="admin-forgot-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button type="submit" className="btn-admin-submit">
                Ingresar al panel
              </button>
            </form>

            <div className="admin-footer-client">
              <span>¿Eres cliente? No necesitas cuenta.</span>
              <button onClick={onVolverMenu} className="btn-client-return">
                Ver el menú →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE 6: PANEL ADMINISTRADOR COMPLETO
// ==========================================
function PanelAdministrador({
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
  // 'operaciones' | 'dashboard' | 'matriz' | 'validar-pagos' | 'bloqueos'
  const [seccionActiva, setSeccionActiva] = useState("validar-pagos");
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
    alert(`✓ Pago validado con éxito. Se ha confirmado la ${reserva.mesa} para ${reserva.nombre} y se simuló el envío de confirmación a ${reserva.email}.`);
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
      {/* SIDEBAR ADMIN */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo-badge" style={{ width: "46px", height: "46px" }}>
            <span>Inka</span>
            <small>ADMIN</small>
          </div>
          <div>
            <h4 style={{ color: "#d4af37", fontSize: "0.95rem", margin: 0 }}>Inka Sabores</h4>
            <small style={{ color: "#888", fontSize: "0.7rem" }}>9 Mesas · Salón Central</small>
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

      {/* CONTENIDO PRINCIPAL */}
      <main className="admin-main-content">
        {/* VALIDACIÓN DE PAGOS (CAPTURA 09) */}
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

        {/* MODAL DE REVISIÓN DE COMPROBANTE */}
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

        {/* OPERACIONES */}
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

        {/* CONTROL DE MESAS (INCIDENTES) */}
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
              {MESAS_RESTAURANTE.map((m) => {
                const bloqueo = bloqueadasDelDia.find((b) => b.mesa === m.id);
                const reservasAfectadas = reservasDelDia.filter((r) => r.mesa === m.id && r.estado !== "Cancelada");

                return (
                  <div
                    key={m.id}
                    className={`mesa-box-card ${bloqueo ? "mesa-bloqueada-box" : "mesa-libre-box"}`}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <strong style={{ fontSize: "1.05rem" }}>{m.nombre} · {m.cap}</strong>
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
                          onClick={() => { setMesaParaBloquear(m.id); setModalBloqueoAbierto(true); }}
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

        {/* DASHBOARD & KPIS */}
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
                {MESAS_RESTAURANTE.map((m) => {
                  const bloqueo = bloqueadasDelDia.find(b => b.mesa === m.id);
                  const reservaActiva = reservasDelDia.find(r => r.mesa === m.id && r.estado !== "Cancelada");
                  return (
                    <div
                      key={m.id}
                      className={`mesa-box-card ${bloqueo ? "mesa-bloqueada-box" : reservaActiva ? "mesa-ocupada-box" : "mesa-libre-box"}`}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <strong>{m.nombre} · {m.cap}</strong>
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

        {/* MATRIZ DE SALÓN */}
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
                    {MESAS_RESTAURANTE.map((m) => {
                      const bloqueada = bloqueadasDelDia.some(b => b.mesa === m.id);
                      return (
                        <th key={m.id} style={{ background: bloqueada ? "#2e1a1a" : "#1f1f1f", color: bloqueada ? "#ff7675" : "#d4af37" }}>
                          {m.nombre} ({m.cap}) {bloqueada ? "⛔" : ""}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {HORARIOS_DISPONIBLES.map((hora) => (
                    <tr key={hora}>
                      <td className="hora-celda">{hora} hrs</td>
                      {MESAS_RESTAURANTE.map((m) => {
                        const bloqueo = bloqueadasDelDia.find(b => b.mesa === m.id);
                        const reservaEncontrada = reservasDelDia.find(
                          (r) => r.hora === hora && r.mesa === m.id && r.estado !== "Cancelada"
                        );

                        if (bloqueo) {
                          return (
                            <td key={m.id} className="celda-bloqueada" title={bloqueo.motivo}>
                              <strong style={{ color: "#ff7675" }}>⛔ Fuera de servicio</strong>
                              <small style={{ color: "#aaa", display: "block" }}>Incidente</small>
                            </td>
                          );
                        }

                        return (
                          <td
                            key={m.id}
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

      {/* MODAL EDICIÓN CRUD */}
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
                    {MESAS_RESTAURANTE.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.nombre} · {m.cap}
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

// ==========================================
// COMPONENTE 7: PÁGINA CONTACTO / RECLAMOS
// ==========================================
function PaginaContacto({ onVolverInicio }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("Consulta");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [ticketGenerado, setTicketGenerado] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    const ticket = "INKA-" + Math.floor(100000 + Math.random() * 900000);
    setTicketGenerado(ticket);
    setEnviado(true);

    const correoDestino = "contacto@inkasabores.pe";
    const subject = encodeURIComponent(`[${tipoMensaje.toUpperCase()}] Ticket #${ticket}: ${asunto}`);
    const body = encodeURIComponent(
      `Estimado equipo de Inka Sabores,\n\n` +
      `Se ha registrado la siguiente solicitud desde el portal web:\n\n` +
      `Tipo: ${tipoMensaje}\n` +
      `Cliente: ${nombre}\n` +
      `Correo: ${correo}\n` +
      `Teléfono: ${telefono}\n` +
      `Ticket: ${ticket}\n\n` +
      `Detalle del mensaje:\n${mensaje}\n\n` +
      `Saludos cordiales.`
    );
    window.open(`mailto:${correoDestino}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section className="section section-dark" style={{ minHeight: "85vh", paddingTop: "120px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "20px" }}>
          <button onClick={onVolverInicio} className="btn btn-outline" style={{ cursor: "pointer" }}>
            ← Volver al inicio
          </button>
        </div>

        <div className="section-title">
          <span className="subtitle-cursive">Atención al Cliente</span>
          <h2>Consultas, Quejas y Sugerencias</h2>
          <p>Tu opinión nos ayuda a mantener la máxima excelencia en nuestra gastronomía y servicio.</p>
        </div>

        <div className="bg-card" style={{ padding: "35px", borderTop: "3px solid #d4af37" }}>
          {enviado ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "15px" }}>✉️</div>
              <h3 style={{ color: "#d4af37", marginBottom: "10px" }}>¡Mensaje Enviado con Éxito!</h3>
              <p style={{ color: "#ccc", marginBottom: "15px" }}>
                Gracias por comunicarte con nosotros, <strong>{nombre}</strong>. Hemos generado tu código de seguimiento:
              </p>
              <div style={{ display: "inline-block", background: "rgba(212,175,55,0.15)", border: "1px solid #d4af37", padding: "8px 20px", borderRadius: "4px", fontSize: "1.2rem", fontWeight: "bold", color: "#d4af37", marginBottom: "20px" }}>
                {ticketGenerado}
              </div>
              <p style={{ color: "#999", fontSize: "0.85rem", marginBottom: "25px" }}>
                Se ha preparado tu correo hacia <strong>contacto@inkasabores.pe</strong>. Te responderemos a la brevedad.
              </p>
              <button onClick={onVolverInicio} className="btn btn-gold">
                Volver a la carta principal
              </button>
            </div>
          ) : (
            <form onSubmit={manejarEnvio} className="contacto-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Nombre y Apellidos</label>
                  <input
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Teléfono de Contacto</label>
                  <input
                    type="tel"
                    placeholder="+51 987 654 321"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Mensaje</label>
                  <select
                    value={tipoMensaje}
                    onChange={(e) => setTipoMensaje(e.target.value)}
                    style={{ background: "#0a0a0a", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "10px", borderRadius: "4px" }}
                  >
                    <option value="Consulta">Consulta general / Información</option>
                    <option value="Queja / Reclamo">Queja o Reclamo de atención</option>
                    <option value="Sugerencia">Sugerencia de servicio / carta</option>
                    <option value="Eventos corporativos">Cotización de eventos</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "18px" }}>
                <label>Asunto</label>
                <input
                  type="text"
                  placeholder="Ej. Consulta sobre reservas para grupos grandes"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "22px" }}>
                <label>Detalle de tu mensaje o queja</label>
                <textarea
                  rows="5"
                  placeholder="Por favor describe detalladamente tu consulta..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                  style={{ width: "100%", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "4px", color: "#fff", padding: "12px", fontFamily: "inherit", fontSize: "0.9rem", outline: "none" }}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-gold" style={{ width: "100%", padding: "14px", fontSize: "0.9rem" }}>
                Enviar correo de contacto / queja →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL APP
// ==========================================
export default function App() {
  const hoy = new Date().toISOString().split("T")[0];

  const [vistaActual, setVistaActual] = useState("cliente");
  const [adminAutenticado, setAdminAutenticado] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("Especialidades");

  const [reservas, setReservas] = useState([
    {
      id: 1,
      fecha: hoy,
      hora: "13:00",
      personas: "4 personas",
      mesa: "Mesa 2",
      nombre: "Carlos Mendoza",
      telefono: "+51 987 654 321",
      email: "cmendoza@email.com",
      notas: "Cerca a la ventana",
      estado: "Confirmada",
      medioPago: "Yape",
      nroOperacion: "08472194",
      montoGarantia: 100
    },
    {
      id: 2,
      fecha: hoy,
      hora: "20:00",
      personas: "2 personas",
      mesa: "Mesa 7",
      nombre: "Lucía Paredes",
      telefono: "+51 912 345 678",
      email: "lucia.p@email.com",
      notas: "Aniversario",
      estado: "En Mesa",
      medioPago: "Transferencia BCP",
      nroOperacion: "09918231",
      montoGarantia: 100
    }
  ]);

  const [mesasBloqueadas, setMesasBloqueadas] = useState([
    {
      id: 101,
      fecha: hoy,
      mesa: "Mesa 9",
      motivo: "Rotura de copa de cristal y limpieza profunda"
    }
  ]);

  const agregarReserva = (nueva) => {
    setReservas([...reservas, nueva]);
  };

  const actualizarReserva = (reservaActualizada) => {
    setReservas(reservas.map(r => r.id === reservaActualizada.id ? reservaActualizada : r));
  };

  const eliminarReserva = (id) => {
    setReservas(reservas.filter((r) => r.id !== id));
  };

  const bloquearMesa = (fecha, mesa, motivo, cancelarReservas = true) => {
    const nuevoBloqueo = { id: Date.now(), fecha, mesa, motivo };
    setMesasBloqueadas([...mesasBloqueadas, nuevoBloqueo]);

    if (cancelarReservas) {
      setReservas(reservas.map(r => {
        if (r.fecha === fecha && r.mesa === mesa) {
          return { ...r, estado: "Cancelada", notas: `${r.notas ? r.notas + " | " : ""}Cancelada por incidente: ${motivo}` };
        }
        return r;
      }));
    }
  };

  const rehabilitarMesa = (bloqueoId) => {
    setMesasBloqueadas(mesasBloqueadas.filter(b => b.id !== bloqueoId));
  };

  const platosFiltrados = ESPECIALIDADES.filter(
    (item) => item.categoria === categoriaActiva
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@400;600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --bg-dark: #0a0a0a;
          --bg-card: #141414;
          --bg-card-alt: #1a1a1a;
          --primary-gold: #d4af37;
          --gold-light: #f3e5ab;
          --text-white: #ffffff;
          --text-gray: #a0a0a0;
          --text-light-gray: #cccccc;
          --font-heading: 'Cinzel', serif;
          --font-cursive: 'Great Vibes', cursive;
          --font-body: 'Montserrat', sans-serif;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background-color: var(--bg-dark); color: var(--text-white); font-family: var(--font-body); line-height: 1.6; }
        .container { width: 90%; max-width: 1200px; margin: 0 auto; }
        a { text-decoration: none; color: inherit; transition: all 0.3s ease; }
        h1, h2, h3, h4 { font-family: var(--font-heading); letter-spacing: 1px; }
        
        .subtitle-cursive { font-family: var(--font-cursive); color: var(--primary-gold); font-size: 1.8rem; display: block; margin-bottom: 5px; }

        /* Navbar Público */
        .navbar { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; background: rgba(10, 10, 10, 0.95); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(212, 175, 55, 0.15); padding: 15px 0; }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .logo-badge { border: 1px solid var(--primary-gold); border-radius: 50%; width: 58px; height: 58px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: var(--primary-gold); background: rgba(20,20,20,0.85); }
        .logo-badge span { font-family: var(--font-cursive); font-size: 1.15rem; line-height: 1; }
        .logo-badge small { font-size: 0.48rem; letter-spacing: 1px; font-weight: 600; }
        .nav-links { display: flex; gap: 20px; align-items: center; }
        .nav-links a { font-size: 0.8rem; letter-spacing: 1px; color: var(--text-light-gray); }
        .nav-links a:hover { color: var(--primary-gold); }
        .nav-link-btn { background: none; border: none; font-size: 0.8rem; letter-spacing: 1px; cursor: pointer; font-family: inherit; }
        .nav-link-btn:hover { color: var(--primary-gold) !important; }

        /* Botones */
        .btn { display: inline-block; padding: 10px 20px; font-size: 0.78rem; font-weight: 600; letter-spacing: 1px; border-radius: 3px; cursor: pointer; transition: all 0.3s ease; border: none; }
        .btn-gold { background-color: var(--primary-gold); color: #000; }
        .btn-gold:hover { background-color: #b59328; }
        .btn-outline { display: inline-block; border: 1px solid var(--primary-gold); color: var(--primary-gold); padding: 8px 16px; font-size: 0.75rem; letter-spacing: 1px; border-radius: 3px; }
        .btn-outline:hover { background-color: var(--primary-gold); color: #000; }

        /* Hero */
        .hero { position: relative; height: 90vh; min-height: 580px; background: url('https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat; display: flex; align-items: center; justify-content: center; text-align: center; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.75); }
        .hero-content { position: relative; z-index: 1; max-width: 800px; }
        .hero-content h1 { font-size: 2.4rem; line-height: 1.3; margin: 15px 0; color: var(--primary-gold); font-weight: 600; }
        .hero-content p { font-size: 0.95rem; color: var(--text-light-gray); max-width: 540px; margin: 0 auto 25px; }

        /* Sections & Grids */
        .section { padding: 80px 0; }
        .section-title { text-align: center; margin-bottom: 45px; }
        .section-title h2 { font-size: 2rem; color: var(--primary-gold); margin-bottom: 10px; }
        .section-title p { color: var(--text-gray); font-size: 0.9rem; }
        .grid { display: grid; gap: 25px; }
        .grid-3 { grid-template-columns: repeat(3, 1fr); }
        .grid-2 { grid-template-columns: repeat(2, 1fr); }
        .bg-card { background-color: var(--bg-card); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.06); }
        .card { text-align: center; }
        .card-img { height: 220px; overflow: hidden; }
        .card-img.square { height: 240px; }
        .card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .card:hover .card-img img { transform: scale(1.05); }
        .card-body { padding: 25px 20px; }
        .card-body h3 { font-size: 1.05rem; color: var(--primary-gold); margin-bottom: 12px; }
        .card-body p { font-size: 0.85rem; color: var(--text-gray); margin-bottom: 15px; min-height: 50px; }
        .rating { color: var(--primary-gold); margin-bottom: 15px; }

        /* Categorías */
        .banner-ambience { height: 350px; background: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80') center/cover fixed no-repeat; }
        .categories { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 35px; }
        .cat-btn { background: transparent; border: 1px solid rgba(255, 255, 255, 0.2); color: var(--text-light-gray); padding: 8px 18px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; transition: all 0.3s ease; }
        .cat-btn.active, .cat-btn:hover { background-color: var(--primary-gold); color: #000; border-color: var(--primary-gold); font-weight: 600; }
        .horizontal-card { background-color: var(--bg-card); display: flex; border-radius: 8px; overflow: hidden; align-items: center; border: 1px solid rgba(255,255,255,0.05); }
        .horizontal-card.full-width { grid-column: 1 / -1; }
        .horizontal-card img { width: 150px; height: 150px; object-fit: cover; }
        .horizontal-card-info { padding: 20px; flex: 1; }
        .horizontal-card-info h3 { font-size: 1.05rem; color: var(--primary-gold); margin-bottom: 8px; }
        .horizontal-card-info p { font-size: 0.82rem; color: var(--text-gray); margin-bottom: 10px; }
        .price { font-size: 1.15rem; font-weight: 600; color: var(--primary-gold); }
        .feature-list { list-style: none; text-align: center; }
        .feature-list li { font-size: 0.85rem; color: var(--text-light-gray); margin-bottom: 6px; }

        /* About */
        .grid-2-about { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .about-text p { color: var(--text-gray); font-size: 0.9rem; margin-bottom: 18px; }
        .about-gallery { display: flex; flex-direction: column; gap: 20px; }
        .chef-card { position: relative; border-radius: 8px; overflow: hidden; }
        .chef-card img { width: 100%; height: 180px; object-fit: cover; }
        .chef-card span { position: absolute; bottom: 12px; left: 15px; font-family: var(--font-heading); font-size: 0.82rem; background: rgba(0, 0, 0, 0.75); color: var(--primary-gold); padding: 4px 10px; border-radius: 3px; }

        /* MODAL DE PAGO (CAPTURA 04) */
        .pago-modal-backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 3000; padding: 20px; }
        .pago-modal-window { background: #ffffff; color: #222222; width: 100%; max-width: 580px; border-radius: 10px; padding: 30px 35px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6); max-height: 94vh; overflow-y: auto; }
        .pago-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .pago-modal-header h3 { font-family: var(--font-body); font-size: 1.25rem; font-weight: 700; color: #111; margin: 0; }
        .btn-cerrar-modal { background: none; border: none; font-size: 1.2rem; color: #666; cursor: pointer; }
        .pago-box-garantia { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .pago-label-garantia { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px; color: #495057; }
        .pago-monto-garantia { font-size: 1.55rem; font-weight: 800; color: #111; }
        .pago-desc-texto { font-size: 0.8rem; color: #495057; line-height: 1.45; margin-bottom: 14px; }
        .pago-resumen-pill { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 11px 15px; font-size: 0.78rem; color: #334155; margin-bottom: 15px; }
        .pago-grid-cuentas { display: grid; grid-template-columns: 1fr 1.3fr 1.1fr; gap: 10px; margin-bottom: 6px; }
        .pago-cuenta-item { border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; background: #ffffff; }
        .cuenta-label { display: block; font-size: 0.65rem; color: #64748b; font-weight: 700; margin-bottom: 4px; }
        .cuenta-valor { display: block; font-size: 0.82rem; color: #0f172a; font-weight: 700; }
        .cuenta-sub { display: block; font-size: 0.62rem; color: #64748b; margin-top: 2px; }
        .pago-nota-ejemplo { display: block; font-size: 0.7rem; color: #94a3b8; margin-bottom: 16px; }
        .pago-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .pago-input-col label { display: block; font-size: 0.75rem; color: #334155; margin-bottom: 5px; font-weight: 600; }
        .pago-input-col select, .pago-input-col input { width: 100%; border: 1px solid #cbd5e1; border-radius: 6px; padding: 9px 12px; font-size: 0.85rem; color: #0f172a; outline: none; background: #fff; }
        .pago-upload-container { margin-bottom: 16px; }
        .pago-upload-box { display: block; border: 1px solid #cbd5e1; border-radius: 6px; padding: 25px 20px; text-align: center; cursor: pointer; background: #f8fafc; transition: background 0.2s; }
        .pago-upload-box:hover { background: #f1f5f9; }
        .pago-voucher-preview { max-height: 120px; margin: 0 auto; display: block; border-radius: 4px; }
        .pago-upload-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .pago-icon-cross { width: 50px; height: 60px; border: 1px solid #cbd5e1; position: relative; margin-bottom: 8px; }
        .pago-icon-cross::before, .pago-icon-cross::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-top: 1px solid #e2e8f0; transform: rotate(45deg); }
        .pago-icon-cross::after { transform: rotate(-45deg); }
        .pago-upload-placeholder span { background: #e2e8f0; color: #475569; font-size: 0.72rem; padding: 3px 10px; border-radius: 3px; }
        .pago-checkbox-row { display: flex; align-items: flex-start; gap: 10px; font-size: 0.75rem; color: #334155; margin-bottom: 20px; cursor: pointer; }
        .pago-checkbox-row input { margin-top: 2px; }
        .pago-botones-footer { display: flex; gap: 10px; }
        .btn-pago-confirmar { flex: 1; background: #2b2b2f; color: #ffffff; border: none; border-radius: 6px; padding: 12px; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
        .btn-pago-confirmar:hover { background: #18181b; }
        .btn-pago-cancelar { background: #ffffff; border: 1px solid #cbd5e1; color: #334155; border-radius: 6px; padding: 12px 22px; font-size: 0.85rem; cursor: pointer; }

        /* BANNER RESERVA PENDIENTE (CAPTURA 05) */
        .alerta-pendiente-box { background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px 18px; font-size: 0.82rem; color: #1e293b; line-height: 1.5; margin-bottom: 22px; }

        /* Formulario Reserva */
        .reserva-split-card { display: grid; grid-template-columns: 5fr 7fr; border-radius: 10px; overflow: hidden; border: 1px solid rgba(212, 175, 55, 0.25); background-color: #f4efe6; color: #2b2623; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
        .reserva-img-col { background: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80') center/cover no-repeat; position: relative; min-height: 560px; }
        .reserva-img-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(10,10,10,0.35), rgba(10,10,10,0.85)); padding: 35px; display: flex; flex-direction: column; justify-content: space-between; color: #fff; }
        .reserva-tag { font-size: 0.7rem; letter-spacing: 2px; color: var(--gold-light); display: block; margin-bottom: 8px; }
        .reserva-hero-title { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 400; line-height: 1.05; margin-bottom: 10px; color: #fff; }
        .reserva-hero-sub { font-size: 0.85rem; color: #e0dcd5; max-width: 320px; }
        .reserva-form-col { padding: 45px 50px; background-color: #f5f0e6; color: #2c2520; }
        .form-small-title { font-size: 0.7rem; letter-spacing: 2px; color: #7a6a58; display: block; margin-bottom: 4px; }
        .form-main-title { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; font-weight: 600; color: #1f1a17; margin-bottom: 6px; }
        .form-subtitle { font-size: 0.85rem; color: #6e6259; margin-bottom: 25px; }
        .inka-form label { display: block; font-size: 0.72rem; font-weight: 600; color: #4a3f35; margin-bottom: 6px; }
        .inka-form input, .inka-form select { width: 100%; padding: 10px 4px; background: transparent; border: none; border-bottom: 1px solid #cfc6b8; color: #1f1a17; font-family: var(--font-body); font-size: 0.88rem; outline: none; }
        .form-row-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px; }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 18px; }
        .checkbox-label { display: flex !important; align-items: center; gap: 8px; margin: 18px 0; cursor: pointer; }
        .btn-submit-reserva { width: 100%; background-color: #2b2b2f; color: #fff; display: flex; justify-content: space-between; align-items: center; padding: 13px 20px; border-radius: 4px; margin-bottom: 14px; }
        .btn-submit-reserva:hover { background-color: #18181b; }
        .form-footer-notes { display: flex; justify-content: space-between; font-size: 0.72rem; color: #7a6a58; }

        /* Grilla pública 9 mesas */
        .mesas-grid-selector { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 6px; }
        .mesa-chip { padding: 9px 10px; font-size: 0.75rem; border-radius: 4px; border: 1px solid #c8b9a6; background: #ebe4d8; color: #3b322c; cursor: pointer; font-weight: 600; text-align: center; }
        .mesa-chip.seleccionada { background: #2b2b2f; color: #fff; border-color: #2b2b2f; }
        .mesa-chip.ocupada { background: #e0d9cf; color: #9e9389; border-color: #d5cdc2; cursor: not-allowed; text-decoration: line-through; }

        /* LOGIN ADMIN */
        .admin-login-fullscreen { min-height: 100vh; background: #09090b; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
        .admin-login-window { display: grid; grid-template-columns: 1fr 1fr; width: 100%; max-width: 950px; min-height: 520px; background: #111113; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.85); }
        .admin-login-left { background: radial-gradient(circle at center, #1b1712 0%, #0d0c0b 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; border-right: 1px solid rgba(255, 255, 255, 0.06); }
        .admin-logo-circle { width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(20,20,20,0.8) 70%); border: 2px solid rgba(212, 175, 55, 0.4); display: flex; align-items: center; justify-content: center; margin-bottom: 35px; }
        .admin-logo-circle-inner { width: 120px; height: 120px; border-radius: 50%; border: 1px dashed rgba(212, 175, 55, 0.6); display: flex; align-items: center; justify-content: center; }
        .admin-sun-icon { font-size: 2.5rem; filter: drop-shadow(0 0 10px #d4af37); }
        .admin-left-text h2 { color: #d4af37; font-size: 1.4rem; letter-spacing: 2px; margin-bottom: 6px; }
        .admin-left-text h3 { color: #ffffff; font-size: 1rem; font-weight: 400; margin-bottom: 15px; font-family: var(--font-body); }
        .admin-left-text p { color: #888888; font-size: 0.8rem; line-height: 1.5; }
        .admin-login-right { background: #111113; display: flex; align-items: center; justify-content: center; padding: 45px 50px; }
        .admin-form-box { width: 100%; max-width: 360px; }
        .admin-title { color: #d4af37; font-family: 'Cinzel', serif; font-size: 1.35rem; font-weight: 700; letter-spacing: 1.5px; margin-bottom: 6px; }
        .admin-sub { color: #7f7f85; font-size: 0.82rem; margin-bottom: 25px; }
        .admin-input-group { margin-bottom: 16px; }
        .admin-input-group label { display: block; font-size: 0.78rem; color: #d1d1d6; margin-bottom: 6px; }
        .admin-input-group input { width: 100%; background: #1c1c1f; border: 1px solid #2a2a2e; border-radius: 6px; padding: 11px 14px; color: #fff; font-family: inherit; font-size: 0.88rem; outline: none; }
        .admin-input-group input:focus { border-color: #d4af37; }
        .admin-options-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; margin: 15px 0 20px; }
        .admin-checkbox { display: flex; align-items: center; gap: 7px; color: #a1a1aa; cursor: pointer; }
        .admin-forgot-link { color: #d4af37; }
        .btn-admin-submit { width: 100%; background: #d4af37; color: #111; font-weight: 600; font-size: 0.88rem; padding: 12px; border: none; border-radius: 6px; cursor: pointer; }
        .admin-footer-client { margin-top: 30px; text-align: center; }
        .admin-footer-client span { display: block; font-size: 0.78rem; color: #71717a; margin-bottom: 10px; }
        .btn-client-return { background: transparent; border: 1px solid rgba(212, 175, 55, 0.4); color: #d4af37; padding: 8px 22px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; }
        .admin-error-badge { background: rgba(231,76,60,0.15); border: 1px solid #e74c3c; color: #ff7675; padding: 8px 12px; border-radius: 4px; font-size: 0.78rem; margin-bottom: 16px; }

        /* ==========================================
           RESTAURADO: SIDEBAR Y PANEL ADMIN EN MODO OSCURO
           ========================================== */
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #0c0c0e;
          color: #e0e0e0;
        }
        .admin-sidebar {
          width: 260px;
          background: #121215;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          flex-shrink: 0;
          padding: 22px 16px;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          background: #16161a;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .sidebar-btn {
          display: flex;
          align-items: center;
          background: transparent;
          border: none;
          color: #a1a1aa;
          padding: 11px 14px;
          border-radius: 6px;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sidebar-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }
        .sidebar-btn.activo {
          background: rgba(212, 175, 55, 0.15);
          color: #d4af37;
          font-weight: 600;
          border-left: 3px solid #d4af37;
        }
        .btn-sidebar-validar {
          border: 1px solid rgba(212, 175, 55, 0.35) !important;
          border-radius: 6px !important;
          color: #d4af37 !important;
          font-weight: 600 !important;
        }
        .btn-sidebar-validar.activo {
          background: rgba(212, 175, 55, 0.2) !important;
          border-color: #d4af37 !important;
        }
        .sidebar-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sidebar-link-btn {
          background: transparent;
          border: 1px solid #333338;
          color: #cccccc;
          padding: 9px;
          border-radius: 6px;
          font-size: 0.82rem;
          cursor: pointer;
          text-align: center;
        }
        .sidebar-link-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }
        .sidebar-logout-btn {
          background: rgba(231, 76, 60, 0.12);
          border: 1px solid rgba(231, 76, 60, 0.4);
          color: #e74c3c;
          padding: 9px;
          border-radius: 6px;
          font-size: 0.82rem;
          cursor: pointer;
          text-align: center;
          font-weight: 700;
        }
        .sidebar-logout-btn:hover {
          background: #e74c3c;
          color: #ffffff;
        }

        .admin-main-content {
          flex: 1;
          padding: 40px 50px;
          overflow-y: auto;
          background: #0c0c0e;
        }
        .admin-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          flex-wrap: wrap;
          gap: 15px;
        }

        /* ==========================================
           VALIDAR PAGOS (MODO OSCURO COHERENTE)
           ========================================== */
        .seccion-validar-pagos-view {
          width: 100%;
          max-width: 1100px;
        }
        .validar-pagos-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
        }
        .subtitle-garantia-italica {
          font-family: 'Great Vibes', cursive;
          font-size: 1.6rem;
          color: #d4af37;
          display: block;
          margin-bottom: 2px;
        }
        .title-validacion-pagos {
          font-family: 'Cinzel', serif;
          font-size: 1.85rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 6px;
          letter-spacing: 1px;
        }
        .desc-validacion-pagos {
          font-size: 0.85rem;
          color: #a0a0a0;
          margin: 0;
        }

        .filtro-mostrar-dropdown {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .filtro-mostrar-dropdown label {
          font-size: 0.72rem;
          color: #d4af37;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .filtro-mostrar-dropdown select {
          border: 1px solid #333;
          border-radius: 6px;
          padding: 8px 14px;
          font-size: 0.85rem;
          color: #ffffff;
          background: #141416;
          outline: none;
        }

        .tabla-validar-container {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          overflow: hidden;
          background: #141416;
        }
        .tabla-validar-pagos {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.85rem;
        }
        .tabla-validar-pagos th {
          background: #1a1a1f;
          color: #d4af37;
          padding: 14px 18px;
          border-bottom: 1px solid #2a2a2e;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.5px;
          font-family: var(--font-heading);
        }
        .tabla-validar-pagos td {
          padding: 16px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #e0e0e0;
          vertical-align: middle;
        }
        .nombre-cliente-td {
          display: block;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .correo-cliente-td {
          display: block;
          font-size: 0.78rem;
          color: #888888;
        }
        .pill-mesa-gris {
          background: #1c1c20;
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 6px;
          padding: 6px 16px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #d4af37;
          display: inline-block;
        }
        .pill-estado-validacion {
          background: rgba(241, 196, 15, 0.15);
          border: 1px solid rgba(241, 196, 15, 0.35);
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #f1c40f;
          display: inline-block;
        }
        .btn-revisar-comprobante {
          background: #232328;
          border: 1px solid #44444a;
          border-radius: 6px;
          padding: 8px 14px;
          font-size: 0.78rem;
          font-weight: 500;
          color: #ffffff;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-revisar-comprobante:hover {
          background: #d4af37;
          color: #000000;
          border-color: #d4af37;
        }

        /* Tabla CRUD */
        .tabla-crud { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.83rem; }
        .tabla-crud th { background: #17171b; color: #d4af37; padding: 14px 16px; border-bottom: 1px solid #2a2a2e; font-family: var(--font-heading); font-size: 0.75rem; letter-spacing: 1px; }
        .tabla-crud td { padding: 14px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #e0e0e0; vertical-align: middle; }
        .tabla-crud tr:hover td { background: rgba(255, 255, 255, 0.02); }
        .badge-mesa { background: rgba(212, 175, 55, 0.15); color: #d4af37; border: 1px solid rgba(212, 175, 55, 0.3); padding: 4px 10px; border-radius: 4px; font-weight: 600; font-size: 0.75rem; }
        .badge-estado { padding: 4px 9px; border-radius: 4px; font-size: 0.72rem; font-weight: 600; text-transform: uppercase; }
        .badge-estado.confirmada { background: rgba(46, 204, 113, 0.15); color: #2ecc71; border: 1px solid rgba(46, 204, 113, 0.3); }
        .badge-estado.pendiente-de-validación { background: rgba(241, 196, 15, 0.15); color: #f1c40f; border: 1px solid rgba(241, 196, 15, 0.3); }
        .badge-estado.en-mesa { background: rgba(52, 152, 219, 0.15); color: #3498db; border: 1px solid rgba(52, 152, 219, 0.3); }
        .badge-estado.cancelada { background: rgba(231, 76, 60, 0.15); color: #e74c3c; border: 1px solid rgba(231, 76, 60, 0.3); }
        .btn-accion-edit { background: #2a2a30; border: 1px solid #444; color: #fff; padding: 6px 10px; border-radius: 4px; font-size: 0.72rem; cursor: pointer; }
        .btn-accion-edit:hover { background: #d4af37; color: #000; border-color: #d4af37; }
        .btn-accion-delete { background: rgba(231,76,60,0.15); border: 1px solid rgba(231,76,60,0.4); color: #e74c3c; padding: 6px 10px; border-radius: 4px; font-size: 0.72rem; cursor: pointer; }
        .btn-accion-delete:hover { background: #e74c3c; color: #fff; }

        /* KPI Cards */
        .kpi-card { background: #141416; border-radius: 8px; padding: 22px 20px; display: flex; align-items: flex-start; gap: 16px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .kpi-icon { font-size: 1.8rem; background: rgba(255, 255, 255, 0.04); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 8px; flex-shrink: 0; }
        .kpi-content { flex: 1; }
        .kpi-label { font-size: 0.72rem; color: #8c8c94; letter-spacing: 1px; font-weight: 600; display: block; margin-bottom: 4px; }
        .kpi-value { font-size: 1.7rem; color: #ffffff; font-weight: 700; font-family: var(--font-heading); margin-bottom: 6px; }
        .kpi-bar-bg { width: 100%; height: 5px; background: rgba(255, 255, 255, 0.1); border-radius: 3px; overflow: hidden; margin-top: 8px; }
        .kpi-bar-fill { height: 100%; background: #d4af37; border-radius: 3px; }
        .kpi-subtext { font-size: 0.75rem; color: #a1a1aa; }

        .grid-mesas-dashboard { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .mesa-box-card { padding: 18px; border-radius: 6px; border: 1px solid #2a2a2e; background: #18181c; }
        .mesa-libre-box { border-left: 4px solid #2ecc71; }
        .mesa-ocupada-box { border-left: 4px solid #e67e22; background: #1c1815; }
        .mesa-bloqueada-box { border-left: 4px solid #e74c3c; background: #231616; }

        /* Calendario */
        .calendario-wrapper { overflow-x: auto; padding: 20px; }
        .calendario-tabla { width: 100%; border-collapse: collapse; min-width: 850px; }
        .calendario-tabla th, .calendario-tabla td { border: 1px solid rgba(255,255,255,0.08); padding: 12px; text-align: center; font-size: 0.82rem; }
        .calendario-tabla th { background: #1f1f1f; color: var(--primary-gold); font-family: var(--font-heading); font-size: 0.75rem; }
        .hora-celda { font-weight: 600; color: var(--gold-light); background: #181818; }
        .celda-libre { color: #2ecc71; background: rgba(46, 204, 113, 0.05); }
        .celda-ocupada { background: rgba(212, 175, 55, 0.18); color: #fff; border: 1px solid var(--primary-gold); }
        .celda-bloqueada { background: rgba(231, 76, 60, 0.15); border: 1px solid rgba(231, 76, 60, 0.4); }

        /* Modal CRUD */
        .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
        .modal-content { max-width: 580px; width: 100%; padding: 30px; border-top: 3px solid #d4af37; box-shadow: 0 20px 50px rgba(0,0,0,0.9); }

        /* Formulario Contacto */
        .contacto-form label { display: block; font-size: 0.78rem; color: #d4af37; margin-bottom: 6px; font-weight: 600; }
        .contacto-form input { width: 100%; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 11px 13px; color: #fff; font-family: inherit; font-size: 0.88rem; outline: none; }

        /* Footer */
        .footer { background-color: #050505; padding: 40px 0 25px; border-top: 1px solid rgba(255, 255, 255, 0.05); }
        .footer-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
        .footer-info { display: flex; gap: 40px; }
        .info-item { display: flex; align-items: center; gap: 12px; font-size: 0.8rem; color: var(--text-gray); }
        .social-links { display: flex; gap: 15px; }
        .social-links a { font-size: 0.75rem; color: var(--text-gray); letter-spacing: 1px; }
        .social-links a:hover { color: var(--primary-gold); }
        .menu-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
        .menu-toggle span { width: 25px; height: 2px; background-color: var(--primary-gold); }

        @media (max-width: 992px) {
          .admin-sidebar { width: 75px; padding: 15px 6px; }
          .sidebar-header div, .sidebar-btn span, .sidebar-footer { display: none; }
          .sidebar-btn { justify-content: center; padding: 12px; }
          .admin-main-content { padding: 25px 20px; }
          .grid-3 { grid-template-columns: repeat(2, 1fr); }
          .reserva-split-card { grid-template-columns: 1fr; }
          .admin-login-window { grid-template-columns: 1fr; }
          .admin-login-left { display: none; }
        }
        @media (max-width: 768px) {
          .admin-layout { flex-direction: column; }
          .admin-sidebar { width: 100%; height: auto; position: relative; flex-direction: row; justify-content: space-between; }
          .menu-toggle { display: flex; }
          .nav-links { position: fixed; top: 80px; left: -100%; width: 100%; height: calc(100vh - 80px); background-color: rgba(10, 10, 10, 0.98); flex-direction: column; align-items: center; justify-content: center; gap: 25px; transition: left 0.4s ease; }
          .nav-links.active { left: 0; }
          .grid-3, .grid-2, .grid-2-about, .form-row-3, .form-row-2, .mesas-grid-selector, .grid-mesas-dashboard, .pago-grid-cuentas, .pago-form-row { grid-template-columns: 1fr; }
          .reserva-form-col { padding: 30px 20px; }
        }
      `}</style>

      {/* Navbar público */}
      {!(vistaActual === "admin" && adminAutenticado) && !(vistaActual === "admin" && !adminAutenticado) && (
        <Navbar
          vistaActual={vistaActual}
          setVistaActual={setVistaActual}
          totalReservas={reservas.length}
          adminAutenticado={adminAutenticado}
        />
      )}

      {/* VISTAS */}
      {vistaActual === "contacto" ? (
        <PaginaContacto onVolverInicio={() => setVistaActual("cliente")} />
      ) : vistaActual === "admin" ? (
        !adminAutenticado ? (
          <LoginAdminModal
            onLoginExitoso={() => setAdminAutenticado(true)}
            onVolverMenu={() => setVistaActual("cliente")}
          />
        ) : (
          <PanelAdministrador
            reservas={reservas}
            mesasBloqueadas={mesasBloqueadas}
            bloquearMesa={bloquearMesa}
            rehabilitarMesa={rehabilitarMesa}
            agregarReserva={agregarReserva}
            actualizarReserva={actualizarReserva}
            eliminarReserva={eliminarReserva}
            cerrarSesion={() => {
              setAdminAutenticado(false);
              setVistaActual("cliente");
            }}
            volverWeb={() => setVistaActual("cliente")}
          />
        )
      ) : (
        /* VISTA CLIENTE */
        <>
          <section className="hero" id="inicio">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
              <span className="subtitle-cursive">Cocina Peruana Auténtica</span>
              <h1>SABOREA EL AUTÉNTICO LEGADO GASTRONÓMICO DEL PERÚ</h1>
              <p>
                Seleccionamos ingredientes frescos de la costa, sierra y selva para ofrecerte una experiencia inolvidable en cada plato.
              </p>
              <a href="#reserva" className="btn btn-gold">RESERVAR UNA MESA</a>
            </div>
          </section>

          <section className="section section-dark" id="menu">
            <div className="container">
              <div className="section-title">
                <span className="subtitle-cursive">Menú Especial</span>
                <h2>Clásicos del Día</h2>
                <p>Nuestra selección estelar preparada al momento por nuestros maestros cocineros.</p>
              </div>

              <div className="grid grid-3">
                {PLATOS_DEL_DIA.map((plato) => (
                  <PlatoCard
                    key={plato.id}
                    plato={plato}
                    onReservarClick={() => {
                      const el = document.getElementById("reserva");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="banner-ambience"></section>

          <section className="section section-dark" id="especialidades">
            <div className="container">
              <div className="section-title">
                <span className="subtitle-cursive">Calidad Para Ti</span>
                <h2>Nuestras Especialidades</h2>
                <p>Haz clic en cada categoría para explorar nuestra carta peruana.</p>
              </div>

              <div className="categories">
                {["Especialidades", "Carnes y Brasas", "Cócteles"].map((cat) => (
                  <button
                    key={cat}
                    className={`cat-btn ${categoriaActiva === cat ? "active" : ""}`}
                    onClick={() => setCategoriaActiva(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-2">
                {platosFiltrados.map((item) => (
                  <div
                    key={item.id}
                    className={`horizontal-card ${item.fullWidth ? "full-width" : ""}`}
                  >
                    <img src={item.imagen} alt={item.nombre} />
                    <div className="horizontal-card-info">
                      <h3>{item.nombre}</h3>
                      <p>{item.descripcion}</p>
                      <span className="price">{item.precio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-dark" id="alta-cocina">
            <div className="container">
              <div className="section-title">
                <span className="subtitle-cursive">Elige Tu Evento</span>
                <h2>Experiencias y Banquetes</h2>
                <p>Celebra tu ocasión especial con lo mejor de la gastronomía peruana.</p>
              </div>

              <div className="grid grid-3">
                <div className="card bg-card">
                  <div className="card-img square">
                    <img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80" alt="Degustación Marina" />
                  </div>
                  <div className="card-body">
                    <h3>S/ 220 DEGUSTACIÓN MARINA</h3>
                    <ul className="feature-list">
                      <li>2 Pisco Sour Catedral</li>
                      <li>Trío de Ceviches y Tiradito</li>
                      <li>Suspiro a la Limeña</li>
                    </ul>
                  </div>
                </div>

                <div className="card bg-card">
                  <div className="card-img square">
                    <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80" alt="Mesa del Inca" />
                  </div>
                  <div className="card-body">
                    <h3>S/ 380 MESA DEL INCA</h3>
                    <ul className="feature-list">
                      <li>Botella de Vino Reserva o Jarra de Sangría</li>
                      <li>Ronda Criolla para 4 personas</li>
                      <li>Postres tradicionales artesanales</li>
                    </ul>
                  </div>
                </div>

                <div className="card bg-card">
                  <div className="card-img square">
                    <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80" alt="Banquete Imperial" />
                  </div>
                  <div className="card-body">
                    <h3>S/ 550 BANQUETE IMPERIAL</h3>
                    <ul className="feature-list">
                      <li>Maridaje con Pisco de Autor</li>
                      <li>Menú degustación de 6 tiempos</li>
                      <li>Mesa privada decorada</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section section-dark" id="nosotros">
            <div className="container">
              <div className="section-title">
                <span className="subtitle-cursive">Sobre Nosotros</span>
                <h2>Nuestra Historia</h2>
                <p>Tradición, hospitalidad peruana y respeto por nuestros insumos.</p>
              </div>

              <div className="grid grid-2-about">
                <div className="about-text">
                  <p>
                    En <strong>Inka Sabores</strong> rendimos homenaje a las recetas ancestrales del Perú, fusionando técnicas tradicionales con una presentación contemporánea.
                  </p>
                  <p>
                    Nuestro sistema de reservas en línea garantiza que tu mesa esté lista exactamente a la hora elegida, sin esperas ni contratiempos.
                  </p>
                  <a href="#reserva" className="btn-outline">RESERVAR MI MESA —</a>
                </div>
                <div className="about-gallery">
                  <div className="chef-card">
                    <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80" alt="Chef Principal" />
                    <span>CHEF PRINCIPAL - COCINA CRIOLLA</span>
                  </div>
                  <div className="chef-card">
                    <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80" alt="Chef Ejecutivo" />
                    <span>CHEF EJECUTIVO - COCINA NIKKEI & MARINA</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SeccionReserva
            reservas={reservas}
            mesasBloqueadas={mesasBloqueadas}
            agregarReserva={agregarReserva}
          />
        </>
      )}

      {/* Footer */}
      {!(vistaActual === "admin" && adminAutenticado) && !(vistaActual === "admin" && !adminAutenticado) && (
        <footer className="footer" id="contacto">
          <div className="container footer-content">
            <div className="footer-info">
              <div className="info-item">
                <span className="icon">📍</span>
                <p>Av. La Mar 1250, Miraflores<br />Lima, Perú</p>
              </div>
              <div className="info-item">
                <span className="icon">📞</span>
                <p>Reservas y Atención:<br /><strong>+51 1 471 2850</strong></p>
              </div>
              <div className="info-item">
                <button
                  onClick={() => { setVistaActual("contacto"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{ background: "none", border: "1px solid #d4af37", color: "#d4af37", padding: "6px 14px", borderRadius: "3px", cursor: "pointer", fontSize: "0.75rem" }}
                >
                  📖 Libro de Reclamaciones / Quejas
                </button>
              </div>
            </div>

            <div className="social-links">
              <a href="#inicio" onClick={() => setVistaActual("cliente")}>INICIO</a>
              <a href="#contacto" onClick={() => setVistaActual("contacto")}>CONTACTO</a>
              <a href="#admin" onClick={() => setVistaActual("admin")}>ACCESO ADMIN</a>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
