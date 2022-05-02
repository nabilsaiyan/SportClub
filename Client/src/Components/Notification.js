import { Toast, ToastContainer } from "react-bootstrap"
import { makeStyles } from "@material-ui/core";
import { useState } from "react";


const useStyles = makeStyles({
    notif: {
      position : "fixed",
      bottom : "15px",
        right : "10px",
    }
  })

  const data = [
      {
          "title": "NewsLetter",
          "description": "Hello, world! This is a Newsletter notification."
      },
      {
          "title": "Promotion",
          "description": "Hello, world! This is a Promotion notification."
      },
      
    ];

const Notification = () => {
    const [notif, setNotif] = useState(data);
    let classes = useStyles();
    return (
        <ToastContainer className={classes.notif} >
            {notif.map((item, index) => (
                <Toast key={index} onClose={(e) => {
                    console.log(e);
                    setNotif(notif.filter((item, i) => i !== index));
                } }>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">{item.title}</strong>
                        {/*<small>11 mins ago</small>*/}
                    </Toast.Header>
                    <Toast.Body>{item.description}</Toast.Body>
                </Toast>
            ))}
        
        </ToastContainer>
      );
}
 
export default Notification;
