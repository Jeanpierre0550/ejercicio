import axios from "axios";
const clasesURL = "http://localhost:3000/classes";

export async function getClases() {
  try {
    const res = await axios.get(clasesURL);
    return res.data.filter(c => c.isActive !== false); 
  } catch (err) {
    console.error("Error al cargar clases", err);
    return [];
  }
}

export async function createClase(clase) {
  try {
    await axios.post(clasesURL, clase);
    alert("Clase creada correctamente");
  } catch (err) {
    alert("Error al crear clase");
  }
}

export async function deleteClase(id) {
  const confirmar = confirm("¿Deseas desactivar esta clase?");
  if (!confirmar) return;
  try {
    await axios.patch(`${clasesURL}/${id}`, {
      isActive: false
    });
    alert("Clase desactivada correctamente.");
  } catch (error) {
    alert("Error al desactivar clase");
    console.error(error);
  }
}

export async function updateClase(id, clase) {
  try {
    await axios.put(`${clasesURL}/${id}`, clase);
    alert("Clase actualizada correctamente.");
  } catch (error) {
    alert("Error al actualizar la clase");
    console.error(error);
  }
}
