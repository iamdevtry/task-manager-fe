import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import HomePage from './pages/Home';
const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />}>
                <Route path="*" element={<Outlet />} />
            </Route>
        </Routes>
    );
};

export default App;
