import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./ViweAll.css";
import { AiOutlineFullscreen, AiOutlineCompress } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { getUserView, deleteUserById, getSearchQuery } from "./Services/Api";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [response1, setResponse1] = useState("");
  const [bdm, setBdm] = useState("");
  const [current, setCurrent] = useState("");
  const [lfs, setLfs] = useState("");
  const [ind, setInd] = useState("");
  const [int, setInt] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [tzone, setTzone] = useState("");
  const [poc, setPoc] = useState("");
  const [lcall, setLcall] = useState("");
  const [emstate, setEmstate] = useState("");
  const [lres, Lres] = useState("");
  const [follow, setFollow] = useState("");
  const [followyear, setFollowyear] = useState("");
  const [deleteresponse, setDeleteResponse] = useState(false);
  const uniqueBdmNames = [
    ...new Set(employees.map((employee) => employee.bdmname)),
  ];
  const uniqueCountries = [
    ...new Set(employees.map((employee) => employee.coun)),
  ];
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    // axios
    //  .get("http://localhost:1279/req")
    getUserView()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const location = useLocation();
  const email = location.state.data.email;

  const handleSubmit2 = (id) => {
    const data = {
      id: id,
      email: email,
    };
    navigate("/adminedit", { state: { data: data } });
  };
  const handleSubmitprofile = () => {
    const data = {
      email: email,
    };

    navigate("/adminprofile", { state: { data: data } });
  };
  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteUser(id);
    }
  };

  const deleteUser = (id) => {
    setDeleteResponse(true);
    //  axios
    //    .delete(`http://localhost:1279/delete?id=${id}`)
    deleteUserById(id)
      .then((response) => {
        alert("Deleted SucessFully");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit1 = () => {
    // axios
    //   .get(`http://localhost:1279/search?query=${searchQuery}`)
    getSearchQuery(searchQuery)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
  const handleBdmChange = (event) => {
    setBdm(event.target.value);
  };
  const handleSubmit = () => {
    const filterData = employees.filter((employee) => employee.bdmname === bdm);
    setEmployees(filterData);
  };
  const handleSubmit3 = () => {
    const filterData = employees.filter(
      (employee) => employee.currentstate === current
    );
    setEmployees(filterData);
  };
  const handleSubmit4 = () => {
    const filterData = employees.filter(
      (employee) => employee.lfstatus === lfs
    );
    setEmployees(filterData);
  };
  const handleSubmit5 = () => {
    const filterData = employees.filter((employee) => employee.domain === ind);
    setEmployees(filterData);
  };
  const handleSubmit6 = () => {
    const filterData = employees.filter(
      (employee) => employee.intrestserv === int
    );
    setEmployees(filterData);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit7 = () => {
    const filterData = employees.filter(
      (employee) => employee.coun === country
    );
    setEmployees(filterData);
  };
  const handleSubmit8 = () => {
    const filterData = employees.filter(
      (employee) => employee.region === region
    );
    setEmployees(filterData);
  };
  const handleSubmit9 = () => {
    const filterData = employees.filter(
      (employee) => employee.timezone === tzone
    );
    setEmployees(filterData);
  };
  const handleSubmit10 = () => {
    const filterData = employees.filter(
      (employee) => employee.pocstatus === poc
    );
    setEmployees(filterData);
  };
  const handleSubmit11 = () => {
    const filterData = employees.filter(
      (employee) => employee.emstate2 === emstate
    );
    setEmployees(filterData);
  };
  //last
  const handleSubmit12 = () => {
    const filterData = employees.filter(
      (employee) => employee.callstatus2 === lcall
    );
    setEmployees(filterData);
  };
  const handleSubmit13 = () => {
    const filterData = employees.filter((employee) => {
      const employeeMonth = new Date(employee.followup).toJSON().split("-")[1]; // Extract month part
      return employeeMonth === follow;
    });
    setEmployees(filterData);
  };
  const handleSubmit14 = () => {
    const filterData = employees.filter((employee) => {
      const employeeYear = new Date(employee.followup).getFullYear(); // Extract year
      return employeeYear.toString() === followyear;
    });
    setEmployees(filterData);
  };
  
  if (deleteresponse) {
    return (
      <div style={{ paddingTop: "20%" }}>
        <h1 className="text-center">Sending Details By Email.....</h1>
      </div>
    );
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
            color: "blue",
          }}
        />
      </div>
      <div className="id6">
        <br />
        <br /> <br />
        <Link to="/piechart" state={{ employees }}>
          Show in Pie Charts
        </Link>
      </div>
      <br />
      <br />
      <br /> <br />
      <br />
      <h2 className="text-center">Applications List</h2>
      <br />
      <h4 className="text-center" style={{ color: "blue" }}>
        Total No.of Clients: {employees.length}
      </h4>
      <div className="search">
        <br />
        <center>
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>Universal Search</label>
            <br></br>
            <input
              type="text"
              name="query"
              placeholder="Search Query"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button onClick={(event) => handleSubmit1()}>Search</button>
            <input
              type="reset"
              value="Reset"
              onClick={() => setSearchQuery("")}
            />
          </form>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          {/* <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>BDM Name</label>
            <br />

            <select
              value={bdm}
              onChange={(event) => setBdm(event.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Bharath">Bharath</option>

              <option value="Prashanth">Prashanth</option>

              <option value="Posu Babu">Posu Babu</option>

              <option value="Murali">Murali</option>

              <option value="Ramana">Ramana</option>
            </select>
           
            <button onClick={handleSubmit}>Search</button>
          </form> */}
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>BDM Name</label>
            <br />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <select value={bdm} onChange={handleBdmChange}>
              <option value="">Select BDM</option>
              {uniqueBdmNames.map((uniqueBdmName, index) => (
                <option key={index} value={uniqueBdmName}>
                  {uniqueBdmName}
                </option>
              ))}
            </select>
            <button onClick={handleSubmit}>Search</button>
          </form>{" "}
          &nbsp; &nbsp; &nbsp;
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>Current State </label>
            <br />
            <select
              value={current}
              onChange={(event) => setCurrent(event.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Hot">Hot</option>
              <option value="Warm">Warm</option>
              <option value="Cold">Cold</option>
            </select>
            {/* third */}
            <button onClick={handleSubmit3}>Search</button>
          </form>
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>Latest Final Status</label>
            <br />
            <select
              value={lfs}
              onChange={(event) => setLfs(event.target.value)}
            >
              <option value="">Select an option</option>
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
            <button onClick={handleSubmit4}>Search</button>
          </form>
          <br />
          <br />
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>Industry/Domain</label>
            <br />
            <select
              value={ind}
              onChange={(event) => setInd(event.target.value)}
            >
              <option value="">Select an option</option>
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
            <button onClick={handleSubmit5}>Search</button>
          </form>
          &nbsp; &nbsp; &nbsp;
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>Interested Service/s</label>
            <br />
            <select
              value={int}
              onChange={(event) => setInt(event.target.value)}
            >
              <option value="">Select an option</option>
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
            <button onClick={handleSubmit6}>Search</button>
          </form>
          &nbsp; &nbsp; &nbsp;
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>Country</label>
            <br />
            <select value={country} onChange={handleCountryChange}>
              <option value="">Select Country</option>
              {uniqueCountries.map((uniqueCountry, index) => (
                <option key={index} value={uniqueCountry}>
                  {uniqueCountry}
                </option>
              ))}
            </select>
            <button onClick={handleSubmit7}>Search</button>
          </form>
          &nbsp; &nbsp; &nbsp;
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>Continent/Region</label>
            <br />
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Asia">Asia</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Europe">Europe</option>
              <option value="Australia">Australia</option>
              <option value="Africa">Africa</option>
              <option value="Antarctica">Antarctica</option>
            </select>
            <button onClick={handleSubmit8}>Search</button>
          </form>
          <br/>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit13();
            }}
            style={{ display: "inline-block" }}
          >
            <label>Follow-Up Date</label>
            <br />
            <select
              value={follow}
              onChange={(event) => setFollow(event.target.value)}
            >
              <option value="">Select Follow-Up Date</option>
              <option value="01">Jan</option>
              <option value="02">Feb</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">Augest</option>
              <option value="09">Sept</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <button type="submit">Search</button>
          </form>
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <form
  onSubmit={(event) => {
    event.preventDefault();
    handleSubmit14();
  }}
  style={{ display: "inline-block" }}
>
  <label>Follow-Up Year</label>
  <br />
  <select
    value={followyear}
    onChange={(event) => setFollowyear(event.target.value)}
  >
    <option value="">Select Follow-Up Year</option>
    <option value="2021">2021</option>
    <option value="2022">2022</option>
    <option value="2023">2023</option>
    <option value="2024">2024</option>
    <option value="2025">2025</option>
    <option value="2026">2026</option>
  </select>
  <button type="submit">Search</button>
</form>;

          <br />
          <br />
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>Time Zone</label>
            <br />
            <select
              value={tzone}
              onChange={(event) => setTzone(event.target.value)}
            >
              <option value="">Select an option</option>
              <option value="CT">CT</option>
              <option value="PT">PT</option>
              <option value="MT">MT</option>
              <option value="PST">PST</option>
            </select>
            <button onClick={handleSubmit9}>Search</button>
          </form>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>PoC Status</label>
            <br />
            <select
              value={poc}
              onChange={(event) => setPoc(event.target.value)}
            >
              <option value="">Select an option</option>
              <option value="NA">NA</option>
              <option value="Planned">Planned</option>
              <option value="In-progress">In-progress</option>
              <option value="Success">Success</option>
              <option value="Faild">Faild</option>
              <option value="Deal Done">Deal Done</option>
              <option value="No Deal">No deal</option>
            </select>
            <button onClick={handleSubmit10}>Search</button>
          </form>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>Last E-Mail State</label>
            <br />
            <select
              value={emstate}
              onChange={(event) => setEmstate(event.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Yet to Respond">Yet to Respond </option>
              <option value="Waiting for Reply">Waiting for Reply</option>
              <option value="To Follow-up">To Follow-up</option>
            </select>
            <button onClick={handleSubmit11}>Search</button>
          </form>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <form
            onSubmit={(event) => event.preventDefault()}
            style={{ display: "inline-block" }}
          >
            <label>Last Call State</label>
            <br />
            <select
              value={lcall}
              onChange={(event) => setLcall(event.target.value)}
            >
              <option value="">Select an option</option>
              <option value="To Follow-up">To Follow-up</option>
              <option value="Poc">Poc</option>
              <option value="Deal">Deal</option>
              <option value="NO Deal">No Deal</option>
            </select>
            <button onClick={handleSubmit12}>Search</button>
          </form>
        </center>
      </div>
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

                    <tr>
                      <th>Delete</th>
                      <td className="id2" colSpan={5}>
                        <button
                          className=""
                          onClick={() => confirmDelete(emp.id)}
                        >
                          <MdDelete
                            style={{
                              height: "20px",
                              width: "20px",
                              color: "red",
                            }}
                          />
                        </button>
                      </td>
                    </tr>
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
      </div>
      <br />
      <br />
    </div>
  );
};

export default ListEmployee;
