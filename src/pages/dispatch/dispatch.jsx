import React, {useState} from 'react'
import DispatchForm from '../../components/dispatchForm/dispatchForm';
//import TableListDispatching from '../../components/tableListDispatch/tableListDispatch';

const Dispatch = () => {

  const [dispatch, setDispatch] = useState([]);
  const [seller, setSeller] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectSeller, setSelectSeller] = useState("");
  const [selectProduct, setSelectProduct] = useState("");
  const [dispatchQty, setDispatchQty] = useState(0);
 


  
  return (
    <div>
      <DispatchForm 
        dispatch={dispatch}
        setDispatch={setDispatch}
        seller={seller}
        setSeller={setSeller}
        product={product}
        setProduct={setProduct}
        selectSeller={selectSeller}
        setSelectSeller={setSelectSeller}
        selectProduct={selectProduct}
        setSelectProduct={setSelectProduct}
        dispatchQty={dispatchQty}
        setDispatchQty={setDispatchQty}
      />
    </div>
  )
}

export default Dispatch