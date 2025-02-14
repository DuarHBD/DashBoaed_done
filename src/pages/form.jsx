import React, { useState, useEffect } from "react";
import "./form.css";
import { Link ,useLocation} from "react-router-dom";
import axios from "axios";
import Resizer from "react-image-file-resizer";

const Formcomponent = ({ darkMode }) => {
  const location = useLocation();
  const { partname = "", partcode = "" } = location.state || {};
  console.log('location:', location);  
  const [formData, setFormData] = useState({ Partname: partname || '', Customer: "", partNo: partcode || '', PM: "" ,detailbefore:"",detailafter:"",sumary:"",costSumary:""
    ,prepareName:"",dateprepare:"",engineer:"",dateengineer:"",miniMD:"",datemini:""
  });
  const [imagesBefore, setImagesBefore] = useState(Array(4).fill(null)); // สำหรับภาพก่อนทำ PM
  const [imagesAfter, setImagesAfter] = useState(Array(4).fill(null)); // สำหรับภาพหลังทำ PM
  const [success,setSucess]=useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (event, index, isAfter = false) => {
    const file = event.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        400, // ความกว้างสูงสุด
        300, // ความสูงสูงสุด
        "JPEG", // ประเภทไฟล์
        80, // คุณภาพ
        0, // การหมุนภาพ (0 = ไม่หมุน)
        (uri) => {
          if (isAfter) {
            const updatedImages = [...imagesAfter];
            updatedImages[index] = uri;
            setImagesAfter(updatedImages);
          } else {
            const updatedImages = [...imagesBefore];
            updatedImages[index] = uri;
            setImagesBefore(updatedImages);
          }
        },
        "base64" 
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      imagesBefore: imagesBefore.filter((image) => image !== null), 
      imagesAfter: imagesAfter.filter((image) => image !== null),   
    };
    console.log('กำลังส่งข้อมูล:', formData); // เช็คข้อมูลที่จะส่ง
    // const Token = localStorage.getItem("Token");
    try {
      // if (!Token) {
      //   throw new Error("Token not found. Please log in first.");
      // }
        const response = await axios.post("http://ec2-54-236-179-184.compute-1.amazonaws.com/api/submit", dataToSend, {
          headers: { "Content-Type": "application/json"
            
           },withCredentials:true
        });
        console.log('การตอบกลับ:', response.data); // เช็คการตอบกลับ
        // alert(response.data.message);
        setFormData({ Partname: "", Customer: "", partNo: "", PM: "" ,detailbefore:"",detailafter:"",sumary:"",costSumary:""
          ,prepareName:"",dateprepare:"",engineer:"",dateengineer:"",miniMD:"",datemini:""
        })
        setSucess(true)

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error); // แสดงรายละเอียดข้อผิดพลาด
        
        if (error.response) {
          // ตรวจสอบว่า response มีข้อมูลหรือไม่
          alert(error.response.data.error ||error.response.data.message); // แสดงข้อความที่ส่งจากเซิร์ฟเวอร์
      } else {
          alert("Error: " + error.message); // ถ้าไม่มีข้อมูลจาก response ก็จะดึงข้อความ error ทั่วไป
      }
    }
};
if (success){
   return(
    <div className="Success-alert">
      <div><p>Data save successfully </p>
       <Link to={`/table`}>
            <div className="text-center "><button className="btn btn-outline-primary my-3" >กลับสู่หน้าtable</button></div>
      </Link></div>
    </div>
   )
}
  return (
    <div className={`formComponent`}>
      <div className="Form-container">
        <form onSubmit={handleSubmit} className={ `Form-Area my-1 ${darkMode? 'dark':''} `}>
          <div className="header-form">
            <h1 style={{textAlign: "center" }}>MAINTENANCE FORM</h1>
          </div>
          <div className="grid-table">
            {/* ข้อมูลทั่วไป */}
            <div className="layout-2col pb-3">
              <div className="form-split form-group d-flex align-items-center">
                <label htmlFor="name" className="label-stye">Partname</label>
                <input
                 
                  id="Partname"
                  name="Partname"
                  value={formData.Partname}
                  onChange={handleChange}
                  className="form-control"
                  required
                   placeholder="Enter Part Name"
                />
              </div>
              <div className="form-split form-group d-flex align-items-center">
                <label htmlFor="Customer" className="label-stye">Customer</label>
                <input
                 
                  id="Customer"
                  name="Customer"
                  value={formData.Customer}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Enter Customer"
                />
              </div>
            </div>
            <div className="layout-2col pb-3">
              <div className="form-split form-group d-flex align-items-center">
                <label htmlFor="partNo" className="label-stye">PartNo</label>
                <input

                  id="partNo"
                  name="partNo"
                  value={formData.partNo}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Enter Part Number"
                />
              </div>
              <div className="form-split form-group d-flex align-items-center">
                <label htmlFor="Date" className="label-stye">PM,BD,Mold</label>
                <input
                  id="PM"
                  name="PM"
                  value={formData.PM}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Enter PM,BD,Mold"
                />
              </div>
            </div>

            {/* รูปภาพก่อนทำ PM */}
            <div className="layout-2col pb-3">
              <div className=" text-center box-border">
                <h5 className="topic-text">รูปภาพก่อนทำ PM</h5>
                <div className="image-grid">
                  {imagesBefore.map((image, index) => (
                    <div key={index} className="image-box">
                      <label htmlFor={`upload-before-${index}`} className="upload-label">
                        {image ? (
                          <img
                            src={image}
                            alt={`Before PM ${index}`}
                            className="uploaded-image"
                          />
                        ) : (
                          <span className="upload-icon">+</span>
                        )}
                      </label>
                      <input
                        id={`upload-before-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageUpload(event, index)}
                        className="upload-input"
                      />
                    </div>
                  ))}
                </div>
                
              </div>
                   {/* รูปภาพหลังทำ PM */}
            <div className="text-center box-border">
              <h5 className="topic-text">รูปภาพหลังทำ PM</h5>
              <div className="image-grid">
                {imagesAfter.map((image, index) => (
                  <div key={index} className="image-box">
                    <label htmlFor={`upload-after-${index}`} className="upload-label">
                      {image ? (
                        <img
                          src={image}
                          alt={`After PM ${index}`}
                          className="uploaded-image"
                        />
                      ) : (
                        <span className="upload-icon">+</span>
                      )}
                    </label>
                    <input
                      id={`upload-after-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleImageUpload(event, index, true)}
                      className="upload-input"
                    />
                  </div>
                ))}
              </div>
            </div>
            </div>
            <div className="layout-2col pb-3">
                <div className="detail-box box-border">
                  <h5 className="text-center">รายละเอียดก่อนทำ</h5>
                  <textarea rows={3} id="detailbefore" name="detailbefore" className="form-control" placeholder="Enter detail before PM"
                   onChange={handleChange}  value={formData.detailbefore}/>
              </div>
              <div className="detail-box box-border">
                  <h5 className="text-center">รายละเอียดหลังทำ</h5>
                  <textarea id="detailafter" name="detailafter" className="form-control" placeholder="Enter detail after PM"
                   rows={3} onChange={handleChange}  value={formData.detailafter}/>
              </div>
          </div>
          <div className="layout-1col pb-3">
           
            <textarea className="form-control" placeholder="สรุปผลดำเนินงาน" id="sumary" name="sumary"
            onChange={handleChange}  value={formData.sumary}/>
          </div>
          <div className="layout-2col pb-3">
            <div> <textarea className="form-control" placeholder="สรุปค่าใช่จ่ายทั้งหมด" rows={4} id="costSumary" name="costSumary"
            onChange={handleChange}  value={formData.costSumary}/></div>
            <div className="singnature">
              <div className="singnature-box">
                <h5 className="singnature-text">PREPARE BY</h5>
                <input type="text" className="form-control" placeholder="Enter name who prepare" id="prepareName" name="prepareName" 
                value={formData.prepareName} onChange={handleChange}/>
                <input type="date" name="dateprepare" id="dateprepare"    style={{ WebkitAppearance: 'none',}} className="form-control"
                 value={formData.dateprepare} onChange={handleChange}/>
                </div>
              <div className="singnature-box">
                <h5 className="singnature-text">gr.ENGINEER</h5>
                <input type="text" className="form-control" placeholder="Enter Engineer name " id="engineer" name="engineer"
                value={formData.engineer} onChange={handleChange} />
                <input type="date" name="dateengineer" id="dateengineer"  className="form-control"
                value={formData.dateengineer} onChange={handleChange}/>
                </div>
              <div className="singnature-box">
                <h5 className="singnature-text">MINI MD</h5>
                <input type="text" className="form-control" placeholder="Enter mini MD" id="miniMD" name="miniMD"
                value={formData.miniMD} onChange={handleChange}/>
                <input type="date" name="datemini" id="datemini"  className="form-control"
                value={formData.datemini} onChange={handleChange}/>
                </div>
            </div>
          </div>
         
         
          </div>
        

          
          <div className="btn-box"> 
          <Link to={`/table`}><button type="buton" className="btn btn-warning ">
            cancel  
           </button> </Link>
           
           <button type="submit" className="btn btn-success  ">
            Submit
          </button>
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default Formcomponent;
