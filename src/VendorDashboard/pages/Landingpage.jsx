import React,{useState,useEffect}from 'react'
import Navbar from '../componets/navbar'
import Sidebar from '../componets/Sidebar'
import Login from '../componets/Forms/Login';
import Register from '../componets/Forms/Register';
import AddFirm from '../componets/Forms/AddFirm';
import AddProducts from '../componets/Forms/AddProducts';
import Welcome from '../componets/welcome';
import AllProducts from '../componets/AllProducts';

const Landingpage = () => {

  const [showlogin,setshowlogin] = useState(false);
  const [showregister,setshowregister] = useState(false);
  const [showfirm,setshowfirm] = useState(false);
  const [showaddproduct,setshowaddproduct]=useState(false);
  const [showwelcome,setshowwelcome]=useState(false);
  const [showproducts,setshowproducts]=useState(false);
  const [showlogout,setshowlogout]=useState(false);
  const [showfirmtitle,setshowfirmtitle]=useState(true);

  const showaddproducthandle=()=>{

    if(showlogout){
    setshowfirm(false);
    setshowlogin(false);
    setshowregister(false);
    setshowwelcome(false);
    setshowaddproduct(true);
    setshowproducts(false)
    }else{
      alert("Please Login")
      setshowlogin(true);
    }
  }
  const showregisterhandle=()=>{
    setshowaddproduct(false)
    setshowfirm(false);
    setshowlogin(false);
    setshowwelcome(false);
    setshowregister(true);
    setshowproducts(false)
  }
  const showloginhandle=()=>{
      setshowaddproduct(false)
      setshowfirm(false)
      setshowregister(false);
      setshowwelcome(false);
      setshowlogin(true);
      setshowproducts(false)
  }
  const showfirmhandle=()=>{
    console.log(showlogout)
    if(showlogout){
     setshowaddproduct(false)
     setshowlogin(false);
     setshowregister(false);
     setshowwelcome(false);
     setshowfirm(true);
     setshowproducts(false)
    }else{
      alert("Please Login");
      setshowlogin(true);
    }
  }

  const welcomehandle=()=>{
    setshowaddproduct(false)
    setshowlogin(false);
    setshowregister(false);
    setshowfirm(false);
    setshowwelcome(true);
    setshowproducts(false)
 }

 const showproductshandle=()=>{
  if(showlogout){
  setshowaddproduct(false)
  setshowlogin(false);
  setshowregister(false);
  setshowfirm(false);
  setshowwelcome(false);
  setshowproducts(true)
  }else{
    alert("Please Login");
    setshowlogin(true);
  }
};

 useEffect(()=>{
   const logintoken=localStorage.getItem("LoginToken");
   console.log(logintoken)
   if(logintoken){
      setshowlogout(true);
   }
 },[]);

 useEffect(()=>{
   const firmname=localStorage.getItem("Username");
   if(firmname){
     setshowfirmtitle(false);
   }
 },[])

 const logout=()=>{
  confirm("Are you Sure for Logout")
  localStorage.removeItem("LoginToken");
  localStorage.removeItem("FirmId");
  localStorage.removeItem("Vendorfirmid");
  localStorage.removeItem("Username");
  setshowlogout(false);
  window.location.reload()

 }
  return (
    
      <>
        <section className='landingsection'>
             <Navbar showloginhandler={showloginhandle} showregisterhandler={showregisterhandle} showlogout={showlogout} logout={logout}/>
            <div className="collectionsection">
              <Sidebar showfirmhandler={showfirmhandle} showaddproducthandler={showaddproducthandle} showlogout={showlogout} showproduct={showproductshandle} showfirmtitle={showfirmtitle}/>
              {
                showlogin && <Login showwelcomehandler={welcomehandle}/>
              }
              {
                showregister && <Register showloginhandler={showloginhandle}/>
              }
              {
                showfirm && showlogout && <AddFirm/>
              }
              {
                showaddproduct && <AddProducts/>
              }
              {
                showwelcome && <Welcome/>
              }
              {showproducts  && showlogout && <AllProducts/>}
            </div>
        </section>
      </>
    
  )
}

export default Landingpage;
