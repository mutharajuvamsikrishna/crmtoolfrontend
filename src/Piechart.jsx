import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Link,useLocation } from "react-router-dom";

function Piechart() {
  const [data, setData] = useState([]);
  const [reshot,setReshot]=useState(0);
  const [reswarm,setReswarm]=useState(0);
  const [rescool,setRescool]=useState(0);
  const [responsestate, setResponsestate] = useState(0);
  const [responsewaitrep, setResponsewaitrep] = useState(0);
  const [responsestateneedtofollow, setResponseneedtofollow] = useState(0);
  const [responsecall,setResponsecall] =useState(0);
  const [respocstatus,setRespocstatus] =useState(0);
  const [resdealdone,setResdealdone] =useState(0);
  const [resnodeal,setResnodeal] =useState(0);
  const [resbanking,setResbanking] =useState(0);
  const [resinsurence,setResinsurense] =useState(0);
  const [resmanfa,setResmanfa] =useState(0);
  const [rescomme,setRescommme] =useState(0);
  const [resott,setResott] =useState(0);
  const [reshealth,setReshealth]=useState(0);
  const [resauto,setResauto] =useState(0);
  const [resnet,setResnet] =useState(0);
  const [rescloud,setRescloud] =useState(0);
  const [resent,setResent] =useState(0);
  const location = useLocation();
  
  useEffect(() => {
      const resData=location.state.employees;
setData(resData);
      const yetToRespond = [];
      const waitingForReply = [];
const needtofollow =[];
const callschedule=[];
const pocstatus =[];
const dealdone=[];
const nodeal=[];
const hot=[];
const warm=[];
const cold=[];
const banking=[];
const insurence=[];
const manfa=[];
const comme=[];
const ott=[];
const health=[];
const automob=[];
const network=[];
const cloud=[];
const ent=[];
      for (let i = 0; i < resData.length; i++) {
        if (resData[i].lfstatus === "Yet to Respond") {
          yetToRespond.push(resData[i].lfstatus);
        } else if (resData[i].lfstatus === "Waiting for Reply") {
          waitingForReply.push(resData[i].lfstatus);
        }
        else if (resData[i].lfstatus === "Need to Follow-Up") {
          needtofollow.push(resData[i].lfstatus);
        }
       
        else if (resData[i].lfstatus === "1st /2nd /3rd - Call Scheduled") {
          callschedule.push(resData[i].lfstatus);
        }
        else if (resData[i].lfstatus === "POC Started") {
          pocstatus.push(resData[i].lfstatus);
        }
        else if (resData[i].lfstatus === "Deal Done") {
        dealdone.push(resData[i].lfstatus);
        }
        else if (resData[i].lfstatus === "No Deal") {
          nodeal.push(resData[i].lfstatus);
        }
       if (resData[i].currentstate === "Hot") {
          hot.push(resData[i].currentstate);
        }
        else if (resData[i].currentstate === "Warm") {
          warm.push(resData[i].currentstate);
        }
        else if (resData[i].currentstate === "Cold") {
          cold.push(resData[i].currentstate);
        }
        if (resData[i].domain=== "Banking") {
          banking.push(resData[i].domain);
        } else if (resData[i].domain === "Insurence") {
              insurence.push(resData[i].domain);
        }
       else if (resData[i].domain=== "Manufacturing") {
          manfa.push(resData[i].domain);
          } else if (resData[i].domain === "e-Commerce") {
                comme.push(resData[i].domain);
          }
         else if (resData[i].domain=== "OTT") {
            ott.push(resData[i].domain);
            } else if (resData[i].domain === "Health Care") {
                  health.push(resData[i].domain);
            }
          else if (resData[i].domain=== "Automobile") {
              automob.push(resData[i].domain);
              } else if (resData[i].domain === "Networking") {
                    network.push(resData[i].domain);
              }
              if (resData[i].domain=== "Cloud Services") {
                cloud.push(resData[i].domain);
                } else if (resData[i].domain === "e-Learning/Entertainment") {
                      ent.push(resData[i].domain);
                }
      }
setResponseneedtofollow(needtofollow.length)

      setResponsestate(yetToRespond.length);
    setResponsewaitrep(waitingForReply.length)
    setResponsecall(callschedule.length)
    setRespocstatus(pocstatus.length)
    setResdealdone(dealdone.length)
    setResnodeal(nodeal.length)
    setReshot(hot.length)
    setReswarm(warm.length)
    setRescool(cold.length)
    setResbanking(banking.length)
    setResinsurense(insurence.length)
    setResmanfa(manfa.length)
    setRescommme(comme.length)
    setResott(ott.length)
    setReshealth(health.length)
    setResauto(automob.length)
    setResnet(network.length)
    setRescloud(cloud.length)
    setResent(ent.length)
    
   
  }, []);

  return (
    <React.Fragment>
      <div className="container-flucourse mb-3">
        <br/>
        <h3 className="text-center">Welcome to CRM Pie Charts </h3>
        <br/>
        <h4 className="text-center">Total No.of Clients {data.length}</h4>
       <br/>
        <Chart
          type="pie"
          wcourseth={1349}
          height={550}
          series={[0,responsestate,responsewaitrep,responsestateneedtofollow,responsecall,respocstatus,resdealdone,
          resnodeal,0,0,reshot,reswarm,rescool,0,0,resbanking,resinsurence,resmanfa,rescomme,resott,reshealth,resauto,
        resnet,rescloud,resent]}
          options={{
            title: { text: "" },
            noData: { text: "Empty Data" },
            // colors:["#f90000","#f0f"],
            labels: ["1. Latest Final Status","Yet to Respond =" + responsestate,
            "Waiting for Reply ="+responsewaitrep,
            "Need to Follow-Up ="+responsestateneedtofollow,
          "1st /2nd /3rd - Call Scheduled ="+responsecall,
        "POC Started ="+respocstatus,
      "Deal Done ="+resdealdone,
      "No Deal ="+resnodeal,
      "",
      "2. Current State",
      "Hot ="+reshot,
      "Warm ="+reswarm,
      "Cold ="+rescool,
      "",
      "3. Industry/Domain",
      "Banking ="+resbanking,
      "Insurence ="+resinsurence,
      "Manufacturing ="+resmanfa,
      "e-Commerce ="+rescomme,
      "OTT ="+resott,
      "Health Care ="+reshealth,
      "Automobile ="+resauto,
      "Networking ="+resnet,
      "Cloud Services ="+rescloud,
      "e-Learning/Entertainment ="+resent
    ],
          }}
        ></Chart>
        <br />
       

        <center>
        <a href="javascript:history.go(-1)">Go Back</a>
        </center>
      </div>
    </React.Fragment>
  );
}

export default Piechart;
