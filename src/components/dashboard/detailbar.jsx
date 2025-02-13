import React from "react";
import './detailbar.css'
function DetailBar(){
    return(
        <div style={{width:'100%'}} className="parent d-flex text-center">
            <div style={{width:'25%'}}>
              <h5 style={{fontSize:'14px'}}>BInaryCode</h5>
              <h6 style={{fontSize:'12px'}}>0001</h6>
            </div>
            <div style={{width:'25%'}}>
            <h5 style={{fontSize:'14px'}}>CAV_SET</h5>
            <h6 style={{fontSize:'12px'}}>1</h6>
            </div>
            <div style={{width:'25%'}}>
            <h5 style={{fontSize:'14px'}}>Date</h5>
            <h6 style={{fontSize:'12px'}}>24-11-2024</h6>
            </div>
            <div style={{width:'25%'}}>
            <h5 style={{fontSize:'14px'}}>Mc use</h5>
            <h6 style={{fontSize:'12px'}}>34</h6>
            </div>

        </div>
    )

}
export default DetailBar