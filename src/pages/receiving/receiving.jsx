import React, { useState, useMemo, useEffect } from 'react'

import { transCollectionRef }
      from '../../services/trans.services'
import { onSnapshot, query } from 'firebase/firestore'
import { useSortBy, useTable } from 'react-table'

const Receiving = () => {
  const [ trans, setTrans ] = useState([]);

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
                        useSortBy)

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

  const firstPageRows = rows.slice(0, 10);

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {

                  if (cell.column.Header === "Action") {
                    return (
                      <td {...cell.getCellProps()}>
                        <button>
                          update
                        </button>
                        <button >
                          delete
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
      <div>Showing the first 10 results of {rows.length} rows</div>
    </div>
  )
}

export default Receiving