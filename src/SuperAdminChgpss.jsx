import React from 'react';
import { Link } from 'react-router-dom';

export default function SuperAdminChagpass() {
  return (
    
    <div className="container" style={{paddingTop:"15%"}}>
       
      <div className="row">
        <div className="col-md-12">
          <div className="mt-5 text-center">
            <h1 style={{ color: 'green' }}>Password Change Successfully</h1>
            <br /> <br /> <br /> 
            <Link to="/superadminlogin" className="btn btn-primary">
              Go Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
