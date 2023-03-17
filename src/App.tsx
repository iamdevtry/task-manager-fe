import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import HomePage from './pages/Home';
const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />}>
                <Route path="*" element={<Outlet />} />
            </Route>
        </Routes>
    );
};

export default App;
