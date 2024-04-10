import React, { useState, useEffect } from "react";
import { Country}  from 'country-state-city';
import { useLocation, useNavigate,Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
 import { postApplicationDetails } from "./Services/Api";
import { CgProfile } from 'react-icons/cg';
const Application = () => {
  const location =useLocation();
  const [load,setLoad]=useState(false);
   const email=location.state.data.email;
   const ename=location.state.data.ename;
   
  const data={
    email:email
  }
  const [formData, setFormData] = useState({
bdmname:ename,
   firstres:"",
   lastres:"",
   currentstate:"",
   cmpname:"",
   lfstatus:"",
   pocstatus:"NA",
   intrestserv:"Select...",
   moredetail:"",
   infoshared:"",
   detailask:"",
   website:"",
   linkprof:"",
   region:"Asia",
   coun:"",
   time:"00:00",
   cusbefore:"After",
   maincontact:"",
   mainlinkprof:"",
   mainemail:"",
   mainmob:"",

   secondcontact:"",
   secondlinkprof:"",
   secondemail:"",
   secondmob:"",
   emdate:"",
   domain:"",
  emname:"",
  emdate1:"",
  emdate2:"",
emtoname:"",
emstate:"",
emsummary:"",
emname1:"",
emtoname1:"",
emstate1:"",
emsummary1:"",
emname2:"",
emtoname2:"",
emstate2:"",
emsummary2:"",
cuscalldate:"",
isttime:"00:00",
fromname:"",
callstatus:"",
callsummery:"",
cuscalldate1:"",
isttime1:"00:00",
fromname1:"",
callstatus1:"",
callsummery1:"",
cuscalldate2:"",
isttime2:"00:00",
fromname2:"",
callstatus2:"",
callsummery2:"",
timezone:"",
email:email,
email1:"",
email2:"",
email3:"",
call1:"",
call2:"",
call3:"",
followup:""
  });
  const navigate=useNavigate();
  const [countryList, setCountryList] = useState ([]);
  useEffect(() => {
    setCountryList(Country.getAllCountries());

  })
  const handleSubmit = (event) => {
    event.preventDefault()
    if(formData.currentstate===""){
      alert("Please Select Current State")
      return false;
    }
    if(formData.lfstatus===""){
      alert("Please Select Latest Status")
      return false;
    }
    if(formData.domain===""){
      alert("Please Select Industry/Domain")
      return false;
    }
    if(formData.timezone===""){
      alert("Please Select Time Zone")
      return false;
    }
    var v46= /^\d{10}$/;
    
    if(formData.mainmob!==""&&!formData.mainmob.match(v46)){
      alert("Main Contact Mobile Number 10 Digits and Numeric Only")
return false;
    }
    if(formData.secondmob!==""&&!formData.secondmob.match(v46)){
      alert("Second Contact Mobile Number 10 Digits and Numeric Only")
return false;
    }
if(formData.emstate===""){
  alert("Please Select E-mail-1 State")
  return false;
}
if(formData.email1==='yes'&&formData.emstate1===""){
  alert("Please Select E-mail-2 State")
  return false;
}
if(formData.email2==='yes'&&formData.emstate2===""){
  alert("Please Select E-mail-3 State")
  return false;
}
if(formData.call1=== 'Yes'==='yes'&&formData.callstatus===""){
  alert("Please Select Call-1 State")
  return false;
}
if(formData.call2=== 'Yes'&&formData.callstatus1===""){
  alert("Please Select Call-2 State")
  return false;
}
if(formData.call3=== 'Yes'&&formData.callstatus2===""){
  alert("Please Select Call-3 State")
  return false;
}
    setLoad(true)
    event.preventDefault();
   
  //  axios
    //  .post("http://localhost:1279/prosave", formData)
    postApplicationDetails(formData)
    
      .then((response) => {
        if (response.data === "personaldetails") {
          navigate("/success2", { state: { data: formData} }); // Use navigate to change the route
        } else {
          navigate("/regfail");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };
  if(load){
    return <div style={{paddingTop:"18%",color:"green"}}><h1 className='text-center'>Sending Details By Email.....</h1></div>;
  }
  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
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
       
      });
    }
  };
  

  
  const handleSubmit2 = (type) => {
    
    const data = {
      email: email,
      
    };

if (type==="profile"){
  navigate("/profile", { state: { data: data } });
}
  }
  const today=new Date().toJSON().slice(0,10);
  return (
  
    <div className="" style={{ minHeight: "100vh", backgroundColor:"blue" }}>
      <div
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={()=>handleSubmit2("profile")}
    >
      <CgProfile
        style={{
          height: "50px",
          width: "50px",
          color:"blue"
        }} />
    </div>
   
    <div className="application">
    
      <div className="row justify">
        <div className="col-md-10 mt-5">
          <h2 className="text-center mb-4" style={{ color: "blue" }}>
             New Client Details 
          </h2>
          
      
    <br/>
          <form onSubmit={handleSubmit}>
            <div className="form-group row my-3">
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
                BDM Name
              </label>
              <div className="col-sm-2 my-1">
            <input type="text"
                  name="bdmname"
                  value={ename}
                  className="form-control"
                  style={{color:"green"}}
                  readOnly
                  />
              </div>
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
                1st Response 
              </label>
              <div className="col-sm-2 my-1">
                <input
                 type="date"
                
                  name="firstres"
                  value={formData.firstres}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
                Last Response
              </label>
              <div className="col-sm-2 my-1">
                <input
                 type="date"
                  name="lastres"
                  value={formData.lastres}
                  onChange={handleInputChange}
                  className="form-control"
                  id="sdate"
                  autoComplete="date"
                  
                />
              </div>
            </div>

            <div className="form-group row my-3">
            <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
    <span style={{ color: 'red' }}>*</span>Current State
  </label>
              <div className="col-sm-2 my-1">
                <select
                  id="id"
                  name="currentstate"
                style={{ color: "green", appearance: "auto" }}
                  value={formData.currentstate}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                <option value="">Select..</option>
                  <option value="Hot">Hot </option>
                  <option value="Warm">Warm</option>
                  <option value="Cold">Cold</option>
                </select>
              </div>

              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Latest Status
              </label>
              <div className="col-sm-2 my-1">
                <select
                  id="id"
                  name="lfstatus"
                style={{ color: "green", appearance: "auto" }}
                  value={formData.lfstatus}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select..</option>
                  <option value="Yet to Respond">Yet to Respond</option>
                  <option value="Waiting for Reply">Waiting for Reply</option>
                  <option value="Need to Follow-Up">Need to Follow-Up</option>
                  <option value="1st /2nd /3rd - Call Scheduled">
                    1st /2nd /3rd - Call Scheduled
                  </option>
                  <option value="POC Started">POC Started</option>
                  <option value="Deal Done">Deal Done</option>
                  <option value="No Deal">No Deal</option>
                </select>
              </div>

              <label htmlFor="rexpy" className="col-sm-2 col-form-label my-1 label-custom">
  <span style={{ color: 'red' }}>*</span>Company
</label>
<div className="col-sm-2 my-1">
  <input
    type="text"
    name="cmpname"
    value={formData.cmpname}
    onChange={handleInputChange}
    placeholder="Enter Company"
    className="form-control"
    id="rexpy"
    autoComplete="cmpname"
    required
  />
</div>

            </div>

            
            <div className="form-group row my-3">
              <label htmlFor="lwd" className="col-sm-2 col-form-label my-1 label-custom">
                POC Status
              </label>{" "}
              {/* Add my-1 class here */}
              <div className="col-sm-2 my-1">
                
                <select
                  id="id"
                  name="pocstatus"
                style={{ color: "green", appearance: "auto" }}
                  value={formData.pocstatus}
                  onChange={handleInputChange}
                  className="form-control"
                  
                >
                  <option value="NA">NA</option>
                  <option value="Planned">Planned</option>
                  <option value="In-progress">In-progress</option>
                  <option value="Success">Success</option>
                  <option value="Faild">Faild</option>
                  <option value="Deal Done">Deal Done</option>
                  <option value="No Deal">No deal</option>
                </select>
              </div>
              {/* <div className="form-group row my-2"> */}
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Industry/Domain
              </label>
              <div className="col-sm-2 my-1">
                <select
                  id="id"
                  name="domain"
                style={{ color: "green", appearance: "auto" }}
                  value={formData.domain}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select..</option>
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
              </div>
              {/* <div className="form-group row my-1"> Add my-2 class here */}
              <label htmlFor="domain" className="col-sm-2 col-form-label my-1 label-custom">
                Interested Service/s{" "}
              </label>{" "}
              {/* Add my-1 class here */}
              <div className="col-sm-2 my-1">
                {" "}
                {/* Add my-1 class here */}
                <select
                  id="id"
                  name="intrestserv"
                style={{ color: "green", appearance: "auto" }}
                  value={formData.intrestserv}
                  onChange={handleInputChange}
                  className="form-control"
                  
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
              </div>
            </div>

            <div className="form-group row my-3">
  <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
  <span style={{ color: 'red' }}>*</span>Summary
  </label>
  <div className="col-sm-10 my-1">
    <textarea
      name="moredetail"
      value={formData.moredetail}
      onChange={handleInputChange}
      className="form-control"
      autoComplete="moredetails"
      placeholder="Enter Summary"
      rows="1" // You can adjust this initial number of rows
      style={{ resize: "vertical" }} // This allows vertical resizing
      required
    />
  </div>
</div>


<div className="form-group row my-3">
  <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
    Info Shared
  </label>
  <div className="col-sm-10 my-1">
    <textarea
      name="infoshared"
      value={formData.infoshared}
      onChange={handleInputChange}
      className="form-control"
      placeholder="Enter Info Shared"
      autoComplete="infoshared"
      rows="1" // You can adjust this initial number of rows
      style={{ resize: "vertical" }} // This allows vertical resizing
    />
  </div>
</div>
<div className="form-group row my-3">
  <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
   Details Asked
  </label>
  <div className="col-sm-10 my-1">
    <textarea
      name="detailask"
      value={formData.detailask}
      onChange={handleInputChange}
      className="form-control"
      placeholder="Enter Details Asked"
      autoComplete="detailask"
      rows="1" // You can adjust this initial number of rows
      style={{ resize: "vertical" }} // This allows vertical resizing
    />
  </div>
</div>
<div className="form-group row my-3">
<label htmlFor="id" className="col-sm-2 col-form-label my-1  label-custom">
<span style={{ color: 'red' }}>*</span>Website
</label>

              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Website"
                  autoComplete=""
                  required
                />
              </div>
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
               Linkdin Profile 
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="linkprof"
                  value={formData.linkprof}
                  placeholder="Enter Linkdin Profile"
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete="linkprof"
                />
              </div>
              <label htmlFor="followup" className="col-sm-2 col-form-label my-1 label-custom"
              >
              <span style={{ color: 'red' }}>*</span>Follow-Up Date
              </label>
              <div className="col-sm-2 my-1">
                <input
                type="date"
                  name="followup"
                  value={formData.followup}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete=""
                 min={today}
                  required
                />
              </div>
              </div>
              <div className="form-group row my-3">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Country
              </label>
              <div className="col-sm-2 my-1">
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
              </div>
           
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
              Continent/Region 
              </label>
              <div className="col-sm-2 my-1">
              <select
      id="id"
      name="region"
      style={{ color: "green", appearance: "auto" }}
      value={formData.region}
      onChange={handleInputChange}
      className="form-control"
      
    >
      <option value="Asia Region">Asia</option>
      <option value="North America Region">North America</option>
      <option value="South America Region">South America</option>
      <option value="Europe Region">Europe</option>
      <option value="Australia Region">Australia</option>
      <option value="Europe Region">Europe</option>
      <option value="Antarctica Region">Antarctica</option>
    </select>
              </div>
              <label htmlFor="timezone" className="col-sm-2 col-form-label my-1 label-custom">
        Time Zone
      </label>
      <div className="col-sm-2 my-1">
        <input
          type="text"
          name="timezone"
          value={formData.timezone}
          onChange={handleInputChange}
          className="form-control"
          autoComplete="timezone"
          required
          readOnly // Make it read-only so that users cannot modify it directly
        />
      </div>
            
              </div>

            <div className="form-group row my-3">
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              No.Of Hours

  
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="time"
                  name="time"
                  
                  value={formData.clock}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete=""
                />
              </div>
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
              Before/After (w.r.t IST)
              </label>
              <div className="col-sm-2 my-1">
              <select
      id="id"
      name="cusbefore"
      style={{ color: "green", appearance: "auto" }}
      value={formData.cusbefore}
      onChange={handleInputChange}
      className="form-control"
      
    >
      <option value="After">After</option>
      <option value="Before">Before</option>
    </select>
              </div>
              </div>
          
              <br/>
              <div>
                
              <h4 className='text-center'>Main Contact Person Details</h4>
              </div>
              <br/>
          
              <div className="form-group row my-3">
              
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
                
              <span style={{ color: 'red' }}>*</span>Full Name

              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="maincontact"
                  value={formData.maincontact}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Full Name"
                  id="sdate"
                  autoComplete=""
                  required
                />
              </div>
           
           
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              LinkedIn Profile
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="mainlinkprof"
                  placeholder="Enter Linkdin Profile"
                  value={formData.mainlinkprof}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete=""
                />
              </div>
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Email 
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="email"
                  name="mainemail"
                  placeholder="Enter Email"
                  value={formData.mainemail}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete='email'
                  required
                />
              </div>
              </div>
              <div className="form-group row my-1">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
               Mobile Number
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  name="mainmob"
                  value={formData.mainmob}
                  onChange={handleInputChange}
                  className="form-control"
                  id="sdate"
                  autoComplete="date"
                  
                />
              </div>
            </div>


<br/>
<div>
              <h4 className='text-center'>Second Contact Person Details</h4>
              </div>
              <br/>
              <div className="form-group row my-3">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
                
Full Name

              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  name="secondcontact"
                  value={formData.secondcontact}
                  onChange={handleInputChange}
                  className="form-control"
                  id="sdate"
                  autoComplete=""
                  
                />
              </div>
           
           
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              LinkedIn Profile
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="secondlinkprof"
                  placeholder="Enter Linkdin Profile"
                  value={formData.secondlinkprof}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete=""
                />
              </div>
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
                Email 
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="email"
                  name="secondemail"
                  placeholder="Enter Email"
                  value={formData.secondemail}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              </div>
              <div className="form-group row my-1">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
               Mobile Number
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="tel"
                  name="secondmob"
                  placeholder="Enter Mobile Number"
                  value={formData.secondmob}
                  onChange={handleInputChange}
                  className="form-control"
                  id="sdate"
                  autoComplete="date"
                  
                />
              </div>
            </div>
            <br/>
           
              
    
             
            <h4 className="text-center">1st e-mail Details </h4>
              <div className="form-group row my-3">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
                
              <span style={{ color: 'red' }}>*</span>Date

              </label>
              <div className="col-sm-2 my-1">
                <input
                type="date"
                  name="emdate"
                  value={formData.emdate}
                  onChange={handleInputChange}
                  className="form-control"
                  id="sdate"
                  autoComplete=""
                  required
                />
              </div>
           
           
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>From Name
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="emname"
                  placeholder="Enter From Name"
                  value={formData.emname}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete=""
                  required
                />
              </div>
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>To Name
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="emtoname"
                  value={formData.emtoname}
                  placeholder="Enter To Name"
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              </div>
              <div className="form-group row my-1">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>E-mail-1 State
              </label>
              <div className="col-sm-2 my-1">
              <select
      id="id"
      name="emstate"
      style={{ color: "green", appearance: "auto" }}
      value={formData.emstate}
      onChange={handleInputChange}
      className="form-control"
      required
    >
      <option value="">Select..</option>
      <option value="Yet to Respond">Yet to Respond </option>
      <option value="Waiting for Reply">Waiting for Reply</option>
      <option value="To Follow-up">To Follow-up</option>
    </select>
              </div>
             
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Summary 
  </label>
  <div className="col-sm-6 my-1">
    <textarea
      name="emsummary"
      value={formData.emsummary}
      onChange={handleInputChange}
      className="form-control"
      placeholder="Enter Summary"
      autoComplete="emsummary"
      rows="1" // You can adjust this initial number of rows
      style={{ resize: "vertical" }} // This allows vertical resizing
      required
    />
  </div>
            </div>
           
              
                <div className="form-group row my-3">
      <label htmlFor="lwd" className="col-sm-4 col-form-label my-1 label-custom">
        Do You Have 2nd Email Details?
      </label>
      <div className="col-sm-2 my-1">
        <select
          id="id"
          name="email2"
          style={{ color: 'green', appearance: 'auto' }}
          value={formData.email2}
          onChange={handleDropdownChange} // Use handleDropdownChange here
          className="form-control"
        >
           <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
    </div>
    {formData.email2=== 'Yes' && (
      <>
            <h4 className="text-center">2nd e-mail Details </h4>
              <div className="form-group row my-3">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
                
              <span style={{ color: 'red' }}>*</span>Date

              </label>
              <div className="col-sm-2 my-1">
                <input
                type="date"
                  name="emdate1"
                  value={formData.emdate1}
                  onChange={handleInputChange}
                  className="form-control"
                  id="sdate"
                  autoComplete=""
                  required
                />
              </div>
           
           
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>From Name
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="emname1"
                  placeholder="Enter From Name"
                  value={formData.emname1}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete=""
                  required
                />
              </div>
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>To Name
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="emtoname1"
                  placeholder="Enter To Name"
                  value={formData.emtoname1}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              </div>
              <div className="form-group row my-1">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>E-mail-2 State
              </label>
              <div className="col-sm-2 my-1">
              <select
      id="id"
      name="emstate1"
      style={{ color: "green", appearance: "auto" }}
      value={formData.emstate1}
      onChange={handleInputChange}
      className="form-control"
      required
      
    >
      <option value="">Select..</option>
      <option value="Yet to Respond ">Yet to Respond </option>
      <option value="Waiting for Reply">Waiting for Reply</option>
      <option value="To Follow-up">To Follow-up</option>
    </select>
              </div>
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Summary 
  </label>
  <div className="col-sm-6 my-1">
    <textarea
      name="emsummary1"
      value={formData.emsummary1}
      onChange={handleInputChange}
      className="form-control"
      placeholder="Enter Summary"
      autoComplete="emsummary1"
      rows="1" // You can adjust this initial number of rows
      style={{ resize: "vertical" }} // This allows vertical resizing
      required
    />
  </div>

            </div>
            </>
            )}
             <div className="form-group row my-3">
             <label htmlFor="lwd" className="col-sm-4 col-form-label my-1 label-custom">
        Do You Have 3rd Email Details?
      </label>
      <div className="col-sm-2 my-1">
        <select
          id="id"
          name="email3"
          style={{ color: 'green', appearance: 'auto' }}
          value={formData.email3}
          onChange={handleDropdownChange} // Use handleDropdownChange here
          className="form-control"
        >
           <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
   </div>
   {formData.email3=== 'Yes' && (
      <>
  
            <h4 className="text-center">3rd e-mail Details </h4>
              <div className="form-group row my-3">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
                
              <span style={{ color: 'red' }}>*</span>Date

              </label>
              <div className="col-sm-2 my-1">
                <input
                 type="date"
                  name="emdate2"
                  value={formData.emdate2}
                  onChange={handleInputChange}
                  className="form-control"
                  id="sdate"
                  autoComplete=""
                  required
                />
              </div>
           
           
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>From Name
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="emname2"
                  value={formData.emname2}
                  placeholder="Enter From Name"
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete=""
                  required
                />
              </div>
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>To Name
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="emtoname2"
                  placeholder="Enter To Name"
                  value={formData.emtoname2}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              </div>
              <div className="form-group row my-1">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>E-mail-3 State
              </label>
              <div className="col-sm-2 my-1">
              <select
      id="id"
      name="emstate2"
      style={{ color: "green", appearance: "auto" }}
      value={formData.emstate2}
      onChange={handleInputChange}
      className="form-control"
      required
      
    >
      <option value="">Select..</option>
      <option value="Yet to Respond ">Yet to Respond </option>
      <option value="Waiting for Reply">Waiting for Reply</option>
      <option value="To Follow-up">To Follow-up</option>
    </select>
              </div>
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Summary 
  </label>
  <div className="col-sm-6 my-1">
    <textarea
      name="emsummary2"
      placeholder="Enter Summary"
      value={formData.emsummary2}
      onChange={handleInputChange}
      className="form-control"
      autoComplete="emsummary2"
      rows="1" // You can adjust this initial number of rows
      style={{ resize: "vertical" }} // This allows vertical resizing
      required
    />
  </div>
 </div>
 </>
            )}
            <br/>
             <div className="form-group row my-3">
              <label htmlFor="lwd" className="col-sm-4 col-form-label my-1 label-custom">
        Do You Have 1st Call Details?
      </label>
      <div className="col-sm-2 my-1">
        <select
          id="id"
          name="call1"
          style={{ color: 'green', appearance: 'auto' }}
          value={formData.call1}
          onChange={handleDropdownChange} // Use handleDropdownChange here
          className="form-control"
        >
           <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
    </div>
    {formData.call1=== 'Yes' && (
      <>
  <h4 className="text-center">1st Call Details  </h4>
              <div className="form-group row my-3">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
                
              <span style={{ color: 'red' }}>*</span>Date

              </label>
              <div className="col-sm-2 my-1">
                <input
                 type="date"
                  name="cuscalldate"
                  value={formData.cuscalldate}
                  onChange={handleInputChange}
                  className="form-control"
                  id="sdate"
                  autoComplete=""
                  required
                />
              </div>
           
           
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Ist Time
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="time"
                  name="isttime"
                  value={formData.isttime}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete=""
                  required
                />
              </div>
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>From Name
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="fromname"
                  placeholder="Enter From Name"
                  value={formData.fromname}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              </div>
              <div className="form-group row my-1">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Call-1 State
              </label>
              <div className="col-sm-2 my-1">
              <select
      id="id"
      name="callstatus"
      style={{ color: "green", appearance: "auto" }}
      value={formData.callstatus}
      onChange={handleInputChange}
      className="form-control"
      required
    >
      <option value="">Select..</option>
       <option value="To Follow-up">To Follow-up</option>
      <option value="Poc">Poc</option>
      <option value="Deal">Deal</option>
      <option value="NO Deal">No Deal</option>
     
    </select>
              </div>
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>MOM with Actions 
  </label>
  <div className="col-sm-6 my-1">
    <textarea
      name="callsummery"
      placeholder="Enter MOM with Actions"
      value={formData.callsummery}
      onChange={handleInputChange}
      className="form-control"
      autoComplete=""
      rows="1" // You can adjust this initial number of rows
      style={{ resize: "vertical" }} // This allows vertical resizing
      required
    />
  </div>
    </div>
    </>
            )}
             <div className="form-group row my-3">
              <label htmlFor="lwd" className="col-sm-4 col-form-label my-1 label-custom">
        Do You Have 2nd Call Details?
      </label>
      <div className="col-sm-2 my-1">
        <select
          id="id"
          name="call2"
          style={{ color: 'green', appearance: 'auto' }}
          value={formData.call2}
          onChange={handleDropdownChange} // Use handleDropdownChange here
          className="form-control"
        >
           <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
    </div>
    {formData.call2=== 'Yes' && (
      <>
    <h4 className="text-center">2nd Call Details  </h4>
              <div className="form-group row my-3">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
                
              <span style={{ color: 'red' }}>*</span>Date

              </label>
              <div className="col-sm-2 my-1">
                <input
                 type="date"
                  name="cuscalldate1"
                  value={formData.cuscalldate1}
                  onChange={handleInputChange}
                  className="form-control"
                  id="sdate"
                  autoComplete=""
                  required
                />
              </div>
           
           
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Ist Time
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="time"
                  name="isttime1"
                  value={formData.isttime1}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete=""
                  required
                />
              </div>
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>From Name
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="fromname1"
                  placeholder="Enter From Name"
                  value={formData.fromname1}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              </div>
              <div className="form-group row my-1">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Call-2 State
              </label>
              <div className="col-sm-2 my-1">
              <select
      id="id"
      name="callstatus1"
      style={{ color: "green", appearance: "auto" }}
      value={formData.callstatus1}
      onChange={handleInputChange}
      className="form-control"
      required
    >
      <option value="">Select..</option>
       <option value="To Follow-up">To Follow-up</option>
      <option value="Poc">Poc</option>
      <option value="No Deal">No Deal</option>
     
    </select>
              </div>
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>MOM with Actions 
  </label>
  <div className="col-sm-6 my-1">
    <textarea
      name="callsummery1"
      placeholder="Enter MOM with Actions"
      value={formData.callsummery1}
      onChange={handleInputChange}
      className="form-control"
      autoComplete=""
      rows="1" // You can adjust this initial number of rows
      style={{ resize: "vertical" }} // This allows vertical resizing
      required
    />
  </div>
</div>
</>
            )}
             <div className="form-group row my-3">
              <label htmlFor="lwd" className="col-sm-4 col-form-label my-1 label-custom">
        Do You Have 3rd Call Details?
      </label>
      <div className="col-sm-2 my-1">
        <select
          id="id"
          name="call3"
          style={{ color: 'green', appearance: 'auto' }}
          value={formData.call3}
          onChange={handleDropdownChange} // Use handleDropdownChange here
          className="form-control"
        >
           <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
    </div>
    {formData.call3=== 'Yes' && (
      <>
<h4 className="text-center">3rd Call Details  </h4>
              <div className="form-group row my-3">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
                
              <span style={{ color: 'red' }}>*</span>Date

              </label>
              <div className="col-sm-2 my-1">
                <input
                 type="date"
                  name="cuscalldate2"
                  value={formData.cuscalldate2}
                  onChange={handleInputChange}
                  className="form-control"
                  id="sdate"
                  autoComplete=""
                  required
                />
              </div>
           
           
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Ist Time
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="time"
                  name="isttime2"
                  value={formData.isttime2}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete=""
                  required
                />
              </div>
              <label htmlFor="email" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>From Name
              </label>
              <div className="col-sm-2 my-1">
                <input
                  type="text"
                  name="fromname2"
                  value={formData.fromname2}
                  placeholder="Enter From Name"
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              </div>
              <div className="form-group row my-1">
              <label htmlFor="immi" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>Call-3 State
              </label>
              <div className="col-sm-2 my-1">
              <select
      id="id"
      name="callstatus2"
      style={{ color: "green", appearance: "auto" }}
      value={formData.callstatus2}
      onChange={handleInputChange}
      className="form-control"
      required
    >
      <option value="">Select..</option>
       <option value="To Follow-up">To Follow-up </option>
      <option value="Poc">Poc</option>
      <option value="Deal">No Deal</option>
     
    </select>
              </div>
              <label htmlFor="id" className="col-sm-2 col-form-label my-1 label-custom">
              <span style={{ color: 'red' }}>*</span>MOM with Actions 
  </label>
  <div className="col-sm-6 my-1">
    <textarea
      name="callsummery2"
      placeholder="Enter MOM with Actions"
      value={formData.callsummery2}
      onChange={handleInputChange}
      className="form-control"
      autoComplete=""
      rows="1" // You can adjust this initial number of rows
      style={{ resize: "vertical" }} // This allows vertical resizing
      required
    />
  </div>
  </div>
  </>
  )}

            <div className="form-group row">
             
              <div className="offset-sm-5 col-sm-5">
              <br/>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
              </div>
            </div>
            
           
          </form>
          <br />
          <div className="text-center">
         <Link to="/loginsucess" state={{data:data}} style={{color:"bluegit"}}>Go Back</Link>
       
          </div>
          
        </div>
        
        </div>
        <br/>
      </div>
      
      </div>
   
  );
};

export default Application;
