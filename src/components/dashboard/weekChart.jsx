import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeekChart = ({dataweek}) => {
  function calpercentage(){
    const shot=dataweek.shot
    const target=dataweek.target
    const percentage=(shot/target)*100
    return percentage
  }
  function theme1(){
    const percentage=calpercentage()
    if (percentage <= 60) return "lightgreen"; // good
    if (percentage > 60 && percentage < 80) return "yellow"; // warning
    if (percentage >= 80) return "#F95454"; // bad
  }
  const data = {
    labels: ["1/4 weeks", "2/4 weeks", "3/4 weeks", "4/4 weeks"], // แกน X
    datasets: [
      {
        label: "Past Made", // ชื่อใน Legend
        data: [7500, 4400, 4700, 8800], // ข้อมูลในแกน Y
        backgroundColor: theme1(), // สีของแท่ง
        borderColor: theme1(), // สีขอบของแท่ง
        borderWidth: 1,
        barPercentage: 0.5,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Past Made",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
            stepSize: 2000, // เพิ่มช่วงค่าทีละ 2000
            max: 20000, // กำหนดค่าสูงสุดของแกน Y
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default  WeekChart;
