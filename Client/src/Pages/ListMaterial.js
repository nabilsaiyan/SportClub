import { TableRow, TableCell, TableContainer, Paper, TableBody, Table, Container, TableHead, Button } from "@material-ui/core/";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";



const useStyles = makeStyles({
    strong: {
        fontWeight: "bold"
    },
    space: {
        width: "120%",
    }
});

const ListMaterial = (props) => {
    
    useEffect(() => {
        setMaterials([
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
        ]);
        console.log("useEffect");
        console.log(props);
        
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
    }, []);
    
    

        const [materials, setMaterials] = useState([]);
    
        const classes = useStyles();

        const history = useHistory();
    

    const removeItem = (id) => {
        axios.delete("https://localhost:44373/api/Materials/" + id).then(res => {
            console.log("res :")
            console.log(res);
           // let newMaterials = materials.filter(item => item.id !== Number(id));
            //etMaterials(newMaterials);
            setMaterials([...materials.filter(item => item.id !== Number(id))]);
        })
            .catch(err => {
                console.log("err")
                console.log(err);
            });

    }

    const editItem = (id) => {
        console.log("editItem");
       // props.match.params.id = {id : id};
        console.log(props);
        //props.history.push("/ModifyMaterial");
        history.push("/ModifyMaterial/");
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