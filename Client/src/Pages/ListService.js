import { TableRow, TableCell, TableContainer, Paper, TableBody, Table, Container, TableHead, Button } from "@material-ui/core/";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

//import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    strong: {
        fontWeight: "bold"
    },
    space: {
        //width: "120%",
    }
});

const ListService = (props) => {
    const [services, setServices] = useState([]);
    
    useEffect(() => {
            console.log("useEffect");
            console.log(props);
            
            axios.get("https://localhost:44373/api/Services",)
            .then(res => {
                setServices(res.data);
            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
        
    }, []);
    
    
     const classes = useStyles();

    const removeItem = (id) => {
        console.log("id:", id)
        axios.delete("https://localhost:44373/api/Services/" + id).then(res => {
            console.log("res :")
            //setMaterials([...materials.filter(item => item.id !== Number(id))]);
        })
            .catch(err => {
                console.log("err")
                console.log(err);
            });

    }
    let navigate = useNavigate();

    const editItem = (id) => {
       console.log(props);
       navigate('/ModifyMaterial/' + id);

    }


    return (
        <div className="my-container">
            <h1>List of Services</h1>
            <TableContainer component={Paper} className={classes.space}>
                <Table aria-label="simple table" >
                    <TableHead >
                        <TableRow  >
                            <TableCell className={classes.strong}>Id</TableCell>
                            <TableCell className={classes.strong} align="right">Service Name</TableCell>
                            <TableCell className={classes.strong} align="right">Description</TableCell>
                            <TableCell className={classes.strong} align="right"></TableCell>
                            <TableCell className={classes.strong} align="right"></TableCell>
                            <TableCell className={classes.strong} align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {services.map((row) => (
                            <TableRow key={row.serviceId}>
                                <TableCell component="th" scope="row">{row.serviceId}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right"><Button id={row.serviceId} onClick={(e) => {
                                    navigate('/ShowCalendar/' + e.currentTarget.id)
                                }}>Show Calendar</Button></TableCell>
                                <TableCell align="right"><Button id={row.serviceId} onClick={(e) => {
                                    editItem(e.currentTarget.id);
                                }}>Edit</Button></TableCell>
                                <TableCell align="right"><Button id={row.serviceId} onClick={(e) => {
                                    removeItem(e.currentTarget.id);
                                }}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default ListService;