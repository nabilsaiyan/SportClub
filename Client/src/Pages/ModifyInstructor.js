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



const ModifyInstructor = (props) => {
    const {id} = useParams();
    const [speciality, setSpeciality] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        
        axios.get("https://localhost:44373/api/Instructors/" + id,)
            .then(res => {
                console.log("res :" + res.data);
               setLogin(res.data.login);
               setPassword(res.data.password);
               setSpeciality(res.data.speciality);
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
            "login": login,
            "password": password,
            "speciality": speciality
        }
         
        axios.put('https://localhost:44373/api/Instructors/' + id, data,
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
    };

    return ( 
        <div className="my-container my-container-add"> 
            <h1>Modify Instructor</h1>
           <form onSubmit={handleSubmit}>

                <TextField  className={classes.field}
                    label="Login"  
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}/>
                {/*<TextField  className={classes.field}
                    label="Password"
                    variant="outlined" 
                    color="secondary" 
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
    />*/}

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

                <Button variant="outlined" color="primary" type="submit">Update Instructor</Button>

            </form>
         </div>

     );
}
 
export default ModifyInstructor