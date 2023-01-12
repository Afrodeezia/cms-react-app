import { onSnapshot, collection } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { db }   from '../../firebase/firebase'
import ModalEdit from '../modalEditEmp/modalEdit'

import './tablelist.scss'



const Tablelist = ({ commSellerTable,
                     setCommSellerTable,
                     searchFilter,
                     firstName,
                     lastName,
                     setFirstName,
                     setLastName }) => {

      const [modalEditState, setModalEditState] = useState(false)

      function openEditModal() {
        setModalEditState(!modalEditState)
      }

      const handleEdit = async (id) => {
        console.log(id)
      }

      useEffect(
        () =>
          onSnapshot(collection(db, "commSeller"), (snapshot) => 
            setCommSellerTable(snapshot.docs.map((doc) => 
            ({...doc.data(), id: doc.id})))
        ), [] );

                      
  return (
    <div className='cardlist-container'>
      <table>
        <thead>
          <tr>
            <th><button className='tabBut' 
                type='button'
                
                >
                Last Name
            </button></th>
            <th>First Name</th>
            <th><button className='tabBut' 
                type='button' 
                
                >
                Total Sales
            </button></th>
            <th><button className='tabBut'
                type='button' 
                >
                  Total Efund
            </button></th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {commSellerTable
          .filter(comm => comm.fname
          .match(new RegExp(searchFilter, "i")))
          .map(comm =>  (
          <tr key={comm.id}>
            <td>{comm.lname}</td>
            <td>{comm.fname}</td>
            <td>{comm.totalSold}</td>
            <td>{comm.Efund}</td>
            <td>
            <button onClick={() => handleEdit(comm.id)}>update</button>
            <button>delete</button>
            </td>  
          </tr>
          ))}
        </tbody>
      </table>
        <ModalEdit 
          toggle={modalEditState}
          action={openEditModal}
          modalFirstName={firstName}
          modalLastName={lastName}
          setModalFirstName={setFirstName}
          setModalLastName={setLastName} />
    </div>
  )
}

                     
export default Tablelist 

