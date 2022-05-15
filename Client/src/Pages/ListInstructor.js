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

const ListInstructor = (props) => {
    const [Instructors, setInstructors] = useState([]);
    
    useEffect(() => {
        console.log("useEffect");
        console.log(props);
        
        axios.get("https://localhost:44373/api/Instructors",)
        .then(res => {
            let result = [];
            setInstructors(res.data);
            /*res.data.map(material => {
                result.push({
                    "materialId": material.materialId,
                    "name": material.name,
                    "description": material.description,
                    "status": (material.status == 1) ? "Operational" : "Defective"
                });
            }
            );*/
        })
        .catch(err => {
            console.log("err")
            console.log(err);
        });
    }, [Instructors]);
    
    

    
        const classes = useStyles();

    const removeItem = (id) => {
        console.log("id:", id)
        axios.delete("https://localhost:44373/api/Instructors/" + id).then(res => {
            console.log("res :")
            setInstructors([...Instructors.filter(item => item.id !== Number(id))]);
        })
            .catch(err => {
                console.log("err")
                console.log(err);
            });

    }
    let navigate = useNavigate();

    const editItem = (id) => {
       console.log(props);
       navigate('/ModifyInstructor/' + id);

    }


    return (
        <div className="my-container">
            <h1>List of Instructors</h1>
            <TableContainer component={Paper} className={classes.space}>
                <Table aria-label="simple table" >
                    <TableHead >
                        <TableRow  >
                            <TableCell className={classes.strong}>Id</TableCell>
                            <TableCell className={classes.strong} align="right">Login</TableCell>
                            <TableCell className={classes.strong} align="right">Password</TableCell>
                            <TableCell className={classes.strong} align="right">Speciality</TableCell>
                            <TableCell className={classes.strong} align="right"></TableCell>
                            <TableCell className={classes.strong} align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {Instructors.map((row) => (
                            <TableRow >
                                <TableCell component="th" scope="row">{row.instructorId}</TableCell>
                                <TableCell align="right">{row.account.login}</TableCell>
                                <TableCell align="right">{row.account.password}</TableCell>
                                <TableCell align="right">{row.speciality}</TableCell>
                               {/* <TableCell align="right"><Button id={row.instructorId} onClick={(e) => {
                                    editItem(e.currentTarget.id);
                                }}>Edit</Button></TableCell>*/}
                                <TableCell align="right"><Button id={row.instructorId} onClick={(e) => {
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

export default ListInstructor