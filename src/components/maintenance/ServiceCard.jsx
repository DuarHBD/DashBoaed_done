import React ,{useContext }from 'react';
import { useNavigate } from 'react-router-dom';
import mold_shop from '../../img/mold_shop.jpg'
import slide3 from '../../img/slide3.jpg'
import slide4 from '../../img/slide4.jpg'
import { LanguageContext } from '../../datacontext/Langprovider';
const ServiceCard = () => {
  const { language } = useContext(LanguageContext);
  const cardData = [
    {
      image: mold_shop,
      title: 
        {
          thai:'บริการด้านคุณภาพ',
           Eng:'Quality services'
          },
      description:{
        thai:'มาตรฐานการผลิตสากล',
        Eng:'International production standard'
      },
     
    },
    {
      image: slide3,
      title: 
        {
          thai:'บริการด้านความตรงต่อเวลา',
           Eng:'Punctuality services'
          },
      description:{
        thai:'ส่งมอบงานตรงเวลาเชื่อถือได้',
        Eng:'on-time delivery with reliability'
      },
      
    },
    {
      image: slide4,
      title: 
        {
          thai:'บริการด้านความปลอดภัย',
           Eng:'Safety  services'
          },
      description:{
        thai:'ใส่ใจความปลอดภัยทุกขั้นตอน',
        Eng:'Ensuring safety at every step '
      },
    }
  ];

  return (
    <div className="row   px-0 justify-content-center align-items-center  " style={{gap:'3rem'}}  >
      {cardData.map((card, index) => (
        <div key={index} className="card  col-10 col-lg-3  p-0 rounded-4" style={{ height: '18rem', minHeight:'12rem', background:'none', color:'white' }}>
          <img
            src={card.image}
            className="card-img rounded-4"
            alt={card.title}
            style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%',overflow:'hidden' }}
          />
          <div className="card-img-overlayCSS ">
             <h5 className='card-title'> {language === "TH" ? card.title.thai : card.title.Eng}</h5>
            <p className="card-text">{language === "TH" ? card.description.thai: card.description.Eng}</p>
           
          </div>
        </div>
      ))}
        <style>{`
    
    .card:hover img {
         cursor:pointer;
          animation: zoom-out ;
           animation-duration: 1.5s;
          animation-fill-mode: both;
        }

        /* Keyframes สำหรับ zoom out */
        @keyframes zoom-out {
          from {
            opacity:0.5;
            transform: scale(1.5); /* เริ่มจาก zoom in */
          }
          to {
           opacity:1;
            transform: scale(1); /* กลับมาขนาดปกติ */
          }

        }
     .card{
     overflow:hidden;
     }
   
     .card-img-overlayCSS{
     position:absolute;
     padding:1rem;
     bottom:0;}
  `}</style>
    </div>
  );

};

export default ServiceCard;