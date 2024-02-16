import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const authMiddleware = async (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      // Exibe o toast
      toast.warn('Você precisa fazer login para acessar esta página');

      // Redireciona no cliente
      const router = useRouter();
      router.push('/Login');

      // Retorna vazio para evitar a execução adicional do handler
      return {};
    }

    return handler(req, res);
  };
};

export default authMiddleware;
