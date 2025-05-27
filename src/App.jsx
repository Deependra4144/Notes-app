import './App.css'
import { Route, Routes } from 'react-router-dom';
import AddNote from './components/AddNote';
import Mynotes from './components/Mynotes';
import ReCycleBin from './components/ReCycleBin';
import Navbar from './components/Sidebar';
import { useTheme } from './context/ThemeContext';

function App() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path='/addnotes' element={<AddNote />} />
          <Route path='/' element={<Mynotes />} />
          <Route path='/recyclebin' element={<ReCycleBin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
