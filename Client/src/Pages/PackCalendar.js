import { TableRow, TableCell, TableContainer, Paper, TableBody, Table, Container, TableHead, Button } from "@material-ui/core/";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import '../Css/Schedule.css';

//import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    strong: {
        fontWeight: "bold"
    },
    space: {
        //width: "120%",
    }
});

let cond = true;

const PackCalendar = (props) => {
    const classes = useStyles();
    const [evening, setEvening] = useState([
        {"Cours" : "BodyBuilding", "available": false },
         {"Cours" : "BodyBuilding", "available": false },
     { "Cours" : "BodyBuilding", "available": false },
     { "Cours" : "BodyBuilding", "available": false },
    { "Cours" : "BodyBuilding", "available": false},
    {"Cours" : "BodyBuilding", "available": false },
    { "Cours" : "BodyBuilding", "available": false }
]);
    const [morning, setMorning] = useState([
        {"Cours" : "BodyBuilding", "available": false },
         {"Cours" : "BodyBuilding", "available": false },
     { "Cours" : "BodyBuilding", "available": false },
     { "Cours" : "BodyBuilding", "available": false },
    { "Cours" : "BodyBuilding", "available": false},
    {"Cours" : "BodyBuilding", "available": false },
    { "Cours" : "BodyBuilding", "available": false }
]);
    const [services, setServices] = useState({});
    const [services2, setServices2] = useState({});
    const [services3, setServices3] = useState({});
    const [test, setTest] = useState(false);
    const {id} = useParams();

    useEffect(() => {
            console.log("useEffect 1********************************************************", Math.floor(Math.random() * 200));
            axios.get("https://localhost:44373/api/Services/" + id,)
            .then(res => {
                console.log("this is service get", services);
                setServices(res.data);
            })
            .catch(err => {
                console.log("err")
                console.log(err);
            });
            if(Number(id) - 1 > 0){
                axios.get("https://localhost:44373/api/Services/" + (Number(id) - 1))
                .then(res => {
                    console.log("this is service get", services);
                    setServices2(res.data);
                }
                )
                .catch(err => {
                    console.log("err")
                    console.log(err);
                }
                );
            }
            if(Number(id) - 2 > 0){
                axios.get("https://localhost:44373/api/Services/" + (Number(id) - 2))
                .then(res => {
                    console.log("this is service get", services);
                    setServices3(res.data);
                }
                )
                .catch(err => {
                    console.log("err")
                    console.log(err);
                }
                );
            }
            
    }, []);

    useEffect(() => {
        console.log("useEffect 2-------------------------------------------------------");
        if(services && cond){
            
            let dataMorning = [
                {"Cours" : "BodyBuilding", "available": false },
                {"Cours" : "BodyBuilding", "available": false },
             { "Cours" : "BodyBuilding", "available": false },
             { "Cours" : "BodyBuilding", "available": false },
             { "Cours" : "BodyBuilding", "available": false},
             {"Cours" : "BodyBuilding", "available": false },
            { "Cours" : "BodyBuilding", "available": false }
        ];
        let dataEvening = [
            {"Cours" : "BodyBuilding", "available": false },
            {"Cours" : "BodyBuilding", "available": false },
            { "Cours" : "BodyBuilding", "available": false },
            { "Cours" : "BodyBuilding", "available": false },
            { "Cours" : "BodyBuilding", "available": false},
            {"Cours" : "BodyBuilding", "available": false },
            { "Cours" : "BodyBuilding", "available": false }
        ];
        console.log("hehhe", typeof services.days)
        console.log("hehhe", services)
            if(services.days){
                services.days.forEach(item => {
                    if (item.name === "Monday") {
                        console.log(item.name);
                        dataEvening[0].Cours =  services.name;
                        dataMorning[0].Cours =  services.name;
                        dataMorning[0].available = item.mording;
                        dataEvening[0].available = item.evening;
                    }
                    if (item.name == "Tuesday") {
                        console.log("this is item.name", item.name);
                        dataEvening[1].Cours = services.name;
                        dataMorning[1].Cours = services.name;
                        dataMorning[1].available = item.mording;
                        dataEvening[1].available = item.evening;
                    }
                     else if (item.name === "Wednesday") {
                         console.log(item.name);
                         dataMorning[2].Cours = services.name;
                         dataEvening[2].Cours = services.name;
                         dataMorning[2].available = item.mording;
                         dataEvening[2].available = item.evening;
                        }
                else if (item.name === "Thursday") {
                    console.log(item.name);
                    dataMorning[3].Cours = services.name;
                    dataEvening[3].Cours = services.name;
                    dataMorning[3].available = item.mording;
                    dataEvening[3].available = item.evening;
                }
                else if (item.name === "Friday") {
                    console.log(item.name);
                    dataMorning[4].Cours = services.name;
                    dataEvening[4].Cours = services.name;
                    dataMorning[4].available = item.mording;
                    dataEvening[4].available = item.evening;
                }
                else if (item.name === "Saturday") {
                    console.log(item.name);
                    dataMorning[5].Cours = services.name;
                    dataEvening[5].Cours = services.name;
                    dataMorning[5].available = item.mording;
                    dataEvening[5].available = item.evening;
                }
                else if (item.name === "Sunday") {
                    console.log(item.name);
                    dataMorning[6].Cours = services.name;
                    dataEvening[6].Cours = services.name;
                    dataMorning[6].available = item.mording;
                    dataEvening[6].available = item.evening;
                }
            }
            );
            cond = true;
            setEvening(dataEvening);
            setMorning(dataMorning);
        }
        if(services2.days){
            services2.days.forEach(item => {
                if (item.name === "Monday") {
                    console.log(item.name);
                    dataEvening[0].Cours =  services2.name;
                    dataMorning[0].Cours =  services2.name;
                    dataMorning[0].available = item.mording;
                    dataEvening[0].available = item.evening;
                }
                if (item.name == "Tuesday") {
                    console.log("this is item.name", item.name);
                    dataEvening[1].Cours = services2.name;
                    dataMorning[1].Cours = services2.name;
                    dataMorning[1].available = item.mording;
                    dataEvening[1].available = item.evening;
                }
                 else if (item.name === "Wednesday") {
                     console.log(item.name);
                     dataMorning[2].Cours = services2.name;
                     dataEvening[2].Cours = services2.name;
                     dataMorning[2].available = item.mording;
                     dataEvening[2].available = item.evening;
                    }
            else if (item.name === "Thursday") {
                console.log(item.name);
                dataMorning[3].Cours = services2.name;
                dataEvening[3].Cours = services2.name;
                dataMorning[3].available = item.mording;
                dataEvening[3].available = item.evening;
            }
            else if (item.name === "Friday") {
                console.log(item.name);
                dataMorning[4].Cours = services2.name;
                dataEvening[4].Cours = services2.name;
                dataMorning[4].available = item.mording;
                dataEvening[4].available = item.evening;
            }
            else if (item.name === "Saturday") {
                console.log(item.name);
                dataMorning[5].Cours = services2.name;
                dataEvening[5].Cours = services2.name;
                dataMorning[5].available = item.mording;
                dataEvening[5].available = item.evening;
            }
            else if (item.name === "Sunday") {
                console.log(item.name);
                dataMorning[6].Cours = services2.name;
                dataEvening[6].Cours = services2.name;
                dataMorning[6].available = item.mording;
                dataEvening[6].available = item.evening;
            }
        }
        );
        cond = true;
        setEvening(dataEvening);
        setMorning(dataMorning);
    }
        if(services3.days){
            services3.days.forEach(item => {
                if (item.name === "Monday") {
                    console.log(item.name);
                    dataEvening[0].Cours = services3.name;
                    dataMorning[0].Cours = services3.name;
                    dataMorning[0].available = item.mording;
                    dataEvening[0].available = item.evening;
                }
                if (item.name == "Tuesday") {
                    console.log("this is item.name", item.name);
                    dataEvening[1].Cours = services3.name;
                    dataMorning[1].Cours = services3.name;
                    dataMorning[1].available = item.mording;
                    dataEvening[1].available = item.evening;
                }
                 else if (item.name === "Wednesday") {
                     console.log(item.name);
                     dataMorning[2].Cours = services3.name;
                     dataEvening[2].Cours = services3.name;
                     dataMorning[2].available = item.mording;
                     dataEvening[2].available = item.evening;
                    }
            else if (item.name === "Thursday") {
                console.log(item.name);
                dataMorning[3].Cours = services3.name;
                dataEvening[3].Cours = services3.name;
                dataMorning[3].available = item.mording;
                dataEvening[3].available = item.evening;
            }
            else if (item.name === "Friday") {
                console.log(item.name);
                dataMorning[4].Cours = services3.name;
                dataEvening[4].Cours = services3.name;
                dataMorning[4].available = item.mording;
                dataEvening[4].available = item.evening;
            }
            else if (item.name === "Saturday") {
                console.log(item.name);
                dataMorning[5].Cours = services3.name;
                dataEvening[5].Cours = services3.name;
                dataMorning[5].available = item.mording;
                dataEvening[5].available = item.evening;
            }
            else if (item.name === "Sunday") {
                console.log(item.name);
                dataMorning[6].Cours = services3.name;
                dataEvening[6].Cours = services3.name;
                dataMorning[6].available = item.mording;
                dataEvening[6].available = item.evening;
            }
        }
        );
        cond = true;
        setEvening(dataEvening);
        setMorning(dataMorning);
    }
    }
    setTest(true);
    
});
    


const removeItem = (id) => {
    console.log("id:", id)
        axios.delete("https://localhost:44373/api/Services/" + id).then(res => {
            console.log("res :")
             //setMaterials([...materials.filter(item => item.id !== Number(id))]);
        })
            .catch(err => {
                console.log("err")
                console.log(err);
            });

    }

    let data = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let navigate = useNavigate();
    
    const editItem = (id) => {
       console.log(props);
       navigate('/ModifyMaterial/' + id);

    }


    return (
        <div className="my-container-grids"> 
            <h1>My Calendar</h1>
            <div className="schedule-container">
                <div></div>
                {data.map((day, index) => {
                    return (
                        <div className="schedule-day" key={index}>
                            <p>{day}</p>
                            

                        </div>  
                    ) }
                )}
            </div>
            <div className="schedule-container-large">

                    <div className="schedule-time">Morning</div>
                {
                    morning.map((day, index) => {
                        return (
                            <div className={day.available ? "true" : "false"} key={index}>
                                    <p>{day.available ? day.Cours : ''}</p> 
                            </div> 
                        )
                        })
                        
                }
                    <div className="schedule-time">Evening</div>
                {
                    evening.map((day, index) => {
                        return (
                            <div className={day.available ? "true" : "false"} key={index}>
                                    <p>{day.available ? day.Cours : ''}</p> 
                            </div> 
                        )
                        })
                        
                }
            </div>
            
        </div>

    );
}

export default PackCalendar;