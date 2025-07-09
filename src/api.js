const API_URL = 'http://localhost:3000';

export async function getUsers() {
  return fetch(`${API_URL}/users`).then(res => res.json());
}

export async function getClasses() {
  return fetch(`${API_URL}/classes`).then(res => res.json());
}

export async function getReservations() {
  return fetch(`${API_URL}/reservations`).then(res => res.json());
}

export async function postReservation(data) {
  return fetch(`${API_URL}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export async function createClass(clase) {
  return fetch(`${API_URL}/classes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clase)
  }).then(res => res.json());
}

export async function deleteClass(id) {
  return fetch(`${API_URL}/classes/${id}`, {
    method: 'DELETE'
  });
}
