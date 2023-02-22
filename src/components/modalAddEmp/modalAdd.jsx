import React, {useCallback, useEffect, useState} from 'react'
import commSellerDataService from '../../services/firebase.services'
import areaDataService,
       {areaCollectionRef} from '../../services/area.services'
import supervisorDataService, 
      { supervisorCollectionRef } from '../../services/supervisor.services'
import sellerTypeDataService, 
      {sellerTypeCollectionRef} from '../../services/sellerType.services'
import { onSnapshot, query,} from 'firebase/firestore'
import './modalAdd.scss'

import "react-datepicker/dist/react-datepicker.css";
import  AddIBP from '../../components/addIBP/addIBP'
import AddGT from '../addGT/addGT'



const ModalAdd = ({
              toggle, 
              action,
              firstName,
              lastName,
              setFirstName,
              setLastName,
              newEfund,
              outBalance,
              address,
              setAddress,
              area,
              setArea,
              contact,
              setContact,
              supervisor,
              setSupervisor,
              recStartDate,
              setRecStartDate,
              selectArea,
              setSelectArea,
              selectSupervisor,
              setSelectSupervisor,
              sellerType,
              setSellerType,
              selectSellerType,
              setSelectSellerType            
                      }) => {  
                        
  const [ibpContentVisible, setIbpContentVisible] = useState(false);
  const [gtContentVisible, setGtContentVisible] = useState(false);
                  

  const handleAdd = async (e) => {
    e.preventDefault()
    if (firstName === "" || lastName === "") {
      alert("All fields are mandatory!");
      return;
    } try {
      const areaSnap = await areaDataService.getAllArea(selectArea)
      const supervisorSnap = await supervisorDataService.getAllSupervisor(selectSupervisor)
      const sellerTypeSnap = await sellerTypeDataService.getAllSellerType(selectSellerType)
      await commSellerDataService.addCommSeller(
        { fname: firstName, 
          lname: lastName,
          birthDate: recStartDate,
          Address: address,
          contactNo: contact,
          outBalance: outBalance,
          supervisor: (`${supervisorSnap.data().firstName} 
                        ${supervisorSnap.data().lastName}`),
          area: areaSnap.data().location,
          type: sellerTypeSnap.data().type,
          efund: newEfund,
        });
        alert("added successfully"); 
    } catch (err) {
      alert(err.message)
    }
    action();
    e.target.reset()
  }

  const handleAreaSnap = useCallback(
    async () => {
      try {
        const q = query(areaCollectionRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let areaArr = [];
          querySnapshot.forEach((doc) => {
            setSelectArea(doc.id)
            areaArr.push({...doc.data(), id: doc.id});
          });
          setArea(areaArr)
        });
        return () => unsubscribe();
      } catch (err) {
        alert(err.message);
      }
    },
    [setArea, setSelectArea]
  );

  const handleSupervisorSnap = useCallback(
    async () => {
      try {
        const q = query(supervisorCollectionRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let supervisorArr = [];
          querySnapshot.forEach((doc) => {
            setSelectSupervisor(doc.id)
            supervisorArr.push({...doc.data(), id: doc.id});
          });
          setSupervisor(supervisorArr)
        });
        return () => unsubscribe();
      } catch (err) {
        alert(err.message);
      }
    },
    [setSupervisor, setSelectSupervisor]
  );

  const handleSellerTypeSnap = useCallback(
    async () => {
      try {
        const q = query(sellerTypeCollectionRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let typeArr = [];
          querySnapshot.forEach((doc) => {
            setSelectSellerType(doc.id)
            typeArr.push({...doc.data(), id: doc.id});
          });
          setSellerType(typeArr)
        });
        return () => unsubscribe();
      } catch (err) {
        alert(err.message)
      }
    },
    [setSellerType, setSelectSellerType]
  );



  useEffect(() => {
      handleAreaSnap();
      handleSupervisorSnap();
      handleSellerTypeSnap();
      
  }, [handleAreaSnap, handleSupervisorSnap, handleSellerTypeSnap]);
    
  useEffect(() => {
    selectSellerType === "IBP" ? setIbpContentVisible(true) : setIbpContentVisible(false)
    selectSellerType === "GT" ? setGtContentVisible(true) : setGtContentVisible(false)
  }, [selectSellerType])

  return (
    <div className={`modalAdd-container 
    ${toggle ? `active` : ''}`}>
      
        <form className='modalAdd-form' onSubmit={handleAdd} >
        <div className='modalAdd-close' onClick={action}>
          </div>
          <div className='inputmodalAdd-container'>

          <label className='inputmodalAdd'>Type:{" "}
            <select value={selectSellerType} onChange={(e) => setSelectSellerType(e.target.value)}>
              {sellerType.map((area) => (
                <option key={area.id} value={area.type} >
                    {area.type}
                </option>
              ))}
            </select>
          </label>
          
          
          {ibpContentVisible && <AddIBP 
                                  toggle={toggle} 
                                  action={action}
                                  firstName={firstName}
                                  lastName={lastName}
                                  setFirstName={setFirstName}
                                  setLastName={setLastName}
                                  newEfund={newEfund}
                                  outBalance={outBalance}
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
                                  selectArea={selectArea}
                                  setSelectArea={setSelectArea}
                                  selectSupervisor={selectSupervisor}
                                  setSelectSupervisor={setSelectSupervisor}
                                  sellerType={sellerType}
                                  setSellerType={setSellerType}
                                  selectSellerType={selectSellerType}
                                  setSelectSellerType={setSelectSellerType} 
                                />
          }

          {gtContentVisible && <AddGT 
                                  toggle={toggle} 
                                  action={action}
                                  firstName={firstName}
                                  lastName={lastName}
                                  setFirstName={setFirstName}
                                  setLastName={setLastName}
                                  newEfund={newEfund}
                                  outBalance={outBalance}
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
                                  selectArea={selectArea}
                                  setSelectArea={setSelectArea}
                                  selectSupervisor={selectSupervisor}
                                  setSelectSupervisor={setSelectSupervisor}
                                  sellerType={sellerType}
                                  setSellerType={setSellerType}
                                  selectSellerType={selectSellerType}
                                  setSelectSellerType={setSelectSellerType} 
                                />
          }
          
          </div>
          <div className='modalAdd-buttons'>
          <button className='modalAdd-but'type='submit'>Enter</button>
          <button className='modalAdd-but' onClick={action}>Cancel</button>
          </div>
        </form>
       
      </div>
  )
}


export default ModalAdd