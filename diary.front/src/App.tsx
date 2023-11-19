import React from 'react';
import './App.sass';
import  Diary  from './Components/Dairy';
import { Sign } from './Components/Sign/Sign';
import { BrowserRouter, Routes, Route } from 'react-router-dom';





export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={
          <div className="App">
            <Routes>
              <Route path='/' element={ <Diary/> }/>
              <Route path='/sign' element={ <Sign/> }/>
            </Routes>
          </div>
        }/>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
