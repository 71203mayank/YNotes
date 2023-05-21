import React,{useState, useEffect} from "react";
import {Link, useParams, useNavigate} from 'react-router-dom'
import './ShowNote.css';
import axios from "axios";

function ShowNote(props){

    const [note,setNote]=useState({});

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios
            .get(`http://localhost:8082/api/notes/${id}`)
            .then((res)=>{
                console.log(res.data);
                setNote(res.data);
                document.getElementById('temp').innerHTML=`${res.data.description}`;
            })
            .catch((err)=>{
                console.log('Error from ShowNote')
            });
    },[id]);

    const onDeleteClick=(id)=>{
        axios
            .delete(`http://localhost:8082/api/notes/${id}`)
            .then((res)=>{
                navigate('/');
                // navigate(`/update-note/${note._id}`);
            })
            .catch((err)=>{
                console.log('Error form ShowNote_Delete');
            });
    };



    return(
        <div className="ShowNote">
            <div className="ShowNoteEditors">

                <Link to ='/'>
                    <button className="ShowNoteBack showNoteBtns"> Back</button>
                </Link>
                <div>
                    <Link to ={`/update-note/${note._id}`}>
                        <button className="ShowNoteEdit showNoteSame showNoteBtns"> Update </button>
                    </Link>
                    <button className="ShowNoteDelete showNoteSame showNoteBtns" onClick={()=>{
                        onDeleteClick(note._id);
                    }}> Delete </button>
                </div>
            </div>
            <div className="ShowNoteTitle">{note.title}</div>
            <div className="ShowNoteContainer" id='temp'>

            </div>
            
        </div>
    )
}

export default ShowNote;