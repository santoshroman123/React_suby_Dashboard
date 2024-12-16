import React from "react";

function Navbar({showloginhandler,showregisterhandler,showlogout,logout}){

    const username=localStorage.getItem("Username");

    return(
        <div className="navsection">
            <div className="company">
                Vendor DashBoard
            </div>
            <div className="firmname">
                <h4>Firmname :- {username}</h4>
            </div>
            <div className="userauth">
               {
                 !showlogout ? <> <span onClick={showloginhandler}>Login</span>/<span onClick={showregisterhandler}>Register</span> </> : (<span onClick={logout}>Logout</span>) 
               }
            </div>
        </div>   
    )
}

export default Navbar;