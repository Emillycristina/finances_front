// authService.js
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };
  
  const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  const clearToken = () => {
    localStorage.removeItem('token');
  };
  
  const authService = {
    isAuthenticated,
    setToken,
    clearToken,
  };
  
  export default authService;
  