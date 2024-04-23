import React from 'react';
import './App.css';
import Regfail from './Regfail';
//import Onielogo from './onielogo';
import Onielogo from './Onielogo';
import WelcomePage from './home1';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './register';

import Otp from './Otp';
import Regsucess from './Regsucess';
import Registersave from './Registersave';

import Login from './Login';
import Forgetpassword from './Forgetpassword';
import Invalidcredits from './Invalidcredits';
//import ChangeOtp from './ChangeOtp';
import ChangeOtp from './Changeotp';
import Forgetpassword1 from './Forgetpassword1';
import ChangePasswordSuccess from './ChangePasswordSuccess';
import Applicantshome from './Applicantshome';
import Application from './Application';
import Sucess from './Success';
import ViewProApplication from './ViewProApplication';
import TagRegister from './TagRegister';
import AdminOtp from './AdminOtp';
import AdminRegistersave from './AdminRegistersave';
import AdminLogin from './AdminLogin';
import AdminForgetPassword from './AdminForgetPassword';
import AdminForgetPasswordOtp from './AdminChangeOtp';
import AdminPasswordmsg from './AdminPasswordmsg';
import AdminPasswordChange from './AdminPasswordChange';
import ViewAlldetails from './ViewAlldetails';
import AdminEdit from './AdminEdit';
//import Piechart from './PieChart';
import Piechart from './Piechart';
import Regsucess1 from './Regsucess1';
import UserEdit from './UserEdit';
import Profile from './Profile';
import AdminProfile from './AdminProfile';
import AdminRegfail from './AdminRegfail';
import Addmore from './Addmore';
import AdminLoginInvalid from './AdminLoginInvalid';
import AdminAddmoreDetails from './AdminAddmoreDetails';
import SuperAdminLogin from './SuperAdminLogin';
import Margin from './Margin';
import SuperAdmingetOtp from './SuperAdmingetOtp';
import SuperAdminChagpass from './SuperAdminChgpss';
import SuperAdminOtpfield from './SuperAdminOtpfield';
import SuperAdminPasswordChg from './SuperAdminPasswordchg';
import SuperAdminEdit from './SupAdminEdit';
import SpecUserReg from './SpecUserReg';
import SpecSupAdmByAdm from './SpecSupAdmByAdm';
function App() {
  return (
    <div className="maincontainer">
      <Router>
        
        <Onielogo />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/regsucess" element={<Regsucess />} />
          <Route path="/regsucess1" element={<Regsucess1/>}/>
          <Route path="/regsavesucess" element={<Registersave />} />
          <Route path="/regfail" element={<Regfail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/invalidcredits" element={<Invalidcredits />} />
          <Route path="/changepassword" element={<ChangeOtp />} />
          <Route path="/changepassword1" element={<Forgetpassword1 />} />
          <Route path="/changepasswordsucess" element={<ChangePasswordSuccess />} />
          <Route path="/loginsucess" element={<Applicantshome />} />
          <Route path="/application" element={<Application />} />
          <Route path="/success2" element={<Sucess/>} />
          <Route path="/viewapplication" element={<ViewProApplication/>} />
          <Route path="/admin" element={<TagRegister/>} />
          <Route path="/adminotp" element={<AdminOtp/>} />
          <Route path="/adminregsucess" element={<AdminRegistersave/>} />
          <Route path="/addmore" element={<Addmore/>} />
          <Route path="/adminlogin" element={<AdminLogin/>} />
          <Route path="/adminforgetpassword" element={<AdminForgetPassword/>} />
          <Route path="/adminchangepassword" element={<AdminForgetPasswordOtp/>} />
          <Route path="/adminchangepassword1" element={<AdminPasswordChange/>} />
          <Route path="/adminsuccess" element={<AdminPasswordmsg/>} />
          <Route path="/viewalldetails" element={<ViewAlldetails/>} />
          <Route path="/adminedit" element={<AdminEdit/>} />
          <Route path="/piechart" element={<Piechart/>} />
          <Route path="/useredit" element={<UserEdit/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/adminprofile" element={<AdminProfile/>} />
          <Route path="/adminregfail" element={<AdminRegfail/>} />
          
          <Route path="/adminaddmore" element={<AdminAddmoreDetails/>} />
          <Route path="/loginfail" element={<AdminLoginInvalid/>} />
          <Route path="/superadminlogin" element={<SuperAdminLogin/>} />
          <Route path="/superadminview" element={<Margin/>} />
          <Route path="/superadmotp" element={<SuperAdmingetOtp/>} />{"ok"}
          <Route path="/adminchangepasswordsucess" element={<SuperAdminChagpass/>} />
          <Route path="/changesupadminpass" element={<SuperAdminOtpfield/>} />
          <Route path="/supadminotp" element={<SuperAdminPasswordChg/>} />
          <Route path="/supadminedit" element={<SuperAdminEdit/>} />
          <Route path="/supadmedit" element={<SpecUserReg/>} />
          <Route path="/supadmeditbyadmin" element={<SpecSupAdmByAdm/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
