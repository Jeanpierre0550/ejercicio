import axios from "axios";
const clasesURL = "http://localhost:3000/classes";

export async function getClases() {
  try {
    const res = await axios.get(clasesURL);
    return res.data;
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
