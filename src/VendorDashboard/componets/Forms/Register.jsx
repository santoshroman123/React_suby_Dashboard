import React,{useState} from 'react'
import { Api_path } from '../../Data/Apipath';

function Register({showloginhandler}) {
  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [error,seterror]=useState("");
  const [loading,setloading] = useState(true);

  const handlesubmit=async(e)=>{
     e.preventDefault();
     try{
        const response=await fetch(`${Api_path}/vendor/register`,{
         method:"POST",
         headers:{"content-Type":"application/json"},
         body:JSON.stringify({username,email,password})
        })
        const data=await response.json();
        if(response.ok){
            setemail("");
            setpassword("");
            setusername("");
           console.log(data)
           alert("Vendor Register Successfully");
           showloginhandler()
        }
     }catch(err){
        console.log(err);
        alert("Registeration failed"); 
     }
  }

  return (
    <div className="registersection">
         <form className='authform' onSubmit={handlesubmit}>
            <h3>Vendor Register</h3>
            <label htmlFor='username'>Username</label>
            <input type="text" value={username} onChange={(e)=>{setusername(e.target.value)}} name="username" id="username"/><br/>

            <label htmlFor='Email'>Email</label>
            <input type="text" value={email} onChange={(e)=>{setemail(e.target.value)}} name="email" id="email"/><br/>

            <label htmlFor='password'>Password</label>
            <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} name="password" id="password"/><br/>

            <div className="btnsubmit">
            <button type='submit'>Submit</button>    
            </div>    
        </form>
    </div>
  )
}

export default Register
