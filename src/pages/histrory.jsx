import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import "./histrory.css"
import { ImSpinner11 } from "react-icons/im";
import html2pdf from "html2pdf.js";
const DetailModal = ({ row, onClose ,onSave}) => {
  return (
   <div className="modal-overlay">
      <div className="modal-content-histro">
        <table className='table-record text-center' id='table-record'>
          <tbody><tr>
            <th colSpan={4}><h2>CNS FORMER PUBLIC COMPANY LIMITED(Branch2)</h2></th>
         </tr>
         <tr>
            <th>
            PARTNAME
            </th>
            <td>  {row.Partname}</td>
            <th>
            CUSTOMER
            </th>
             <td>  {row.Customer}</td>
         </tr>
         <tr>
            <th>
            PART NO
            </th>
            <td>  {row.partNo}</td>
            <th>
            PM,BD,MOLD
            </th>
             <td>  {row.PM}</td>
         </tr>
         <tr><th colSpan={2}>รูปภาพก่อนทำ</th>
         <th colSpan={2}>รูปภาพหลังทำ</th></tr>
        
         <tr>
         <td colSpan={2} className="image-cell">
                <div className="image-grid-histro">
                {(row?.imagesBefore && row.imagesBefore.length > 0) ? (
      row.imagesBefore.map((imgbefore, index) => (
        <div key={`before-${index}`} className="image-container">
          <img 
            src={imgbefore} 
            alt={`รูปก่อนทำ ${index + 1}`}
            className="image"
          />
        </div>
      ))
    ) : (
      <div className="no-image">ไม่มีรูปภาพ</div>
    )}
                </div>
              </td>
              <td colSpan={2} className="image-cell">
                <div className="image-grid-histro">
                {(row?.imagesAfter && row.imagesAfter.length > 0) ? (
      row.imagesAfter.map((imgbefore, index) => (
        <div key={`before-${index}`} className="image-container">
          <img 
            src={imgbefore} 
            alt={`รูปก่อนทำ ${index + 1}`}
            className="image"
          />
        </div>
      ))
    ) : (
      <div className="no-image">ไม่มีรูปภาพ</div>
    )}
                </div> </td>
          </tr>
          <tr>
            <th colSpan={2}>รายละเอียดก่อนทำ</th>
            <th colSpan={2}>รายละเอียดหลังทำ</th>
          </tr>
          <tr>
            <td colSpan={2} style={{textAlign:"start"}}> {row.detailbefore.split('\n').map((line, index) => (
    <span key={`${index}-detail-B`}>
      {line}
      {index !== row.detailbefore.split('\n').length - 1 && <br />}
    </span>
  ))}</td>
            <td colSpan={2} style={{textAlign:"start"}}> {row.detailafter.split('\n').map((line, index) => (
    <span key={`${index}-detail-B`}>
      {line}
      {index !== row.detailafter.split('\n').length - 1 && <br />}
    </span>
  ))}</td>
          </tr>
          <tr >
            <th colSpan={1} >สรุปผลดำเนินงาน : </th>
            <td colSpan={3} style={{textAlign:'start'}}>{row.sumary}</td>
          </tr>
          <tr >
          <th colSpan={1}>สรุปค่าใช่จ่ายทั้งหมด</th>
          <td colSpan={1}>{row.costSumary}</td>
          <td colSpan={2} style={{padding:'0'}}><div className='refer-data'><div><strong>PREPARE BY </strong> <br />{row.prepareName} <br />on {row.dateprepare}</div>
                           <div><strong>gr.ENGINEER</strong>  <br />{row.engineer} <br /> on {row.dateengineer}</div>
                           <div><strong>MINI MD</strong>  <br />{row.miniMD} <br /> on {row.datemini}</div>
                           </div> </td>
         </tr>
          </tbody>
         
        </table>  
      
       
       
        
         
          <button onClick={onClose} className="modal-close-histro-btn">Close</button>
          <button onClick={onSave} className='modal-save-histro-btn'>Save as PDF</button>        
        </div>
     
      
    </div>
  );
};

