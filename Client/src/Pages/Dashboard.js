import { useState, useEffect } from "react";
import {AiFillDashboard} from 'react-icons/ai';
import { useNavigate } from "react-router";
import {FaUserCircle} from 'react-icons/fa';
import '../Css/Sidebar.css';

 
const Dashboard = () => {
 const [user, setUser] = useState("Nabil");
  const [plan, setPlan] = useState("None");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Dashboard";
    setUser(localStorage.getItem("login"));
    if (localStorage.getItem("plan"))
      setPlan(localStorage.getItem("plan"));
  });

  const handleClick = (table) => {
    navigate(table);
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="user">
          <label>{user}</label>
          <FaUserCircle className="user-icon" />
        </div>
        <div className="item" >
          <AiFillDashboard className="margin" />
          <label onClick={() => {
            navigate("/Dashboard");
        }}>Dashboard</label>
        </div>
        <div className="item" >
          <AiFillDashboard className="margin" />
          <label onClick={() => {
            navigate("/PricingContent");
        }}>Subscriptions</label>
        </div>
        <div className="item" >
          <AiFillDashboard className="margin" />
          <label onClick={() => {
            navigate("/ShowCalendar/" + + localStorage.getItem("planCalendar"));
        }}>My Calendar</label>
        </div>
      </div>
      <div className="content">
        <div className="header">
          <label>Dashboard</label>
          <div className="materials m1" >
            <label >Subscription Plan :  </label>
            <label className="number"> {plan}</label>
            {plan != "None" ? null : <button className="btn btn-primary" onClick={() => {
              navigate("/PricingContent");
            }}>Subscribe Now!</button>
                }
          </div>
          { plan == "None" ? null : <div className="materials m2" onClick={() => {
            navigate("/ShowCalendar/" + localStorage.getItem("planCalendar"));
        }}>
            <label onClick={() => {
            navigate("/ShowCalendar/" + localStorage.getItem("planCalendar"));
        }}> My Calendar</label>
          </div>}
        </div>
      </div>
      
   </div>
  );
};
export default Dashboard;
