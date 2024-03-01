import React from "react";
import { Link } from "react-router-dom";

export default function AdminPasswordmsg() {
  return (
    <div className="container">
      <br /> <br /> <br /><br /><br /><br />
      <div className="row">
        <div className="col-md-12">
          <div className="mt-5 text-center">
            <h1 style={{ color: "green" }}>Password Changed Successfully</h1>
            <br /> <br /> <br /> 
            <Link to="/adminlogin" className="btn btn-primary">
              Login Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
