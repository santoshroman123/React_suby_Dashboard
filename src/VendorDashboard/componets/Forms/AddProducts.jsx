import React,{useState} from 'react'
import axios from 'axios';
import { Api_path } from '../../Data/Apipath';

function AddProducts() {

  const [productname,setproductname]=useState("");
  const [price,setprice]=useState("");
  const [category,setcategory]=useState([]);
  const [bestseller,setbestseller]=useState(false);
  const [description,setdescription]=useState("");
  const [file,setimage]=useState(null);
  
  const imageuplod=(event)=>{
    const selectedimage=event.target.files[0];
    setimage(selectedimage);
   };

  const handlecategorychange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setcategory(category.filter((res)=>{res !== value}))
    }
    else{
      setcategory([...category,value]);
    }
  }
  const handleproductsubmit=async (e)=>{
          e.preventDefault();
          try{
           const logintoken=localStorage.getItem("LoginToken");
           const firmid=localStorage.getItem("FirmId");
           console.log(firmid);
           
           if(!firmid || !logintoken){
            alert("User not Authenticated")
           }
          //  Form Image Adding For Products In Backend TO DataBase
           const formdata=new FormData();
          
           formdata.append("productname",productname);
           formdata.append("price",price);
           formdata.append("category",category);
           formdata.append("bestseller",bestseller);
           formdata.append("description",description);
           formdata.append("file",file);

           const senddata={"productname":productname,"price":price,"category":category,"bestseller":bestseller,"description":description,formdata}
           
           const response=await fetch(`${Api_path}/product/addproduct/${firmid}`,{
            method:"POST",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify(senddata)
           })
           if(response.ok){
            alert("Product Added Successfully");
           }
           
          // const respone=await axios.post(`${Api_path}/product/addproduct/${firmid}`,senddata);
          // console.log(respone);
          // if(respone.status===200){
          //   alert("Product Added Successfully");
          //  }
          }
          catch(err){
            console.log(err);
          }
  };

      const handleseller=(event)=>{
          const value=event.target.value==="true";
          setbestseller(value)
      }

  return (
    <div className="firmsection">
         <form className='tableform' onSubmit={handleproductsubmit}>
            <h3>Add Product</h3>

            <label htmlFor='firm name'>product Name</label>
            <input type="text" value={productname} onChange={(e)=>{setproductname(e.target.value)}}/>

            <label htmlFor='firm name'>Price</label>
            <input type="text" value={price} onChange={(e)=>{setprice(e.target.value)}}/>

            {/* <label htmlFor='firm name'>Category</label>
            <input type="text" /> */}
             <div className="check-inp">
              <label>Category</label>
              <div className="inputs-container">
              <div className="check-box">
                <label className="veg" onChange={handlecategorychange}>Veg</label>
                <input  type="checkbox" checked={category.includes("Veg")} onChange={handlecategorychange} value="Veg"/>
              </div>

              <div className="check-box">
                <label>Non-Veg</label>
                <input type="checkbox" checked={category.includes("Non-Veg")} onChange={handlecategorychange} value="Non-Veg"/>
              </div>
              </div>
            </div>

{/* 
            <label htmlFor='firm name'>Bestseller</label>
            <input type="text" /> */}
            <div className="check-inp">
              <label>BestSeller</label>
              <div className="inputs-container">
              <div className="check-box">
                <label className="veg">Yes</label>
                <input  type="radio" value="true" checked={bestseller===true} onChange={handleseller} />
              </div>

              <div className="check-box">
                <label>No</label>
                <input type="radio" value="false" checked={bestseller===false} onChange={handleseller} />
              </div>
              </div>
            </div>


            <label htmlFor='firm name'>Description</label>
            <input type="text" value={description} onChange={(e)=>{setdescription(e.target.value)}}/>

            <label htmlFor='firm name'>Firm Image</label>
            <input type="file" onChange={imageuplod} />
            <br/>

            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div>   
         </form>
    </div>
  )
}

export default AddProducts
