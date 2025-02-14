import React, { useState, useEffect,useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../datacontext/Dataformserver";

import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaMoon, 
  FaSun, 
  FaGlobe,
  FaTools,
  FaTable,
  FaChartBar,
  FaRegListAlt
} from "react-icons/fa";
import { LanguageContext } from "../datacontext/Langprovider";
const Navbar = ({ darkMode, toggleDarkMode, setIsLoggedIn }) => {
  const { setToken } = useContext(DataContext);
  const { language, setLanguage } = useContext(LanguageContext);
  // const [language, setLanguage] = useState("EN");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // เพิ่ม state นี้

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout =  async() => {
   
    
      try {
         const resp=await axios.post("http://ec2-54-236-179-184.compute-1.amazonaws.com/api/logout", {}, { withCredentials: true });
        console.log(resp.data);
    
       
        localStorage.removeItem('token_io');
        setToken("");
        setIsLoggedIn(false);
        setIsProfileOpen(false);
        
    
        // เปลี่ยนหน้าไปที่หน้า Login
        
      } catch (error) {
        console.error("❌ Logout failed:", error||resp.data.error);
        
        localStorage.removeItem('token_io');
        setIsLoggedIn(false);
        setIsProfileOpen(false);
        
      }
    ;
    navigate('/login', { replace: true });
  };
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen); // ฟังก์ชันเปิดปิด offcanvas
  };
  return (
    <nav className={`navbar  ${isScrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`} style={{maxWidth:'100wh', width:'100wh'}}>
     <Link to="/maintenance" className="navbar-brand">
          <span className="brand-text">4M Project</span>
          <div className="brand-shine"></div>
        </Link>
      <div className="navbar-container">
       

        <div className="nav-links">
          <Link to="/maintenance" className={`nav-link ${location.pathname === '/maintenance' ? 'active' : ''}`}>
            <FaTools className="nav-icon" />
            <span>Maintenance</span>
            <div className="nav-link-highlight"></div>
          </Link>
          <Link to="/table" className={`nav-link ${location.pathname === '/table' ? 'active' : ''}`}>
            <FaTable className="nav-icon" />
            <span>Table</span>
            <div className="nav-link-highlight"></div>
          </Link>
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <FaChartBar className="nav-icon" />
            <span>Dashboard</span>
            <div className="nav-link-highlight"></div>
          </Link>
          <Link to="/Record" className={`nav-link ${location.pathname === '/Record' ? 'active' : ''}`}>
            <FaRegListAlt className="nav-icon" />
            <span>Record</span>
            <div className="nav-link-highlight"></div>
          </Link>
        </div>

        <div className="nav-actions">
          <button 
            onClick={toggleDarkMode} 
            className={`action-btn theme-toggle ${darkMode ? 'dark' : ''}`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <FaSun className="nav-icon sun" /> : <FaMoon className="nav-icon moon" />}
            <div className="btn-highlight"></div>
          </button>

          <div className="language-dropdown">
            <button className="action-btn">
              <FaGlobe className="nav-icon globe" />
              <span>{language}</span>
              <div className="btn-highlight"></div>
            </button>
            <div className="dropdown-content">
              <button onClick={() => setLanguage("EN")} className="dropdown-link">
                <span className="lang-text">English</span>
              </button>
              <button onClick={() => setLanguage("TH")} className="dropdown-link">
                <span className="lang-text">ไทย</span>
              </button>
            </div>
          </div>

          <div className={`profile-dropdown ${isProfileOpen ? 'open' : ''}`}>
            <button 
              className="action-btn profile-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <FaUserCircle className="nav-icon user" />
              <div className="btn-highlight"></div>
            </button>
            <div className="dropdown-content">
              <Link to="/profile" className="dropdown-link" onClick={() => setIsProfileOpen(false)}>
                <FaUserCircle className="dropdown-icon" />
                <span className="dropdown-text">Profile</span>
                <div className="dropdown-highlight"></div>
              </Link>
              <button onClick={handleLogout} className="dropdown-link">
                <FaSignOutAlt className="dropdown-icon" />
                <span className="dropdown-text">Logout</span>
                <div className="dropdown-highlight"></div>
              </button>
            </div>
          </div>
        </div>
        
      </div>
      <div className="toggle d-md-none pe-2">
    
    <button className="navbar-toggler" type="button" onClick={toggleOffcanvas} aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`offcanvas offcanvas-end ${
          darkMode ? "text-bg-dark" : "text-bg-primary"
        } ${isOffcanvasOpen ? "show" : ""} `} tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel" style={{ overflowY: 'auto', position:'  fixed', top: '0', right: '0', zIndex: '2000', width:'100',height:'100vh'}}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">4M Project</h5>
        <button type="button" class="btn-close btn-close-white"onClick={() => setIsOffcanvasOpen(false)} aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
          <Link to="/maintenance" className={`nav-link ${location.pathname === '/maintenance' ? 'active' : ''}`} onClick={toggleOffcanvas}>
            <FaTools className="nav-icon" />
            <span>Maintenance</span>
            <div className="nav-link-highlight"></div>
          </Link>
          </li>
          <li className="nav-item">
          <Link to="/table" className={`nav-link ${location.pathname === '/table' ? 'active' : ''}` } onClick={toggleOffcanvas} >
            <FaTable className="nav-icon" />
            <span>Table</span>
            <div className="nav-link-highlight"></div>
          </Link>
          </li>
          <li className="nav-item">
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={toggleOffcanvas}>
            <FaChartBar className="nav-icon" />
            <span>Dashboard</span>
            <div className="nav-link-highlight"></div>
          </Link>

          </li>
          <li className="nav-item">
          <Link to="/Record" className={`nav-link ${location.pathname === '/Record' ? 'active' : ''}`} onClick={toggleOffcanvas}>
            <FaRegListAlt className="nav-icon" />
            <span>Record</span>
            <div className="nav-link-highlight"></div>
          </Link>
          
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Account Setting
            </a>
            <ul className={`dropdown-menu ${
          darkMode ? "dropdown-menu-dark" : "dropdown-menu-light"}`}>
              <li> <Link to="/profile" className="dropdown-link" onClick={() => setIsProfileOpen(false)}>
                <FaUserCircle  />Profile</Link>
                </li>
              <li><Link  className="dropdown-link" onClick={handleLogout}>
              <FaSignOutAlt   />Logout </Link>
              </li>
              
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Langguage
            </a>
            <ul className={`dropdown-menu ${darkMode ? "dropdown-menu-dark" : "dropdown-menu-light"}`}>
              <li>  <button onClick={() => setLanguage("EN")} className="dropdown-link">
                <span className="lang-text">English</span>
              </button>
              
                </li>
              <li> <button onClick={() => setLanguage("TH")} className="dropdown-link">
                <span className="lang-text">ไทย</span>
              </button>
              </li>
              
            </ul>
          </li>
          <div className="form-check form-switch " style={{margin:'0.5rem 0'}}>
          <input className="form-check-input me-1" type="checkbox" id="darkModeToggle" onClick={toggleDarkMode} />
          <label className="form-check-label" htmlFor="darkModeToggle"> Switch Mode (Dark/Light)</label>
        </div>
        </ul>
       
      </div>
    </div>
  </div>
      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #00B4DB 0%, #0083B0 100%);
          height: 60px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          flex-wrap:nowrap;
          align-items: center; 
        }
          .offcanvas-end.text-bg-primary{
           background: linear-gradient(135deg, #00B4DB 0%, #0083B0 100%);
          }

        .navbar.scrolled {
          background: rgba(0, 180, 219, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .navbar.dark {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        }

        .navbar-container {
         
          margin: 0 ;
          height: 100%;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-brand {
          text-decoration: none;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .brand-text {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          position: relative;
          z-index: 1;
        }

        .brand-shine {
          position: absolute;
          top: -100%;
          left: -100%;
          width: 250%;
          height: 250%;
          background: linear-gradient(
            45deg,
            transparent 45%,
            rgba(255, 255, 255, 0.1) 47%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.1) 53%,
            transparent 55%
          );
          transition: all 0.5s ease;
        }

        .navbar-brand:hover .brand-shine {
          top: -50%;
          left: -50%;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          margin: 0 2rem 0 0;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .nav-link-highlight {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: all 0.5s ease;
        }

        .nav-link:hover .nav-link-highlight {
          left: 100%;
        }

        .nav-link:hover, .nav-link.active {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateY(-2px);
        }

        .nav-link.active {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .nav-icon {
          font-size: 1.25rem;
          transition: all 0.3s ease;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      .navbar-nav .nav-link.active, .navbar-nav .nav-link.show{
       color:white;
      }
        .action-btn {
          background: none;
          border: none;
          color: white;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-highlight {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: all 0.5s ease;
        }

        .action-btn:hover .btn-highlight {
          left: 100%;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .action-btn:active {
          transform: translateY(0);
        }

        .theme-toggle {
          transition: transform 0.5s ease;
        }

        .theme-toggle:hover {
          transform: rotate(180deg);
        }

        .sun {
          color: #FFD700;
          filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
        }

        .moon {
          color: #F4F6F0;
          filter: drop-shadow(0 0 2px rgba(244, 246, 240, 0.5));
        }

        .globe {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .profile-dropdown, .language-dropdown {
          position: relative;
        }

        .dropdown-content {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5px);
          min-width: 200px;
          margin-top: 0.5rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .profile-dropdown.open .dropdown-content,
        .language-dropdown:hover .dropdown-content {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-link {
          color: #333;
          text-decoration: none;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .dropdown-highlight {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 180, 219, 0.1),
            transparent
          );
          transition: all 0.5s ease;
        }

        .dropdown-link:hover .dropdown-highlight {
          left: 100%;
        }

        .dropdown-link:hover {
          background: #f5f5f5;
          color: #00B4DB;
          padding-left: 1.5rem;
        }

        .dropdown-icon {
          font-size: 1rem;
          color: #666;
          transition: all 0.3s ease;
        }

        .dropdown-link:hover .dropdown-icon {
          color: #00B4DB;
          transform: scale(1.1);
        }

        .dark .dropdown-content {
          background: #2d2d2d;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }
        
        .dark .dropdown-link {
          color: #fff;
        }

        .dark .dropdown-link:hover {
          background: #3d3d3d;
          color: #00B4DB;
        }
        .dropdown-menu.show{
        animation-name: dropdonw-effect;
        animation-duration: 0.3s;
        animation-fill-mode: both;
        }
      
        @keyframes dropdonw-effect {
      from {
        opacity: 0;
        transform: scale(1.2);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    

        @media screen and (min-width: 768px) and (max-width: 835px) {
           .nav-links {
             margin:0;
          }
          
          .nav-actions {
            gap: 0;
          }
          .navbar-container{
          padding:0;}
          .action-btn span {
            display: none;
          }

          .navbar-brand {
            font-size: 1rem;
          }
        }
          @media screen and (max-width: 767px){
          .navbar-container{
           display:none;
           }
          }
      `}</style>
    </nav>
  );
};

export default Navbar;
