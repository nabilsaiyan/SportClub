import { useState, useEffect } from "react";
import {AiFillDashboard} from 'react-icons/ai';
import { useNavigate } from "react-router";
import {FaUserCircle, FaCalendarCheck} from 'react-icons/fa';
import {AiFillCloseCircle} from 'react-icons/ai';
import {GiShieldEchoes} from 'react-icons/gi';
import '../Css/Sidebar.css';
import '../Css/Modal.css'
import news1 from '../Images/newsletter1.png';
import axios from "axios";
import lifting from '../Images/lifting.png';
import pack2 from '../Images/pack2.png';
import pack3 from '../Images/pack3.png';
 
const Dashboard = () => {
 const [user, setUser] = useState("Nabil");
  const [plan, setPlan] = useState("None");
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [style, setStyle] = useState({});
  const [modal, setModal] = useState("");


  useEffect(() => {
    document.title = "Dashboard";
    setUser(localStorage.getItem("login"));
    if (localStorage.getItem("plan"))
      setPlan(localStorage.getItem("plan"));
    
    axios.get("https://localhost:44373/api/Newsletters").then(res => {
      setImages(res.data);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(true);
    });
    axios.get("https://localhost:44373/api/Subscribers/Subscription/" + localStorage.getItem("login")).then(res => {
      localStorage.setItem("plan", res.data.title);
      setPlan(localStorage.getItem("plan"));
      if(res.data.title === "Basic"){
        localStorage.setItem("planCalendar", "1");
      }
      else if(res.data.title === "Premuim"){
        localStorage.setItem("planCalendar", "2");
      }
      else if(res.data.title === "Full"){
        localStorage.setItem("planCalendar", "3");
      }
    }).catch(err => {
      console.log(err);
    });
    }, []);

  const handleClick = (table) => {
    navigate(table);
  }

  const handleClickImage = (id) => {
    console.log(id);
    setStyle({'display': 'block'});
    setModal(images[id].image);
  }

  const handleClose = () => {
    setStyle({'display': 'none'});
    setModal("");
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
          <GiShieldEchoes className="margin" />
          <label onClick={() => {
            navigate("/PricingContent");
        }}>Subscriptions</label>
        </div>
        <div className="item" >
          <FaCalendarCheck className="margin" />
          <label onClick={() => {
            navigate("/PackCalendar/" + localStorage.getItem("planCalendar"));
        }}>My Calendar</label>
        </div>
      </div>
      <div className="content">
        <div className="header">
          <label>Dashboard</label>
          <div className="materials m1" >
            <label >Subscription Plan :  </label>
            <label className="number"> {plan}</label>
            {localStorage.getItem("plan") == "Basic" ? <img src={lifting} className="" /> : null}
            {localStorage.getItem("plan") == "Premuim" ? <img src={pack2} className="" /> : null}
            {localStorage.getItem("plan") == "Full" ? <img src={pack3} className="" /> : null}
            {plan != "None" ? null : <button className="btn btn-primary" onClick={() => {
              navigate("/PricingContent");
            }}>Subscribe Now!</button>
                }
          </div>
          {/* plan == "None" ? null : <div className="materials m2" onClick={() => {
            navigate("/ShowCalendar/" + localStorage.getItem("planCalendar"));
        }}>
            <label onClick={() => {
            navigate("/ShowCalendar/" + localStorage.getItem("planCalendar"));
        }}> My Calendar</label>
      </div>*/}
        </div>
      </div>
      { !loading ? <div className="news">
        {images.map((item, index) => (
          <div className="news-item">
            <label>NewsLetter {index + 1}</label>
            <img src={`data:image/png;base64,${item.image}`} alt="news1" id={index} onClick={(e) => handleClickImage(e.target.id)}/>
            
          </div>
        )) }
      </div> : <div className="news">
          <div className="news-item-loading">
            <label></label>
            <div> </div>  
          </div>
          <div className="news-item-loading">
            <label></label>
            <div> </div>  
          </div>
      </div>}
      
        <div id="myModal" class="modal" style={style}>
          
          <AiFillCloseCircle className="close1" onClick={handleClose} />
          <img src={`data:image/png;base64,${modal}`} class="modal-content" id="img01"/>
          <div id="caption"></div>
        </div>
      </div>
  );
};
export default Dashboard;
