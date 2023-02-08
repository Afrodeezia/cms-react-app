import React, { useEffect, useCallback, useState } from "react";
import "./modalEdit.scss";
import commSellerDataService from "../../services/firebase.services";
import { areaCollectionRef } from "../../services/area.services";
import { supervisorCollectionRef } from "../../services/supervisor.services";
import { onSnapshot, query,} from 'firebase/firestore'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const ModalEdit = ({
  toggle,
  action,
  action1,
  modalFirstName,
  modalLastName,
  setModalFirstName,
  setModalLastName,
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
  selectArea,
  setSelectArea,
  selectSupervisor,
  setSelectSupervisor,
  id,
}) => {

  const [commArea, setCommArea] = useState("")
  const [commSuper, setCommSuper] = useState("")
  const [date, setDate] = useState("")
  
  

  const handlePopulate = useCallback(
    async () => {
      try {
        const docSnap = await commSellerDataService.getAllCommSeller(id);
        console.log(docSnap.data());
        setModalLastName(docSnap.data().lname);
        setModalFirstName(docSnap.data().fname);
        setNewEfund(docSnap.data().efund);
        setOutBalance(docSnap.data().outBalance);
        setAddress(docSnap.data().Address);
        setCommArea(docSnap.data().area);
        setContact(docSnap.data().contactNo);
        setCommSuper(docSnap.data().supervisor);
        setDate(docSnap.data().birthDate.toDate());
      } catch (err) {
        alert(err.message);
      }
    },
    [ id, 
      setModalFirstName, 
      setModalLastName, 
      setNewEfund, 
      setOutBalance, 
      setAddress, 
      setCommArea, 
      setContact, 
      setCommSuper, 
      setDate
    ]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await commSellerDataService.updateCommSeller(id, {
      lname: modalLastName,
      fname: modalFirstName,
      efund: newEfund,
      outBalance: outBalance,
      Address: address,
      area: commArea,
      contactNo: contact,
      supervisor: commSuper,
      birthDate: date,
    });
    alert("Updated Successfully");
    action1();
  };

  const handleAreaSnap = useCallback(
    async () => {
      try {
        const q = query(areaCollectionRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let areaArr = [];
          querySnapshot.forEach((doc) => {
            areaArr.push({...doc.data(), id: doc.id});
          });
          setArea(areaArr)
        });
        return () => unsubscribe();
      } catch (err) {
        alert(err.message);
      }
    },
    [setArea]
  );

  const handleSupervisorSnap = useCallback(
    async () => {
      try {
        const q = query(supervisorCollectionRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let supervisorArr = [];
          querySnapshot.forEach((doc) => {
            supervisorArr.push({...doc.data(), id: doc.id});
          });
          setSupervisor(supervisorArr)
        });
        return () => unsubscribe();
      } catch (err) {
        alert(err.message);
      }
    },
    [setSupervisor]
  );

  useEffect(() => {
    if (id !== undefined && id !== "") {
      handlePopulate();
      handleAreaSnap();
      handleSupervisorSnap();
    }
  }, [id, handlePopulate, handleAreaSnap, handleSupervisorSnap]);

  

  return (
    <div
      className={`modalAdd-container
    ${toggle ? `active` : ""}`}
    >
      <form className="modalAdd-form" onSubmit={handleSubmit}>
        <div className="modalAdd-close" onClick={action}></div>

        <div className="inputmodalAdd-container">
          <label className="inputmodalAdd">
            Last Name:{" "}
            <input
              onChange={(event) => {
                setModalLastName(event.target.value);
              }}
              value={modalLastName}
              type="text"
              size="12"
              autoFocus
            />
          </label>

          <label className="inputmodalAdd">
            First Name:{" "}
            <input
              onChange={(event) => {
                setModalFirstName(event.target.value);
              }}
              value={modalFirstName}
              type="text"
              size="12"
            />
          </label>

          <label className='inputmodalAdd'>Birth Date:{" "}
          <DatePicker 
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="MM/dd/yyyy" 
              /> 
          </label>

          <label className='inputmodalAdd'>Address:{" "}
            <input 
              onChange={(event) => {setAddress(event.target.value)}}
              value={address}
              type="text"
              size='12'
               />    
          </label>

          <label className='inputmodalAdd'>Contact Number:{" "}
            <input 
              onChange={(event) => {setContact(event.target.value)}}
              value={contact}
              type="text"
              size='12'
               />    
          </label>

          <label className='inputmodalAdd'>Area:{" "}
            <select value={commArea} onChange={(e) => setCommArea(e.target.value)}>
              {area.map((area) => (
                <option key={area.id} value={area.location}>
                    {area.location}
                </option>
              ))}
            </select>
          </label>
          
          <label className='inputmodalAdd'>Supervisor:{" "}
            <select value={commSuper} onChange={(e) => setCommSuper(e.target.value)}>
                {supervisor.map((supervisor) => (
                  <option key={supervisor.id} value={`${supervisor.firstName} ${supervisor.lastName}`}>
                      {`${supervisor.firstName} ${supervisor.lastName}`}
                  </option>
                ))}
              </select>
          </label>
          
        </div>
        <div className="modalAdd-buttons">
          <button className="modalAdd-but" type="submit">
            update
          </button>
          <button className="modalAdd-but" onClick={action}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEdit;
