import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Form } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Maintenance from "./pages/Maintenance";

import Table from "./pages/Table";
import Navbar from "./components/Navbar";
import Dashboardmain from "./pages/Dashboardmain";
import Dashboard from "./components/dashboard/dashborad";
import Formcomponent from "./pages/form";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import './App.css'
import Footer from "./components/Footer";
import Record from "./pages/histrory";


function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') );
  //ดึงค่าจาก local storage keyดาร์กโหมด  return boolean
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token_io'));

  // Auto theme based on time
  useEffect(() => {
    const handleAutoTheme = () => {
      const hours = new Date().getHours();
      const shouldBeDark = hours >= 18 && hours < 6;//&&=> true
      setDarkMode(shouldBeDark);
      localStorage.setItem('darkMode', shouldBeDark);
      applyTheme(shouldBeDark);
    };

    handleAutoTheme();
    // const interval = setInterval(handleAutoTheme, 1000 * 60);//มีทำไม ลบได้

    // return () => clearInterval(interval);
  }, []);

  // Apply theme whenever darkMode changes
  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  // Watch for login status changes
  // useEffect(() => {
  //   const checkLoginStatus = () => {
  //     const loginStatus = localStorage.getItem('isLoggedIn') ;
  //     setIsLoggedIn(loginStatus);
  //   };

   
  // }, []);

  const applyTheme = (isDark) => {
    const theme = {
      primary: '#00B4DB',
      secondary: '#0083B0',
      background: isDark ? '#1a1a1a' : '#ffffff',
      surface: isDark ? '#2d2d2d' : '#EAE4DD',
      text: isDark ? '#ffffff' : '#333333',
      textSecondary: isDark ? '#a0aec0' : '#666666',
      border: isDark ? '#404040' : '#e0e0e0',
      shadow: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)',
      card: isDark ? '#2d2d2d' : '#ffffff',
      hover: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,180,219,0.1)',
      navGradient: isDark 
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        : 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)',
      tableHeader: isDark ? '#1a1a1a' : '#f1f1f1',
      tableBorder: isDark ? '#404040' : '#e0e0e0',
      success: isDark ? '#4caf50' : '#45a049',
      warning: isDark ? '#ff9800' : '#f57c00',
      error: isDark ? '#f44336' : '#d32f2f'
    };
    //obj.en=[ [primary,ff000],] ดปลี่ยนเป็นarr
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value);
    });
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="app">
     
     
     
        
        <div className={`main-content   ${!isLoggedIn ? 'full-width' : ''}`} style={{overflowX:'hidden'}}>
        <div className="navbar ">
     {isLoggedIn && (
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          setIsLoggedIn={setIsLoggedIn} 
        />
      )}
      </div> 
          <Routes>
            {/* Public Route */}
            <Route 
              path="/login" 
              element={
                isLoggedIn ? (
                  <Navigate to="/maintenance" replace />
                ) : (
                  <Login 
                    setIsLoggedIn={setIsLoggedIn} 
                    darkMode={darkMode} 
                    toggleDarkMode={toggleDarkMode} 
                  />
                )
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Navigate to="/maintenance" replace />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/maintenance" 
              element={
                <ProtectedRoute>
                  <Maintenance  darkMode={darkMode} />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/Record" 
              element={
                <ProtectedRoute>
                  <Record   />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboardmain  darkMode={darkMode} />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/table" 
              element={
                <ProtectedRoute>
                  <Table darkMode={darkMode}  />
                </ProtectedRoute>
              } 
            />
               <Route 
              path="/Form" 
              element={
                <ProtectedRoute>
                  <Formcomponent darkMode={darkMode}  />
                </ProtectedRoute>
              } 
            />

            {/* Part outes - Updated with exact paths */}
            <Route 
              path="/table/:Partname" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

          

            {/* Catch all route */}
            <Route 
              path="*" 
              element={
                <Navigate to={isLoggedIn ? "/maintenance" : "/login"} replace />
              } 
            />
          </Routes>
        <Footer/>  
        </div>
      

     
    </div>
  );
}

export default App;