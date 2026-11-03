import { useState } from "react";

export default function PaginaContacto({ onVolverInicio }) {
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
