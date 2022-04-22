import { Typography, TextField, Select, MenuItem, Button, Container } from "@material-ui/core/";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    }
  })

const ModifyMaterial = (props) => {
    const {id} = useParams();
    useEffect(() => {
        
        axios.get("https://localhost:44373/api/Materials/" + id,)
            .then(res => {
                setMaterials(res.data);
                console.log("res :")
                console.log(res.data);
                setName(res.data.name);
                setDescription(res.data.description);
                if(res.data == 0) 
                    setStatus("Operational");
                else
                    setStatus("Defective");
            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
    }, []);

    const navigate = useNavigate();

    const [materials, setMaterials] = useState([]);
    const [status, setStatus] = useState("Operational");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

   const classes = useStyles();

    


   const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        "materialId": materials.materialId,
        "name": name,
        "description": description,
        "status": 1
    }
    if(status == "Operational")
        data.status = 1;
    else
        data.status = 0;

    axios.put('https://localhost:44373/api/Materials/' + materials.materialId, data)
    .then(res => {
        console.log(res);
        navigate("/ListMaterial");
        
    }, (err) => {
        console.log(err.message);
        console.log(data);
    }).catch(err => {
        console.log('err:', err)
    })
};

    return ( 
        <Container size="sm"> 
            <h1>Modify Material</h1>
           <form onSubmit={handleSubmit}>

                <TextField  className={classes.field}
                    label="Material Name"  
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <TextField  className={classes.field}
                    label="Material Description"
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                    multiline 
                    minRows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />

                <Select  className={classes.field}
                    label="Status"
                    defaultValue="Operational"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="Operational">Operational</MenuItem>
                    <MenuItem value="Defective">Defective</MenuItem>
                </Select>

                <Button variant="outlined" color="primary" type="submit">Update</Button>

            </form>
         </Container>

     );
}
 
export default ModifyMaterial