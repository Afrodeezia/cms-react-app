import React, { 
                useState, 
                useMemo 
              } from "react";

import ModalEdit from "../modalEditEmp/modalEdit";
import TableComm from "../tableComm/TableComm";

import { SelectColumnFilter, } from "../../services/react-table.services";


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
  sellerType,
  setSellerType,
}) => {
  
  const data = useMemo(() => 
            [...commSellerTable], 
            [commSellerTable]
                      );

  const columns = useMemo(
    () => [
      {Header: "Name",
       accessor: d => `${d.fname} ${d.lname}`},
       {Header: "Type",
       accessor: "type",
       Filter: SelectColumnFilter,
       filter: 'includes',},
      {Header: "Contact #",
       accessor: "contactNo",
       disableFilters: true},
      {Header: "Area",
       accessor: "area",
       disableFilters: true},
      {Header: "Supervisor",
       accessor: "supervisor",
       disableFilters: true},
      {Header: "Action",
       accessor: "action",
       disableSortBy: true,
       disableFilters: true},
    ],
    []
  );


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
      
      <TableComm 
        columns={columns}
        data={data}
        action={openEditModal}
        setCommSellerTable={setCommSellerTable}
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
        sellerType={sellerType}
        setSellerType={setSellerType}
        id={currentId}
      />
    </div>
  );
};

export default Tablelist;
