import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const authMiddleware = async (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      
        toast.warn('Você precisa fazer login para acessar esta página', {
            position: 'top-center',
            autoClose: 3000, // Fechar automaticamente após 3 segundos
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme:'colored'
          });

      
      const router = useRouter();
      router.push('/Login');

      
      return {};
    }

    return handler(req, res);
  };
};

export default authMiddleware;
