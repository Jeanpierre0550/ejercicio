import axios from "axios";
const reservasURL = "http://localhost:3000/reservations";

export async function reservarClase({ claseId, userId }) {
  try {
    const reservas = await axios.get(reservasURL, { params: { classId: claseId } });
    const cupoOcupado = reservas.data.length;

    const clase = await axios.get(`http://localhost:3000/products/${claseId}`);
    if (cupoOcupado >= clase.data.capacity) {
      alert("Ya no hay cupos disponibles");
      return;
    }

    await axios.post(reservasURL, {
      classId: claseId,
      userId,
      fecha: new Date().toISOString(),
    });

    alert("Reserva realizada");
  } catch (err) {
    alert("Error al reservar");
  }
}
