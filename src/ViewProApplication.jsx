import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link,useLocation } from "react-router-dom";
import "./ViweAll.css";
import {  AiOutlineFullscreen,AiOutlineCompress } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg';
import { getUserView } from "./Services/Api";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [response1, setResponse1] = useState("");
  const location =useLocation();
  const email1=location.state.data.email
  const email=location.state.data.email
  const data={
email:email
  }
  useEffect(() => {
    fetchEmployees();
  }, [email1]);

  const fetchEmployees = () => {
  //  axios
    //  .get("http://localhost:1279/req")
    getUserView()
      .then((response) => {
        // Assuming response.data is an array of employee objects with an 'email' property
        const filterData = response.data.filter(
          (employee) => employee.email === email1
        );
        setEmployees(filterData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit2 = (id) => {
   
    const data = {
      id: id,
     
    };
    navigate("/useredit", { state: { data: data } });
  };

  

  
  const expand = (id) => {
    
    
    setResponse1(id);
  };

  useEffect(() => {
    // This will log the updated value of response1 whenever it changes.
   
  }, [response1]);

  const expand1 = (id) => {
    setResponse1("");
  };
  
  const handleSubmitprofile=()=>{
    const data = {
      email: email,
    }
    
    navigate("/profile", { state: { data: data } }); 
    
  }
  
  return (
    <div className="id1">
      <div
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={handleSubmitprofile}
    >
      <CgProfile
        style={{
          height: "50px",
          width: "50px",
          color:"blue"
        }} />
    </div>
      <br />
      <br />

      <h2 className="text-center">Applications List</h2>
      <br/>
      <h4 className="text-center" style={{color:"blue"}}>Total No.of Clients: {employees.length}</h4>

      <br />
     
      <br />

      <div className="row">
      <table className="table table-striped table-bordered">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {employees.map((emp, id) => (
              <React.Fragment key={emp.id}>
                <tr>
                  <th className="id2">{emp.id}</th>
                  <th className="id2">{emp.cmpname}</th>
                  <th style={{ color: "orange" }}>Follow-Up Date</th>
                  <td className="id2">
                    {new Date(emp.followup).toJSON().slice(0, 10)}
                  </td>
                  <th style={{ color: "green" }}>Current State</th>
                  <td className="id2">{emp.currentstate}</td>
                </tr>
                <tr>
                  <th>Latest Response Date</th>
                  <td className="id2">{emp.lastres}</td>
                  <th>Latest Status</th>

                  <td className="id2">{emp.lfstatus}</td>
                  {response1 !== emp.id && (
                    <td>
                      <AiOutlineFullscreen
                        onClick={() => expand(emp.id)}
                        style={{
                          height: "30px",
                          width: "30px",
                        }}
                      />
                    </td>
                  )}
                  {response1 === emp.id && (
                    <td>
                      <AiOutlineCompress
                        onClick={() => expand1(emp.id)}
                        style={{
                          height: "30px",
                          width: "30px",
                        }}
                      />
                    </td>
                  )}
                  <td>
                    <button onClick={() => handleSubmit2(emp.id)}>
                      <MdEdit
                        style={{ height: "20px", width: "20px", color: "blue" }}
                      />
                    </button>
                  </td>
                </tr>
                <br />
                <br />
               
                {response1 === emp.id && (
                  <>
                    <tr>
                      <th>BDM Name</th>
                      <td className="id2">{emp.bdmname}</td>

                      <th>POC Status </th>

                      <td className="id2">{emp.pocstatus}</td>

                      <th>Industry/Domain</th>
                      <td className="id2">{emp.domain}</td>
                    </tr>

                    <tr>
                      <th>Interested Service/s </th>
                      <td className="id2">{emp.intrestserv}</td>
                      <th>Summary</th>

                      <td className="id2">
                        {" "}
                        <textarea
                          value={emp.moredetail}
                          className="form-control"
                          autoComplete="moredetail"
                          rows="1" // You can adjust this initial number of rows
                          style={{ resize: "vertical" }} // This allows vertical resizing
                        />
                      </td>

                      <th>Info Shared</th>
                      <td className="id2">
                        {" "}
                        <textarea
                          value={emp.infoshared}
                          className="form-control"
                          autoComplete="infoshared"
                          rows="1" // You can adjust this initial number of rows
                          style={{ resize: "vertical" }} // This allows vertical resizing
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Details Asked</th>
                      <td className="id2">
                        {" "}
                        <textarea
                          value={emp.detailask}
                          className="form-control"
                          autoComplete="detailask"
                          rows="1" // You can adjust this initial number of rows
                          style={{ resize: "vertical" }} // This allows vertical resizing
                        />
                      </td>

                      <th>Website </th>
                      <td className="id2">{emp.website}</td>
                      <th>LinkedIn Profile </th>

                      <td className="id2">{emp.linkprof}</td>
                    </tr>

                    <tr>
                      <th>Continent/Region </th>
                      <td className="id2">{emp.region}</td>
                      <th>Country</th>
                      <td className="id2">{emp.coun}</td>
                      <th>W.r.t IST Time</th>
                      <td className="id2">{emp.time}</td>
                    </tr>
                    <tr>
                      <th>Before/After</th>
                      <td className="id2">{emp.cusbefore}</td>
                      <th>Time Zone</th>
                      <td className="id2">{emp.timezone}</td>
                    </tr>
                    <tr>
                      <td className="id2" colSpan={6}>
                        <h5 className="text-center" style={{ color: "orange" }}>
                          Main Contact Person Details
                        </h5>
                      </td>
                    </tr>
                    <tr>
                      <th>Full Name </th>
                      <td className="id2">{emp.maincontact}</td>

                      <th>LinkedIn Profile</th>
                      <td className="id2">{emp.mainlinkprof}</td>
                      <th>Email ID</th>
                      <td className="id2">{emp.mainemail}</td>
                    </tr>
                    <tr>
                      <th>Phone No</th>

                      <td className="id2" colSpan={5}>
                        {emp.mainmob}
                      </td>
                    </tr>
                    {emp.secondcontact !== "" && (
                      <>
                        <tr>
                          <td className="id2" colSpan={6}>
                            <h5
                              className="text-center"
                              style={{ color: "orange" }}
                            >
                              Second Contact Person Details
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <th>Full Name </th>
                          <td className="id2">{emp.secondcontact}</td>

                          <th>LinkedIn Profile</th>
                          <td className="id2">{emp.secondlinkprof}</td>
                          <th>Email ID</th>
                          <td className="id2">{emp.secondmainemail}</td>
                        </tr>
                        <tr>
                          <th>Phone No</th>

                          <td className="id2" colSpan={5}>
                            {emp.secondmob}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td className="id2" colSpan={6}>
                        <h5 className="text-center" style={{ color: "indigo" }}>
                          1st e-mail Details{" "}
                        </h5>
                      </td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td className="id2">{emp.emdate}</td>
                      <th>From Name</th>
                      <td className="id2">{emp.emname}</td>
                      <th>To Name</th>
                      <td className="id2">{emp.emtoname}</td>
                    </tr>

                    <tr>
                      <th>E-mail-1 State</th>

                      <td className="id2">{emp.emstate}</td>

                      <th style={{ color: "blue" }}>1st e-mail Summary </th>
                      <td className="id2" colSpan={3}>
                        {" "}
                        <textarea
                          value={emp.emsummary}
                          className="form-control"
                          autoComplete="emsummary"
                          rows="1" // You can adjust this initial number of rows
                          style={{ resize: "vertical" }} // This allows vertical resizing
                        />
                      </td>
                    </tr>
                    {emp.emdate1 !== "" && (
                      <>
                        <tr>
                          <td className="id2" colSpan={6}>
                            <h5
                              className="text-center"
                              style={{ color: "indigo" }}
                            >
                              2nd e-mail Details{" "}
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td className="id2">{emp.emdate1}</td>
                          <th>From Name</th>
                          <td className="id2">{emp.emname1}</td>
                          <th>To Name</th>
                          <td className="id2">{emp.emtoname1}</td>
                        </tr>

                        <tr>
                          <th>E-mail-2 State</th>

                          <td className="id2">{emp.emstate1}</td>

                          <th style={{ color: "blue" }}>2nd e-mail Summary </th>
                          <td className="id2" colSpan={3}>
                            {" "}
                            <textarea
                              value={emp.emsummary1}
                              className="form-control"
                              autoComplete="emsummary1"
                              rows="1" // You can adjust this initial number of rows
                              style={{ resize: "vertical" }} // This allows vertical resizing
                            />
                          </td>
                        </tr>
                      </>
                    )}
                    {emp.emdate2 !== "" && (
                      <>
                        <tr>
                          <td className="id2" colSpan={6}>
                            <h5
                              className="text-center"
                              style={{ color: "indigo" }}
                            >
                              3rd e-mail Details{" "}
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td className="id2">{emp.emdate2}</td>
                          <th>From Name</th>
                          <td className="id2">{emp.emname2}</td>
                          <th>To Name</th>
                          <td className="id2">{emp.emtoname2}</td>
                        </tr>
                        <tr>
                          <th>E-mail-3 State</th>

                          <td className="id2">{emp.emstate2}</td>

                          <th style={{ color: "blue" }}>3rd e-mail Summary </th>
                          <td className="id2" colSpan={3}>
                            {" "}
                            <textarea
                              value={emp.emsummary2}
                              className="form-control"
                              autoComplete="emsummary2"
                              rows="1" // You can adjust this initial number of rows
                              style={{ resize: "vertical" }} // This allows vertical resizing
                            />
                          </td>
                        </tr>
                      </>
                    )}
                    {emp.cuscalldate !== "" && (
                      <>
                        <tr>
                          <td className="id2" colSpan={6}>
                            <h5
                              className="text-center"
                              style={{ color: "green" }}
                            >
                              1st Call Details{" "}
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td className="id2">{emp.cuscalldate}</td>
                          <th>IST Time</th>
                          <td className="id2">{emp.isttime}</td>
                          <th>From Name</th>
                          <td className="id2">{emp.fromname}</td>
                        </tr>
                        <tr>
                          <th>Call-1 State</th>
                          <td className="id2">{emp.callstatus}</td>

                          <th>MOM with Actions </th>
                          <td className="id2" colSpan={3}>
                            {" "}
                            <textarea
                              value={emp.callsummery}
                              className="form-control"
                              autoComplete="callsummery"
                              rows="1" // You can adjust this initial number of rows
                              style={{ resize: "vertical" }} // This allows vertical resizing
                            />
                          </td>
                        </tr>
                      </>
                    )}
                    {emp.cuscalldate1 !== "" && (
                      <>
                        <tr>
                          <td className="id2" colSpan={6}>
                            <h5
                              className="text-center"
                              style={{ color: "green" }}
                            >
                              2nd Call Details{" "}
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td className="id2">{emp.cuscalldate1}</td>
                          <th>IST Time</th>
                          <td className="id2">{emp.isttime1}</td>
                          <th>From Name</th>
                          <td className="id2">{emp.fromname1}</td>
                        </tr>
                        <tr>
                          <th>Call-2 State</th>
                          <td className="id2">{emp.callstatus1}</td>

                          <th>MOM with Actions </th>
                          <td className="id2" colSpan={3}>
                            {" "}
                            <textarea
                              value={emp.callsummery1}
                              className="form-control"
                              autoComplete="callsummery1"
                              rows="1" // You can adjust this initial number of rows
                              style={{ resize: "vertical" }} // This allows vertical resizing
                            />
                          </td>
                        </tr>
                      </>
                    )}
                    {emp.cuscalldate2 !== "" && (
                      <>
                        <tr>
                          <td className="id2" colSpan={6}>
                            <h5
                              className="text-center"
                              style={{ color: "green" }}
                            >
                              3rd Call Details{" "}
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td className="id2">{emp.cuscalldate2}</td>
                          <th>IST Time</th>
                          <td className="id2">{emp.isttime2}</td>
                          <th>From Name</th>
                          <td className="id2">{emp.fromname2}</td>
                        </tr>
                        <tr>
                          <th>Call-3 State</th>
                          <td className="id2">{emp.callstatus2}</td>

                          <th>MOM with Actions </th>
                          <td className="id2" colSpan={3}>
                            {" "}
                            <textarea
                              value={emp.callsummery2}
                              className="form-control"
                              autoComplete="callsummery2"
                              rows="1" // You can adjust this initial number of rows
                              style={{ resize: "vertical" }} // This allows vertical resizing
                            />
                          </td>
                        </tr>
                      </>
                    )}

                    
                    <br />
                    <br />
                    <br />
                    <tr>
                      <td className="id2"></td>
                    </tr>
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <center>
      <Link to="/loginsucess" state={{data}}>Go Back</Link>
      </center>
      </div>
    <br/>
    </div>
  );
};

export default ListEmployee;
