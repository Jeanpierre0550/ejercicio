import { auth } from './auth.js';
import { getClases, createClase, updateClase, deleteClase } from './clases.js';
import { reservarClase } from './reservas.js';

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let userLoggeado = JSON.parse(localStorage.getItem("visitante"));

const routes = {
  "/": "src/views/home.html",
  "/404": "src/views/404.html",
  "/login": "src/views/login.html",
  "/register": "src/views/register.html",
  "/clases": "src/views/clases.html",
  "/dashboard": "src/views/dashboard.html",

  
};


export async function renderRoute() {
  const path = location.hash.slice(1) || "/";
  const app = document.getElementById("app");
  const isAuth = auth.isAuthenticated();
  userLoggeado = JSON.parse(localStorage.getItem("user"));

  if (!isAuth && path !== "/login" && path !== "/register") {
    location.hash = "/login";
    return;
  }

  if (isAuth && path === "/login") {
    location.hash = "/";
    return;
  }

  if (path === "/dashboard" && userLoggeado.role !== "admin") {
    alert("Acceso no autorizado");
    location.hash = "/";
    return;
  }

  const file = routes[path];
  if (!file) {
    app.innerHTML = "<h2>Página no encontrada</h2>";
    return;
  }

  try {
    const res = await fetch(file);
    const html = await res.text();
    app.innerHTML = html;

    // LOGIN
    if (path === "/login") {
      const form = document.getElementById("loginForm");
      const error = document.getElementById("loginError");

      form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = form.username.value.trim();
        const password = form.password.value.trim();
        const usuario = usuarios.find(
          (u) => u.username === username && u.password === password
        );
        if (usuario) {
          auth.login("fake-token", usuario);
          location.hash = "/";
        } else {
          error.style.display = "block";
        }
      });

      document.getElementById("sign-up")?.addEventListener("click", () => {
        location.hash = "/register";
      });
    }

    // REGISTER
    if (path === "/register") {
      const form = document.getElementById("registerForm");
      form?.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const username = form.username.value.trim();
        const userExist = usuarios.find((u) => u.username === username);
    
        if (userExist) {
          alert("Ya existe un usuario con ese nombre.");
        } else {
          const nuevo = {
            id: usuarios.length + 1,
            username,
            password: form.password.value.trim(),
            name: form.name.value.trim(),
            lastname: form.lastname.value.trim(),
            role: form.role.value,
          };
    
          usuarios.push(nuevo);
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          alert("Usuario registrado correctamente.");
          location.hash = "/login";
        }
      });
    }

    // HOME
    if (path === "/") {
      document.getElementById(
        "welcome-msg"
      ).textContent = `Hola, ${userLoggeado.name}`;
      if (userLoggeado.role === "admin") {
        document.getElementById("admin-options").style.display = "block";
      } else {
        document.getElementById("user-options").style.display = "block";
      }
    }

    // CLASES (usuario)
    if (path === "/clases") {
      const lista = document.getElementById("clase-list");
      const clases = await getClases();
      clases.forEach((c) => {
        const li = document.createElement("li");
        li.textContent = `${c.name} -- Fecha: ${c.date} -- Hora: ${c.time} -- Unidades: ${c.capacity}`;
        const btn = document.createElement("button");
        btn.textContent = "Reservar";
        btn.addEventListener("click", () => {
          reservarClase({ claseId: c.id, userId: userLoggeado.id });
        });
        li.appendChild(btn);
        lista.appendChild(li);
      });
    }

    // ADMIN CLASES
    if (path === "/dashboard") {
      const form = document.getElementById("formClase");
      const claseIdInput = document.getElementById("claseId");
      const nameInput = document.getElementById("name");
      const dateInput = document.getElementById("date");
      const timeInput = document.getElementById("time");
      const capacityInput = document.getElementById("capacity");

      const claseList = document.getElementById("admin-clase-list");
      const clases = await getClases();
      clases.forEach((c) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${c.name}</strong> - ${c.date} ${c.time} (Unidades: ${c.capacity})
          <button class="edit" data-id="${c.id}">Editar</button>
          <button class="delete" data-id="${c.id}">Eliminar</button>
        `;
        claseList.appendChild(li);
      });

      document.getElementById("openModal")?.addEventListener("click", () => {
        document.getElementById("modal").style.display = "flex";
        form.reset();
        claseIdInput.value = "";
      });

      document.getElementById("closeModal")?.addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
      });

      document.querySelectorAll(".edit").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const clase = clases.find((c) => c.id == id);
          claseIdInput.value = clase.id;
          nameInput.value = clase.name;
          dateInput.value = clase.date;
          timeInput.value = clase.time;
          capacityInput.value = clase.capacity;
          document.getElementById("modal").style.display = "flex";
        });
      });

      document.querySelectorAll(".delete").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          deleteClase(id).then(() => location.reload());
        });
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const clase = {
          name: nameInput.value,
          date: dateInput.value,
          time: timeInput.value,
          capacity: parseInt(capacityInput.value),
        };
        const id = claseIdInput.value;
        if (id) {
          await updateClase(id, clase);
        } else {
          await createClase(clase);
        }
        document.getElementById("modal").style.display = "none";
        location.reload();
      });
    }

    // Cerrar sesión
    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      auth.logout();
      location.hash = "/login";
    });
  } catch (err) {
    console.error(err);
    app.innerHTML = "<h2>Error al cargar vista</h2>";
  }
}
