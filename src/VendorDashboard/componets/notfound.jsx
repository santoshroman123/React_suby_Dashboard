import React from 'react'
import {Link} from "react-router-dom";

function Notfound() {
  return (
    <>
     <div className="Errorsection">
       <Link to="/" style={{fontSize:"24px",color:"darkblue",textDecoration:"none",fontWeight:"500"}}>Go Back</Link>
          <h1>404</h1>
          <div>Page Not Found</div>
      </div>
    </>
      
  )
}

export default Notfound
