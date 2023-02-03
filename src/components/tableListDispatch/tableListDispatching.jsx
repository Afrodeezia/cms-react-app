import React, {useMemo} from 'react';

import './tableListDispatching.scss'

import TableDispatching from '../tableDispatch/tableDispatching';
import { DateRangeColumnFilter, dateBetweenFilterFn} from '../../services/react-table.services'


const TableListDispatching = ({dispatch, setDispatch,}) => {

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
            day:'numeric'}),
          Filter: DateRangeColumnFilter,
          filter: dateBetweenFilterFn},
        {Header: 'Name',
        accessor: 'seller'},
        {Header: 'Product',
        accessor: 'product'},
        {Header: 'Quantity',
        accessor: 'dispatchQty'}
    ], []
    );

    
  return (
    <div>
      <TableDispatching 
        columns={columns}
        data={data}
        setDispatch={setDispatch}
        />
    </div>
  )
}

export default TableListDispatching