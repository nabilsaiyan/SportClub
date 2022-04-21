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
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        /*setMaterials([
            {
                "MatrerialId": 1,
                "name": "...Loading",
                "description": "...Loading",
                "status": "...Loading"
            },
            {
                "MatrerialId": 2,
                "name": "...Loading",
                "description": "...Loading",
                "status": "...Loading"
            },
            {
                "MatrerialId": 3,
                "name": "...Loading",
                "description": "...Loading",
                "status": "...Loading"
            }
        ]);*/
        console.log("useEffect");

        axios.get("https://localhost:44373/api/Materials",)
            .then(res => {
                setMaterials(res.data);
                console.log("res :")
                console.log(res.data);
            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
    }, [materials]);


    const classes = useStyles();

    const arr = [1, 2, 3, 4, 5];

    const removeItem = (event) => {
        event.preventDefault()
        let id = event.currentTarget.id
        console.log("id:", id)
        axios.delete("https://localhost:44373/api/Materials/" + id).then(res => {
            console.log("res :")
            console.log(res);
            let newMats = materials.filter(item => item.id !== Number(id))
            console.log("new mats :" + newMats)
            setMaterials(newMats);
        })
            .catch(err => {
                console.log("err")
                console.log(err);
            });

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
                                    {row.materialId}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right"><Button >Edit</Button></TableCell>
                                <TableCell align="right"><Button id={row.materialId} onClick={removeItem}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    );
}

export default ListMaterial