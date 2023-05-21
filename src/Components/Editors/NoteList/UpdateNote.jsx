import React,{useState,useEffect} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { Link , useParams,useNavigate} from "react-router-dom";

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




function UpdateNote(props){

    const {id} = useParams();
    const navigate = useNavigate();
    
    const [value, setValue]=useState('');

    const [note,setNote]=useState({
        title:"",
        description:""
    });

    useEffect(()=>{
        axios
            .get(`http://localhost:8082/api/notes/${id}`)
            .then((res)=>{
                setNote({
                    title: res.data.title,
                    description: res.data.description
                });
                setValue(res.data.description)
            })
            .catch((err)=>{
                console.log('Error from UpdateNote');
            });
    },[id]);

    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value});
    }


    // to disable the Upload button everytime any key is pressed inside the text editor
    let btn2=document.getElementById('btn2');
    const disableUpdate=()=>{
        btn2.disabled=true;
    }

    //funtion to save the inner content of the text editor.
    const onClickSave=()=>{
        setNote({...note,description:value});
        btn2.disabled=false;    // enable Upload button after saving the inner content
        console.log(note);
        
    }

    //function to upload the saved content to the database
    const onClickUpdate=()=>{
            if(note.title===""){
                console.log(alert("atleast title need to upload empty document"));
            }
            else{
                const data = {
                    title: note.title,
                    description: note.description
                };

                axios
                    .put(`http://localhost:8082/api/notes/${id}`, data)
                    .then((res)=>{
                        navigate('/');
                        // navigate(`/update-note/${id}`);
                    })
                    .catch((err)=>{
                        console.log('Error in UpdateNote_update');
                    });
            };
     
        
    }
        

    return(
        <div className="MainEditor">
            <div className="NoteTitleContainer">
                <div className="titleInput">
                    <input className="NoteTitle" id ='NoteTitle' name='title' value={note.title} onChange={onChange} placeholder="Title" required></input>
                </div>
                <div className="EditorBtns">

                    <button  className="SaveNotes editorBtns" id='btn1' onClick={onClickSave}>Save</button>
                    <button className="UploadNotes editorBtns" id='btn2' onClick={onClickUpdate}>Update</button>
                     <Link to ='/'><div className="CancelNotes"><img className="cancleBtn" src='/Assets/redCross.png' alt='cancle'/> </div> </Link>
                </div>
            </div>
            <ReactQuill id='quillEditor' className="quillEditor" modules={modules} name="description" onChange={setValue} onKeyPress={disableUpdate} value={value} placeholder="The content goes here...." theme="snow"/>
        </div>
    );
}

export default UpdateNote;