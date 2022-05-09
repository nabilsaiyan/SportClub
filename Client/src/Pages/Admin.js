import { useState, useEffect } from "react";
import '../Css/Admin.css';
import {AiFillDashboard} from 'react-icons/ai';
import { useNavigate } from "react-router";
import {FaUserCircle} from 'react-icons/fa';
import axios from "axios";


const Admin = () => {
  const [user, setUser] = useState("Admin");
  const [materials, setMaterials] = useState(0);
  const [instructors, setInstructors] = useState(0);
  const [services, setServices] = useState(0);
  const [subscriptions, setSubscriptions] = useState(0);
  const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }

  useEffect(() => {
    axios.get("https://localhost:44373/api/Materials").then(res => {
      setMaterials(res.data.length);
    }
    ).catch(err => {
      console.log('err:', err)
    });
    
    axios.get("https://localhost:44373/api/Instructors").then(res => {
      setInstructors(res.data.length);
    }
    ).catch(err => {
      console.log('err:', err)
    });
    axios.get("https://localhost:44373/api/Services").then(res => {
      setServices(res.data.length);
    }
    ).catch(err => {
      console.log('err:', err)
    });
    axios.get("https://localhost:44373/api/Subscriptions").then(res => {
      setSubscriptions(res.data.length);
    }
    ).catch(err => {
      console.log('err:', err)
    });


}, [])


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
            navigate("/Admin");
        }}>Dashboard</label>
        </div>
        <div className="item" >
          <AiFillDashboard className="margin" />
          <label onClick={() => {
            navigate("/AddMaterial");
        }}>Add New Material</label>
        </div>
        <div className="item" >
          <AiFillDashboard className="margin" />
          <label onClick={() => {
            navigate("/AddInstructor");
        }}>Add New Instructor</label>
        </div>
        <div className="item" >
          <AiFillDashboard className="margin" />
          <label onClick={() => {
            navigate("/AddService");
        }}>Add New Service</label>
        </div>
      </div>
      <div className="content">
        <div className="header">
          <label>Dashboard</label>
        </div>
        <div className="materials m1" onClick={() => handleClick("/ListMaterial")}>
          <label onClick={() => handleClick("/ListMaterial")}>Materials number :  </label>
          <label onClick={() => handleClick("/ListMaterial")} className="number"> {materials}</label>
        </div>
        <div className="materials m2" >
          <label onClick={() => handleClick("/ListInstructor")}>Instructors number :  </label>
          <label className="number"> {instructors}</label>
        </div>
        <div className="materials m3">
          <label onClick={() => handleClick("/ListService")}>Services number :  </label>
          <label className="number"> {services}</label>
        </div>
        <div className="materials m4">
          <label onClick={() => handleClick("/PricingContent")}>Subscriptions number :  </label>
          <label className="number"> {subscriptions}</label>
        </div>
      </div>
   </div>
  );
};
export default Admin;
