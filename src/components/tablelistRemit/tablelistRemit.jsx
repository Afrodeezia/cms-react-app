import React, {useState, useMemo} from 'react'
import './tablelistRemit.scss'

import { useTable, useGlobalFilter, useSortBy,} from 'react-table'

import FilterRemit from '../filterRemit/filterRemit'
import TableRemit from '../tableRemit/tableRemit'
import ModalRemit from '../modalRemit/modalRemit'

const TablelistRemit = ({
                    remit, setRemit,
                    firstName, setFirstName,
                    lastName, setLastName,
                    outBalance, setOutBalance,
                    efund, setEfund,
                    pay, setPay,
                    bank, setBank,
                    date, setDate,
                    paymentMode, setPaymentMode,
                    efundDeduct, setEfundDeduct,
                    type, setType
                  }) => {

const data = useMemo(() => [...remit], [remit]);

const columns = useMemo(() => [
  {Header: "Name", accessor: d => `${d.fname} ${d.lname}`},
  {Header: 'Total Balance', accessor: 'outBalance'},
  {Header: 'Efund', accessor: 'efund'},
  {Header: 'Action', accessor: 'action'}
], []);

const {
  getTableProps, 
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  state,
  preGlobalFilteredRows,
  setGlobalFilter,
      } = useTable({columns, data}, useGlobalFilter, useSortBy)

const [modalRemitState, setModalRemitState] = useState(false);
const [currentId, setCurrentId] = useState("");

function openRemitModal(id) {
   setModalRemitState(!modalRemitState);
   setCurrentId(id);
 }

function closeRemitModal(e) {
   e.preventDefault();
   setModalRemitState(!modalRemitState);
 }

function submitRemitModal() {
   setModalRemitState(!modalRemitState);
 }

  return (
    <div>
    <FilterRemit 
      preGlobalFilteredRows={preGlobalFilteredRows}
      setGlobalFilter={setGlobalFilter}
      globalFilter={state.globalFilter}
    />
    <TableRemit
      columns={columns}
        data={data}
        open={openRemitModal}
        setRemit={setRemit}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
        />
    <ModalRemit 
      toggle={modalRemitState}
      close={closeRemitModal}
      submit={submitRemitModal}
      firstName={firstName} setFirstName={setFirstName}
      lastName={lastName} setLastName={setLastName}
      outBalance={outBalance} setOutBalance={setOutBalance}
      efund={efund} setEfund={setEfund}
      pay={pay} setPay={setPay}
      bank={bank} setBank={setBank}
      date={date} setDate={setDate}
      paymentMode={paymentMode} setPaymentMode={setPaymentMode}
      efundDeduct={efundDeduct} setEfundDeduct={setEfundDeduct}
      type={type} setType={setType}
      id={currentId}
    />
    </div>
  )
}

export default TablelistRemit