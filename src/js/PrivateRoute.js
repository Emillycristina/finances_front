import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './useAuth'; // Importe o hook de autenticação

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth(); // Implemente o hook de autenticação

  useEffect(() => {
    // Redireciona para a página de login se o usuário não estiver autenticado
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Renderiza as rotas apenas se o usuário estiver autenticado
  return user ? children : null;
};

export default PrivateRoute;