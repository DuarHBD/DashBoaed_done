import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
function DoughnutChartsNested({data}) {
function calpercentage(){
  const shot=data.shot
  const target=data.target
  const percentage=((shot/target)*100).toFixed(2)
  return  percentage
}
function theme(){
  const percentage=calpercentage()
  if (percentage <= 60) return "lightgreen"; // good
  if (percentage > 60 && percentage < 80) return "yellow"; // warning
  if (percentage >= 80) return "#F95454"; // bad
}
  const doughnutDataTrack = {
  labels: ["Track", "Remaining"], // วงในสุดสำหรับ track
  datasets: [
    {
      data: [100, 0], // วงนี้จะเต็มทั้งหมดเพราะเป็น track
      backgroundColor: ["rgba(201, 203, 207, 1)", "rgba(201, 203, 207, 1)"], // สีของ track
      borderColor: ["rgba(201, 203, 207, 1)", "rgba(201, 203, 207, 1)"],
      borderWidth: 0, // ไม่มีขอบ
      borderRadius: 0, // ความโค้งของวง
    },
  ],
};

const doughnutDataProgress = {
  labels: ["Progress", "Remaining"], // วงนอกสำหรับแสดงการวิง
  datasets: [
    {
      data: calpercentage() >=100
      ? [calpercentage(), 0] // หาก calpercentage() > 100, ให้ index 1 เป็น 0
      : [calpercentage(), 100 - calpercentage()], // กำหนดเปอร์เซ็นต์ปกติ
      backgroundColor: [theme(), "rgba(201, 203, 207, 0)"], // สีของ progress
      borderColor: [theme(), "rgba(201, 203, 207, 0)"],
      borderWidth: 0, // ไม่มีขอบ
      borderRadius: 40, // ความโค้งของวง
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  cutout: "80%", // กำหนดช่องตรงกลางของทั้งสองวง
  rotation: 0, // ทำให้วงเริ่มที่ตำแหน่งที่กำหนด
  circumference: 360, // ทำให้กราฟแสดงเป็นครึ่งวง
  plugins: {
    legend: {
      display: false, // ซ่อน Legend
    },
    tooltip: {
      enabled: false, // ปิด Tooltip
    },
  },
};


  return (
    <div className="col-12 col-md-4" style={{  margin: "  0", height:'350px'  }} >
      <div ><h1 className="text-secondary fs-3 text-center   mb-3">Shot In Percentage</h1></div>
      <div style={{ position: "relative", width: "100%", height: "280px",display:'flex', justifyContent:'center', alignItems:'center'}}>
        {/* วง Track (วงในสุด) */}
        <Doughnut data={doughnutDataTrack} options={doughnutOptions} style={{position:'absolute'}} />
        <h5 style={{position:'absolute '}} className="fs-2 text-secondary text-center">Progress:<p><span style={{color:"#414141",zIndex: 10}}> {calpercentage()}%</span></p> </h5>
        {/* วง Progress (วงนอก) */}
        <Doughnut data={doughnutDataProgress} options={doughnutOptions}  style={{position:'absolute'}} />
      </div>
    </div>
  );
}

export default DoughnutChartsNested;