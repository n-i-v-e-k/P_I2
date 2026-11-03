export default function Footer({ setVistaActual }) {
  return (
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
  );
}