import React,{useEffect,useState} from 'react'
import { Api_path } from '../Data/Apipath';

function AllProducts() {
    const [products,setproducts]=useState([]);
    const [render,setrender]=useState(0);
    const producthandler=async()=>{
       const firmid =  localStorage.getItem("FirmId");
       try{
         const response=await fetch(`${Api_path}/product/product/${firmid}`);
         const data=await response.json();
         setproducts(data.products)
       }catch(err){
          console.log(err);
       }
    };

    useEffect(()=>{
        producthandler();
    },[render]);

    const deleteproduct=async(id)=>{
        try{
            console.log(id)
            const response=await fetch(`${Api_path}/product/${id}`,{
            method:"DELETE"
           });
           if(response.ok){
            // const data=products.filter((ele)=>{ele._id !== id});
            // console.log(data)
            // setproducts(data);
            setrender(render+1);
            confirm("Are you sure,you want to Delete");
            alert("Product deleted Successfully");
           }
        }catch(err){

        }
    };

  return (
    <div>
        {
            !products ? (
              <p>NO products Added</p>
            ) : (
                <table className="producttable">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                            {
                                products.map((ele)=>{
                                    return  <tr key={ele._id}> 
                                                <td>{ele.productname}</td>
                                                <td>{ele.price}</td>
                                                <td>{
                                                      ele.image && (
                                                        <img src={`${Api_path}/uploads/${ele.image}`}/>
                                                      )
                                                    }
                                                </td>
                                                <td><button onClick={()=>{deleteproduct(ele._id)}}>Delete</button></td>
                                              </tr>
                                           
                                })
                            }
                        
                    </tbody>
                </table>
            )
        }
    </div>
  )
}

export default AllProducts
