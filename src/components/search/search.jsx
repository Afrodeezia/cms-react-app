import React from 'react'

import './search.scss'

const Search = ({search, setSearch}) => {
  return (
    <div className='search-container'>

      <input className='search' 
              type='search'
              value={search}
              placeholder='search employee'
              onChange={e => setSearch(e.target.value)}
              />

    </div>
    
  )
  
}



export default Search