import React, { useEffect, useCallback, useState} from 'react'
import './modalEditDispatch.scss'
import dispatchDataService from '../../services/dispatch.services'
import {productCollectionRef} from '../../services/products.services'
import { onSnapshot, query } from 'firebase/firestore'
import "react-datepicker/dist/react-datepicker.css";

const ModalEditDispatch = ({toggle,
                          close,
                          afterSubmit,
                          dispatch,
                          setDispatch,
                          seller,
                          setSeller,
                          product,
                          setProduct,
                          dispatchQty,
                          setDispatchQty,
                          editDate,
                          setEditDate, 
                          id}) => {
      const [dispatchSeller, setDispatchSeller] = useState("")
      const [dispatchProduct, setDispatchProduct] = useState("")

  const handlePopulate = useCallback(
    async () => {
      try {
        const dispatchSnap = await dispatchDataService.getAllDispatch(id);
        console.log(dispatchSnap.data());
        setDispatchSeller(dispatchSnap.data().seller);
        setDispatchProduct(dispatchSnap.data().product);
        setDispatchQty(dispatchSnap.data().dispatchQty);
        setEditDate(dispatchSnap.data().date.toString());

      } catch (err) {
        alert(err.message)
      }
    }, [id, setDispatchSeller, setDispatchProduct, setDispatchQty, setEditDate]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatchDataService.updateDispatch(id, {
      dispatchQty: dispatchQty,
      product: dispatchProduct,
    });
    alert('Updated Successfully');
    afterSubmit();
  }

  const handleProductSnap = useCallback(
    async () => {
      try {
        const q = query(productCollectionRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let productArr = [];
          querySnapshot.forEach((doc) => {
            productArr.push({...doc.data(), id: doc.id});
          });
          setProduct(productArr)
        });
        return () => unsubscribe();
      } catch (err) {

      }
    },
    [setProduct]
  )

  useEffect(() => {
    if (id !== undefined && id !== "") {
      handlePopulate();
      handleProductSnap();
    }
  }, [id, handlePopulate, handleProductSnap])

  return (
    <div className={`modalAdd-container
    ${toggle ? `active` : ""}`}>
    <form className='modalAdd-form' onSubmit={handleSubmit}>
      <div className='modalAdd-close' onClick={close}></div>
        <div className='inputmodalAdd-container'>

          <label className='inputmodalAdd'>Date:{" "}
            {editDate}
          </label>

          <label className='inputmodalAdd'>Name:{" "}
            {dispatchSeller}
          </label>

          <label className='inputmodalAdd'>Product:{" "}
            <select value={dispatchProduct} 
                    onChange={(e) => setDispatchProduct(e.target.value)}>
                  {product.map((product) => (
                    <option key={product.id} value={product.productName}>
                        {product.productName}
                    </option>
                  ))}
            </select>
          </label>

          <label className='inputmodalAdd'>Quantity:{" "}
            <input 
              value={dispatchQty}
              onChange={(e) => {setDispatchQty(e.target.value)}}
              type='text'
              size='12'
            />
          </label> 
      </div>
        <div className='modalAdd-buttons'>
          <button className='modalAdd-but' type='submit'>update</button>
          <button className='modalAdd-but' onClick={close}>cancel</button>
        </div>
    </form>
    </div>
  )
}

export default ModalEditDispatch