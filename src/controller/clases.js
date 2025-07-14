import axios from "axios";
const clasesURL = "http://localhost:3000/products";

export async function getClases() {
  try {
    const res = await axios.get(clasesURL);
    return res.data.filter(c => c.isActive !== false); 
  } catch (err) {
    console.error("Error al cargar producto", err);
    return [];
  }
}

export async function createClase(clase) {
  try {
    await axios.post(clasesURL, clase);
    alert("producto creado correctamente");
  } catch (err) {
    alert("Error al crear producto");
  }
}

export async function deleteClase(id) {
  const confirmar = confirm("¿Deseas eliminar este producto?");
  if (!confirmar) return;
  try {
    await axios.patch(`${clasesURL}/${id}`, {
      isActive: false
    });
    alert("producto eliminado correctamente.");
  } catch (error) {
    alert("Error al eliminar producto");
    console.error(error);
  }
}

export async function updateClase(id, clase) {
  try {
    await axios.put(`${clasesURL}/${id}`, clase);
    alert("producto actualizado correctamente.");
  } catch (error) {
    alert("Error al actualizar el producto");
    console.error(error);
  }
}
