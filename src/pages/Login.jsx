import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../datacontext/Dataformserver';
import { FaMoon, FaSun } from 'react-icons/fa';
import axios from 'axios';
const Login = ({ setIsLoggedIn }) => {
  const { setToken } = useContext(DataContext);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [credentials, setCredentials] = useState({
    username: 'user',
    password: 'user1234'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Force body to be full height
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';

    document.documentElement.style.height = '100%';
    
    return () => {
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.height = '';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("https//ec2-3-91-233-159.compute-1.amazonaws.com/api/login",credentials,{
        headers: { "Content-Type": "application/json" },withCredentials:true})
        console.log(response.data.msg)
     
        localStorage.setItem("token_io",response.data.token_io)
        setToken(response.data.token_io);
        setIsLoggedIn(true)
        navigate('/maintenance');
       
    }
    catch(error){
      if (!error.response) {
        // ถ้าไม่มี response แสดงว่าไม่สามารถเชื่อมต่อกับ server (เช่น เซิร์ฟเวอร์ล่ม)
        setError("Unable to connect to the server. Please try again later.");
    } else {
        // ถ้ารับ response จาก server ได้แต่เกิดข้อผิดพลาด
        setError(error.response.data.error || "Something went wrong..");
    }
    }
    // if (credentials.username === 'admin' && credentials.password === 'admin') {
    //   localStorage.setItem('isLoggedIn', 'true');
    //   setIsLoggedIn(true);
      
    // } else {
    //   setError('Username หรือ Password ไม่ถูกต้อง');
    //   setTimeout(() => setError(''), 3000);
    // }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="root-container">
      <div className={`login-container ${isDarkMode ? 'dark' : 'light'}`}>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="login-box">
          <h1>4M Project</h1>
          <p>Mold Maintenance Management System</p>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="admin"
              required
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="admin"
              required
            />
            <button type="submit">SIGN IN</button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
      `}</style>

      <style jsx>{`
        .root-container {
          height: 100vh;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .login-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #1a1a1a;
          position: relative;
          padding:1rem;
        }

        .theme-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: #00B4DB;
          font-size: 24px;
          cursor: pointer;
          z-index: 1000;
        }

        .login-box {
          background-color: #333;
          padding: 40px;
          border-radius: 10px;
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        h1 {
          color: #00B4DB;
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }

        p {
          color: #888;
          margin: 10px 0 30px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        input {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 5px;
          background-color: #444;
          color: white;
          font-size: 16px;
        }

        input::placeholder {
          color: #888;
        }

        input:focus {
          outline: none;
          background-color: #555;
          box-shadow: 0 0 0 2px rgba(0, 180, 219, 0.5);
        }

        button[type="submit"] {
          background-color: #00B4DB;
          color: white;
          padding: 15px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button[type="submit"]:hover {
          background-color: #0083B0;
        }

        .error-message {
          background-color: rgba(255, 0, 0, 0.1);
          color: #ff4444;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
        }

        /* Light theme */
        .light {
          background-color: #f5f5f5;
        }

        .light .login-box {
          background-color: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .light input {
          background-color: #f0f0f0;
          color: #333;
        }

        .light input::placeholder {
          color: #999;
        }

        .light input:focus {
          background-color: #e8e8e8;
        }
      `}</style>
    </div>
  );
};

export default Login;