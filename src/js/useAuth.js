
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const authMiddleware = async (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });

    

    if (!session) {
        
        toast.warn('Você precisa fazer login para acessar esta página');
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return handler(req, res);
  };
};

export default authMiddleware;
