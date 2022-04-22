import { Typography, TextField, Select, MenuItem, Button, Container } from "@material-ui/core/";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
//import { useHistory } from "react-router-dom";



const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    }
  })


const AddInstructor = () => {
    //const history = useHistory();
    const [speciality, setSpeciality] = useState("Football");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

   const classes = useStyles();

    


    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(status, name, description);

        const data = {
            "login": login,
            "password": password,
            "speciality": 0
        }
         
        if(speciality == "Football")
            data.speciality = 1;
        else if (speciality == "Fitness")
            data.speciality = 0;
        else
            data.speciality = 2;
        axios.post('https://localhost:44373/api/Instructor/', data,
            /*{   headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            } }  */)
        .then(res => {
            console.log(res); 
            //history.push("/ListMaterial");
            //history.push('/ListMaterial');
            //window.location.reload();
            //<Redirect to="/ListMaterial" />

            
        }, (err) => {
            console.log(err.message);
        }).catch(err => {
            console.log('err:', err)
        })
    };

    return ( 
        <Container size="sm"> 
            <h1>Add New Instructor</h1>
           <form onSubmit={handleSubmit}>

                <TextField  className={classes.field}
                    label="Login"  
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}/>
                <TextField  className={classes.field}
                    label="Password"
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                    multiline 
                    minRows={5}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                <Select  className={classes.field}
                    label="Speciality"
                    defaultValue="Football"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                >
                    <MenuItem value="Football">Football</MenuItem>
                    <MenuItem value="Fitness">Fitness</MenuItem>
                    <MenuItem value="Yoga">Yoga</MenuItem>
                </Select>

                <Button variant="outlined" color="primary" type="submit">Add Instructor</Button>

            </form>
         </Container>

     );
}
 
export default AddInstructor