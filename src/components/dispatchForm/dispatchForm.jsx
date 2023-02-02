import React, { useCallback, useState, useEffect } from 'react'
import commSellerDataService,
        {commSellerCollectionRef} from '../../services/firebase.services'
import productDataService,
        {productCollectionRef} 
        from '../../services/products.services';
import dispatchDataService 
        from '../../services/dispatch.services'
import {onSnapshot,
        query,
        increment
        } from 'firebase/firestore'
import DatePicker from 'react-datepicker'
import './dispatchForm.scss'

const DispatchForm = ({
                  dispatch,
                  setDispatch,
                  seller,
                  setSeller,
                  product,
                  setProduct,
                  selectSeller, 
                  setSelectSeller,
                  selectProduct,
                  setSelectProduct,
                  dispatchQty, 
                  setDispatchQty
                      }) => {

  const [recStartDate, setRecStartDate] = useState(new Date());

  const handleSellerSnap = useCallback(
    async () => {
      try {
        const q = query(commSellerCollectionRef);
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let commSellerArr = [];
          QuerySnapshot.forEach((doc) => {
            setSelectSeller(doc.id)
            commSellerArr.push({...doc.data(), id: doc.id});
          });
          setSeller(commSellerArr)
        });
        return () => unsubscribe();
      } catch (err) {
        alert(err.message);
      }
    },
    [setSelectSeller, setSeller]
  )

  const handleProductSnap = useCallback(
    async () => {
      try {
        const q = query(productCollectionRef);
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let productArr = [];
          QuerySnapshot.forEach((doc) => {
            setSelectProduct(doc.id)
            productArr.push({...doc.data(), id: doc.id});
          });
          setProduct(productArr)
        });
        return () => unsubscribe();
      } catch (err) {
        alert(err.message);
      }
    },
    [setSelectProduct, setProduct]
  );

  const handleSubmit = async (e) => {
    const sellerSnap = await commSellerCollectionRef.getAllCommSeller()
    const productSnap = await productDataService.getAllProduct(selectProduct)
    await productDataService.updateProduct(selectProduct, {
      productQty: increment(-dispatchQty)
    })
    dispatchDataService.addDispatch(
      {seller: sellerSnap.data().lname,
      product: productSnap.data().productName,
      dispatchQty: dispatchQty,
      date: recStartDate
    })

   alert("Entry Successful")
   e.target.reset()
  }

  useEffect(() => {
    handleSellerSnap();
    handleProductSnap();
  }, [handleSellerSnap, handleProductSnap])

  return (
    <div>
      <form>

        <label>
          <DatePicker
            selected={recStartDate}
            onChange={(date) => setRecStartDate(date)} 
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
              />
        </label>

        <label>Name:{" "}
        <select value={selectSeller}
                onChange={(e) => setSelectSeller(e.target.value)}>
          {seller.map((seller) => (
            <option key={seller.id}
                    value={seller.id}
                    >
              {seller.lname}
            </option>
          ))}
        </select>
        </label>

        <label>Product:{" "}
        <select value={selectProduct}
                onChange={(e) => setSelectProduct(e.target.value)}
                >
          {product.map((product) => (
            <option key={product.id}
                    value={product.id}
                    >
              {product.productName}
            </option>
          ))}
        </select>
        </label>

        <label>Quantity:{" "}
          <input 
            onChange={(e) => setDispatchQty(e.target.value)}
          />
        </label>

       
        <button>
          Enter
        </button>
      

      </form>
    </div>
  )
}

export default DispatchForm