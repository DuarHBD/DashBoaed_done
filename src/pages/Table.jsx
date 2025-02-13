import React from "react";
import TableOverview from "../components/TableOverview";

const Table = ({darkMode}) => {
  return (
    <div className="page-container">
      <div className="page-header text-center ">
        <h1>Mold Maintenance Management System</h1>
      </div>
      <TableOverview darkMode={darkMode} />

      <style jsx>{`
        .page-container {
         
          padding: 1.5rem;
          background-color: var(--background-color);
          min-height: calc(100vh - 64px);
          transition: all 0.3s ease;
        }

        .page-header {
          margin-bottom: 0;
          padding: 1rem ;
          background: var(--card-bg);
          border-radius: 12px;
          box-shadow: 0 2px 4px var(--shadow-color);
        }

        .page-header h1 {
          color: var(--text-color);
          font-size: 2.5rem;
          font-weight: 600;
          margin: 0;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          display: inline-block;
        }

        /* Animation for header on page load */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-header h1 {
          animation: slideIn 0.4s ease forwards;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .page-container {
            padding: 1rem;
          }

          .page-header {
            padding: 1rem;
            margin-bottom: 1.5rem;
          }

          .page-header h1 {
            font-size: 1.5rem;
          }
        }

        /* Dark mode specific styles */
        :global(.dark-theme) .page-header {
          background: var(--surface-color);
        }

        :global(.dark-theme) .page-header h1 {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Table;