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

var load = false;
const ListMaterial = (props) => {
    const [materials, setMaterials] = useState([{
        "materialId": -1,
        "name": "...Loading",
        "description": "...Loading",
        "status": "...Loading"
    }]);
    
    useEffect(() => {
        if (!load) {
            /*setMaterials([
                {
                    "materialId": 1,
                    "name": "...Loading",
                    "description": "...Loading",
                    "status": "...Loading"
                },
                {
                    "materialId": 2,
                    "name": "...Loading",
                    "description": "...Loading",
                    "status": "...Loading"
                },
                {
                    "materialId": 3,
                    "name": "...Loading",
                    "description": "...Loading",
                    "status": "...Loading"
                }

            ]);*/
            console.log("useEffect");
            console.log(props);
            
            axios.get("https://localhost:44373/api/Materials",)
            .then(res => {
                let result = [];
                res.data.map(material => {
                    result.push({
                        "materialId": material.materialId,
                        "name": material.name,
                        "description": material.description,
                        "status": (material.status == 1) ? "Operational" : "Defective"
                    });
                }
                );
                load=true;
                setMaterials(result);
                //window.location.reload();

            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
        }

        console.log("bakkkkk");
    }, [materials]);
    
    

    
        const classes = useStyles();

    const removeItem = (id) => {
        //event.preventDefault();
        //let id = event.currentTarget.id
        console.log("id:", id)
        axios.delete("https://localhost:44373/api/Materials/" + id).then(res => {
            console.log("res :")
            load = false;
            setMaterials([...materials.filter(item => item.id !== Number(id))]);
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
                            <TableRow key={row.materialId}>
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    );
}

export default ListMaterial