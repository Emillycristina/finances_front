import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './DashboardPage';
import Login from './Login';
import HomePage from './HomePage';
import UserPage from './UserPage';
import authService from '../src/Services/authService'; 

// Definição do componente PrivateRoute
const PrivateRoute = ({ element: Component, ...rest }) => {
    return authService.isAuthenticated() ? <Component {...rest} /> : <Navigate to="/Login" />;
  };

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/UserPage" element={<PrivateRoute element={<UserPage />} />} />
        <Route path="/DashboardPage" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/HomePage" element={<PrivateRoute element={<HomePage />} />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
