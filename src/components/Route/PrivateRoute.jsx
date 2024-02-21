
import { Navigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import React from 'react';

const PrivateRoute = ({ element, authenticated, redirectTo = '/Login' }) => {
  
  const handleUnauthorizedAccess = () => {
    toast.warn('Você não tem permissão para acessar esta página.');
  };
  return authenticated ? (
    element
  ) : (

    <>
    {handleUnauthorizedAccess()}
    <Navigate to={redirectTo} replace state={{ from: window.location.pathname }} />
    </>
  );
};

export default PrivateRoute;
