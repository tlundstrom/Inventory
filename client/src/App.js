import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LogReg from './views/LogReg';

function App() {
  return (
    <BrowserRouter>
      <section className="App">
        <Routes>
          <Route element={<LogReg />} path="/" />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
