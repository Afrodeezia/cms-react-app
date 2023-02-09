import React, {useMemo, useState} from 'react';

import './tableListDispatching.scss'

import TableDispatching from '../tableDispatch/tableDispatching';
import ModalEditDispatch from '../modalEditDispatch/modalEditDispatch';
import { DateRangeColumnFilter, dateBetweenFilterFn} from '../../services/react-table.services'


const TableListDispatching = ({dispatch, 
                              setDispatch,
                              seller,
                              setSeller,
                              product,
                              setProduct,
                              dispatchQty,
                              setDispatchQty,
                              editDate,
                              setEditDate,
                            }) => {

    const data = useMemo(() => 
                  [...dispatch],
                  [dispatch]);

    const columns = useMemo(() => [
        {id: 'date',
        Header: 'Date',
        accessor: e => e.date.toDate().toLocaleDateString(
          {
            year:'numeric',
            month:'numeric',
            day:'numeric'
            }),
          Filter: DateRangeColumnFilter,
          filter: dateBetweenFilterFn},
        {Header: 'Name',
        accessor: 'seller'},
        {Header: 'Product',
        accessor: 'product'},
        {Header: 'Quantity',
        accessor: 'dispatchQty'},
        {Header: 'Action',
        accessor: 'action',
        disableSortBy: true}
    ], []
    );

    const [modalEditState, 
      setModalEditState
     ] = useState(false);
const [currentId, 
      setCurrentId
     ] = useState("");

function openEditModal(id) {
 setModalEditState(!modalEditState);
 setCurrentId(id);
}

function closeEditModal(e) {
 e.preventDefault();
 setModalEditState(!modalEditState);
}

function submitEditModal() {
 setModalEditState(!modalEditState);
}

    
  return (
    <div>
      <TableDispatching 
        columns={columns}
        data={data}
        setDispatch={setDispatch}
        open={openEditModal}
        />
      <ModalEditDispatch 
        toggle={modalEditState}
        close={closeEditModal}
        afterSubmit={submitEditModal}
        dispatch={dispatch}
        setDispatch={setDispatch}
        seller={seller}
        setSeller={setSeller}
        product={product}
        setProduct={setProduct}
        dispatchQty={dispatchQty}
        setDispatchQty={setDispatchQty}
        editDate={editDate}
        setEditDate={setEditDate}
        id={currentId}
      />
    </div>
  )
}

export default TableListDispatching