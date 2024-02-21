// authService.js
const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const isAuthenticated = () => {
  const token = getCookie('token');
  return token !== null;
};

// Atualizado para refletir a intenção de apenas armazenar o token
const setToken = (token) => {
  setCookie('token', token);
};

// Adicionado para armazenar o ID do usuário separadamente
const setUserId = (id) => {
  setCookie('userId', id);
};

const clearAuthentication = () => {
  setCookie('token', '', -1);
  setCookie('userId', '', -1);
};

const authService = {
  isAuthenticated,
  setToken,
  setUserId,
  clearAuthentication,
};

export default authService;
