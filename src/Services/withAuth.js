// components/AuthGuard.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import authService from './useAuth';



const AuthGuard = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
     

      router.push('/Login');
    }
  }, []);

  return children;
};

export default AuthGuard;
