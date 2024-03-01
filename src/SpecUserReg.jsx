import React, { useState, useEffect } from "react";
import { getSupAdminProfiles, superAdmRegisterSuccess } from "./Services/Api";
import { useLocation } from "react-router-dom";
import "./ViweAll.css";

const SpecUserReg = () => {
  const location = useLocation();
  const data = location.state.data;
  const email = data.email;
const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    email: "",
    ename: "",
    mob: "",
    password: "",
  });

  useEffect(() => {
    fetchEmployeeData(email);
  }, [email]);

  const fetchEmployeeData = (email) => {
    getSupAdminProfiles(email)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const confirmEditWindow = () => {
  
    if (window.confirm("Are you sure you want to Edit?")) {
      confirmEdit();
    }
  };
  const confirmEdit = (event) => {
    setLoading(true);
    
    superAdmRegisterSuccess(formData)
      .then((response) => {
        // Handle the response here if needed
        alert("Details Saved Successfully");
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };
  if(loading){
    return <div style={{paddingTop:"18%",color:"green"}}><h1 className='text-center'>Sending Details By Email.....</h1></div>;
  }
  return (
    <div className="id1" style={{ paddingTop: "10%" }}>
     
      <div className="row">
       
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="id2">{formData.email}</td>
                <td className="id2">
                  <input
                    type="text"
                    value={formData.ename}
                    onChange={(e) => handleInputChange("ename", e.target.value)}
                  />
                </td>
                <td className="id2">
                  <input
                    type="text"
                    value={formData.mob}
                    onChange={(e) => handleInputChange("mob", e.target.value)}
                  />
                </td>
                <td className="id2">
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                </td>
                <td className="id2">
                  <button className="btn btn-primary" 
                  onClick={confirmEditWindow}>
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
       
      </div>
    </div>
  );
};

export default SpecUserReg;
