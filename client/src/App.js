// import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LogReg from './views/LogReg';
import Dashboard from './views/Dashboard';
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <section className="App">
        <Routes>
          <Route element={<LogReg setLoggedin={setLoggedin} />} path="/" />
          <Route  path="/home" element={
            <ProtectedRoute loggedin={loggedin}>
              <Dashboard loggedin={loggedin} setLoggedin={setLoggedin}/>
            </ProtectedRoute>
          }/>
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
