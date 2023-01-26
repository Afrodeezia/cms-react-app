import productDataService, { productCollectionRef } from '../../services/products.services'
import { onSnapshot, query, increment } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import './modal.scss'

const Modal = (props) => {

  const modalState = props.toggle
  const action = props.action
  const [ product, setProduct ] = useState([]);
  const [ quantity, setQuantity ] = useState(0);
  const [ select, setSelect ] = useState("")
 



  useEffect(() => {
    const q = query(productCollectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productArr = [];
      querySnapshot.forEach((doc) => {
        setSelect(doc.id)
        productArr.push({...doc.data(), id: doc.id});
      });
      setProduct(productArr)
    });
      return () => unsubscribe();
  }, [setSelect, setProduct])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await productDataService.updateProduct(select, {
      productQty: increment(quantity)
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
          <select value={select} onChange={(e) => setSelect(e.target.value)} >
          {product.map((product) => (
            <option key={product.id}
                    value={product.id}
                    >
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