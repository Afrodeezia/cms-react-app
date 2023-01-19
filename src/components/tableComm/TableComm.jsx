import React, { useEffect } from 'react'
import { onSnapshot, query } from "firebase/firestore";
import commSellerDataService,
       { commSellerCollectionRef, }
   from '../../services/firebase.services'

const TableComm = ({
                    action,
                    setCommSellerTable,
                    getTableProps,
                    getTableBodyProps,
                    headerGroups,
                    rows,
                    prepareRow }) => {

  const deleteHandler = async (id) => {
    await commSellerDataService.deleteCommSeller(id)
  };

  useEffect(() => {
    const q = query(commSellerCollectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let commSellerArr = [];
      querySnapshot.forEach((doc) => {
        commSellerArr.push({...doc.data(), id: doc.id})
      });
      setCommSellerTable(commSellerArr)
    });
    return () => unsubscribe();
  }, [setCommSellerTable]);

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
                  console.log("cell", cell);

                  if (cell.column.Header === "Action") {
                    return (
                      <td {...cell.getCellProps()}>
                        <button onClick={() => 
                            action(cell.row.original.id)}>
                          update
                        </button>
                        <button onClick={() => 
                            deleteHandler(cell.row.original.id)}>
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

export default TableComm