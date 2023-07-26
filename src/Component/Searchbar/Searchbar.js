import React from 'react'
import "./style.css"
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  return (
    <div>
      <div className="search-wrpper">
        <div className="search-icon">
           <FiSearch size={30} />
        </div>
        <div className="search-input">
            <input type="text" placeholder='Search here...' />
        </div>
      </div>
    </div>
  )
}

export default Searchbar
