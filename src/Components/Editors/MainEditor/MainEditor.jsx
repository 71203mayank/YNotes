import React,{useState} from "react";
import './MainEditor.css'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";

const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
}




function MainEditor(){

    const navigate = useNavigate();
    
    const [value, setValue]=useState('');


    const [note,setNote]=useState({
        title:"",
        description:""
    });

    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value});
    }

    

    // to disable the Upload button everytime any key is pressed inside the text editor
    let btn2=document.getElementById('btn2');

    

    const disableUpload=()=>{
        btn2.disabled=true;
        // btn2.style.color='blue';
    }


    //funtion to save the inner content of the text editor.
    const onClickSave=()=>{
        setNote({...note,description:value});
        btn2.disabled=false;    // enable Upload button after saving the inner content
        console.log(note);
        
    }

    //function to upload the saved content to the database
    const onClickUpload=()=>{
            if(note.title===""){
                console.log(alert("atleast title need to upload empty document"));
            }
            else{

                console.log('clicked')
                console.log(note);
                //sending the object note to the database.
                axios
                    .post('http://localhost:8082/api/notes',note)
                    .then((res)=>{
                        setNote({
                            title:'',
                            description:''
                        });
                        navigate('/');
                    })
                    .catch((err)=>{
                        console.log('Error in Creating New Note!');
                    });
            }
     
        
    }
        

    return(
        <div className="MainEditor">
            
                <div className="NoteTitleContainer">
                    <div className="titleInput">
                        <input className="NoteTitle" id ='NoteTitle' name='title' value={note.title} onChange={onChange} placeholder="Title" required></input>
                    </div>
                    <div className="EditorBtns">
                        <button  className="SaveNotes editorBtns" id='btn1' onClick={onClickSave} >Save</button>
                        <button className="UploadNotes editorBtns" id='btn2' onClick={onClickUpload}>Upload</button>
                        <Link to ='/'><div className="CancelNotes"><img className="cancleBtn" src='/Assets/redCross.png' alt='cancle'/> </div> </Link>
                    </div>
                </div>

                <ReactQuill disabled id='quillEditor' className="quillEditor" modules={modules} name="description" onChange={setValue} onKeyPress={disableUpload} value={value} placeholder="The content goes here" theme="snow"/>
        </div>
    );
}

export default MainEditor;