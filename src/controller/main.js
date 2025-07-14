import { renderRoute } from "./router.js";

window.addEventListener("load", () => {
  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify([
      { "id": 1, "username": "admin", "password": "admin", "name": "Admin", "lastname": "Root", "role": "admin" },
      { "id": 2, "username": "jean", "password": "1234", "name": "Juan", "lastname": "Pérez", "role": "visitante" }
    ]));
  }
  renderRoute();
});
window.addEventListener("hashchange", renderRoute);
