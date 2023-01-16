import React, {useEffect, useState} from 'react'
import { onSnapshot, collection, query } from 'firebase/firestore'
import {db} from '../../firebase/firebase'
import ModalEdit from '../modalEditEmp/modalEdit'
import commSellerDataService,
       { commSellerCollectionRef }
        from '../../services/firebase.services'


import './tablelist.scss'



const Tablelist = ({ commSellerTable,
                     setCommSellerTable,
                     searchFilter,
                     firstName,
                     lastName,
                     setFirstName,
                     setLastName }) => {

      const [modalEditState, setModalEditState] = useState(false)
      const [currentId, setCurrentId] = useState("")


      

      function openEditModal(id) {
        setModalEditState(!modalEditState)
        setCurrentId(id)
      }

      function closeEditModal(e) {
        e.preventDefault()
        setModalEditState(!modalEditState)
      }

      function submitEditModal() {
        setModalEditState(!modalEditState)
      }

      const deleteHandler = async (id) => {
        await commSellerDataService.deleteCommSeller(id)
      }
     
      useEffect(()=>{
        const q = query(commSellerCollectionRef)
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let commSellerArr = []
          querySnapshot.forEach((doc) => {
            commSellerArr.push({...doc.data(), id: doc.id})
          });
          setCommSellerTable(commSellerArr)
        })
          return () => unsubscribe()
      }, [])
      
                      
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
            <button onClick={() => openEditModal(comm.id)}>update</button>
            <button onClick={() => deleteHandler(comm.id)}>delete</button>
            </td>  
          </tr>
          
          ))}
        </tbody>
      </table>
        <ModalEdit 
          toggle={modalEditState}
          action={closeEditModal}
          action1={submitEditModal}
          modalFirstName={firstName}
          modalLastName={lastName}
          setModalFirstName={setFirstName}
          setModalLastName={setLastName}
          modalCommSellerTable={commSellerTable}
          setModalCommSellerTable={setCommSellerTable}
          id={currentId}
          setId={setCurrentId}
           />
          
    </div>
  )
}

                     
export default Tablelist 

