import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import HomePage from './pages/Home';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/logout" element={<LogoutPage />} /> */}
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};

export default App;
