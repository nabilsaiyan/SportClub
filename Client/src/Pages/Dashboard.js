import { useState } from "react";
import '../Css/Sidebar.css';
import {AiFillDashboard} from 'react-icons/ai';
import { useNavigate } from "react-router";
import {FaUserCircle} from 'react-icons/fa';


const Dashboard = () => {
  const [user, setUser] = useState("Nabil");
  const navigate = useNavigate();
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
      </div>
      <div className="content">
        <div className="header">
          <label>Dashboard</label>
        </div>
      </div>
   </div>
  );
};
export default Dashboard;
