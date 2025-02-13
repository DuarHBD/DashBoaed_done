import React,{useContext} from 'react';
import { LanguageContext } from '../datacontext/Langprovider';


const Footer = () => {
  const {language}=useContext(LanguageContext)
  return (
    <footer className="footer" >
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-item">
           
            <p className="footer-text"><i className="bi bi-geo-alt-fill px-2"></i>
            {language === "TH" && '128/888 ซอย พระบารมี ซอย 1/6 อ.กะทู้ จ.ภูเก็ต 83150 '}
            {language === "EN" && ' 128/888 Soi Phabaramee Soi 1/6, Kathu, Phuket 83150'}
             
            </p>
          </div>

          <div className="footer-item" >
           
            <div className="business-hours ">
          
              <span className="hours-text">   <i className="bi bi-clock-history px-2"></i>
              {language === "TH" && 'จันทร์-เสาร์:8.00-17.00'}
              {language === "EN" && ' Mon-Sat: 8 AM–5 PM'}
             
             </span>
              <span className="hours-closed">
              {language === "TH" && 'วันอาทิต:หยุดทำการ'}
              {language === "EN" && ' Sun: Closed'}</span>
            </div>
          </div>

          <div className="footer-item contact-info">
           
            <div className="contact-details">
           
              <span className="phone-number"> <i className="bi bi-telephone px-2"></i>095-075-2597</span>
              <span className="copyright">©copyright 2025 DUAR WAT </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--backgroud-color);
          border-top: 2px solid var(--border-color);
          padding: 0.5rem 0;
          font-size: 0.875rem;
          margin-top:2rem;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .footer-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content:center;
          text-align:center;
           color: var(--text-color);
        }

        .footer-icon {
          color: #3182CE;
          flex-shrink: 0;
          width: 18px;
          height: 18px;
        }

        .footer-text {
         
          line-height: 1.5;
          margin: 0;
        }

        .business-hours {
          display: flex;
          gap: 1.5rem;
        }

       

        .hours-closed {
          color: #E53E3E;
        }

        // .contact-info {
        //   justify-content: flex-end;
        // }

        .contact-details {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

       

        /* Dark theme support */
        :root[data-theme="dark"] .footer {
          background: #1A202C;
          border-top-color: #2D3748;
        }

        :root[data-theme="dark"] .footer-text,
        :root[data-theme="dark"] .hours-text,
        :root[data-theme="dark"] .phone-number {
          color: #A0AEC0;
        }

        :root[data-theme="dark"] .copyright {
          color: #718096;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

         

          .contact-details {
            flex-direction: column;
            gap: 0.5rem;
            
          }

          .business-hours {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;