const DeleteConfirmModal = ({ onConfirm, onCancel ,row,loading,DeleteConfirm,errorDL}) => {
 
  return (
    <div className="modal-overlay">
     
      <div className="modal-content-histro-delete text-center">
        
        <h2>Confirm Deletion</h2>
       
       { loading ?(<div className="modal-actions">
        <ImSpinner11 className='loader-dalete' />
        </div>):(<div className="modal-actions"> 
        
        
        {DeleteConfirm||errorDL?(
          <><p>{DeleteConfirm||errorDL}</p> 
          <button onClick={onCancel} className="cancel-delete-histro-btn">Close</button></>):
          (<>
          <p> <p>Are you sure you want to delete  record No{row.record_no}?</p></p><button onClick={onConfirm} className="confirm-delete-histro-btn">Delete</button>
          <button onClick={onCancel} className="cancel-delete-histro-btn">Cancel</button></>)
            }
        
        </div>)}
      </div>
    </div>
  );
};

const Record = () => {
  const [RecordData, setRecordData] = useState([]);
  const [DeleteConfirm ,setDeleteConfirm]=useState("")
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [error, setError] = useState(null);
  const [errorDL,setErrorDL]=useState("")
  // const [data ,setData]=useState([{id:1,Partname:"555",Customer:'MCP',partNo:'123',PM:"mold",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //   ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},{id:2,Partname:"5556",Customer:'MCP',partNo:'123',PM:"INJECT",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //     ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},{id:3,Partname:"5585",Customer:'MCP',partNo:'1234',PM:"mold",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //       ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},{id:4,Partname:"5755",Customer:'MCP',partNo:'1235',PM:"CLEAN",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //         ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},{id:5,Partname:"5525",Customer:'MCP',partNo:'1236',PM:"mold",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //           ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},{id:6,Partname:"5755",Customer:'MCP',partNo:'1237',PM:"mold",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //             ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},{id:7,Partname:"5855",Customer:'MCP',partNo:'1238',PM:"mold",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //               ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},{id:8,Partname:"5855",Customer:'MCP',partNo:'1238',PM:"mold",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //                 ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},,{id:7,Partname:"5855",Customer:'MCP',partNo:'1238',PM:"mold",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //                   ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},{id:8,Partname:"5855",Customer:'MCP',partNo:'1238',PM:"mold",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //                     ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},,{id:7,Partname:"5855",Customer:'MCP',partNo:'1238',PM:"mold",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //                       ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"},{id:8,Partname:"5855",Customer:'MCP',partNo:'1238',PM:"mold",detailbefore:"aefgsgweg",detailafter:"aEFf aegagragr",sumary:"earthaehrteath aerghaerg",costSumary:"50000บาท"
  //                         ,prepareName:"Ton",dateprepare:"25-12-24",engineer:"Ton",dateengineer:"25-12-24",miniMD:"Moo",datemini:"1-1-25",imagesBefore:"",imagesAfter:"",Date:"20-1-25",Saveby:"tonton"}])
  const filteredData = RecordData.filter(row => 
  searchTerm === '' || 
  row.Partname.toLowerCase().includes(searchTerm.toLowerCase())
);

const fetchData = async () => {
  try {
    
   
    
    const response = await axios.get("http://ec2-3-91-233-159.compute-1.amazonaws.com/api/get-record", {
      headers: {
        
        'Content-Type': 'application/json'
      }, 
      withCredentials:true
    });

    console.log("Response Data:", response.data);
    setRecordData(response.data);
  } catch (err) {
    if (!err.response) {
      setError("Unable to connect to the server. Please try again later.");
    } else {
      console.log("Server Error:", err.response.data); // Debug ดูว่าข้อผิดพลาดจริงๆ คืออะไร
      setError(  err.response.data.msg ||
        err.response.data.message ||
        err.response.data.error ||
        "Something went wrong..");
    }
  }
};

// ✅ ใช้ useEffect เพื่อดึงข้อมูลตอนโหลดหน้า
useEffect(() => {
  fetchData();
}, []);

const confirmDelete =  async() => {
  setLoading(true) 
  try{
    
    const response = await axios.post('http://ec2-3-91-233-159.compute-1.amazonaws.com/api/get-record',showDeleteConfirm, {
    headers: { "Content-Type": "application/json" ,
               
    },withCredentials:true
  })
     
     setDeleteConfirm(response.data.message)
    //  setShowDeleteConfirm(null);
    //  setSelectedRow(null);
     fetchData();
     setLoading(false) 
    }
  catch(error){
    setLoading(false)
    if (error.response) {
      // ตรวจสอบว่า response มีข้อมูลหรือไม่
      // alert("Error: " + error.response.data.error  ) ; 
      setErrorDL(`${error.response.data.error}`)
  } else {
      // alert("Error: " + error.message); 
      setErrorDL(`${error.message}`)
  }

  }
} ;
  

const SaveData=()=>{
  const element = document.getElementById("table-record");
  html2pdf()
  .from(element)
  .set({
    margin: 3, 
    filename: `Record_number_${selectedRow.record_no}.pdf`, 
    html2canvas: { scale: 2 }, // ปรับความละเอียด
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" , putOnlyUsedFonts: true,
      compress: true} // ขนาดกระดาษและทิศทาง
  })
  .toPdf()
  .get('pdf')  // ดึง PDF object
  .then(pdf => {
    // เพิ่มข้อความลงใน PDF
    pdf.setFont("times"); // ตั้งฟอนต์
    pdf.setFontSize(16); // ตั้งขนาดฟอนต์
    pdf.setTextColor(255, 0, 0);
    pdf.text(`RECORD NO ${selectedRow.record_no } ON ${selectedRow.datemini} `, 65, 270); // เพิ่มข้อความที่พิกัด (x, y)
    
    // บันทึก PDF
    pdf.save(`Record_number_${selectedRow.record_no}.pdf`);
  });
  
}

  return (
    <div className='container-histrory'>
      <div className="header-histro">
        <h1>Maintenance Record</h1>
      </div>
      {error?(<div className='error-container'><h2 className="error-text" >{error}</h2>  
        </div>):
      (<><div className="detail-histro">
        <div className='amount-histro'><h4>entires : <span style={{fontSize:"1rem"}}>{filteredData.length} Record</span>  </h4></div>
        <div className='search-histro'>
          <input type="text"  placeholder='Search by Partname' className='input-histro'  value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
          <span className='search-his'><IoIosSearch  /></span>
      </div>
      </div>
      <div className="table-histro-container">
          <table className='table-histro'>
            <thead>
              <tr>
                <th>No</th>
                <th>Partname</th>
                <th className='partcode-histri'>Partcode</th>
                <th>Topic</th>
                <th>Date</th>
                <th >By</th>
                <th >Action</th>
                
              </tr>
            </thead>
            <tbody className='tbody-histro'>
              {filteredData.map((row)=>(
                <tr key={row.record_no}>
                  <td>{row.record_no}</td>
                  <td>{row.Partname}</td>
                  <td className='partcode-histri'>{row.partNo}</td>
                  <td>{row.PM}</td>
                  <td>{row.datemini}</td>
                  <td >{row.prepareName}</td>
                  <td> <div className='histro-action'>
                    <div ><button className='open-detail' onClick={() => setSelectedRow(row)}><FaEye  /></button></div>
                    <div ><button className='delete-detal'  onClick={() =>  setShowDeleteConfirm(row)}><MdDelete /></button></div>
                    </div> </td>


                </tr>

              ))}
            </tbody>
          </table>
        </div>
        {selectedRow && (
        <DetailModal 
          row={selectedRow} 
          onClose={() => setSelectedRow(null)} 
          onSave={SaveData}
          
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal 
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteConfirm(null);
            setSelectedRow(null);
            setDeleteConfirm("")
            setErrorDL("")

          }}
         row={ showDeleteConfirm}
         loading={loading}
         DeleteConfirm={DeleteConfirm}
         errorDL={errorDL}
        />
      )}</>)}
      
    </div>
  
  );
};

export default Record;
