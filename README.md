# Inka Sabores — Sistema Web de Reservas y Gestión de Salón

Plataforma web interactiva desarrollada como Single Page Application (SPA) en **React 18** y **Vite** para la gestión centralizada de reservas gastronómicas, control de aforo (salón de 9 mesas), simulación de pago de garantía de reserva y panel operativo de administración con validación de comprobantes y control de incidentes.

---

# Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu equipo:

* **Node.js**: Versión 18.0.0 o superior ([Descargar Node.js](https://nodejs.org/)).
* **npm**: Gestor de paquetes incluido con Node.js (versión 9.0.0 o superior).
* **Git**: Para clonar el repositorio de forma local ([Descargar Git](https://git-scm.com/)).
* **Navegador Web Moderno**: Google Chrome, Mozilla Firefox, Microsoft Edge o Safari.

---

# Guía de Instalación y Ejecución Local

Sigue estos pasos en tu terminal (PowerShell, Git Bash o Command Prompt):

# 1. Clonar el Repositorio

```bash
git clone https://github.com/n-i-v-e-k/P_I2
```

# 2. Acceder al Directorio del Proyecto

```bash
cd inka-sabores
```

*(Si tu proyecto está dentro de una subcarpeta, por ejemplo `inka_sabores`, accede a ella: `cd inka_sabores`)*.

# 3. Instalar las Dependencias

Ejecuta el siguiente comando para descargar todos los paquetes necesarios (`react`, `react-dom`, `@vitejs/plugin-react`):

```bash
npm install
```

# 4. Iniciar el Servidor de Desarrollo

Una vez concluida la instalación, inicia el servidor local de desarrollo con Vite:

```bash
npm run dev
```

# 5. Abrir la Aplicación en el Navegador

Vite levantará el servidor local en milisegundos. Abre la siguiente dirección en tu navegador:

```text
http://localhost:5173/
```

---

# 🔑 Credenciales de Acceso al Panel de Administración

Para evaluar las funciones internas del restaurante, haz clic en el botón superior **"LOGIN ADMIN"**:

| Campo | Credencial |
| :--- | :--- |
| **Usuario / Correo** | `admin@inkasabores.pe` *(o simplemente `admin`)* |
| **Contraseña** | `inka123` |

---


# 📁 Estructura del Proyecto

```text
inka-sabores-restaurante/
├── index.html              # Punto de entrada HTML con Google Fonts vinculadas
├── package.json            # Dependencias y scripts de ejecución
├── vite.config.js          # Configuración del bundler Vite
├── src/
│   ├── data/constantes.js
|   ├── components/
│     ├── Navbar.jsx
│     ├── Footer.jsx
│     ├── PlatoCard.jsx
│     ├── ModalPagoGarantia.jsx
│     └── SeccionReserva.jsx
|   ├── pages/
│     ├── VistaCliente.jsx
│     ├── LoginAdmin.jsx
│     ├── PanelAdministrador.jsx
│     └── PaginaContacto.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
│ 
└── README.md               # Documentación técnica y guía de instalación
```

---

# 🛠️ Comandos Adicionales

* **Compilar para Producción:**
  ```bash
  npm run build
  ```
  Genera el directorio optimizado `dist/` listo para desplegar en servicios como Vercel, Netlify o GitHub Pages.

* **Previsualizar la Versión de Producción Localmente:**
  ```bash
  npm run preview
  ```
