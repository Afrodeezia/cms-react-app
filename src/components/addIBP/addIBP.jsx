import React from 'react'
import './addIBP.scss'

import DatePicker from 'react-datepicker'

const AddIBP = ({
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
  return (
    <div>
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
  )
}

export default AddIBP