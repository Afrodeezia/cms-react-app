import React, { useState } from "react";
import './dashboard.scss';


import Topmenu from "../../components/topmenu/topmenu";
import Midmenu from "../../components/midmenu/midmenu";


const Dashboard = () => {

  const [ product, setProduct ] = useState([]);
  const [ quantity, setQuantity ] = useState(0);
  const [ select, setSelect ] = useState("")
  

  return (
    <div className="dashboard">
      <Topmenu  />
      <Midmenu 
          product={product}
          setProduct={setProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          select={select}
          setSelect={setSelect}
          />
      
      
    </div>
  )
}

export default Dashboard