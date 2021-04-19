import React, { useState, useEffect } from 'react'


const SearchForm = (props) => {
    const [itemCategory, setItemCategory] = useState(props.currentItemCategory)
    const handleInputChange = (event) => {
	const {  value } = event.target
	  setItemCategory(value)
	}
	
    useEffect(() => {
	setItemCategory(props.currentItemCategory)
	  }, [props])
	
  return (
    <form id="searchForm">
    
      <label>Item Category</label>
      <select id="searchCategory" data-testid="select" name="itemCategory" value={itemCategory} onChange={handleInputChange}>
      	 <option  data-testid="select-option" value='' key='-1' >Please Select</option>
         {props.categoryList.map(({ itemCategory }, index) =>
         	<option  data-testid="select-option" key={index}  value={itemCategory} >{itemCategory}</option>)}
      </select>
     
          <button  id="searchCategoryButton"  type="button"
          onClick={() => props.searchItemsByCategory(itemCategory)}
          className="button muted-button" disabled={itemCategory === ''}>
          Search
      </button>
    </form>
  )
}

export default SearchForm