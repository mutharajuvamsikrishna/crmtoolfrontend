import React, { useState,useEffect } from 'react';
import { useLocation, Link,useNavigate } from 'react-router-dom';
import "./Application.css";
import axios from 'axios';
import { CgProfile } from 'react-icons/cg';
import { postUserAddmore } from './Services/Api';
const Addmore=() =>{
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("Asia");
  const [empid, setEmpid] = useState("");
  const [city, setCity] = useState("");
  
  const location = useLocation();
  const data = location.state.data;
  const email=data.email;

const navigate=useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data1 = {
      email: email,
      gender: gender,
      country: country,
      region: region,
      empid: empid,
      city: city,
    };
    var v45=/^[a-zA-Z\s]*$/;
    
    if(data1.gender===""){
      alert("Please Select Gender")
      return false;
    }
    if (!data1.country.match(v45)) {
      alert("Country Alphabets Only");

      return false;
    }
    if (!data1.city.match(v45)) {
      alert("City Alphabets Only");

      return false;
    }
    
  //  axios
   //   .post("http://localhost:1279/addmore", data1)
   postUserAddmore(data1)
      .then((response) => {
        if (response.data === "addmoredone") {
          navigate("/profile", { state: { data: data } });
        
        } 
        else{
          navigate("/regfail")
        }
      })
     
      .catch((error) => {
        console.error(error);
        alert("An error occurred.");
      });
    
  }
 const handleSubmit2=()=>{
  navigate("/profile", { state: { data: data } });
  }

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: "99vh" }}>
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
      <div style={{paddingTop:"5%"}} >
        <h2 className='text-center'style={{ color: 'blue' }}>Add More Details</h2>
      </div>
      <div style={{paddingTop:"1%"}}>
        <center>
         
          <form onSubmit={handleSubmit}>
          <table cellPadding={20}>
            <tbody>
              <tr className='addmore1'>
                <td>Employee ID</td>
                <td>
                  <input type="text"
                  name="empid"
                  placeholder='Enter Employee ID'
                  className='form-control'
                  value={empid}
                  onChange={(e) => setEmpid(e.target.value)}
                  style={{width:"300px"}}
                  required
                  />
                </td>
              </tr>
              <tr>
  <td className='addmore1'>Gender</td>
  <td>
    Male <input
      type="radio"
      name="gender"
      value="male"
      checked={gender === "male"}
      onChange={(e) => setGender(e.target.value)}
    />&nbsp;&nbsp;&nbsp;
    Female <input
      type="radio"
      name="gender"
      value="female"
      checked={gender === "female"}
      onChange={(e) => setGender(e.target.value)}
     
    />
  </td>
</tr>
<tr className='addmore1'>
                <td>Continent/Region</td>
                <td>
                <select
                style={{ color: "green", appearance: "auto" }}
                name="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="form-control"
                required
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
              </tr>
              <tr className='addmore1'>
                <td>Country</td>
                <td>
                  <input type="text"
                  name="country"
                  placeholder='Enter Country'
                  className='form-control'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{width:"300px"}}
                  required
                  />
                </td>
              </tr>
              <tr className='addmore1'>
                <td>City</td>
                <td>
                  <input type="text"
                  name="city"
                  placeholder='Enter City'
                  className='form-control'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{width:"300px"}}
                  required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br/>
          <button className='btn btn-primary' type='submit'>Submit</button>
          </form>
          <br/>
          <a href="javascript:history.go(-1)">Go Back</a>
        </center>
      </div>
     </div>
  );
}
export default Addmore;
