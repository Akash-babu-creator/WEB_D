import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UploadMaterial from './pages/UploadMaterial';
import TakeQuiz from './pages/TakeQuiz';
import Results from './pages/Results';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="upload" element={<UploadMaterial />} />
        <Route path="quiz/:id" element={<TakeQuiz />} />
        <Route path="results/:id" element={<Results />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
