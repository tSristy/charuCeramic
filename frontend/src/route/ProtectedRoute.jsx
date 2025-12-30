// ProtectedRoute.js
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { CircularProgress, Box } from '@mui/material';

import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const { auth, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} color="primary" />
            </Box>
        );
    }
     return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
