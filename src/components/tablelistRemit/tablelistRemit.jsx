import React, {useState, useMemo} from 'react'
import './tablelistRemit.scss'

import { useTable, useGlobalFilter, useSortBy,} from 'react-table'

import FilterRemit from '../filterRemit/filterRemit'
import TableRemit from '../tableRemit/tableRemit'

const TablelistRemit = ({
                    remit,
                    setRemit,
                    seller,
                    setSeller,
                    outBalance,
                    setOutBalance,
                    efund,
                    setEfund,
                  }) => {

const data = useMemo(() => [...remit], [remit]);

const columns = useMemo(() => [
  {Header: "Name", accessor: 'name'},
  {Header: 'Total Balance', accessor: 'outBalance'},
  {Header: 'Efund', accessor: 'eFund'},
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

const [modalEditState, setModalEditState] = useState(false);
const [currentId, setCurrentId] = useState("");

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
    <FilterRemit 
      preGlobalFilteredRows={preGlobalFilteredRows}
      setGlobalFilter={setGlobalFilter}
      globalFilter={state.globalFilter}
    />
    <TableRemit
      columns={columns}
        data={data}
        open={openEditModal}
        setRemit={setRemit}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
        />
    </div>
  )
}

export default TablelistRemit