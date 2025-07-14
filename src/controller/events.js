const URL = "http://localhost:3000/products";

export async function obtenerProductos() {
  const res = await fetch(URL);
  return await res.json();
}

export async function crearProducto(producto) {
  await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
}

export async function eliminarProducto(id) {
  await fetch(`${URL}/${id}`, { method: "DELETE" });
}



