import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const authMiddleware = async (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      
      toast.warn('Você precisa fazer login para acessar esta página');

      
      const router = useRouter();
      router.push('/Login');

      
      return {};
    }

    return handler(req, res);
  };
};

export default authMiddleware;
