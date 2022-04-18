import { TableRow, TableCell, TableContainer, Paper, TableBody, Table, Container, TableHead, Button } from "@material-ui/core/";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
//import fetch from "node-fetch";



const useStyles = makeStyles({
    strong: {
        fontWeight: "bold"
    },
    space: {
        width: "120%",
    }
});

const ListMaterial = () => {

    useEffect(() => {
        setMaterials([
            {
                "id": 1,
                "name": "...Loading",
                "description": "...Loading",
                "status": "...Loading"
            },
            {
                "id": 2,
                "name": "...Loading",
                "description": "...Loading",
                "status": "...Loading"
            },
            {
                "id": 3,
                "name": "...Loading",
                "description": "...Loading",
                "status": "...Loading"
            }
        ]);
        console.log("useEffect");
        /* fetch("http://localhost:8080/api/Materials" , { 
             method: "GET",
             headers: {
                 "Content-Type": "application/json" 
                 } 
          }).then(res => res.json()).then(data => { console.log(data); });*/
        axios.get("https://localhost:44373/api/Materials", /*{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        }*/)
            .then(res => {
                //setMaterials(res.data);
                console.log("res :")
                console.log(res.data);
            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
    }, []);

    const [materials, setMaterials] = useState([]);

    const classes = useStyles();

    const arr = [1, 2, 3, 4, 5];

    const removeItem = (id) => {
        setMaterials(materials.filter(item => item.id !== Number(id)));
        /*console.log(id);
        console.log(materials.filter((item) => {
            return item.id !== id;
        }));*/
        /* console.log(arr);
         console.log(arr.filter((item) => item !== 2));*/
        /*console.log(materials.filter(item => item.id !== Number(id)));*/
    }

    return (
        <Container size="sm" >
            <h1>List of Materials</h1>
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
                        {materials.map((row) => (
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right"><Button >Edit</Button></TableCell>
                                <TableCell align="right"><Button id={row.id} onClick={(e) => {
                                    removeItem(e.currentTarget.id);
                                }}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    );
}

export default ListMaterial