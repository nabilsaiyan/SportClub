import { Typography, TextField, Select, MenuItem, Button, Container } from "@material-ui/core/";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";


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

    


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(status, name, description);

        const data = {
            "name": name,
            "description": description,
            "status": status
        }

        axios.post('/api/materials', { data },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        .then(res => {
            console.log(res)
            /*if (!res.data.err) {
                handleHide()
            }*/
        }, (err) => {
            /*axios.post('/api/token')
                .then(res => {
                    localStorage.setItem('accessToken', res.data.accessToken)
                    handleClick()
                }, err => window.location = "/")*/
        }).catch(err => {
            console.log('err:', err)
        })
    };

    return ( 
        <Container size="sm"> 
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
                    rows={5}
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
         </Container>

     );
}
 
export default AddMaterial