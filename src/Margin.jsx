import React, { useState } from 'react';
import "./ViweAll.css";
import SuperAdminApplicationView from './SuperAdminApplicationView';
import ViewAllUserReg from './ViewAllUserReg';
import ViewAllAdmReg from './ViewAllAdmReg';

export default function () {
  const [showDetails, setShowDetails] = useState(false);
  const [usershowDetails, setUserShowDetails] = useState(false);
  const [adminshowDetails, setAdminShowDetails] = useState(false);
  const handleSubmit = (type) => {
    if (type === "adminview") {
      setAdminShowDetails(false)
      setUserShowDetails(false)
      setShowDetails(true);
    }
    if(type==="user"){
      setAdminShowDetails(false)
      setShowDetails(false);
setUserShowDetails(true)
    }
    if(type==="admin"){
setUserShowDetails(false)
setShowDetails(false)
setAdminShowDetails(true)
    }
  };

  return (
    <>
    <div style={{paddingLeft:"5%",paddingTop:"10%"}}>
     
        <button className='btn btn-primary' onClick={() => handleSubmit("adminview")}>
         ViewApplApplications
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className='btn btn-primary' onClick={() => handleSubmit("user")}>
         ViewUserRegistrations
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className='btn btn-primary' onClick={() => handleSubmit("admin")}>
         ViewAdminRegistrations
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</div>
<div >
        {showDetails && (
          <div>
            <SuperAdminApplicationView />
          </div>
        )}
      </div>
      {usershowDetails && (
          <div>
            <ViewAllUserReg/>
          </div>
        )}
         {adminshowDetails&& (
          <div>
            <ViewAllAdmReg/>
          </div>
        )}
   </>
  );
}
