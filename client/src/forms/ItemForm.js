import React, { useState, useEffect } from 'react'


const ItemForm = (props) => {
	
	const [item, setItem] = useState(props.currentItem)

	const handleInputChange = (event) => {
	    const { name, value } = event.target
	    setItem({ ...item, [name]: value })
	}
	
	useEffect(() => {
	    setItem(props.currentItem)
	  }, [props])
	
  return (
    <form id="itemForm" onSubmit={(event) => {
        event.preventDefault()
        if (!item.itemCd || !item.itemName || !item.itemDescription || !item.itemCategory) return

        if(props.editing){
            props.updateItem(item)
        }else{
            props.addItem(item)
        }
      }}>
    
      <label>Item Code</label>
      <input type="text" id="itemCd" name="itemCd" value={item.itemCd} readOnly={props.editing} onChange={handleInputChange}/>
      <label>Item Name</label>
      <input type="text" id="itemName" name="itemName" value={item.itemName} readOnly={props.editing} onChange={handleInputChange}/>
      <label>Item Description</label>
      <input type="text" id="itemDescription" name="itemDescription" value={item.itemDescription} readOnly={props.editing} onChange={handleInputChange}/>
      <label>Item Category</label>
      <select id="itemCategory" name="itemCategory" value={item.itemCategory} onChange={handleInputChange}>
      	 <option value='' >Please Select</option>
         {props.categoryList.map(({ itemCategory }, index) =>
         	<option key={itemCategory}  value={itemCategory} >{itemCategory}</option>)}
      </select>
      <button id="submitButton">{props.editing? 'Update Item Category' : 'Add Item'}</button>
      {props.editing ? (
          <button
          onClick={() => props.setEditing(false)}
          className="button muted-button">
          Cancel
      </button>
      ):null}
    </form>
  )
}

export default ItemForm