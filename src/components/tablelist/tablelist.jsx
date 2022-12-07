import { getDocs } from 'firebase/firestore'
import React, {useEffect} from 'react'


import './tablelist.scss'



const Tablelist = ({ commSellerTable,
                     setCommSellerTable,
                     dbTable, 
                     searchFilter, 
                     handleSort
                  }) => {

      useEffect(() => {
        const getCommSeller = async () => {
          const data = await getDocs(dbTable);
          setCommSellerTable(data.docs.map((doc) =>
           ({ ...doc.data(), id: doc.id})));
        };
        getCommSeller()
      }, [])

      let comm = [...commSellerTable]

  return (
    <div className='cardlist-container'>
      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
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
          </tr>
        </thead>
        <tbody>
          {comm
          .filter(comm => comm.fname
          .match(new RegExp(searchFilter, "i")))
          .map(comm =>  (
          <tr key={comm.id}>
            <td>{comm.lname}</td>
            <td>{comm.fname}</td>
            <td>{comm.totalSold}</td>
            <td>{comm.Efund}</td>
            <td>{comm.contactNo}</td>
            
            
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tablelist