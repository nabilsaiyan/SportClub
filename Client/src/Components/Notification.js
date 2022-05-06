import { Toast, ToastContainer } from "react-bootstrap"
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";


const useStyles = makeStyles({
    notif: {
      position : "fixed",
      bottom : "15px",
        right : "10px",
    }
  })

 /* const data = [
      {
          "title": "NewsLetter",
          "description": "Hello, world! This is a Newsletter notification."
      },
      {
          "title": "Promotion",
          "description": "Hello, world! This is a Promotion notification."
      },
      
    ];
    */
const MINUTE_MS = 3000;
const Notification = () => {

    const [notif, setNotif] = useState([{
        "notificationId": 0,
        "subject": "Loading",
        "content": "...",
        "read": true
    }]);


    useEffect(() => {
        const interval = setInterval(() => {
            console.log("called");
            axios.get("https://localhost:44373/api/Notifications")
            .then(res => {
                console.log(res.data);
                if(res.data.length > 0)
                    setNotif(res.data.filter((item, i) => item.read === false));
            }).catch(err => {
                console.log(err);
            }
            )
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


    let classes = useStyles();
    return (
        <ToastContainer className={classes.notif} >
            {notif.map((item, index) => (
                <Toast key={item.notificationId} onClose={(e) => {
                    console.log(e);
                    setNotif(notif.filter((item, i) => i !== index));
                } }>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">{item.subject}</strong>
                        {/*<small>11 mins ago</small>*/}
                    </Toast.Header>
                    <Toast.Body>{item.content}</Toast.Body>
                </Toast>
            ))}
        
        </ToastContainer>
      );
}
 
export default Notification;
