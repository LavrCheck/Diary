import React from 'react'
import './App.sass'
import Diary from './Components/Dairy'
import { Sign } from './Components/Sign/Sign'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'



export function App() {

  return (
    <BrowserRouter basename='/lavrcheck/diary'>
      <Routes>
        <Route path='/*' element={
          <div className="App">
            <Routes>
              <Route path='/' element={<Diary />} />
              <Route path='/sign' element={<Sign />} />
            </Routes>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
