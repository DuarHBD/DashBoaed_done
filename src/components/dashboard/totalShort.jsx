import React from "react";

function TotalShort({data}){
    console.log(data)
return(
    <div className="text-center " style={{width:'100%'}}>
        <div className="w-100" style={{height:'150px',borderBottom:'1px solid gray'}}> 
        <div>
        <h1 className="text-secondary fs-3">Total Counter Shot</h1>
        </div>
       <div>
        <h3 className=" fs-1" style={{fontWeight:'700', color:'#414141'}}>{data.shot}/{data.target}</h3>
       </div>
       </div>

    </div>
)
}

export default TotalShort