import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './Create';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

