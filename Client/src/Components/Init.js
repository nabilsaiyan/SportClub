import axios from "axios";
import React from "react";
import { useState, useEffect } from "react"

var conditon = false;

const initAdmin = () => {
    axios.get("https://localhost:44373/api/Roles/admin").then(res => {
                    console.log("res :")
                    console.log(res);
                    axios.post("https://localhost:44373/api/Accounts", { "login": "admin", "password": "123456", "roleId": res.data.roleId, "role": res.data })
                    .then(res => {
                        console.log("res :")
                        console.log(res);
                    }
                    ).catch(err => {
                        console.log("err")
                        console.log(err);
                    }
                    );
                }
                ).catch(err => {
                    console.log("err")
                    console.log(err);
                }
                );
}
let bodybuilding = {}
let swimming = {}
let sauna = {} 
const initSubscriptions = () => {
    console.log("initSubscriptions");
    axios.get("https://localhost:44373/api/Services/bodybuilding").then(res => {
        console.log("res :")    
        console.log(res);
        bodybuilding = res.data;
        axios.post("https://localhost:44373/api/Subscriptions", 
        { 
            "title": "Basic",
            "price": 150,
            "description":  [
                'Access to the Gym',
                'Monitoring (1 session/week)',
            ],
            "services": [
                bodybuilding
            ]
         })
        .then(res => {
            console.log("res :")
            console.log(res);
        }).catch
        (err => {
            console.log("err")
            console.log(err);
        })
    })
    .catch(err => {
        console.log("err")
        console.log(err);
    })
    ///////
    axios.get("https://localhost:44373/api/Services/swimming").then(res => {
        console.log("res :")    
        console.log(res);
        swimming = res.data;
        axios.post("https://localhost:44373/api/Subscriptions", 
        { 
            "title": "Premuim",
            "price": 350,
            "description":  [
                'Access to the Gym',
                'Swimming Pool Access',
                'Monitoring (3 sessions/week)',
            ],
            "services": [
                bodybuilding, swimming
            ]
         })
        .then(res => {
            console.log("res :")
            console.log(res);
        }).catch
        (err => {
            console.log("err")
            console.log(err);
        })
    })
    .catch(err => {
        console.log("err")
        console.log(err);
    })
    //////
    axios.get("https://localhost:44373/api/Services/sauna").then(res => {
        console.log("res :")    
        console.log(res);
        sauna = res.data;
        axios.post("https://localhost:44373/api/Subscriptions", 
        { 
            "title": "Full",
            "price": 750,
            "description":  [
                'Acces to the Gym',
                'Swimming Pool Access',
                'Access to the Sauna',
                'Monitoring (unlimited)'
            ],
            "services": [
                bodybuilding, swimming, sauna
            ]
         })
        .then(res => {
            console.log("res :")
            console.log(res);
        }).catch
        (err => {
            console.log("err")
            console.log(err);
        })
    })
    .catch(err => {
        console.log("err")
        console.log(err);
    })
}


const initial = (table, data) => {
    axios.post("https://localhost:44373/api/" + table, data,).then(res => {
        console.log("res :")
        console.log(res)
        if (table == "Roles" && res.data.name == "admin") {
            console.log("admin")
            initAdmin();
        }
    }
    ).catch(err => {
        console.log("err")
        console.log(err);
    }
    );
}
export default function Init() {
    
    useEffect(() => {
        if(!conditon){
            conditon = true;
            console.log("useEffect");
            initial("Roles", { "name": "admin", "description": "admin" });
            initial("Roles", { "name": "instructor", "description": "instructor" });
            initial("Roles", { "name": "internaute", "description": "internaute" });
            initial("Notifications", {
                "subject": "NewsLetter Nabil A",
                "content": "Gym Life is inviting you for their new newsletter",
                "read": false
            });
            initial("Notifications", {
                "subject": "Promotion for weekeends",
                "content": "Gym Life is offering some promotions for you this weekend",
                "read": false
            });
            initial("Services", {
                "name": "bodybuilding",
                "description": "Lifiting - Cardio",
                "days": [
                {
                    "name": "Monday",
                    "mording": true,
                    "evening": true
                },
                {
                    "name": "Wednesday",
                    "mording": true,
                    "evening": true
                },
                {
                    "name": "Friday",
                    "mording": true,
                    "evening": true
                }
                ]
            });
                initial("Services", {
                    "name": "swimming",
                    "description": "Swimming Pool",
                    "days": [
                    {
                        "name": "Tuesday",
                        "mording": true,
                        "evening": true
                    },
                    {
                        "name": "Thursday",
                        "mording": true,
                        "evening": true
                    },
                    {
                        "name": "Saturday",
                        "mording": true,
                        "evening": true
                    }
                    ]
                });
                    initial("Services", {
                        "name": "sauna",
                        "description": "Sauna",
                        "days": [
                        {
                            "name": "Sunday",
                            "mording": true,
                            "evening": true
                        }
                        ]
                    });

                   
        }            

    }, []);    

    return (
        <div>
            <h1>Init</h1>
            <button className="btn btn-primary" onClick={initSubscriptions}>Init Subscriptions</button>
        </div>
    );
}