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
    useEffect(() => {
        
        axios.get("https://localhost:44373/api/Instructors/" + id,)
            .then(res => {
               /* setMaterials(res.data);
                console.log("res :")
                console.log(res.data);
                setName(res.data.name);
                setDescription(res.data.description);
                if(res.data == 0) 
                    setStatus("Operational");
                else
                    setStatus("Defective");*/
            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
    }, []);

    const navigate = useNavigate();

    const [speciality, setSpeciality] = useState("Football");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

   const classes = useStyles();
    


    const handleSubmit = (e) => {
        e.preventDefault();
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
            navigate("/ListInstructor");
            
        }, (err) => {
            console.log(err.message);
        }).catch(err => {
            console.log('err:', err)
        })
    };

    return ( 
        <Container size="sm"> 
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

                <Button variant="outlined" color="primary" type="submit">Update Instructor</Button>

            </form>
         </Container>

     );
}
 
export default ModifyInstructor