import React, { useState, useEffect } from "react";
import { Country}  from 'country-state-city';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ViewProApplication.css"; // Import your custom CSS file
import "./ViweAll.css";
import { CgProfile } from 'react-icons/cg';
import { getProfessional,putUserEditDetailsUpdate} from './Services/Api';

const AdminEdit = () => {
  // State variables
 
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const id = location.state.data.id;
  const email=location.state.data.email;
  const [response,setResponse]=useState(false);
  const [resstate,setResstate]=useState("");
  const [resstate1,setResstate1]=useState("");
  const [resstate2,setResstate2]=useState("");
  const [resstate3,setResstate3]=useState("");
  const [resstate4,setResstate4]=useState("");
  const [resstatesec,setResstatesec]=useState("");
  const [countryList, setCountryList] = useState ([]);
const data={
  email:email
}

  const navigate = useNavigate();

  // State object to store form field values
  const [formData, setFormData] = useState({});
   useEffect(() => {
    fetchEmployeeData(id);
    setCountryList(Country.getAllCountries());
  }, [id]);


  const fetchEmployeeData = (id) => {
    getProfessional(id)
    //axios
    //  .get(`http://localhost:1279/viewprofessional?id=${id}`)
      .then((response) => {

        setLoading(false);
        setFormData(response.data);
      
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  
  let followupString;

  const followupDate = formData.followup ? new Date(formData.followup) : null;
  
  if (followupDate) {
    // Format the date in "yyyy-MM-dd" format
    followupString = followupDate.toJSON().slice(0, 10);
    
  } 
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const selectedCountry = countryList.find(country => country.name === value);
  
    if (selectedCountry) {
      const timezone = selectedCountry.timezones[0]; // Assuming the first timezone is used
      setFormData({
        ...formData,
        [name]: value,
        timezone: timezone.gmtOffsetName // Extracting the zoneName from the timezone object
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        timezone: "" // Resetting timezone if no country is selected
      });
    }
  };
  
  const confirmEdit = (event) => {
    event.preventDefault();
    var v46= /^\d{10}$/;

    if(formData.mainmob!==""&&!formData.mainmob.match(v46)){
      alert("Main Contact Mobile Number 10 Digits and Numeric Only")
return false;
    }
    if(formData.secondmob!==""&&!formData.secondmob.match(v46)){
      alert("Second Contact Mobile Number 10 Digits and Numeric Only")
return false;
    }
    if (window.confirm("Are you sure you want to Edit?")) {
      handleSubmit1();
    }
  };
  const handleSubmit1 = () => {
   
    setResponse(true);
   // axios
     // .post("http://localhost:1279/prosave", formData)
     putUserEditDetailsUpdate(formData)
     
      .then((response) => {
        if (response.data === "updated successfullly") {
          alert("Details Updated Successfully");
          window.location.reload();
        } else {
          navigate("/regfail");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };
  if(response){
    return <div style={{paddingTop:"18%",color:"green"}}><h1 className='text-center'>Sending Details By Email.....</h1></div>;
  }
  const handleSubmit2 = () => {
   
    const data = {
      email: email,
      
    };
    navigate("/adminprofile", { state: { data: data } });
  }
  const today=new Date().toJSON().slice(0,10);
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
      onClick={handleSubmit2}
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
      <br />
      <br />
      <h2 className="text-center" style={{color:"orange"}}>Update Client Details </h2>
      <br/>
<h4 className="text-center" style={{color:"blue"}}>Your Application ID: {id}</h4>
<br/>
      <div className="text-center">
        {/* Render the form for editing data */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={confirmEdit}>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th>BDM Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    id="id"
                    name="bdmname"
                    value={formData.bdmname}
                    readOnly
                  />
                </td>

                <th>1st Response Date</th>

                <td className="id2">
                  <input
                    className="form-control"
                    type="date"
                    name="firstres"
                    value={formData.firstres || ""}
                    onChange={handleInputChange}
                  />
                </td>

                <th>Last Response Date</th>

                <td className="id2">
                  <input
                    className="form-control"
                    type="date"
                    name="lastres"
                    value={formData.lastres || ""}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Company Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="cmpname"
                    value={formData.cmpname || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>Latest Status</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="lfstatus"
                    value={formData.lfstatus}
                    onChange={handleInputChange}
                  >
                    <option value="Yet to Respond">Yet to Respond</option>
                    <option value="Waiting for Reply">
                      Waiting for Reply
                    </option>
                    <option value="Need to Follow-Up">
                      Need to Follow-Up
                    </option>
                    <option value="1st /2nd /3rd - Call Scheduled">
                      1st /2nd /3rd - Call Scheduled
                    </option>
                    <option value="POC Started">POC Started</option>
                    <option value="Deal Done">Deal Done</option>
                    <option value="No Deal">No Deal</option>
                  </select>
                </td>
                <th>POC Status</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="pocstatus"
                    value={formData.pocstatus}
                    onChange={handleInputChange}
                  >
                    <option value="NA">NA</option>
                    <option value="Planned">Planned</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Success">Success</option>
                    <option value="Faild">Faild</option>
                    <option value="Deal Done">Deal Done</option>
                    <option value="No Deal">No deal</option>
                  </select>
                </td>
              </tr>

              <tr>
                <th>Industry/Domain</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                  >
                    <option value="Banking">Banking</option>
                    <option value="Insurence">Insurence</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="e-Commerce">e-Commerce</option>
                    <option value="Digital Payments">Digital Payments</option>
                    <option value="OTT">OTT</option>
                    <option value="Health Care">Health Care</option>
                    <option value="Automobile">Automobile</option>
                    <option value="Networking">Networking</option>
                    <option value="Cloud Services">Cloud Services </option>
                    <option value="e-Learning/Entertainment">
                      e-Learning/Entertainment
                    </option>
                  </select>
                </td>
                <th>Interested Service/s </th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="intrestserv"
                    value={formData.intrestserv}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>

                    <optgroup label="Dev">
                      <option value="FE">FE</option>
                      <option value="BE">BE</option>
                      <option value="DB">DB</option>
                      <option value="Mobile">Mobile</option>
                      <option value="TV">TV</option>
                      <option value="Support">Support</option>
                    </optgroup>
                    <optgroup label="QA">
                      <option value="Manual">Manual</option>
                      <option value="Automation">Automation</option>
                      <option value="Regression">Regression</option>
                      <option value="PT">PT</option>
                    </optgroup>
                    <optgroup label="DevOps">
                      <option value="On-premises">On-premises</option>
                      <option value="AWS">AWS</option>
                      <option value="Azure">Azure</option>
                      <option value="GC">GC</option>
                      <option value="Private">Private</option>
                    </optgroup>
                  </select>
                </td>
                <th>Summary </th>
                <td className="id2">
                  <textarea
                    className="form-control"
                    name="moredetail"
                    value={formData.moredetail}
                    onChange={handleInputChange}
                    autoComplete="moredetail"
                    required
                    rows="1" // You can adjust this initial number of rows
                    style={{ resize: "vertical" }} // This allows vertical resizing
                  />
                </td>
              </tr>

              <tr>
                <th>Info Shared</th>
                <td className="id2">
                  <textarea
                    className="form-control"
                    name="infoshared"
                    value={formData.infoshared}
                    rows="1" // You can adjust this initial number of rows
                    style={{ resize: "vertical" }} // This allows vertical resizing
                    onChange={handleInputChange}
                  />
                </td>
                <th>Details Asked</th>
                <td className="id2">
                  <textarea
                    className="form-control"
                    name="detailask"
                    value={formData.detailask}
                    rows="1" // You can adjust this initial number of rows
                    style={{ resize: "vertical" }} // This allows vertical resizing
                    onChange={handleInputChange}
                  />
                </td>
                <th>Website</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="website"
                    value={formData.website || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>LinkedIn Profile </th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="linkprof"
                    value={formData.linkprof || ""}
                    onChange={handleInputChange}
                  />
                </td>
                <th>Continent/Region </th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                  >
                    <option value="Asia">Asia</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Europe">Europe</option>
                    <option value="Australia">Australia</option>
                    <option value="Europe">Europe</option>
                    <option value="Antarctica">Antarctica</option>
                  </select>
                </td>
                <th>Country</th>
                <td className="id2">
                <select
          name="coun"
          value={formData.coun}
          onChange={handleInputChange}
          className="form-control"
          id="sdate"
          autoComplete="coun"
          required
        >
          <option value="">Select Country</option>
          {countryList.map((country, index) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      
                </td>
              </tr>

              <tr>
                <th>  Time Zone</th>
                <td className="id2">
<input
          type="text"
          name="timezone"
          value={formData.timezone}
          onChange={handleInputChange}
          className="form-control"
          autoComplete="timezone"
          required
          readOnly // Make it read-only so that users cannot modify it directly
        />                </td>
                <th>Before/After</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="cusbefore"
                    value={formData.cusbefore}
                    onChange={handleInputChange}
                  >
                    <option value="After">After</option>
                    <option value="Before">Before</option>
                  </select>
                </td>

                <th>Current State</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="currentstate"
                    value={formData.currentstate}
                    onChange={handleInputChange}
                  >
                    <option value="Hot">Hot</option>
                    <option value="Warm">Warm</option>
                    <option value="Cold">Cold</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th style={{ color: "orange" }}>Follow-Up Date</th>
                <td>
                  <input
                    className="form-control"
                    type="date"
                    name="followup"
                    value={followupString}
                    onChange={handleInputChange}
                    min={today}
                  />
                </td>
                <td colSpan={4}></td>
              </tr>
              <tr>
                <td className="id2" colSpan={6}>
                  <h5 className="text-center" style={{ color: "blue" }}>
                    Main Contact Person Details
                  </h5>
                </td>
              </tr>

              <tr>
                <th>Full Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="maincontact"
                    value={formData.maincontact || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>Email ID</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="email"
                    name="mainemail"
                    value={formData.mainemail || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>Phone No</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="mainmob"
                    value={formData.mainmob || ""}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <th>LinkedIn Profile </th>
                <td className="id2" colSpan={2}>
                  <input
                    className="form-control"
                    type="text"
                    name="mainlinkprof"
                    value={formData.mainlinkprof || ""}
                    onChange={handleInputChange}
                  />
                </td>
                <td colSpan={4}></td>
              </tr>
              {formData.secondcontact===""&&(

              <>
              <tr>
                <td className="id2" colSpan={2}>
                  <h5 className="text-center" style={{ color: "" }}>
                 Do You Have 2nd Contact Person Details?{" "}
                  </h5>
                </td>
                <td className="id3">
                  Yes &nbsp;&nbsp;<input type="radio"
                  name="resstatesec"
                  value="yes"
                   onChange={(e) => setResstatesec(e.target.value)}
                   />
                </td>
                 <td className="id3">
                  No &nbsp;&nbsp;<input type="radio"
                  name="resstatesec"
                  value="no"
                  onChange={(e) => setResstatesec(e.target.value)}/>
                </td>
                <td colSpan={2}></td>
              </tr>
              </>
              )}
               {(resstatesec==="yes"||formData.secondcontact!=="")&&(
                <>
              <tr>
                <td className="id2" colSpan={6}>
                  <h5 className="text-center" style={{ color: "blue" }}>
                    Second Contact Person Details
                  </h5>
                </td>
              </tr>

              <tr>
                <th>Full Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="secondcontact"
                    value={formData.secondcontact || ""}
                    onChange={handleInputChange}
                  />
                </td>
                <th>Email ID</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="secondemail"
                    value={formData.secondemail || ""}
                    onChange={handleInputChange}
                  />
                </td>
                <th>Phone No</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="secondmob"
                    value={formData.secondmob || ""}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            
              <tr>
                <th>LinkedIn Profile </th>
                <td className="id2" colSpan={2}>
                  <input
                    className="form-control"
                    type="text"
                    name="secondlinkprof"
                    value={formData.secondlinkprof || ""}
                    onChange={handleInputChange}
                  />
                </td>
                <td colSpan={3}></td>
              </tr>
              </>
              )}
              <tr>
                <td className="id2" colSpan={6}>
                  <h5 className="text-center" style={{ color: "green" }}>
                    1st e-mail Details{" "}
                  </h5>
                </td>
              </tr>
              <tr>
                <th>Date</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="date"
                    name="emdate"
                    value={formData.emdate || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>From Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="emname"
                    value={formData.emname || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>To Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="emtoname"
                    value={formData.emtoname || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>E-mail-1 State</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="emstate"
                    value={formData.emstate}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Yet to Respond">Yet to Respond </option>
                    <option value="Waiting for Reply">
                      Waiting for Reply
                    </option>
                    <option value="To Follow-up">To Follow-up</option>
                  </select>
                </td>
                <th>1st e-mail Summary </th>
                <td className="id2" colSpan={3}>
                  <textarea
                    className="form-control"
                    name="emsummary"
                    value={formData.emsummary}
                    onChange={handleInputChange}
                    autoComplete="emsummary"
                    rows="1" // You can adjust this initial number of rows
                    style={{ resize: "vertical" }} // This allows vertical resizing
                  required
                  />
                </td>
              </tr>
              {formData.emdate1===""&&(
                <>
              <tr>
                <td className="id2" colSpan={2}>
                  <h5 className="text-center" style={{ color: "" }}>
                    Do You Have  2nd e-mail Details?{" "}
                  </h5>
                </td>
                <td className="id3">
                  Yes &nbsp;&nbsp;<input type="radio"
                  name="resstate1"
                  value="yes"
                   onChange={(e) => setResstate1(e.target.value)}
                   />
                </td>
                 <td className="id3">
                  No &nbsp;&nbsp;<input type="radio"
                  name="resstate1"
                  value="no"
                  onChange={(e) => setResstate1(e.target.value)}/>
                </td>
                <td colSpan={3}></td>
              </tr>
              </>
              )}
              {(resstate1==="yes"||formData.emdate1!=="")&&(
                <>
              <tr>
                <td className="id2" colSpan={6}>
                  <h5 className="text-center" style={{ color: "green" }}>
                    2nd e-mail Details{" "}
                  </h5>
                </td>
              </tr>
              <tr>
                <th>Date</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="date"
                    name="emdate1"
                    value={formData.emdate1 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>From Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="emname1"
                    value={formData.emname1 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>To Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="emtoname1"
                    value={formData.emtoname1 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>E-mail-2 State</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="emstate1"
                    value={formData.emstate1}
                    onChange={handleInputChange}
                  >
                    <option value="Yet to Respond">Yet to Respond </option>
                    <option value="Waiting for Reply">
                      Waiting for Reply
                    </option>
                    <option value="To Follow-up">To Follow-up</option>
                  </select>
                </td>

                <th>2nd e-mail Summary </th>
                <td className="id2" colSpan={3}>
                  <textarea
                    className="form-control"
                    name="emsummary1"
                    value={formData.emsummary1}
                    onChange={handleInputChange}
                    autoComplete="emsummary1"
                    rows="1" // You can adjust this initial number of rows
                    style={{ resize: "vertical" }} // This allows vertical resizing
                    required
                  />
                </td>
              </tr>
              </>
              )}
                {formData.emdate2===""&&(
               <tr>
                <td className="id2" colSpan={2}>
                  <h5 className="text-center" style={{ color: "" }}>
                    Do You Have  3rd e-mail Details{" "}
                  </h5>
                </td>
                <td className="id3">
                  Yes &nbsp;&nbsp;<input type="radio"
                  name="resstate2"
                  value="yes"
                   onChange={(e) => setResstate2(e.target.value)}
                   />
                </td>
                 <td className="id3">
                  No &nbsp;&nbsp;<input type="radio"
                  name="resstate2"
                  value="no"
                  onChange={(e) => setResstate2(e.target.value)}/>
                </td>
                <td colSpan={3}></td>
              </tr>
                )}

{(resstate2==="yes"||formData.emdate2!=="")&&(
                <>
              <tr>
                <td className="id2" colSpan={6}>
                  <h5 className="text-center" style={{ color: "green" }}>
                    3rd e-mail Details{" "}
                  </h5>
                </td>
              </tr>
              <tr>
                <th>Date</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="date"
                    name="emdate2"
                    value={formData.emdate2 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>From Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="emname2"
                    value={formData.emname2 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>To Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="emtoname2"
                    value={formData.emtoname2 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>E-mail-3 State</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="emstate2"
                    value={formData.emstate2}
                    onChange={handleInputChange}
                    
                  >
                    <option value="Yet to Respond">Yet to Respond </option>
                    <option value="Waiting for Reply">
                      Waiting for Reply
                    </option>
                    <option value="To Follow-up">To Follow-up</option>
                  </select>
                </td>

                <th>3rd e-mail Summary </th>
                <td className="id2" colSpan={3}>
                  <textarea
                    className="form-control"
                    name="emsummary2"
                    value={formData.emsummary2}
                    onChange={handleInputChange}
                    rows="1" // You can adjust this initial number of rows
                    style={{ resize: "vertical" }} // This allows vertical resizing
                    required
                  />
                </td>
              </tr>
              </>
              )}
                {formData.cuscalldate===""&&(
                  <>
              <tr>
                <td className="id2" colSpan={2}>
                  <h5 className="text-center" style={{ color: "" }}>
                    Do You Have 1st Call Details{" "}
                  </h5>
                </td>
                <td className="id3">
                  Yes &nbsp;&nbsp;<input type="radio"
                  name="resstate"
                  value="yes"
                   onChange={(e) => setResstate(e.target.value)}
                   />
                </td>
                 <td className="id3">
                  No &nbsp;&nbsp;<input type="radio"
                  name="resstate"
                  value="no"
                  onChange={(e) => setResstate(e.target.value)}/>
                </td>
                <td colSpan={3}></td>
              </tr>
              </>
                )}
                 {(resstate==="yes"||formData.cuscalldate!=="")&&(
                <>
              <tr>
                <td className="id2" colSpan={6}>
                  <h5 className="text-center" style={{ color: "orange" }}>
                  1st Call Details{" "}
                  </h5>
                </td>
              </tr>
              <tr>
                <th>Date </th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="date"
                    name="cuscalldate"
                    value={formData.cuscalldate || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>IST Time</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="time"
                    name="isttime"
                    value={formData.isttime}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>From Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="fromname"
                    value={formData.fromname || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>Call-1 State</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="callstatus"
                    value={formData.callstatus}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="To Follow-up">To Follow-up</option>
                    <option value="Poc">Poc</option>
                    <option value="Deal">Deal</option>
                    <option value="NO Deal">No Deal</option>
                  </select>
                </td>
                <th>MOM with Actions </th>
                <td className="id2" colSpan={3}>
                  <textarea
                    className="form-control"
                    name="callsummery"
                    value={formData.callsummery}
                    onChange={handleInputChange}
                    rows="1" // You can adjust this initial number of rows
                    style={{ resize: "vertical" }} // This allows vertical resizing
                    required
                  />
                </td>
              </tr>
              </>
              )}
                {formData.cuscalldate1===""&&(
                  <>
               <tr>
                <td className="id2" colSpan={2}>
                  <h5 className="text-center" style={{ color: "" }}>
                    Do You Have  2nd Call Details{" "}
                  </h5>
                </td>
                <td className="id3">
                  Yes &nbsp;&nbsp;<input type="radio"
                  name="resstate3"
                  value="yes"
                   onChange={(e) => setResstate3(e.target.value)}
                   />
                </td>
                 <td className="id3">
                  No &nbsp;&nbsp;<input type="radio"
                  name="resstate3"
                  value="no"
                  onChange={(e) => setResstate3(e.target.value)}/>
                </td>
                <td colSpan={3}></td>
              </tr>
              </>
                )}
                {(resstate3==="yes"||formData.cuscalldate1!=="")&&(
                <>
              <tr>
                <td className="id2" colSpan={6}>
                  <h5 className="text-center" style={{ color: "orange" }}>
                    2nd Call Details{" "}
                  </h5>
                </td>
              </tr>

              <tr>
                <th>Date </th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="date"
                    name="cuscalldate1"
                    value={formData.cuscalldate1 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>IST Time</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="time"
                    name="isttime1"
                    value={formData.isttime1 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>From Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="fromname1"
                    value={formData.fromname1 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>Call-2 State</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="callstatus1"
                    value={formData.callstatus1}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="To Follow-up">To Follow-up</option>
                    <option value="Poc">Poc</option>
                    <option value="Deal">Deal</option>
                    <option value="NO Deal">No Deal</option>
                  </select>
                </td>
                <th>MOM with Actions </th>
                <td className="id2" colSpan={3}>
                  <textarea
                    className="form-control"
                    name="callsummery1"
                    value={formData.callsummery1}
                    onChange={handleInputChange}
                    rows="1" // You can adjust this initial number of rows
                    style={{ resize: "vertical" }} // This allows vertical resizing
                    required
                  />
                </td>
              </tr>
              </>
              )}
                {formData.cuscalldate2===""&&(
                  <>
               <tr>
                <td className="id2" colSpan={2}>
                  <h5 className="text-center" style={{ color: "" }}>
                    Do You Have   3rd Call Details{" "}
                  </h5>
                </td>
                <td className="id3">
                  Yes &nbsp;&nbsp;<input type="radio"
                  name="resstate4"
                  value="yes"
                   onChange={(e) => setResstate4(e.target.value)}
                   />
                </td>
                 <td className="id3">
                  No &nbsp;&nbsp;<input type="radio"
                  name="resstate4"
                  value="no"
                  onChange={(e) => setResstate4(e.target.value)}/>
                </td>
                <td colSpan={3}></td>
              </tr>
              </>
                )}
                {(resstate4==="yes"||formData.cuscalldate2!=="")&&(
                <>
              <tr>
                <td className="id2" colSpan={6}>
                  <h5 className="text-center" style={{ color: "orange" }}>
                    3rd Call Details{" "}
                  </h5>
                </td>
              </tr>
              <tr>
                <th>Date </th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="date"
                    name="cuscalldate2"
                    value={formData.cuscalldate2 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>IST Time</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="time"
                    name="isttime2"
                    value={formData.isttime2 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
                <th>From Name</th>
                <td className="id2">
                  <input
                    className="form-control"
                    type="text"
                    name="fromname2"
                    value={formData.fromname2 || ""}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <th>Call-3 State</th>
                <td className="id2">
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    id="id"
                    name="callstatus2"
                    value={formData.callstatus2}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="To Follow-up">To Follow-up</option>
                    <option value="Poc">Poc</option>
                    <option value="Deal">Deal</option>
                    <option value="NO Deal">No Deal</option>
                  </select>
                </td>
                <th>MOM with Actions </th>
                <td className="id2" colSpan={3}>
                  <textarea
                    className="form-control"
                    name="callsummery2"
                    value={formData.callsummery2}
                    onChange={handleInputChange}
                    rows="1" // You can adjust this initial number of rows
                    style={{ resize: "vertical" }} // This allows vertical resizing
                    required
                  />
                </td>
              </tr>
              </>
              )}
            </tbody>
          </table>
          <br />
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
        )}
       
      </div>
      <br/>
      <center>
      <Link to="/viewalldetails" state={{data:data}}>Go Back</Link>
      </center>
      <br/>
    </div>
  );
};

export default AdminEdit;
