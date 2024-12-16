import React from 'react'

function Sidebar({showfirmhandler,showaddproducthandler,showproduct,showfirmtitle,showlogout}) {
  return (
    <div className="sidebarsection">
      <ul>
        {
          showfirmtitle &&  <li onClick={showfirmhandler}>Add Firm</li>
        }
        <li onClick={showaddproducthandler}>Add Product</li>
        <li onClick={showproduct}>All Products</li>
        <li>User</li>
      </ul>
    </div>
  )
}

export default Sidebar;
