import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const authMiddleware = (handler) => (req, res) => {
    
    const token = localStorage.getItem('token');
  
    if (!token) {
        
      toast.error('Você precisa fazer login para acessar esta página.');
      return res.status(401).json({ mensagem: 'Token não fornecido' });
      
    }
  
    // Aqui, você pode decodificar o token e validar a autenticação conforme necessário
  
    return handler(req, res);
  };
  