import React, {  useMemo } from 'react';
import { useTable,
         useGlobalFilter,
          useSortBy } from 'react-table';

import './tableListDispatch.scss'

import TableDispatching from '../tableDispatch/tableDispatching';


const TableListDispatching = ({
  commSellerTable,
  setCommSellerTable,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  toggle,
  action,
  dispatch,
  setDispatch 
}) => {

    const data = useMemo(() => 
                  [...commSellerTable],
                  [commSellerTable]);

    const columns = useMemo(() => [
        {Header: 'Last Name',
        accessor: 'lname'},
        {Header: 'First Name',
        accessor: 'fname'},
        {Header: 'Bottles Dispatched',
        accessor: 'commDispatch'}
    ], []
    );

    const {getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
          state,
          preGlobalFilteredRows,
          setGlobalFilter,
        } = useTable({columns,
                     data
                    }, 
                      useGlobalFilter,
                      useSortBy
                    )
  return (
    <div>
      <TableDispatching 
        columns={columns}
        data={data}
        setCommSellerTable={setCommSellerTable}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}  />
    </div>
  )
}

export default TableListDispatching