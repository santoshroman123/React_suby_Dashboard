import React from 'react';
import Landingpage from './VendorDashboard/pages/Landingpage';
import "./App.css";
import {Routes,Route} from 'react-router-dom';
import Notfound from './VendorDashboard/componets/notfound';


function App() {
  return (
    <div>
      <Routes>
       <Route path="/" element={ <Landingpage/>}/>
       <Route path='/*' element={<Notfound/>}/>
      </Routes>
    </div>
  )
}

export default App
