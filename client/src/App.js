// import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LogReg from './views/LogReg';
import Dashboard from './views/Dashboard';
import { useState } from 'react';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <section className="App">
        <Routes>
          <Route element={<LogReg setLoggedin={setLoggedin} />} path="/" />
          <Route element={<Dashboard setLoggedin={setLoggedin}/>} path="/home" />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
