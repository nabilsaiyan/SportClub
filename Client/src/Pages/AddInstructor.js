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


const AddInstructor = () => {
    const [speciality, setSpeciality] = useState("Football");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState({});
   const classes = useStyles();
    const navigate = useNavigate();
    
    
  useEffect(() => {
    
    console.log("useEffect");

    axios.get("https://localhost:44373/api/Roles/instructor" ,)
    .then(res => {
        setRole(res.data);
        console.log(role);
        
    })
    .catch(err => {
        console.log("err")
        console.log(err);
    });
}, []);



    const handleSubmit = (e) => {
        e.preventDefault();
       
            let finalData = {
               "speciality": speciality,
               "account": {
                 "login": login,
                 "password": password,
                 "roleId": role.roleId,
                 "role": role
               }
             }
             console.log(role);
             console.log(finalData);
           axios.post('https://localhost:44373/api/Instructors/', finalData,
               /*{   headers: {
                   Authorization: "Bearer " + localStorage.getItem("accessToken")
               } }  */)
           .then(res => {
               console.log(res); 
               navigate("/ListInstructor");
               
           }, (err) => {
               console.log(err.message);
           }).catch(err => {
               console.log('err:', err)
           })
       

        }

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