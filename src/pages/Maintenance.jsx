import React ,{useContext}from 'react';
import HeroSlider from '../components/maintenance/HeroSlider';
import ServiceCard from '../components/maintenance/ServiceCard';
import mold_shop from '../img/mold_shop.jpg';
import slide3 from '../img/slide3.jpg';
import slide4 from '../img/slide4.jpg';
import { LanguageContext } from '../datacontext/Langprovider';

const Maintenance = ({darkMode}) => {
  const {language}= useContext(LanguageContext)
  const services = [
    {
      image: mold_shop,
      title: "Mold Shop",
      description: "บริการงานแม่พิมพ์ครบวงจร ด้วยเครื่องมือที่ทันสมัยและทีมงานมืออาชีพ",
      path: "/maintenance/mold-shop"
    },
    {
      image: slide3,
      title: "Production Support",
      description: "สนับสนุนการผลิตด้วยเทคโนโลยีและนวัตกรรมที่ทันสมัย",
      path: "/maintenance/production-support"
    },
    {
      image: slide4,
      title: "Quality Control",
      description: "ควบคุมคุณภาพทุกขั้นตอนการผลิต เพื่อความพึงพอใจสูงสุดของลูกค้า",
      path: "/maintenance/quality-control"
    }
  ];

  return (
    <div className="min-h-screen mt-2 "style={{background:darkMode?'':'#f9f9f9'}} >
      <HeroSlider darkMode={darkMode} />
    <div style={{textAlign:'center'}} className='mt-5'>
      <h1 style={{color: darkMode ? 'white' : '#3C3D37'}}>{language=='TH'?'งานบริการของเรา':'Our services'}</h1>
    </div>
      <div style={{width:'100%' }} className='my-3 mx-0  '>
       
        <ServiceCard/>
      </div>
     
    </div>
  );
};

export default Maintenance;