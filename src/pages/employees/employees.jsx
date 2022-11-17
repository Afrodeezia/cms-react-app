import React, {useState} from 'react'
import Tablelist from '../../components/tablelist/tablelist'
import Search from '../../components/search/search';


import { EmpData } from '../../data/empdata';


import './employees.scss'

const Employees = () => {

  const [emp] = useState(EmpData);
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
  let sortedEmp = [...emp]
  sortedEmp.sort((a, b) => { 

    if (a[sortedField.key] < b[sortedField.key]) {
      return sortedField.direction === 'ascending' ? -1 : 1;
    }

    if (a[sortedField.key] > b[sortedField.key]) {
      return sortedField.direction === 'ascending' ? 1 : -1;
    }
      return 0;
  });
  
  
  
  return (
    <div className='employees'>
      <Search 
          search={searchValue} 
          setSearch={setSearchValue} 
          />
      <Tablelist 
          empcard={sortedEmp} 
          searchFilter={searchValue} 
          handleSort={requestSort}
          />
    </div>
  )
}

export default Employees