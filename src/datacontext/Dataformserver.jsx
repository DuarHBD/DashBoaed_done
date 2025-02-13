import React, { createContext, useState,useEffect } from "react";
import io from "socket.io-client";
export const DataContext = createContext();

// Provider Component
 const DataProvider = ({ children }) => {
  
  const [Wsblock, setWSblock] = useState("");
  
  const [Data, setdata] = useState([]);
   const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    
    const [Token, setToken] = useState(localStorage.getItem("token_io")|| "");


  
 
    useEffect(() => {
   
   
     
     
  
      const socket = io("ec2-3-91-233-159.compute-1.amazonaws.com",{query: { token:Token  } ,
       } )
      // เมื่อเชื่อมต่อสำเร็จ
      socket.on("connect", () => {
        console.log("Connected to Flask WebSocket!");
        setIsConnected(true);
        setIsLoading(false); // หยุดแสดงสถานะโหลด
        
      }); socket.on("initial_data", (data) => {
        console.log("Initial Data:", data);
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        
        setdata(parsedData)
        
      });
      // เมื่อเกิดข้อผิดพลาด
      socket.on("error", (err) => {
        console.error("Connection Error:", err);
        setWSblock(err.message)
        
        setTimeout(() => {  // 👈 รอ 100ms ก่อนตัดการเชื่อมต่อ
          socket.disconnect();
          console.log("❌ Manually Disconnected due to error.");
      }, 2000);
        
        
  
      });
      socket.on("data_update", (newData) => {
        console.log("New Data Received:", newData);
        const parsedData = typeof newData === 'string' ? JSON.parse(newData) : newData;
       
        setdata(parsedData)
        console.log('updates',newData)
      });
      socket.on("disconnect", () => {
        console.log("Disconnected from Flask WebSocket!");
        setIsConnected(false);
        setIsLoading(false)
    });
    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err);
      
    });
    return () => {
      socket.disconnect();
      console.log("WebSocket Disconnected");
    };
   

    
   
  }, [Token]);

  return (
    <DataContext.Provider value={{ Data, isConnected,isLoading,Wsblock, Token, setToken }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;