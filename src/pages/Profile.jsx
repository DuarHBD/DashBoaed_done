import React , { useEffect ,useState } from 'react'
import axios from 'axios';
import "./Profile.css";
const Profile = () => {
  // ข้อมูลตัวอย่าง
  const [profileData,setProfile]=useState({})
  const fetchData = async () => {
    try {
      
     
      
      const response = await axios.get("https://ec2-3-91-233-159.compute-1.amazonaws.com/api/User", {
        headers: {
          
          'Content-Type': 'application/json'
        }, 
        withCredentials:true
      });
  
      console.log("Response Data:", response.data);
     setProfile(response.data);

    } catch (err) {
      if (!err.response) {
        console.log("Unable to connect to the server. Please try again later.");
      } else {
        console.log("Server Error:", err.response.data); 
       
      }
    }
  };
  
 
  useEffect(() => {
    fetchData();
  }, []);
  


  return (
      <div className="profile-container">
        <div className='profile-header'> <h1 >My Profile</h1></div>
       
        <div className='profile-subCotainer'>
            <div className="profile-virtual-card">
                <div className='virtual-top'><h4>Virtual Employee Card</h4></div>
                <div className='virtual-mid'>
                    <div className='profile-name'>
                       <p>{profileData.nameTH} </p>
                       <p>{profileData.nameEN
                       }</p>
                       <p>{profileData.id_Employee}</p>
                    </div>
                    <div className='profile-image'>
                    <img src={`data:image/jpeg;base64,${profileData.image}`} alt="Profile" />
                    </div>
                    
                </div>
                <div className='virtual-bottom'>
                    <div className='profile-logo'>
                       <img src="https://cdn.pixabay.com/photo/2017/02/15/20/50/yes-2069850_640.png" alt="" />
                    </div>
                    <div className='profile-factory'>
                        <p>{profileData.factory}</p>
                    </div>
                </div>
          
            </div>
          <div className="profile-details">
           
              <table style={{width:'100%'}}>
                <tbody>
                    <tr><th>Position</th><td>{profileData.position}</td></tr>
                    <tr><th>Department</th><td>{profileData.department}</td></tr>
                    <tr><th>Employment Type</th><td>{profileData.emplotment_type}</td></tr>
                    <tr><th>Branch</th><td>{profileData.branch}</td></tr>
                </tbody>
              </table>
{/*               
              <p className='profile-detail'><strong>Position:</strong> <span>{profileData.position}</span></p>
              <p className='profile-detail'><strong>Department:</strong> <span>{profileData.department}</span> </p>
              <p className='profile-detail'><strong>Employment Type</strong> <span>{profileData.emplotment_type}</span></p>
              <p className='profile-detail'><strong>Branch:</strong> <span>{profileData.branch}</span></p> */}
          </div></div>
          
      </div>
  );
};

export default Profile;