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

var load = false;
const Notifications = (props) => {
    const [notifs, setNotifs] = useState([
        {
            "title": "NewsLetter",
            "description": "Hello, world! This is a Newsletter notification."
        },
        {
            "title": "Promotion",
            "description": "Hello, world! This is a Promotion notification."
        },
        
      ]);
    
    useEffect(() => {
            console.log("useEffect");
            console.log(props);
            
            axios.get("https://localhost:44373/api/Notifications",)
            .then(res => {
                
            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
        
    }, []);
    
    

    
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
                <div key={index} className="notif-container">
                    <h1>{item.title}</h1>
                    <Trash2Fill className="trash" onClick={(e)=>{
                        removeItem(item.id);
                    }}/>
                    <p>{item.description}</p>
                </div>
            ))} 
        </div>

    );
}

export default Notifications;