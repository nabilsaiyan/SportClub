import { Typography, TextField, Select, MenuItem, Button, Container } from "@material-ui/core/";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from "react-router";



const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    }
  })


const AddMaterial = () => {
    const [status, setStatus] = useState("Operational");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

   const classes = useStyles();
   let navigate = useNavigate();

    


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            "name": name,
            "description": description,
            "status": 1
        }
        if(status == "Operational")
            data.status = 1;
        else
            data.status = 0;
        axios.post('https://localhost:44373/api/Materials/', data,
            /*{   headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            } }  */)
        .then(res => {
            console.log(res); 
            navigate("/ListMaterial");
            
        }, (err) => {
            console.log(err.message);
        }).catch(err => {
            console.log('err:', err)
        })
    };

    return ( 
        <div className="my-container my-container-add"> 
            <h1>Add New Material</h1>
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

                <Button variant="outlined" color="primary" type="submit">Add Material</Button>

            </form>
         </div>

     );
}
 
export default AddMaterial