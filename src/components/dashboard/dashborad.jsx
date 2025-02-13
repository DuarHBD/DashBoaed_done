import React,{useContext} from "react";
import './dashboard.css'
import DoughnutChartsNested from "./pieChartComponent";
import Header from "./header";
import TotalShort from "./totalShort";
import DetailBar from "./detailbar";
import Mold from "./mold";
import WeekChart from "./weekChart";
import { useLocation, useParams ,Link} from 'react-router-dom';
import { DataContext } from "../../datacontext/Dataformserver";

function Dashboard() {
   const { Data } = useContext(DataContext);
    const { Partname } = useParams();  // รับ partname จาก URL
    const location = useLocation();  // ใช้ useLocation เพื่อดึงข้อมูลจาก state
    const data = location.state?.data;  // รับข้อมูลที่ส่งมาจาก Table ถ้ามีค่า ถ้าไม่มีundifine
    
    // ค้นหาข้อมูลที่ตรงกับ partname
    const item = Data? Data.find((row) => row.Partname === Partname) : null;
    console.log(item)
    return (
    <div className="d-flex  ">
    <div className="container my-4 " style={{height:'60%'}}>
      <Header data={{Partname:item.Partname,partcode:item.partcode,status:item.status,shot:item.countershot ,target:item.target}}/>
      <DetailBar/>
      <div className="row mt-2">
      <Mold data={{mainshot:item.mainshot}}/>
      <DoughnutChartsNested data={{shot:item.countershot ,target:item.target}}/>
      <div className="col-12 col-md-4 d-flex flex-column">
      <TotalShort data={{shot:item.countershot,target:item.target}}/>
      <WeekChart  dataweek={{shot:item.countershot ,target:item.target}}/>
      </div>
     
      </div>
      <Link to={`/table`}>
      <div className="text-center "><button className="btn btn-outline-primary my-3" >กลับสู่หน้าหลัก</button></div>
      </Link>
     
    </div>
   
    </div>
  );
}

export default Dashboard;


