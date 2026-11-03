import { useState } from "react";

export default function LoginAdminModal({ onLoginExitoso, onVolverMenu }) {
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
