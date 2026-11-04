import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VistaCliente from "./pages/VistaCliente";
import LoginAdmin from "./pages/LoginAdmin";
import PanelAdministrador from "./pages/PanelAdministrador";
import PaginaContacto from "./pages/PaginaContacto";

export default function App() {
  const hoy = new Date().toISOString().split("T")[0];

  const [vistaActual, setVistaActual] = useState("cliente");
  const [adminAutenticado, setAdminAutenticado] = useState(false);

  const [reservas, setReservas] = useState([
    {
      id: 1, fecha: hoy, hora: "13:00", personas: "4 personas", mesa: "Mesa 2",
      nombre: "Carlos Mendoza", telefono: "+51 987 654 321", email: "cmendoza@email.com",
      notas: "Cerca a la ventana", estado: "Confirmada", medioPago: "Yape",
      nroOperacion: "08472194", montoGarantia: 100
    },
    {
      id: 2, fecha: hoy, hora: "20:00", personas: "2 personas", mesa: "Mesa 7",
      nombre: "Lucía Paredes", telefono: "+51 912 345 678", email: "lucia.p@email.com",
      notas: "Aniversario", estado: "En Mesa", medioPago: "Transferencia BCP",
      nroOperacion: "09918231", montoGarantia: 100
    }
  ]);

  const [mesasBloqueadas, setMesasBloqueadas] = useState([
    { id: 101, fecha: hoy, mesa: "Mesa 9", motivo: "Rotura de copa de cristal y limpieza profunda" }
  ]);

  const agregarReserva = (nueva) => setReservas([...reservas, nueva]);

  const actualizarReserva = (reservaActualizada) =>
    setReservas(reservas.map((r) => (r.id === reservaActualizada.id ? reservaActualizada : r)));

  const eliminarReserva = (id) => setReservas(reservas.filter((r) => r.id !== id));

  const bloquearMesa = (fecha, mesa, motivo, cancelarReservas = true) => {
    setMesasBloqueadas([...mesasBloqueadas, { id: Date.now(), fecha, mesa, motivo }]);

    if (cancelarReservas) {
      setReservas(
        reservas.map((r) =>
          r.fecha === fecha && r.mesa === mesa
            ? { ...r, estado: "Cancelada", notas: `${r.notas ? r.notas + " | " : ""}Cancelada por incidente: ${motivo}` }
            : r
        )
      );
    }
  };

  const rehabilitarMesa = (bloqueoId) =>
    setMesasBloqueadas(mesasBloqueadas.filter((b) => b.id !== bloqueoId));

  const enAdmin = vistaActual === "admin";

  const renderVista = () => {
    if (vistaActual === "contacto") {
      return <PaginaContacto onVolverInicio={() => setVistaActual("cliente")} />;
    }

    if (enAdmin) {
      if (!adminAutenticado) {
        return (
          <LoginAdmin
            onLoginExitoso={() => setAdminAutenticado(true)}
            onVolverMenu={() => setVistaActual("cliente")}
          />
        );
      }
      return (
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
      );
    }

    return (
      <VistaCliente
        reservas={reservas}
        mesasBloqueadas={mesasBloqueadas}
        agregarReserva={agregarReserva}
      />
    );
  };

  return (
    <>
      {!enAdmin && (
        <Navbar
          vistaActual={vistaActual}
          setVistaActual={setVistaActual}
          totalReservas={reservas.length}
          adminAutenticado={adminAutenticado}
        />
      )}

      {renderVista()}

      {!enAdmin && <Footer setVistaActual={setVistaActual} />}
    </>
  );
}
