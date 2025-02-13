import React, { useState ,useRef,useEffect,useContext } from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashboardmain.css";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CgSpinnerAlt } from "react-icons/cg";

import { DataContext } from "../datacontext/Dataformserver";



const Dashboardmain = ({darkMode}) => {
  const { Data, isConnected,isLoading,Wsblock } = useContext(DataContext);
  const [allMachineData1, setAllMachineData] = useState([]);
  // const [isConnected, setIsConnected] = useState(false);
  // const [isLoading, setIsLoading] = useState(true); // Add loading state
  const chartRef = useRef(null);
  const [Dropdownopen, setDropdownOpen] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  
  const allMachineData = [
    { id: 1, Partname: "FAN_CASE_L",partcode:'VU25Y393G01', countershot:49000,target:50000,mainshot:89130,mountData:LineData(),EnergyConsumer:6300,productprice:15,materialCost:5,status:'online',process:'running'},
    { id: 2,  Partname: "FAN_CASE_U" ,partcode:'VU25Y393G01',countershot:46000,target:50000,mainshot:89130,mountData:LineData(),EnergyConsumer:11200,productprice:16,materialCost:5,status:'online',process:'stoping'},
    { id: 3,  Partname: "PB_SUPPORT_460M",partcode:'VU25Y393G01', countershot:26000,target:50000,mainshot:89130,mountData:LineData(),EnergyConsumer:18200,productprice:17,materialCost:3,status:'online',process:'stoping'},
    { id: 4,  Partname: "PB-SUPPORT 611",partcode:'VU25Y393G01', countershot:6000,target:50000,mainshot:89130,mountData:LineData(),EnergyConsumer:4200,productprice:19,materialCost:2,status:'offline',process:'running'},
    { id: 5,  Partname: "PB-SUPPORT 711",partcode:'VU25Y393G01', countershot:69000,target:100000,mainshot:89130,mountData:LineData(),EnergyConsumer:48300,productprice:17,materialCost:2,status:'offline',process:'running'},
    { id: 6,  Partname: "PB-SUPPORT 811", partcode:'VU25Y393G01',countershot:46000,target:50000,mainshot:89130,mountData:LineData(),EnergyConsumer:39000,productprice:11,materialCost:3,status:'online',process:'running'},
    { id: 7,  Partname: "PB-SUPPORT 911", partcode:'VU25Y393G01',countershot:36000,target:50000,mainshot:89130,mountData:LineData(),EnergyConsumer:25200,productprice:19,materialCost:2,status:'offline',process:'stopping'},
    { id: 8,  Partname: "PB-SUPPORT 1011", partcode:'VU25Y393G01',countershot:8000,target:50000,mainshot:89130,mountData:LineData(),EnergyConsumer:5600,productprice:18,materialCost:2,status:'online',process:'running'},
    { id: 9,  Partname: "PB-SUPPORT 1012", partcode:'VU25Y393G01',countershot:6600,target:50000,mainshot:89130,mountData:LineData(),EnergyConsumer:4000,productprice:11,materialCost:5,status:'offline',process:'running'},
    { id: 10,  Partname: "PB-SUPPORT 1013",partcode:'VU25Y393G01', countershot:46000,target:50000,mainshot:89130,mountData:LineData(),EnergyConsumer:39000,productprice:13,materialCost:3,status:'online',process:'running'},
    { id: 11,  Partname: "PB-SUPPORT 1014", partcode:'VU25Y393G01',countershot:37000,target:50000,mainshot:89130,mountData:LineData(),EnergyConsumer:26000,productprice:14,materialCost:3,status:'online',process:'running'},
    
    
  ];
  

  useEffect(() => {
  
   setAllMachineData(Data)
  }, [Data]);

  console.log(allMachineData1)
  if (isLoading) {
    // Show loader while connecting
    return (
      <div className="loader-container">
        <CgSpinnerAlt className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }


  
  const Dark={
    alphaInline:darkMode?['0.8','0.5','0.3','0.1']:['0.9','0.7','0.4','0.3'],
    textColor:darkMode?'#E5E7EB':'#000000',
    alphaInBar:darkMode?['1','0.8','0.5','0.3']:['1','0.9','0.8','0.7'],
   }
  //  console.log('Text Color:', Dark.textColor);
  //  console.log('Color:', Dark.textColor);
  function LineData(){
    const randomLineData = Array.from({ length: 12 }, () => 
      Math.floor(Math.random() * (60000 - 5000 + 1)) + 5000
    );
    return randomLineData
  }
  // Mock Data สำหรับกราฟ Donut แต่ละเครื่องจักร data==>shot

  
  
function CalcultePercentage(progress,target){
         const percent=((progress/target*100)).toFixed(2)
         return percent
}

const EnergyCost=5;
 
  const itemsPerPage = 4;

  // คำนวณ Index ข้อมูลที่จะโชว์ในหน้านี้
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = allMachineData1.slice(indexOfFirstItem, indexOfLastItem);

  // ฟังก์ชันเปลี่ยนหน้า
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const getGradient = (ctx ,colorStops) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 200); // ไล่สีจากบนลงล่าง
    colorStops.forEach(stop => {
      gradient.addColorStop(stop.position, stop.color); // เพิ่ม stop สีจากอาร์เรย์ที่ส่งมา
    });
    return gradient;
  };
  // Mock Data สำหรับ Line Chart
  const linelabels = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const getLineColor = (index) => {
    const colors = [
      "#FFFF19", "#2dfd65", "#dc76e6", "#FF6384", 
    ];
    return colors[index]; 
  };

  const lineData = {
    
    labels: linelabels,
    datasets: currentData.map((machine, index) => ({
      label: machine.Partname,
      data: machine.mountData,
      borderColor: getLineColor(index),
      borderWidth: 2,
      backgroundColor: (context) => {
        const { ctx } = context.chart;
        const color = getLineColor(index);
        return getGradient(ctx, [
          { position: 0, color:  `rgba(${hexToRgb(color)}, ${Dark.alphaInline[0]})` },
          { position: 0.5, color:  `rgba(${hexToRgb(color)}, ${Dark.alphaInline[1]})` },
          { position: 0.75, color: `rgba(${hexToRgb(color)},${Dark.alphaInline[2]})` },
          { position: 1, color:  `rgba(${hexToRgb(color)},${Dark.alphaInline[3]})` }
        ]);
      },
      fill: true,
      tension: 0.4,
    })),
  };
  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `${r}, ${g}, ${b}`;
  };
  // Mock Data สำหรับ Bar Chart
  const barData = {
    labels: currentData.map((machine)=>machine.Partname),
    datasets: [
      {
        label: "Energy cost",
        data:  currentData.map((machine) => machine.EnergyConsumer*EnergyCost), // Data for first bar of each machine
        backgroundColor: (context) => {
          const { ctx } = context.chart;
          const gradientColors = 
            getGradient(ctx, [
              { position: 0, color: `rgba(239, 0, 52, ${Dark.alphaInBar[0]})` },
              { position: 0.5, color: `rgba(239, 0, 52, ${Dark.alphaInBar[1]})` },
              { position: 0.75, color: `rgba(239, 0, 52, ${Dark.alphaInBar[2]})` },
              { position: 1, color: `rgba(239, 0, 52, ${Dark.alphaInBar[3]})`}
            ])
            return gradientColors}
      },
      {
        label: "Sales",
        data: currentData.map(machine=>(machine.countershot*machine.productprice)), // Data for second bar of each machine
        backgroundColor:(context) => {
          const { ctx } = context.chart;
          const gradientColors = 
            getGradient(ctx, [
              { position: 0, color: ` rgba(0, 251, 4, ${Dark.alphaInBar[0]})` },
              { position: 0.5, color:  ` rgba(0, 251, 4, ${Dark.alphaInBar[1]})` },
              { position: 0.75, color:  ` rgba(0, 251, 4, ${Dark.alphaInBar[2]})` },
              { position: 1, color:  ` rgba(0, 251, 4, ${Dark.alphaInBar[3]})` }
            ])
            return gradientColors}
      },
      {
        label: "Material Cost",
        data: currentData.map(machine=>((machine.countershot*machine.materialCost).toFixed(0))), // Data for third bar of each machine
        backgroundColor: (context) => {
          const { ctx } = context.chart;
          const gradientColors = 
            getGradient(ctx, [
              { position: 0, color:  ` rgba(255, 255, 25, ${Dark.alphaInBar[0]})`},
              { position: 0.5, color: ` rgba(255, 255, 25, ${Dark.alphaInBar[1]})` },
              { position: 0.75, color: ` rgba(255, 255, 25, ${Dark.alphaInBar[2]})` },
              { position: 1, color: ` rgba(255, 255, 25, ${Dark.alphaInBar[3]})` }
            ])
            return gradientColors}, // Color for third bar
      },
     
    ],
  };
  
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  return (
    <div className="dashboard-container "data-theme={darkMode ? 'dark' : 'light'}>

  
      {/* Header */}
      <div className="header  ">
       <h2 className="time-card"> DashBoard Overview</h2>
      </div>
      {isConnected?(<> {/* donut */}
      <div className="donut-charts" >
        {currentData.map((machine) => (
          <div key={machine.id} className="donut-chart" style={{width:'320px'}}>
            <div style={{position:'relative'}}>
            <h5>{machine.Partname} </h5>
            <div className='warningbtn'>
            {CalcultePercentage(machine.countershot,machine.target)>=80 
            &&(<button className={`warningbtnInfo ${Dropdownopen[machine.id]?'open':''}` } 
              onClick={()=>setDropdownOpen(prev=>({
                ...prev,
                [machine.id]:!prev[machine.id]
              }))} 
            style={
            {color:CalcultePercentage(machine.countershot,machine.target)>=95?'red':'#ff9800',
            background:'none'}} >
              <IoWarningOutline className="warning-icon"/>  
              <span 
                    className="waring-desc" 
                    style={{ textAlign: 'start' }}
                  >
                    {CalcultePercentage(machine.countershot, machine.target) >= 95 
                      ? (
                        <>
                          CAUTION! <br />
                          Need to Maintenance <br />
                          <Link to="/table" >Action </Link>
                        </>
                      ) : (
                        <>
                          WARNING! <br />
                          Counter Shot Close To Target
                        </>
                      )}
                  </span>
            </button>)}
           
             
            </div>
          
           
            </div>
           
            <div className="upper">
            <div className="donut-chart-chart"  style={{ width: "150px", height: "150px" }}>
            <Doughnut 
              data={{
                labels: ["Progress", "Target", ],
                datasets: [
                  {
                    data:CalcultePercentage(machine.countershot,machine.target)>=100
                    ?[machine.countershot,0]
                    :[machine.countershot,machine.target-machine.countershot],

                    backgroundColor: (context) => {
                      const { ctx } = context.chart;
                     
                      const gradientColors = [
                        getGradient(ctx, [
                          { position: 0, color: "rgb(247, 78, 114)" },
                          { position: 1, color: "rgb(55, 226, 226)" }
                        ]),
                        getGradient(ctx, [
                          { position: 0, color: "rgba(0, 0, 0, 0.2)" },
                         
                        ])
                      ];
                      return gradientColors;
                    
                     
                    },
                    borderWidth: 0,
                  },
                  
                ],
              }}
               />
           
            
            </div>
            <div className="status">
              <h6>status:</h6>
              <h6 style={{color:machine.status=='online'?'green':'red'}}>{machine.status}</h6>
              <h6>Progress:</h6>
              <h6 style={{color:'rgba(255, 99, 132, 0.8)'}} >{CalcultePercentage(machine.countershot,machine.target)}%</h6>
             
            </div>
            </div>
           
            <div className="donut-chart-desc" >
              <ul style={{paddingLeft:'0'}}>
             
              <li className="li-dash">Product Volume: <span>{formatNumber(machine.countershot)}unit</span> </li>
              <li className="li-dash">sales(unit x {machine.productprice}): <span>{formatNumber(machine.countershot*machine.productprice)}Bath</span></li>
              <li className="li-dash">Energy Consumtion: <span>{formatNumber(machine.EnergyConsumer.toFixed(1))}Kwatt</span> </li>
              <li className="li-dash">Energy Cost: <span>{formatNumber((machine.EnergyConsumer*EnergyCost).toFixed(1))}Bath</span></li>
              <li className="li-dash">Material(unit x {machine.materialCost}) : <span> {formatNumber(machine.materialCost*machine.countershot)}Bath</span></li>
             
               {/* <li>Gross Profit: <span>60000Bath</span></li> */}
               </ul> 
            </div>
          </div>
        ))}
      </div>
      {/* bar */}
      <div className="bar-chart-profit" >
     {/* Bar Chart */}
      <div className="bar-chart">
        <Bar data={barData}  options={{
          responsive: true, maintainAspectRatio: false,
          scales: {
            x: {
              ticks: { color: Dark.textColor },
              grid: { color: "#374151" },
            },
            y: {
              ticks: { color:  Dark.textColor  },
              grid: { color: "#374151" },
              
            },
          },
          plugins: {
            
            legend: {
              display: true,
              labels: {
                color:  Dark.textColor ,
              },
            },
            
          },
          }} />
          </div>
         
          <div className="profit" >
          {currentData.map((machine,index)=>( 
            <div key={machine.id} className={`profit-box ${index==0||index==3 ? 'blue':'purple'}`}>
              <span className="circle c1"></span>
              <h3 className="text-precent">{machine.Partname}</h3>
              <div className="percentage">
                <h6 >Production Gross Profit: <span>
              {(100*(machine.countershot*machine.productprice-(EnergyCost*machine.EnergyConsumer+machine.countershot*machine.materialCost))/(machine.productprice*machine.countershot)).toFixed(0)}%
                  </span></h6>
               {/* ยอดขาย-ทุน(ค่าไฟ+ค่าสินค้า)/ยอดขาย*100 */}
              </div>
            </div>
           
          ))}
          </div>
        
      </div>
 
      {/* Line Chart */}
        <div className="line-chart">
     
     <Line data={lineData}
     ref={chartRef}
      options={{
       responsive: true,
       maintainAspectRatio: false,
       
       plugins: {
         title: {
           display: true,  // ทำให้ title แสดง
           text: 'Yearly Production',  // ข้อความ title
           color:  Dark.textColor ,  // สีของ title
           font: {
             size: 22,  // ขนาดฟอนต์
             family: 'Arial',  // ฟอนต์
             weight: 'bold',  // น้ำหนักฟอนต์
           },
           padding: {
             top: 10,
             bottom: 30,
           },
         },
         legend: {
           display: true,
           labels: {
             color:  Dark.textColor ,
           },
         },
         
       },
       scales: {
         x: {
           ticks: { color:  Dark.textColor  },
           grid: { color: "#374151" },
         },
         y: {
           ticks: { color:  Dark.textColor  },
           grid: { color: "#374151" },
           min: 0,    // กำหนดค่าต่ำสุดของแกน Y
           max: 60000, // กำหนดค่าสูงสุดของแกน Y
         },
       },
     }}/>
   </div>
      
      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(allMachineData1.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div></>):(<><div className="error-container">
    <h2 className="error-text" >{Wsblock}</h2>  
    
  </div></>)}
        
  </div>   
  );
};

export default Dashboardmain;

