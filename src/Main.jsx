import React, { useState, useEffect } from 'react';
import axios from "axios";
export const Main = () => {
    const [setup, setSetup ] = useState("");
    const [punchLine, setPunchLine ] = useState("");
    const [showPunchLine, setShowPunchLine ] = useState(false);
    const setupRegex = /^(.+)\?\s/;
    const punchlineRegex = /\?\s(.+)$/;

    const fetchJoke = async () => {
        axios.get("https://icanhazdadjoke.com/",{
            headers:{
                Accept: "application/json",
            }
        }).then((response)=>{
            setSetup(response.data.joke.match(setupRegex)[1]);
            setPunchLine(response.data.joke.match(punchlineRegex)[1]);
        })
    };

    useEffect(()=>{
        setShowPunchLine(false);
        setTimeout(()=>{
            setShowPunchLine(true);
        },3000)
    },[setup]);

    return <div className='main-container'>
        <h1>dad jokes</h1>
        <div className='underline'></div>
        <div className='container'>
            <h3> Wait for the punchline</h3>
            <div className='joke-text'>{setup}</div>
            {showPunchLine && (
                 <div className='joke-text'>
                 {String.fromCodePoint(0x1f602)}{punchLine}
                 {String.fromCodePoint(0x1f602)}
             </div>
            )}
            <button className='button' onClick={fetchJoke}>Generate Joke</button>

        </div>
    </div>;
};