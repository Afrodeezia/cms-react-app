import productDataService, 
      { productCollectionRef } 
      from '../../services/products.services'
import transDataService
       from '../../services/trans.services'
import { onSnapshot, 
         query, 
         increment,

         } from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './modalReceive.scss'


const ModalReceive = ({
                product,
                setProduct,
                quantity,
                setQuantity,
                select,
                setSelect,
                toggle,
                action,
                }) => {

  const [recStartDate , setRecStartDate ] = useState(new Date());
                  
  const handleSnap = useCallback(
    async () => {
      try {
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
      } catch (err) {
        alert(err.message);
      }
    },
    [setSelect, setProduct]
  );
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productSnap =  await productDataService.getAllProduct(select)
    await productDataService.updateProduct(select, {
      productQty: increment(quantity)
    })
    transDataService.addTrans(
      { product: productSnap.data().productName, 
        quantity: quantity,
        timestamp: recStartDate
         })
        
    alert("Entry Successful")
    action();
    e.target.reset()
  }

  useEffect(() => {
    handleSnap();
  }, [handleSnap])

  
  return (
    <div className={`modal-container 
    ${toggle ? `active` : ''}`}>
      
        <form className='modal-form' onSubmit={handleSubmit}>
        <div className='modal-close' onClick={action}>
          </div>
          <div className='inputmodal-container'>
          <label className='inputmodal'>Enter Product:{" "}
          <select value={select} 
                  onChange={(e) => setSelect(e.target.value)} >
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

          <label className='inputmodal'>
            <DatePicker 
              selected={recStartDate}
              onChange={(date) => setRecStartDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
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

export default ModalReceive