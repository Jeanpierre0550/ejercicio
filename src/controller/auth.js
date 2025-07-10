export const auth = {
  isAuthenticated: () => !!localStorage.getItem("token"),
  login: (token, usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(usuario));
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
