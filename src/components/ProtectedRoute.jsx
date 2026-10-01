import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth);

    // If the user is not authenticated, kick them back to the login page
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    // If they are authenticated, render the children (AdminLayout) or Outlet
    return children ? children : <Outlet />;
}