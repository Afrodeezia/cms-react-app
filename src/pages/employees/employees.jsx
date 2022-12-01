import React, {useState, useEffect} from 'react'
import { db } from '../../firebase/firebase'
import { collection,
         getDocs,
         doc,
          } from 'firebase/firestore'
import Tablelist from '../../components/tablelist/tablelist'
import Search from '../../components/search/search';


import { EmpData } from '../../data/empdata';


import './employees.scss'

const Employees = () => {

  const [commSeller, setCommSeller] = useState([]);
  const commSellerCollectionRef = collection(db, "commSeller")
  const [searchValue, setSearchValue] = useState('')
  const [sortedField, setSortedField] = useState('')

    const requestSort = key => {
      let direction = 'ascending';

      if (sortedField.key === key && sortedField.direction === 'ascending') {
        direction = 'descending';
      }
      setSortedField({key, direction});
    }


    //this function sorts the table alphabetically.
  /* let sortedEmp = [commSeller]
  sortedEmp.sort((a, b) => { 

    if (a[sortedField.id] < b[sortedField.id]) {
      return sortedField.direction === 'ascending' ? -1 : 1;
    }

    if (a[sortedField.id] > b[sortedField.id]) {
      return sortedField.direction === 'ascending' ? 1 : -1;
    }
      return 0;
  }); */
 
  
  return (
    <div className='employees'>
      <Search 
          search={searchValue} 
          setSearch={setSearchValue} 
          />
      <Tablelist 
          commSellerTable={commSeller}
          setCommSellerTable={setCommSeller}
          dbTable={commSellerCollectionRef}
          searchFilter={searchValue} 
          handleSort={requestSort}
          />
    </div>
  )
}

export default Employees