import productDataService, { productCollectionRef } from '../../services/products.services'
import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import './modal.scss'

const Modal = (props) => {

  const modalState = props.toggle
  const action = props.action
  const [ product, setProduct ] = useState([]);
  const [ quantity, setQuantity ] = useState(0);
  const [ id, setId ] = useState("")
  const [ select, setSelect ]= useState("")

  useEffect(() => {
    const q = query(productCollectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productArr = [];
      querySnapshot.forEach((doc) => {
        productArr.push({...doc.data(), id: doc.id});
      });
      setProduct(productArr)
    });
      return () => unsubscribe();
  }, [setProduct])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await productDataService.updateProduct(id, {
      productQty: quantity
    })
    alert("Entry Successful")
  }



  return (
    <div className={`modal-container 
    ${modalState ? `active` : ''}`}>
      
        <form className='modal-form' onSubmit={handleSubmit}>
        <div className='modal-close' onClick={action}>
          </div>
          <div className='inputmodal-container'>
          <label className='inputmodal'>Enter Product:{" "}
          <select value={quantity} onChange={(e) => {setQuantity(e.target.value)}} >
          {product.map((product) => (
            <option key={product.id}
                    value={product.productQty}>
              {product.productName}
            </option>
          ))}
           </select>
          </label>

          
        <label className='inputmodal'>Enter Quantity:{" "}
            <input 
              type="text"
              size='12'
              onChange={(e) => setQuantity(e.target.value)}
               />    
          </label>
          </div>
          <div className='modal-buttons'>
          <button className='modal-but' type='submit'>Enter</button>
          <button className='modal-but'>Cancel</button>
          </div>
        </form>
       
      </div>
    
  )
}

export default Modal