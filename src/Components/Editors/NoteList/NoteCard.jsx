import React from "react";
import './NoteCard.css';

import{Link} from 'react-router-dom';


function NoteCard(props){
    const note = props.note;

    console.log("hello console",note);

    return(
        <Link to ={`/show-note/${note._id}`}>
        <div className="NoteBox">
            {/* <div className="date">{note.updated_date}</div> */}
            <div className="titleClick">{note.title.slice(0,50)}</div>    
        </div>
        </Link>
    );
}

export default NoteCard;