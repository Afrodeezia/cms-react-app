import React, { useState } from 'react'
import './product.scss'

import ProductTable from '../../components/productTable/productTable'

const Product = () => {
  const [product, setProduct] = useState([])
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState(0);
  const [productVal, setProductVal] = useState(0);
  const [efundVal, setEfundVal] = useState(0);

  const [modalCreateState, setModalCreateState] = useState(false)

  function openModal() {
    setModalCreateState(!modalCreateState)
  }

  return (
    <div>
      <ProductTable 
          product={product} setProduct={setProduct}
          productName={productName} setProductName={setProductName}
          productQty={productQty} setProductQty={setProductQty}
          productVal={productVal} setProductVal={setProductVal}
          efundVal={efundVal} setEfundVal={setEfundVal}
      />
    </div>
  )
}

export default Product