import { parseCookies, setCookie, destroyCookie } from 'nookies';

const isAuthenticated = (ctx) => {
  const cookies = parseCookies(ctx);
  return !!cookies.token;
};

const getTokenFromCookies = (ctx) => {
  const cookies = parseCookies(ctx);
  return cookies.token || null;
};

const getUserIdFromCookies = (ctx) => {
  const cookies = parseCookies(ctx);
  return cookies.userId || null;
};

const setToken = (ctx, token) => {
  setCookie(ctx, 'token', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 dias em segundos
    path: '/',
  });
};

const setUserId = (ctx, id) => {
  setCookie(ctx, 'userId', id, {
    maxAge: 30 * 24 * 60 * 60, // 30 dias em segundos
    path: '/',
  });
};

const clearAuthentication = (ctx) => {
  destroyCookie(ctx, 'token');
  destroyCookie(ctx, 'userId');
};

const authService = {
  isAuthenticated,
  setToken,
  setUserId,
  clearAuthentication,
  getTokenFromCookies,
  getUserIdFromCookies,
};

export default authService;
