import { useState, useEffect } from "react";
import '../Css/Admin.css';
import {AiFillDashboard} from 'react-icons/ai';
import { useNavigate } from "react-router";
import {FaUserCircle, FaDumbbell, FaChalkboardTeacher, FaSwimmer} from 'react-icons/fa';
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
      setMaterials(res.data.filter(item => item.status === "Defective").length);
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
    <div className="dashboard1">
      <div className="sidebar1">
        <div className="user1">
          <label>{user}</label>
          <FaUserCircle className="user-icon1" />
        </div>
        <div className="item1" >
          <AiFillDashboard className="margin1" />
          <label onClick={() => {
            navigate("/Admin");
        }}>Dashboard</label>
        </div>
        <div className="item1" >
          <FaDumbbell className="margin1" />
          <label onClick={() => {
            navigate("/AddMaterial");
        }}>Add New Material</label>
        </div>
        <div className="item1" >
          <FaChalkboardTeacher className="margin1" />
          <label onClick={() => {
            navigate("/AddInstructor");
        }}>Add New Instructor</label>
        </div>
        <div className="item1" >
          <FaSwimmer className="margin1" />
          <label onClick={() => {
            navigate("/AddService");
        }}>Add New Service</label>
        </div>
      </div>
      <div className="content1">
        <div className="header1">
          <label>Dashboard</label>
        </div>
        <div className="materials1 m11" onClick={() => handleClick("/ListMaterial")}>
          <label onClick={() => handleClick("/ListMaterial")}>Defective Materials :  </label>
          <label onClick={() => handleClick("/ListMaterial")} className="number1"> {materials}</label>
        </div>
        <div className="materials1 m21" >
          <label onClick={() => handleClick("/ListInstructor")}>Instructors number :  </label>
          <label className="number1"> {instructors}</label>
        </div>
        <div className="materials1 m31">
          <label onClick={() => handleClick("/ListService")}>Services number :  </label>
          <label className="number1"> {services}</label>
        </div>
        <div className="materials1 m41">
          <label onClick={() => handleClick("/PricingContent")}>Subscriptions number :  </label>
          <label className="number1"> {subscriptions}</label>
        </div>
      </div>
   </div>
  );
};
export default Admin;
