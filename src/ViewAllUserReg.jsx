import React, { useState,useEffect } from 'react'
import { viewAllUserReg } from './Services/Api';
import "./ViweAll.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { deleteUserReg } from './Services/Api';
export default function ViewAllUserReg() {
const [formData,setFormData]=useState([]);
const navigate=useNavigate();
useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {

    viewAllUserReg()
      .then((response) => {
        setFormData(response.data);
      
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit2 = (email) => {
    const data = {
      
      email: email,
    };
    navigate("/supadmedit", { state: { data: data } });
  };
  const confirmDeleteWindow = (email) => {
    if (window.confirm("Are you sure you want to delete?")) {
     confirmDelete(email);
    }
  };
  const confirmDelete=(email)=>{
    deleteUserReg(email)
  .then((response) => {
    
    if (response.data === "deleteSuccess") {
      alert("deleteSuccess");
      window.location.reload();
    }
  })
  .catch((error) => {
    console.error("Delete Error:", error);
  });
  }
  return (
    <div className="id1"style={{paddingTop:"5%"}}>
          <h4 className="text-center" style={{ color: "blue" }}>
        Total No.of Clients: {formData.length}
      </h4>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Password</th>
                <th colSpan={2}>Actions</th>
                </tr>
          </thead>
          <tbody>
            {formData.map((emp, email) => (
              <React.Fragment key={emp.email}>
                
                <tr>
                <td className="id2">{emp.email}</td>
                <td className="id2">{emp.ename}</td>
                <td className="id2">{emp.mob}</td>
                <td className="id2">{emp.password}</td>
              
                <td>
                    <button onClick={() => handleSubmit2(emp.email)}>
                      <MdEdit
                        style={{ height: "20px", width: "20px", color: "blue" }}
                      />
                    </button>
                  </td>
                  <td className="id2">
                        <button
                          className=""
                          onClick={() => confirmDeleteWindow(emp.email)}
                        >
                          <MdDelete
                            style={{
                              height: "20px",
                              width: "20px",
                              color: "red",
                            }}
                          />
                        </button>
                      </td>
                </tr>
                </React.Fragment>
                   ))}
                </tbody>
                </table>
               
                </div>
                  </div>
   
                  )}
