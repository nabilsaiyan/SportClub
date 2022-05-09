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


const AddService = () => {
    const [name, setName] = useState("");
    const [description, setDecription] = useState("");
    
    const classes = useStyles();
    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();
       
            let finalData = {
                "name": name,
                "description": description
             }
             console.log(finalData);
           axios.post('https://localhost:44373/api/Services/', finalData,
               /*{   headers: {
                   Authorization: "Bearer " + localStorage.getItem("accessToken")
               } }  */)
           .then(res => {
               console.log(res); 
               navigate("/ListService");
           }, (err) => {
               console.log(err.message);
           }).catch(err => {
               console.log('err:', err)
           })
       

        }

    return ( 
        <div className="my-container my-container-add"> 
            <h1>Add New Service</h1>
           <form onSubmit={handleSubmit}>

                <TextField  className={classes.field}
                    label="Name"  
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <TextField  className={classes.field}
                    label="Description"
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                    value={description}
                    onChange={(e) => setDecription(e.target.value)}
                    />


                <Button variant="outlined" color="primary" type="submit">Add Service</Button>

            </form>
         </div>

     );
}
 
export default AddService;