import { getUsers } from './api.js';

export async function login(username, password) {
  const users = await getUsers();
  return users.find(u => u.username === username && u.password === password);
}

export function logout() {
  localStorage.removeItem('user');
  window.location.reload();
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}
