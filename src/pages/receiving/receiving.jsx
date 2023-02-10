import React, { useState, useMemo, useEffect, Fragment } from 'react'
import './receiving.scss'
import ModalReceive from '../../components/modalReceive/modalReceive'
import { transCollectionRef }
      from '../../services/trans.services'
import { onSnapshot, 
         query 
        } from 'firebase/firestore'
import {  useTable,
          useFilters,
          useExpanded,
          usePagination, 
          useSortBy} from 'react-table'
import { Filter,
         DefaultColumnFilter,
         DateRangeColumnFilter,
         dateBetweenFilterFn } from '../../services/react-table.services'

const Receiving = ({renderRowSubComponent}) => {
  const [ product, setProduct ] = useState([]);
  const [ quantity, setQuantity ] = useState(0);
  const [ select, setSelect ] = useState("")
  const [ trans, setTrans ] = useState([]);
  const [modalState, setmodalState] = useState(false)

  const data = useMemo(() => 
            [...trans], [trans]);

  const columns = useMemo(
      () => [
        {id: 'timestamp',
          Header: 'Date',
        accessor: e => e.timestamp.toDate().toLocaleDateString(
                    {  
                     year:"numeric", 
                     month:"numeric", 
                     day:"numeric"}),
        Filter: DateRangeColumnFilter,
        filter: dateBetweenFilterFn,
        },
        {Header: 'Product',
        accessor: 'product'},
        {Header: 'Quantity',
        accessor: 'quantity'},
        {Header: "Action",
        accessor: 'action'}
      ],
      []);

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
                                      sortBy: [{ id: 'timestamp',
                                                  desc: true }] }
                      },
                        useFilters,
                        useSortBy,
                        useExpanded,
                        usePagination
                       );

   function openModal() {
        setmodalState(!modalState)
   };


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
      <button onClick={() => openModal()}> New Transaction </button>
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
      <ModalReceive toggle={modalState}
                    action={openModal}
                    product={product}
                    setProduct={setProduct}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    select={select}
                    setSelect={setSelect}
           />
    </div>
  )
}

export default Receiving