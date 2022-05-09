import { TableRow, TableCell, TableContainer, Paper, TableBody, Table, Container, TableHead, Button } from "@material-ui/core/";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from "react-router";
import Switch from "@material-ui/core/Switch";



const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    },
    strong : {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Rubik',
        color: '#ef5151'
    },
    left : {
        color: '#2155CD',
    },
    table : {
        width: '800px'
    }
})


const AddCalendar = () => {
    const [name, setName] = useState("");
    const classes = useStyles();
    const [description, setDecription] = useState("");
    const [data, setData] = useState([
        {
            "morning": false,
            "evening": false
        },
        {
            "morning": false,
            "evening": false
        },
        {
            "morning": false,
            "evening": false
        },
        {
            "morning": false,
            "evening": false
        },
        {
            "morning": false,
            "evening": false
        },
        {
            "morning": false,
            "evening": false
        },
        {
            "morning": false,
            "evening": false
        }
    ]);

    const navigate = useNavigate();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];    

    const handleSubmit = (e) => {
        e.preventDefault();
       
        }

    const update = (value, index) => {
        console.log(value, index);
        let newData = [...data];
        newData[index].morning = value;
        setData(newData);
        console.log(data);
    }
    const update2 = (value, index) => {
        console.log(value, index);
        let newData = [...data];
        newData[index].evening = value;
        setData(newData);
        console.log(data);
    }

    return ( 
        <div className="my-container"> 
            <h1>Set Calendar</h1>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table" >
                    <TableHead >
                        <TableRow  >
                            <TableCell className={classes.strong}></TableCell>
                            <TableCell align="left" className={classes.strong} >Morning</TableCell>
                            <TableCell align="center" className={classes.strong} >Evening</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        
                        {data.map((row, index) => (
                            <TableRow >
                                <TableCell  className={[classes.strong, classes.left]} component="th" scope="row">{days[index]}</TableCell>
                                <TableCell align="left">
                                     <Switch value={row.morning} on onChange={(e) => update(e.target.checked, index)} />
                                </TableCell>
                                <TableCell align="center">
                                     <Switch  value={row.evening} on onChange={(e) => update2(e.target.checked, index)} />
                                </TableCell>
                                
                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
            </TableContainer>
                <button  className="button continue" style={{width : '30%'}} type="submit" onSubmit={handleSubmit}>Set Calendar</button>
                <button  className="button cancel" style={{width : '30%'}} onClick={() => navigate(-1)}>Cancel</button>   
        
        </div>

     );
}
 
export default AddCalendar;