import React, {useEffect} from 'react'
import { onSnapshot, query } from "firebase/firestore";
import { commSellerCollectionRef } from '../../services/firebase.services';
import './tableRemit.scss'


const TableRemit = ({
                    open,
                    setRemit,
                    getTableProps,
                    getTableBodyProps,
                    headerGroups,
                    rows,
                    prepareRow
                      }) => {



useEffect(() => {
  const q = query(commSellerCollectionRef);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let remitArr = [];
    querySnapshot.forEach((doc) => {
      remitArr.push({...doc.data(), id: doc.id})
    });
    setRemit(remitArr)
  });
  return () => unsubscribe();
}, [setRemit]);
  
const firstPageRows = rows.slice(0, 10);

  return (
    <div>
      <table className='remitting' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className='remittingTableHead' 
                {...column.getHeaderProps(
                    column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <tr className='remittingTableRow'  
              {...row.getRowProps()}>
                {row.cells.map((cell) => {

                  if (cell.column.Header === "Action") {
                    return (
                      <td className='remittingTableData' 
                      {...cell.getCellProps()}>
                        <button onClick={() => 
                            open(cell.row.original.id)}>
                          Remit
                        </button>
                        <button >
                          View
                        </button>
                      </td>
                    );
                  }
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='remittingFoot'>
        Showing the first 10 results of {rows.length} rows
        </div>
    </div>
  )
}

export default TableRemit