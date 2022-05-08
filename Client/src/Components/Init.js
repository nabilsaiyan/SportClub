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

    axios.post("https://localhost:44373/api/Subscriptions", 
        { 
            "title": "Basic",
            "price": 150,
            "description":  [
                "Access to the Gym",
                "Monitoring (1 session/week)"
            ]
         })
        .then(res => {
                axios.post("https://localhost:44373/api/Subscriptions", 
                { 
                    "title": "Premuim",
                    "price": 350,
                    "description":  [
                        "Access to the Gym",
                        "Swimming Pool Access",
                        "Monitoring (3 sessions/week)"
                    ]
                })
                .then(res => {
                    console.log("res :")
                    console.log(res);
                    axios.post("https://localhost:44373/api/Subscriptions", 
                    { 
                        "title": "Full",
                        "price": 750,
                        "description":  [
                            "Acces to the Gym",
                            "Swimming Pool Access",
                            "Access to the Sauna",
                            "Monitoring (unlimited)"
                        ]
                    })
                    .then(res => {
                        console.log("res :")
                        console.log(res);
                        
                        axios.post("https://localhost:44373/api/Subscriptions/1/1"
                        )
                        .then(res => {
                            console.log("res :")
                            console.log(res);
                        });
                            /////
                        axios.post("https://localhost:44373/api/Subscriptions/2/1"
                        )
                        .then(res => {
                            console.log("res :")
                            console.log(res);
                        });
                        axios.post("https://localhost:44373/api/Subscriptions/2/2"
                        )
                        .then(res => {
                            console.log("res :")
                            console.log(res);
                        });
                        /////
                        axios.post("https://localhost:44373/api/Subscriptions/3/1"
                        )
                        .then(res => {
                            console.log("res :")
                            console.log(res);
                        });
                        axios.post("https://localhost:44373/api/Subscriptions/3/2"
                        )
                        .then(res => {
                            console.log("res :")
                            console.log(res);
                        });
                        axios.post("https://localhost:44373/api/Subscriptions/3/3"
                        )
                        .then(res => {
                            console.log("res :")
                            console.log(res);
                        });
                    
                    }).catch
                    (err => {
                        console.log("err")
                        console.log(err);
                    })
                }).catch
                (err => {
                    console.log("err")
                    console.log(err);
                })
            }
            ).catch
            (err => {
                console.log("err")
                console.log(err);
            });
    
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

const initTables = () => {
    console.log("initTables");
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

export default function Init() {
       

    return (
        <div style={{display:'grid',gap: "10px", placeContent: 'center'}}>
            <h1>Init</h1>
            <button className="btn btn-primary" onClick={initTables}>Init Tables</button>
            <button className="btn btn-primary" onClick={initSubscriptions}>Init Subscriptions</button>
        </div>
    );
}