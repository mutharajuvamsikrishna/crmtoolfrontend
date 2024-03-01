import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./Application.css";
import {superAdminLoginmethod } from './Services/Api';

const SuperAdminLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      showPassword:''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      var v = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*&@#]).{6,}/; 
      if(!values.password.match(v)){
        alert("Password Should Minimum 6 Digits,Should have at least one uppercase and  Lowercase,One Numeric And Special Symbols Like @,&,*,#")
        return false;
      }
      try {
        const response = await superAdminLoginmethod(values);

        if (response.data === "success") {
         
          navigate("/superadminview", { state: { data: values } });
        }else{
            alert("Invalid credentials");
        }
      } catch (error) {
        console.error(error);
       
      }
    },
  });

  const setResponse = () => {
    formik.setFieldValue('showPassword', !formik.values.showPassword);
  };

  
  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "99vh" }}>
      <center>
        <div style={{ paddingTop: "8%" }}>
          <h2 style={{ color: "blue" }}>Login to CRM System </h2>
          <br /> <br />
          <form onSubmit={formik.handleSubmit}>
            <input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              className='form-control'
              placeholder='Enter Email'
              style={{ width: "20%" }}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            ) : null}
            <br />
            <input
              type={formik.values.showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              className='form-control'
              placeholder='Enter Password'
              style={{ width: "20%" }}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}
            <br />
            <button
              type="button"
              style={{ height: "40px", width: "60px", border: "2px solid #3498db" }}
              className='btn btn-'
              onClick={setResponse}
            >
              {formik.values.showPassword ? 'Hide' : 'Show'}
            </button>
            <br />
            <br />
            <button
              className='btn btn-primary'
              type="submit"
              style={{ width: "20%", fontSize: "18px" }}
            >
              Log In
            </button>
          </form>
          <br />
          <Link to="/superadmotp">Forget Password?</Link>
        </div>
        <div>
          
          
        </div>
      </center>
    </div>
  );
};

export default SuperAdminLogin;
