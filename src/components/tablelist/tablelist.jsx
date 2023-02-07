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
  newEfund,
  setNewEfund,
  outBalance,
  setOutBalance,
  address,
  setAddress,
  area,
  setArea,
  contact,
  setContact,
  supervisor,
  setSupervisor,
  recStartDate,
  setRecStartDate
}) => {
  
  const data = useMemo(() => 
            [...commSellerTable], 
            [commSellerTable]
                      );

  const columns = useMemo(
    () => [
      {Header: "Name",
       accessor: d => `${d.fname} ${d.lname}`},
      {Header: "Contact #",
       accessor: "contactNo",},
      {Header: "Area",
       accessor: "area",},
      {Header: "Supervisor",
       accessor: "supervisor",},
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
        newEfund={newEfund}
        setNewEfund={setNewEfund}
        outBalance={outBalance}
        setOutBalance={setOutBalance}
        address={address}
        setAddress={setAddress}
        area={area}
        setArea={setArea}
        contact={contact}
        setContact={setContact}
        supervisor={supervisor}
        setSupervisor={setSupervisor}
        recStartDate={recStartDate}
        setRecStartDate={setRecStartDate}
        id={currentId}
      />
    </div>
  );
};

export default Tablelist;
