import React from "react";
import { useState ,useEffect } from "react";
function Header({data}){
console.log('data in head',data)
const[satatusColor,setStatusColor]=useState(true)
useEffect(() => {
  if (data.status === "Running") {
    setStatusColor(true);  // ถ้า status เป็น 'Running' ให้ตั้งเป็น true
  } else {
    setStatusColor(false); // ถ้าไม่ใช่ 'Running' ให้ตั้งเป็น false
  }
}, [data.status]); // ตรวจสอบเมื่อ data.status เปลี่ยน
function calpercentage(){
  const shot=data.shot
  const target=data.target
  const percentage=(shot/target)*100 
  return percentage
}
function settreme(){
  const percentage=calpercentage()
  if (percentage <= 60) return "lightgreen"; // good
  if (percentage > 60 && percentage < 80) return "yellow"; // warning
  if (percentage >= 80) return "#F95454"; // bad
}
 return(
    <div style={{backgroundColor:settreme()}} className="d-flex justify-content-between align-items-center  text-white p-3">

         <div>
          <h5>PartName: <span>{data.partname}</span></h5>
          <h6>PartCode: <span>{data.partcode}</span></h6>
        </div>
        <div>
          <h6>Status: <span style={{ color: satatusColor ? 'lightgreen' : 'yellow' }}>{data.status}</span></h6>
        </div>
    </div>
 )

}
export default Header;