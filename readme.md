# 🔐 SPA Auth Guard con JavaScript Vanilla + Vite
Este proyecto es una Single Page Application (SPA) construida con JavaScript Vanilla y Vite. Incluye un sistema de autenticación básico con localStorage, rutas protegidas y carga dinámica de vistas HTML.

## 🚀 Características
## ✅ Protección de rutas
## 🔐 Simulación de login (usuario y contraseña)
## 📄 Carga de vistas externas (HTML) con axios()
## 🧠 Lógica SPA sin frameworks
## ⚡️ Rápido desarrollo con Vite
## 📁 Estructura del proyecto

SPA/
│── css/
│     └── style.css
├── node_modules/
├── public/
│   ├── login.jpg
│   └── register.jpg
├── src/
│   ├── controller/
│   │   ├── auth.js
│   │   ├── clases.js
│   │   ├── events.js
│   │   ├── main.js
│   │   ├── reservas.js
│   │   └── router.js
├── views/
│   ├── 404.html
│   ├── clases.html
│   ├── dashboard.html
│   ├── home.html
│   ├── login.html
│   └── register.html
├── style.css
├── .gitignore
├── db.json
├── index.html
├── package-lock.json
├── package.json
└── readme.md

# 🧪 Credenciales de prueba
Usuario: admin
Contraseña: admin

Usuario: jean
Contraseña: 1234

# 🛠️ Instalación
    # 1. Clona este repositorio
    git clone https://github.com/moicanbas/appVite.git
    cd appVite

    # 2. Instala dependencias
    npm install

    # 3. Inicia el servidor de desarrollo
    npm run dev
🔍 Rutas disponibles
#/ → Página principal protegida

#/dashboard → Dashboard privado

#/login → Página de inicio de sesión

📌 Requisitos
Node.js >= 16

Navegador moderno compatible con módulos ES