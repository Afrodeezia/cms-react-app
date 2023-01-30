import React, { useState, useMemo, useEffect } from 'react'
import './receiving.scss'
import { transCollectionRef }
      from '../../services/trans.services'
import { onSnapshot, query } from 'firebase/firestore'
import {  useTable } from 'react-table'
import DatePicker from 'react-datepicker'

const Receiving = () => {
  const [ trans, setTrans ] = useState([]);
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());

  const data = useMemo(() => 
            [...trans], [trans]);

  const columns = useMemo(
      () => [
        {Header: 'Product',
        accessor: 'product'},
        {Header: 'Quantity',
        accessor: 'quantity'},
        {id: 'timestamp',
          Header: 'Date',
        accessor: e => e.timestamp.toDate().toDateString()},
        {Header: "Action",
        accessor: 'action'}
      ],
      []);

  const { getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
           } = useTable({columns,
                        data,},
                       )

  useEffect(() => {
    const q = query(transCollectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let transArr = [];
      querySnapshot.forEach((doc) => {
        transArr.push({...doc.data(), id: doc.id})
      });
      setTrans(transArr)
    });
    return () => unsubscribe();
  }, [setTrans]);


  return (
    <div className='receiving'>

      <DatePicker 
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
       <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
        </tbody>
      </table>
    </div>
  )
}

export default Receiving