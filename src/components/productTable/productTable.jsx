import React, { useState, useMemo } from "react";
import './productTable.scss'

import ProductTableData from "../productTableData/productTableData";

const ProductTable = ({ product, setProduct,
                        productName, setProductName,
                        productQty, setProductQty,
                        productVal, setProductVal,
                        efundVal, setEfundVal, }) => {

const data = useMemo(() => [...product], [product]);

const columns = useMemo(() => [
  {Header: 'Product Name', accessor: 'productName'},
  {Header: 'Quantity', accessor: 'productQty', },
  {Header: 'Price', accessor: 'productVal'},
  {Header: 'Efund Value', accessor: 'efundVal'},
], []);

const [modalEditState, setModalEditState] = useState(false);
const [currentId, setCurrentId] = useState("");

function openModal(id) {
setModalEditState(!modalEditState);
setCurrentId(id);
}

function closeModal(e) {
e.preventDefault();
setModalEditState(!modalEditState);
}

function submitModal() {
setModalEditState(!modalEditState);
}
  return (
    <div>
      <ProductTableData 
        data={data}
        columns={columns}
        setProduct={setProduct}
      />
    </div>
  )
}

export default ProductTable