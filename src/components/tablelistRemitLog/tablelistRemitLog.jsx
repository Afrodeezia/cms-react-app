import React, {useState, useMemo} from 'react'
import './tablelistRemitLog.scss'

import { DateRangeColumnFilter, 
        dateBetweenFilterFn } from '../../services/react-table.services';

import TableRemitLog from '../tableRemitLog/tableRemitLog';




const TablelistRemitLog = ({
                  remitLog,
                  setRemitLog,
                  date,
                  setDate,
                  editDate,
                  setEditDate,
                  pay,
                  setPay,
                  bank,
                  setBank,
                  balance,
                  setBalance,
                  }) => {

const data = useMemo(() => [...remitLog], [remitLog]);

const columns = useMemo(() => [
  {id: 'date', Header: 'Date', accessor: e => e.date.toDate().toLocaleDateString(
    {year: 'numeric', month: 'numeric', day: 'numeric'}),
    Filter: DateRangeColumnFilter, filter: dateBetweenFilterFn},
  {Header: 'Name', accessor: 'seller'},
  {Header: 'Remittance', accessor: 'remit'},
  {Header: 'Bank', accessor: 'paymentMode'},
  {Header: 'Efund Deduct', accessor: 'efundDeduct'},
  {Header: 'Balance', accessor: 'outBalance'},
  {Header: 'total Efund', accessor: 'totalEfund'}
], []);
  return (
    <div>
    <TableRemitLog 
      columns={columns}
      data={data}
      setRemitLog={setRemitLog}
    />
    </div>
  )
}

export default TablelistRemitLog