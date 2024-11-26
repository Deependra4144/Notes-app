import './App.css'
import { Route, Routes } from 'react-router-dom';
import AddNote from './components/AddNote';
import Mynotes from './components/Mynotes';
import ReCycleBin from './components/ReCycleBin';
import Rsidebar from './components/Sidebar';
function App() {
  return (
    <div className='container-fluid p-0 m-0 st'>
      <div className="row p-0 m-0">
        <div className="col-md-2 p-0">
          <Rsidebar />
        </div>
        <div className="col-md-10 p-0">
          <Routes>
            <Route path='/addnotes' element={<AddNote />} />
            <Route path='/' element={<Mynotes />} />
            <Route path='/recyclebin' element={<ReCycleBin />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
