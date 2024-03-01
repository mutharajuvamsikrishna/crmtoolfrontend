import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { postChangeAdminPasswordByEmail } from './Services/Api';
const SuperAdminPasswordChg = () => {
  const [cnpassword, setCnpassword] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Move this line before any references to 'location'
  const [showPassword,setShowPassword]=useState(false);
  const setResponse=(type)=>{
    if(showPassword===true){
     setShowPassword(false)
    }
    else{
     setShowPassword(true)
    }
   }
  const email = location.state.data.email; // Now you can access 'location'

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      cnpassword: cnpassword,
    };

    var v1=data.password;
    var v2= data.cnpassword;
    var v = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*&@#]).{6,}/; 
    if(!data.password.match(v)){
      alert("Password Should Minimum 6 Digits,Should have at least one uppercase and  Lowercase,One Numeric And Special Symbols Like @,&,*,#")
      return false;
    }
    if(v1!=v2){
        alert("Password doesn't Match To Confirm Password")
        return false;
       }

   // axios
    //  .put('http://localhost:1279/changepassword1', data)
    postChangeAdminPasswordByEmail(data)
      .then((response) => {
        if (response.data === "savesuceess1") {
          
          navigate({
            pathname: "/adminchangepasswordsucess",
            state: { data: data } // Pass the data object as state
          });
        } else {
          navigate("/Invalidcredits");
          
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", height: "99vh",paddingTop:"5%" }}>
      <center>
       
      
        
        <h2 style={{color:"blue"}}>Change Password</h2>
        <br/>
        <div className="default" style={{backgroundColor:"",minHeight:"40vh",width:"40%"}}>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
           <br/>
           <label>New Password</label>
           <p></p>
            <input
              type={showPassword?"text":"password"}
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter New Password'
              autoComplete="off"
              style={{width:"40%",borderColor:'black'}}
              required
            />
          </div>
          <div className="form-group">
           <br/> 
        
           <label>Confirm New Password</label>
           <p></p>
            <input
              type={showPassword?"text":"password"}
              className="form-control"
              id="cnpassword"
              value={cnpassword}
              onChange={(e) => setCnpassword(e.target.value)}
              placeholder='Confirm New Password'
              autoComplete="off"
              style={{width:"40%",borderColor:'black'}}
              required
            />
          </div>
          <br/>
          <button type="button" style={{height:"40px",width:"60px",border: "2px solid #3498db",}} className='btn btn-' onClick={()=>setResponse(showPassword)}>{showPassword ? 'Hide':'Show'}</button>
          <br />
          <br/>
          <button type="submit" style={{height:"50px",width:"100px"}} className="btn btn-primary">Submit</button>
        </form>
        <br/>
        
        </div>
        <br />
       
        <a href="javascript:history.go(-1)">Go Back</a>
        
      </center>
    
    </div>
  );
};

export default SuperAdminPasswordChg;
