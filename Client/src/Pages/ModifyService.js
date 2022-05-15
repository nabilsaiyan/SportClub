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



const ModifyService = (props) => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    
    useEffect(() => {
        
        axios.get("https://localhost:44373/api/Services/" + id,)
            .then(res => {
                console.log("res :" + res.data);
                setName(res.data.name);
                setDescription(res.data.description);
            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
    }, []);

    const navigate = useNavigate();

   const classes = useStyles();
    


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "serviceId": id,
            "name": name,
            "description": description
        }
         
        axios.put('https://localhost:44373/api/Services/' + id, data,
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
    };

    return ( 
        <div className="my-container my-container-add"> 
            <h1>Modify Service</h1>
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
                    onChange={(e) => setDescription(e.target.value)}
    />


                <Button variant="outlined" color="primary" type="submit">Update Service</Button>

            </form>
         </div>

     );
}
 
export default ModifyService