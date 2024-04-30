import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ProtectedResource from './ProtectedResource';
import MainPage from './MainPage';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={ <Dashboard />} />
        <Route path="/protected" element={<ProtectedResource />} />
      </Routes>
    </Router>
  );
}

export default App;
