import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaToolbox, FaTable, FaChartPie, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { 
      name: "Maintenance",
      path: "/",
      icon: <FaToolbox size={20} />,
    },
    { 
      name: "Table",
      path: "/table",
      icon: <FaTable size={20} />,
    },
    { 
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie size={20} />,
    },
  ];

  return (
    <div 
      className={`sidebar-container ${isHovered ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="sidebar-content">
        <div className="sidebar-header">
          <FaBars size={24} className="menu-icon" />
          <h1 className="title">4M MENU</h1>
        </div>

        <nav className="menu-items">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="menu-link"
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .sidebar-container {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          background: #1e1e2d;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          overflow: hidden;
        }

        .collapsed {
          width: 64px;
        }

        .expanded {
          width: 180px;
        }

        .sidebar-content {
          width: 180px;
          height: 100%;
          display: flex;
          flex-direction: column;
          color: #ffffff;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          height: 64px;
          background: rgba(255, 255, 255, 0.05);
        }

        .menu-icon {
          min-width: 24px;
          margin-right: 1rem;
          color: #6993FF;
        }

        .title {
          font-size: 1.25rem;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .expanded .title {
          opacity: 1;
        }

        .menu-items {
          padding: 1rem 0;
          overflow-y: auto;
        }

        .menu-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          color: #9899ac;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .menu-link:hover {
          color: #ffffff;
          background: rgba(105, 147, 255, 0.1);
        }

        .menu-link:hover::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: #6993FF;
        }

        .icon {
          min-width: 24px;
          margin-right: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text {
          font-size: 1rem;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .expanded .text {
          opacity: 1;
        }

        /* Custom Scrollbar */
        .menu-items::-webkit-scrollbar {
          width: 6px;
        }

        .menu-items::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .menu-items::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .menu-items::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Active Link Styles */
        .menu-link.active {
          color: #ffffff;
          background: rgba(105, 147, 255, 0.1);
        }

        .menu-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: #6993FF;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .sidebar-container {
            transform: translateX(-100%);
          }

          .sidebar-container.expanded {
            transform: translateX(0);
          }

          .collapsed {
            transform: translateX(-100%);
          }
        }

        /* Overlay for mobile */
        @media (max-width: 768px) {
          .expanded::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: -1;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;