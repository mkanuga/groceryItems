import React from 'react'

const GroceryTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Item Code</th>
        <th>Item Name</th>
        <th>Item Description</th>
        <th>Item Category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      
    {props.data.length > 0 ? (
       props.data.map((item) => (
	     <tr key={item.itemCd}>
	        <td>{item.itemCd}</td>
	        <td>{item.itemName}</td>
	        <td>{item.itemDescription}</td>
	        <td>{item.itemCategory}</td>
	        <td>
	          <button id="editButton" onClick={() => {
	        	    props.editRow(item)
	          }} className="button muted-button">Edit Category</button>
	          <button id="deleteButton"  onClick={() => 
	          	props.deleteItem(item.itemCd)} 
	          	className="button muted-button">Delete</button>
	        </td>
	      </tr>
        ))):(
             <tr>
                <td colSpan={3}>No items to view</td>
              </tr>
            )}
        
      
    </tbody>
  </table>

)
export default GroceryTable