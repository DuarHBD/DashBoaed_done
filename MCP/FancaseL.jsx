import React from "react";
import Dashborad from '../src/components/dashboard/dashborad'
import { useLocation, useParams } from 'react-router-dom';

const FancaseL = () => {
 

   
    const { partname } = useParams();  // รับ partname จาก URL
    const location = useLocation();  // ใช้ useLocation เพื่อดึงข้อมูลจาก state
    const data = location.state?.data;  // รับข้อมูลที่ส่งมาจาก Table ถ้ามีค่า ถ้าไม่มีundifine
    console.log('Partname from URL:', partname);
    // ค้นหาข้อมูลที่ตรงกับ partname
    const item = data ? data.find((row) => row.partname === partname) : null;
   
  return (
    <div>
     <Dashborad  item={item}/>
    </div>
  );
};

export default FancaseL;

