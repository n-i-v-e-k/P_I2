import { useState } from "react";
import { PLATOS_DEL_DIA, ESPECIALIDADES } from "../data/constantes";
import PlatoCard from "../components/PlatoCard";
import SeccionReserva from "../components/SeccionReserva";

export default function VistaCliente({ reservas, mesasBloqueadas, agregarReserva }) {
  const [categoriaActiva, setCategoriaActiva] = useState("Especialidades");

  const platosFiltrados = ESPECIALIDADES.filter((item) => item.categoria === categoriaActiva);

  return (
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
              <div key={item.id} className={`horizontal-card ${item.fullWidth ? "full-width" : ""}`}>
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
  );
}