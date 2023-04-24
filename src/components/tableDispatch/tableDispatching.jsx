import React, {useEffect, Fragment} from 'react'
import {onSnapshot, query} from 'firebase/firestore'
import {  useTable,
          useFilters,
          useExpanded,
          usePagination, 
          useSortBy} from 'react-table'
import { Filter, DefaultColumnFilter } from '../../services/react-table.services'
import dispatchDataService, {dispatchCollectionRef} from '../../services/dispatch.services'
import './tableDispatching.scss'


const TableDispatching = ({data, 
                          columns, 
                          setDispatch, 
                          renderRowSubComponent,
                          open,
                          }) => {

const deleteHandler = async (id) => {
    await dispatchDataService.deleteDispatch(id)
  };

const { getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        visibleColumns,
        canPreviousPage,
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
    const q = query(dispatchCollectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let dispatchArr = [];
      querySnapshot.forEach((doc) => {
        dispatchArr.push({...doc.data(), id: doc.id})
      });
      setDispatch(dispatchArr)
    });
    return () => unsubscribe();
  }, [setDispatch])

    return (
      <div>
        <table className='dispatching' {...getTableProps()}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th className='dispatchingTableHead'
                 {...column.getHeaderProps()}>
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
            <tr className='dispatchingTableRow'>
               {row.cells.map((cell) => {
                if (cell.column.Header === "Action") {
                    return (
                      <td {...cell.getCellProps()}>
                        <button onClick={() => 
                            deleteHandler(cell.row.original.id)}>
                          delete
                        </button>
                      </td>
                    );
                  }
                 return (
                   <td className='dispatchingTableData'
                     {...cell.getCellProps()}>
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

      <div className='dispatchingTablePagi'>
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
          <div className='disPagi' md={2}>
            Page{" "}
            <strong>
              { pageIndex + 1 } of { pageOptions.length }
            </strong>
          </div>
          <div className='disPagi' md={2}>
            <input
              type='number'
              min={1}
              style={{ width: 70 }}
              max={ pageOptions.length }
              defaultValue={ pageIndex + 1 }
              onChange={ onChangeInInput }>
            </input>
          </div>
          <div className='disPagi' md={2}>
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

export default TableDispatching