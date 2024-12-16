import React,{useState} from 'react'
import { Api_path } from '../../Data/Apipath';
import Welcome from '../welcome';

function Login({showwelcomehandler}) {

  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [loading,setloading]=useState("");

  const submithandler=async(e)=>{
      e.preventDefault(); 
       try{
          const response=await fetch(`${Api_path}/vendor/login`,{
            method:"POST",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({email,password})
          })
        const data=await response.json();
        console.log(data)
        if(response.ok){
          localStorage.setItem("LoginToken",data.token);
          localStorage.setItem("Vendorfirmid",data.vendorid);
          console.log(data)
          setemail("");
          setpassword("");
          showwelcomehandler();
          
        }
        const venderfirmid=localStorage.getItem("Vendorfirmid");

        const vendorresponse=await fetch(`${Api_path}/vendor/getvenderid/${venderfirmid}`);
        const vendordata=await vendorresponse.json();

        if(vendordata){
          localStorage.setItem("FirmId",vendordata.vendorfirmid);
          const username=vendordata.vender.firm[0].firmname;
          localStorage.setItem("Username",username);
          window.location.reload();
        }
        
       }catch(err){
          
          console.log(err);
       }
  }
  return (
    <div className="loginsection">
        
        <form className='authform' onSubmit={submithandler}>
            <h3>Vendor Login</h3>
            <label htmlFor='Email'>Email</label>
            <input type="text" value={email} onChange={(e)=>{setemail(e.target.value)}} id="email"/><br/>

            <label htmlFor='password'>Password</label>
            <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} id="password"/><br/>

            <div className="btnsubmit">
            <button type="submit">Submit</button>    
            </div>    
        </form>

    </div>
  )
}

export default Login
