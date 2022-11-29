import React from 'react'

import './tablelist.scss'



const Tablelist = ({empcard, searchFilter, handleSort}) => {

  return (
    <div className='cardlist-container'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th><button className='tabBut' 
                type='button' 
                onClick={() => handleSort('Sales')}>
                Total Sales
            </button></th>
            <th><button className='tabBut'
                type='button' 
                onClick={() => handleSort('totalEfund')}>
                  Total Efund
            </button></th>
            <th>Contact #</th>
            <th>Area</th>
          </tr>
        </thead>
        <tbody>
          {empcard
          .filter(empcard => empcard.name
          .match(new RegExp(searchFilter, "i")))
          .map(empcard =>  (
          <tr key={empcard.id}>
            <td>{empcard.name}</td>
            <td>{empcard.Sales}</td>
            <td>{empcard.totalEfund}</td>
            <td>{empcard.contactNo}</td>
            <td>{empcard.Area}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tablelist