import { TableRow, TableCell, TableContainer, Paper, TableBody, Table, Container, TableHead, Button } from "@material-ui/core/";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {Trash2Fill} from 'react-bootstrap-icons';

//import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    strong: {
        fontWeight: "bold"
    },
    space: {
        //width: "120%",
    }
});
const MINUTE_MS = 3000;

var load = false;
const Notifications = (props) => {
    const [notifs, setNotifs] = useState([{
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
                if(res.data.length > 0){
                    setNotifs(res.data);
                    res.data.forEach(item => {
                        if(!item.read){
                            let tmp = item;
                            tmp.read = true;
                            axios.put("https://localhost:44373/api/Notifications/" + item.notificationId, tmp
                            ).then(res => {
                                console.log(res.data);
                            }).catch(err => {
                                console.log(err);
                            }   
                            )
                        }
                    });
                }

            }).catch(err => {
                console.log(err);
            }
            )
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])
    
        const classes = useStyles();

    const removeItem = (id) => {
        console.log("id:", id)
        axios.delete("https://localhost:44373/api/Notifications/" + id).then(res => {
            console.log("res :")
            setNotifs(notifs.filter(item => item.id !== id));
        })
            .catch(err => {
                console.log("err")
                console.log(err);
            });

    }

    let navigate = useNavigate();


    return (
        <div className="my-container" >
            <h1>Notifications</h1>
            {notifs.map((item, index) => (
                <div key={item.notificationId} className="notif-container">
                    <h1>{item.subject}</h1>
                    <Trash2Fill className="trash" id={item.notificationId} onClick={(e)=>{
                        removeItem(e.currentTarget.id);
                    }}/>
                    <p>{item.content}</p>
                </div>
            ))} 
        </div>

    );
}

export default Notifications;