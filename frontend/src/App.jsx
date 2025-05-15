import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NAvbar';
import Login from './components/Login';
import PrivateRoutes from './components/PrivateRoutes';
import EmployeeList from './components/EmployeeList';
import AdminDashboard from './components/AdminDashboard';
import AddEmployee from './components/AddEmp';
import Main from './components/MAin';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('logintoken'));
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('logintoken');
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/admin-dashboard" element={<Main child={<AdminDashboard />} />} />
          <Route path="/employees" element={<Main child={<EmployeeList />} />} />
        </Route>
        <Route element={<PrivateRoutes adminRequired={true} />}>
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<AddEmployee />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
