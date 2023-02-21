import React, {useCallback, useEffect} from 'react'
import commSellerDataService from '../../services/firebase.services'
import areaDataService,
       {areaCollectionRef} from '../../services/area.services'
import supervisorDataService, 
      { supervisorCollectionRef } from '../../services/supervisor.services'
import sellerTypeDataService, 
      {sellerTypeCollectionRef} from '../../services/sellerType.services'
import { onSnapshot, query,} from 'firebase/firestore'
import './modalAdd.scss'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { async } from '@firebase/util'


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
                    

  const handleAdd = async (e) => {
    e.preventDefault()
    if (firstName === "" || lastName === "") {
      alert("All fields are mandatory!");
      return;
    }
    /*
    const newCommSeller ={firstName, lastName}
    console.log(newCommSeller);
    */
    try {
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
                <option key={area.id} value={area.id}>
                    {area.type}
                </option>
              ))}
            </select>
          </label>
          
          
          <label className='inputmodalAdd'>Last Name:{" "}
              <input 
              onChange={(event) => {setLastName(event.target.value)}}
              type="text"
              size='12'
               />    
          </label>
        <label className='inputmodalAdd'>First Name:{" "}
            <input 
              onChange={(event) => {setFirstName(event.target.value)}}
              type="text"
              size='12'
               />    
          </label>

          <label className='inputmodalAdd'>Birth Date:{" "}
          <DatePicker 
              selected={recStartDate}
              onChange={(date) => setRecStartDate(date)}
              dateFormat="MM/dd/yyyy" 
              placeholderText='Enter Date'
              /> 
          </label>

          <label className='inputmodalAdd'>Address:{" "}
            <input 
              onChange={(event) => {setAddress(event.target.value)}}
              type="text"
              size='12'
               />    
          </label>

          <label className='inputmodalAdd'>Contact Number:{" "}
            <input 
              onChange={(event) => {setContact(event.target.value)}}
              type="text"
              size='12'
               />    
          </label>

          <label className='inputmodalAdd'>Area:{" "}
            <select value={selectArea} onChange={(e) => setSelectArea(e.target.value)}>
              {area.map((area) => (
                <option key={area.id} value={area.id}>
                    {area.location}
                </option>
              ))}
            </select>
          </label>
          
          <label className='inputmodalAdd'>Supervisor:{" "}
            <select value={selectSupervisor} onChange={(e) => setSelectSupervisor(e.target.value)}>
                {supervisor.map((supervisor) => (
                  <option key={supervisor.id} value={supervisor.id}>
                      {`${supervisor.firstName} ${supervisor.lastName}`}
                  </option>
                ))}
              </select>
          </label>
          
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