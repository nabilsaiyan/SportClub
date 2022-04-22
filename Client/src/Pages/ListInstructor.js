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
        width: "120%",
    }
});

const ListInstructor = (props) => {

    useEffect(() => {
        setInstrucors([
            {
                "materialId": 1,
                "name": "...Loading",
                "description": "...Loading",
                "status": "...Loading"
            }
        ]);
        console.log("useEffect");
        console.log(props);

        axios.get("https://localhost:44373/api/Instructors",)
            .then(res => {
                let result = [];
                /*res.data.map(material => {
                    result.push({
                        "materialId": material.materialId,
                        "name": material.name,
                        "description": material.description,
                        "status": (material.status == 1) ? "Operational" : "Defective"
                    });
                }
                );*/
                setInstrucors(result);
            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
    }, []);



    const [Instructors, setInstrucors] = useState([]);

    const classes = useStyles();

    const removeItem = (event) => {
        event.preventDefault()
        let id = event.currentTarget.id
        console.log("id:", id)
        axios.delete("https://localhost:44373/api/Materials/" + id).then(res => {
            console.log("res :")
            // setMaterials([...materials.filter(item => item.id !== Number(id))]);
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
        <Container size="sm" >
            <h1>List of Instructors</h1>
            <TableContainer component={Paper} className={classes.space}>
                <Table aria-label="simple table" >
                    <TableHead >
                        <TableRow  >
                            <TableCell className={classes.strong}>Id</TableCell>
                            <TableCell className={classes.strong} align="right">Material Name</TableCell>
                            <TableCell className={classes.strong} align="right">Description</TableCell>
                            <TableCell className={classes.strong} align="right">Status</TableCell>
                            <TableCell className={classes.strong} align="right"></TableCell>
                            <TableCell className={classes.strong} align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {/* {materials.map((row) => (
                            <TableRow >
                                <TableCell component="th" scope="row">{row.materialId}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right"><Button id={row.materialId} onClick={(e) => {
                                    editItem(e.currentTarget.id);
                                }}>Edit</Button></TableCell>
                                <TableCell align="right"><Button id={row.materialId} onClick={(e) => {
                                    removeItem(e.currentTarget.id);
                                }}>Delete</Button></TableCell>
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    );
}

export default ListInstructor