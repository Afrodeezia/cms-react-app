import React, { useEffect, Fragment } from 'react'
import { onSnapshot, query } from "firebase/firestore";
import {  useTable,
  useFilters,
  useExpanded,
  usePagination, 
  useSortBy} from 'react-table'
import commSellerDataService,
       { commSellerCollectionRef, }
   from '../../services/firebase.services'

import { Filter, SelectColumnFilter, DefaultColumnFilter } from "../../services/react-table.services";

const TableComm = ({data,
                    columns,
                    action,
                    setCommSellerTable,
                    renderRowSubComponent,
                     }) => {

  const deleteHandler = async (id) => {
    await commSellerDataService.deleteCommSeller(id)
  };

  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    visibleColumns,
    canPreviousPage,
    rows,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize}
        } = useTable({columns,
                      data,
                      defaultColumn: { Filter: DefaultColumnFilter }, 
                      initialState: { pageIndex: 0, 
                                      pageSize: 10,
                                      sortBy: [{ id: 'date',
                                                 desc: true }] }
                      },
                      useFilters,
                      useSortBy,
                      useExpanded,
                      usePagination
                      );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) -1 : 0;
    gotoPage(page);
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
               <div {...column.getSortByToggleProps()}>
                  {column.render('Header')}
                  {generateSortingIndicator(column)}
               </div>
                 <Filter column={column} />
               </th>
             ))}
           </tr>
         ))}
       </thead>


       <tbody {...getTableBodyProps()}>
         {page.map(row => {
           prepareRow(row)
           return (
            <Fragment key={row.getRowProps().key}>
            <tr>
               {row.cells.map((cell) => {
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
                 );
               })}
             </tr>
             {row.isExpanded && (
              <tr>
              <td colSpan={visibleColumns.length}>
                  {renderRowSubComponent(row)}
              </td>
              </tr>
             )}
            </Fragment>
             );
             })}
        </tbody>
      </table>

      <div style={{ 
                maxWidth: 1000, 
                margin: "0 auto", 
                textAlign: "center",
                display: 'flex',
                justifyContent: 'center' 
                }}>
          <div md={3}>
            <button 
              type='button'
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              >
              {"<<"}
            </button>
            &nbsp;
            <button
              type='button'
              onClick={previousPage}
              disabled={!canPreviousPage}
              >
              {"<"}
            </button>
          </div>
          <div md={2} style={{ marginTop: 7 }}>
            Page{" "}
            <strong>
              { pageIndex + 1 } of { pageOptions.length }
            </strong>
          </div>
          <div md={2}>
            <input
              type='number'
              min={1}
              style={{ width: 70 }}
              max={ pageOptions.length }
              defaultValue={ pageIndex + 1 }
              onChange={ onChangeInInput }>
            </input>
          </div>
          <div md={2}>
            <select
              value={pageSize}
              onChange={onChangeInSelect}
              >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div md={3}>
            <button
              type='button'
              onClick={nextPage}
              disabled={!canNextPage}
              >
                {">"}
              </button>
              &nbsp;
              <button
                type='button'
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                >
                {">>"}
              </button>
          </div>
      </div>
      </div>
  )
}

export default TableComm