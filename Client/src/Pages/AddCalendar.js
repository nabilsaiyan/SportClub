import { TableRow, TableCell, TableContainer, Paper, TableBody, Table, Container, TableHead, Button } from "@material-ui/core/";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
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
    const {id} = useParams();
    const [service, setService] = useState();
    const navigate = useNavigate();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];    
    let serv = {};
    const handleSubmit = () => {
        console.log("handleSubmit");
        axios.get("https://localhost:44373/api/Services/" + id)
            .then(res => {
                console.log(res.data);
                setService(res.data);
                let serv = res.data;
                let dataTest = [{}];
                let ind = 0;
                for (let i = 0; i < 7; i++) {
                    if(data[i].morning === true || data[i].evening === true) {
                        dataTest[ind] = {
                            "name" : days[i],
                            "mording": data[i].morning,
                            "evening": data[i].evening
                        }
                        ind++;
                    }
                }
                /*let t = {
                    "serviceId": id,
                    "name": serv.name,
                    "description": serv.description,
                    "days": dataTest
                };*/
                //console.log(t);
                console.log(dataTest);
                axios.post('https://localhost:44373/api/Services/TimeTable/' + id, dataTest)
                .then(res => {
                    console.log(res);
                    navigate("/ShowCalendar/" + id);
                }).catch(err => {
                    console.log(err);
                });
            
            }).catch(err => {
                console.log(err);
            });

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
        <div style={{ display: 'grid',
        justifyItems: 'center', margin : ' 0 200px'}}> 
            <h1>Set Calendar</h1>
            <TableContainer component={Paper} >
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
            <div style={{display : 'flex', width: '500px'}}>
                <button  className="button continue"  onClick={handleSubmit}>Set Calendar</button>
                <button  className="button cancel"  onClick={() => navigate(-1)}>Cancel</button>   
            </div>
        
        </div>

     );
}
 
export default AddCalendar;