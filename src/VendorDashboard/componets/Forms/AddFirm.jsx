import React,{useState} from 'react'
import { Api_path } from '../../Data/Apipath';
import axios from "axios";


function AddFirm() {

  const [firmname,setfirmname] = useState("");
  const [area,setarea] = useState("");
  const [category,setcategory]=useState([]);
  const [region,setregion]=useState([]);
  const [offer,setoffer]=useState("");
  const [file,setfile]=useState(null);

  const imageuplod=(event)=>{
     const selectedimage=event.target.files[0];
     console.log(selectedimage)
     setfile(selectedimage);
  };

  const handlecategorychange=(event)=>{
     const value=event.target.value;
     if(category.includes(value)){
      setcategory(category.filter((val)=>{val !== value}));
     }
     else{
      setcategory([...category,value]);
     }
  };

  const handleregionchange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      const filtering=region.filter((val)=>{val !== value});
      setregion(filtering);
    }
    else{
     setregion([...region,value]);
    }
 };

  

  const handlefirmsubmit=async(e)=>{
    e.preventDefault();
    try{
       const logintoken=localStorage.getItem("LoginToken");

        if(!logintoken){
          console.error("User not Authenticated");
        }
        // const formdata=new FormData();
        //  formdata.append("firmname",firmname);
        //  formdata.append("area",area);
        //  formdata.append("offer",offer);
        //  formdata.append("image",file)

        //  category.forEach((value)=>{
        //  formdata.append("category",value);
        //  });

        //  region.forEach((value)=>{
        //   formdata.append("region",value);
        //  });
        const sendata={
          "firmname":firmname,"area":area,"category":category,"region":region,"offer":offer,"file":file
        }

        const response=await axios.post(`${Api_path}/firm/addfirm`,sendata,{
           headers:{"token":logintoken}
        });
       console.log(response.data.message)
        if(response.statusText=="OK"){

          localStorage.setItem("FirmId",response.data.firmid)

          alert("Firm Added succesfully Done");
          setfirmname("");
          setarea("");
          setoffer("");
          setcategory([]);
          setregion([]);
        }
        else if(response.data.message === "vendor can have only one account"){
          alert("Firm Exists .Only 1 firm can be added")
        }
        else{
          alert("Failed to aadd Firm");
        }

    }catch(err){
      console.log(err)
    }
  };

  return (
   <div className="firmsection">
     
         <form className='tableform' onSubmit={handlefirmsubmit}>
            <h3>Add Firm</h3>
            <label htmlFor='firm name'>Firm Name</label>
            <input type="text" name="firmname" value={firmname} onChange={(e)=>{setfirmname(e.target.value)}}/>

            <label htmlFor='firm name'>Area</label>
            <input type="text" name="area" value={area} onChange={(e)=>{setarea(e.target.value)}}/>

            {/* <label htmlFor='firm name'>Category</label>
            <input type="text" /> */}
            <div className="check-inp">
              <label>Category</label>
              <div className="inputs-container">
              <div className="check-box">
                <label className="veg">Veg</label>
                <input  type="checkbox" checked={category.includes("Veg")} onChange={handlecategorychange} value="Veg"/> 
              </div>

              <div className="check-box">
                <label>Non-Veg</label>
                <input type="checkbox" checked={category.includes("Non-Veg")} onChange={handlecategorychange} value="Non-Veg"/>
              </div>
              </div>
            </div>

            {/* <label htmlFor='firm name'>Region</label>
            <input type="text" /> */}
            <div className="check-region">
              <label className='lable'>Region</label>
              <div className="inputs-region">

              <div className="row1">

                <div className="check-region">
                  <label className="veg">South-Indian</label>
                  <input  type="checkbox" checked={region.includes("South-Indian")} value="South-Indian" onChange={handleregionchange}/>
                </div>

                <div className="check-region">
                  <label>North-Indian</label>
                  <input type="checkbox" checked={region.includes("North-Indian")} value="North-Indian" onChange={handleregionchange}/>
                </div>

              </div>
             
              <div className="row2">
              <div className="check-region">
                <label>Chinese</label>
                <input type="checkbox"  checked={region.includes("Chinese")} value="Chinese" onChange={handleregionchange}/>
              </div>

              <div className="check-region">
                <label>Bakery</label>
                <input type="checkbox"  checked={region.includes("Bakery")} value="Bakery" onChange={handleregionchange}/>
              </div> 

              </div>

              </div>
            </div>

            <label htmlFor='firm name'>Offer</label>
            <input type="text" name="offer" value={offer} onChange={(e)=>{setoffer(e.target.value)}}/>

            <label htmlFor='firm name'>Firm Image</label>
            <input type="file" onChange={imageuplod} />
            <br/>

            <div className="btnsubmit">
                <button type="submit">Submit</button>
            </div>   
         </form>
         
     </div>
 
  )
}

export default AddFirm;
