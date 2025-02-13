import React from "react";

function Mold({data}){

    return(
        <div  className="col-12 col-md-4" style={{height:'350px'}}>
            <h1 className="fs-3 text-secondary ps-2 mb-3 text-center">Mold Image</h1>
        <div style={{display:'flex', justifyContent:'space-around', alignItems:'center',flexDirection:'column' }}>
        <div style={{width:'80%',height:'220px',borderRadius:'25px',overflow:'hidden'} }>
           <img src="https://i.ytimg.com/vi/2g6GnIxTAEA/maxresdefault.jpg" alt=""  style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>  
       
        </div>
        <div className=" ps-2 my-5"><h1 className="fs-3 text-secondary text-center">Main Short: <span className="fs-1 " style={{fontWeight:'700', color:'#414141'}}>{data.mainshot}</span></h1></div>
        </div>
       
    )
}
export default Mold