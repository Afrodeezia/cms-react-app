import React, { 
                useState, 
                useMemo 
              } from "react";
import { useTable,
         useGlobalFilter,
         useSortBy,
          } from 'react-table'
import ModalEdit from "../modalEditEmp/modalEdit";
import TableComm from "../tableComm/TableComm";
import FilterComm from "../filterComm/FilterComm";


import "./tablelist.scss";

const Tablelist = ({
  commSellerTable,
  setCommSellerTable,
  firstName,
  lastName,
  setFirstName,
  setLastName,
}) => {
  
  const data = useMemo(() => 
            [...commSellerTable], 
            [commSellerTable]
                      );

  const columns = useMemo(
    () => [
      {Header: "Last Name",
       accessor: "lname",},
      {Header: "First Name",
       accessor: "fname",},
      {Header: "Total Sales",
       accessor: "total_sales",},
      {Header: "Total Efund",
       accessor: "Efund",},
      {Header: "Action",
       accessor: "action",
       disableSortBy: true},
    ],
    []
  );

  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter, 
  } = useTable({ columns, 
                 data, 
                },
                 useGlobalFilter,
                 useSortBy,
              )


  const [modalEditState, 
         setModalEditState
        ] = useState(false);
  const [currentId, 
         setCurrentId
        ] = useState("");

  function openEditModal(id) {
    setModalEditState(!modalEditState);
    setCurrentId(id);
  }

  function closeEditModal(e) {
    e.preventDefault();
    setModalEditState(!modalEditState);
  }

  function submitEditModal() {
    setModalEditState(!modalEditState);
  }

  return (
    <div className="cardlist-container">
      <FilterComm
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter} 
        globalFilter={state.globalFilter}
      />
      <TableComm 
        columns={columns}
        data={data}
        action={openEditModal}
        setCommSellerTable={setCommSellerTable}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow} 
      />
      <ModalEdit
        toggle={modalEditState}
        action={closeEditModal}
        action1={submitEditModal}
        modalFirstName={firstName}
        modalLastName={lastName}
        setModalFirstName={setFirstName}
        setModalLastName={setLastName}
        id={currentId}
      />
    </div>
  );
};

export default Tablelist;
