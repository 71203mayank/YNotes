import { useState } from 'react';
import React from "react";
import './Youframe.css';

function Youframe(){

    
    let [currLink, setLink] = useState("https://www.youtube.com/embed/pOOnrbXVmUU")
    function setFrame(){
        let str=document.getElementById('linkInput').value;
        if(str===""){
            console.log(alert("Pls Enter the valid link !"));
        }
        else{
            setLink(str);
            document.getElementById('linkInput').value="";
        }
    }
    return(
        <div className='Youframe'> 
            <iframe width="560" height="315" src={currLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <div className="linkSetter">
                <button onClick={setFrame} className='LinkBtn'>Link</button>
                <input id='linkInput' className='linkInput' placeholder='https://www.youtube.com/embed/pOOnrbXVmUU'></input>
            </div>
            <div className='youFrameLogo'>
                <div className="logocontainer">
                    <img className='logo' src='/Assets/logo_1.png' alt='logo'></img>
                </div>
            </div>
        </div>
    )
};

export default Youframe;