import React,{useState, useEffect} from "react";
import './NoteList.css';
import { Link } from "react-router-dom";
import axios from "axios";
import NoteCard from "./NoteCard";




function NoteList(){

    const [notes, setNotes]=useState([]);
    useEffect(()=>{
        axios   
            .get('http://localhost:8082/api/notes')
            .then((res)=>{
                setNotes(res.data);
            })
            .catch((err)=>{
                console.log('Error from NoteList');
            });
    },[]);

    const noteList= notes.length === 0
        ? 'There is no note in the record!'
        :  notes.map((note,k)=><NoteCard note={note} key={k}/>);

    return(
        <div className="NoteList">


            <div className="Index">Index</div>


            <div className="indexContainer">
                <div className="innerIndxContainer">
                    {noteList}
                </div>
            </div>


            <Link to='/editor'>
            <div className="addBtn">
                
                <img className="addImg" src='/Assets/plus.png'alt='add-img'></img>
                {/* Plus icon by icons8.com */}
            </div>
            </Link>


        </div>
    );
}

export default NoteList;