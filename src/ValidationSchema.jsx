// ValidationSchema.js
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
    ename:yup.string().required('Name is required').matches(/^[A-Za-z]+$/, 'Name must contain only alphabets'),
    mob:yup.string().required('Mobile Number is required').matches('/^\d{10}$/','Mobile Number 10 Digits Only'),
    
    cnpassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  
});

 

