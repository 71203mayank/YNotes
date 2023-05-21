import './App.css';
import MainEditor from './Components/Editors/MainEditor/MainEditor';
import NoteList from './Components/Editors/NoteList/NoteList';
import ShowNote from './Components/Editors/NoteList/ShowNote';
import UpdateNote from './Components/Editors/NoteList/UpdateNote';
import Youframe from './Components/Youframe/Youframe';
import { Route, BrowserRouter, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='leftPage'>
        <Youframe /> 
      </div>

      <div className='rightPage'>
      <Routes>
        <Route path='/' element={<NoteList/>}/>
        <Route path='/editor' element={<MainEditor/>}/>
        <Route path = 'show-note/:id' element={<ShowNote/>}/>
        <Route path='update-note/:id' element={<UpdateNote/>}/>
      </Routes>
      </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
