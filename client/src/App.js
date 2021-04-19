import './App.css';
import GroceryTable from './table/GroceryTable'
import ItemForm from './forms/ItemForm'
import SearchForm from './forms/SearchForm'
import React, { useState, useEffect, useReducer } from 'react'

const initialState = {
	  errorAdding: null,
	  errorUpdating: null,
	  errorDeleting:null,
	  apiCallSuccess:null
}

function groceryItemReducer(state, action) {
    switch (action.type) {
      case 'SUCCESS': {
        return {
            apiCallSuccess: true,
            errorAdding: null,
  	    errorUpdating: null,
  	    errorDeleting:null
        }
      }
      case 'ERRORADD': {
	        return {
	          errorAdding: action.error,
	          apiCallSuccess:null
	        }
	      }
      case 'ERRORUPDATE': {
	        return {
	          errorUpdating: action.error,
	          apiCallSuccess:null
	        }
	      }
      
      case 'ERRORDELETE': {
        return {
          errorDeleting: action.error,
          apiCallSuccess:null
        }
      }
      default: {
        return state
      }
    }
  }

function App() {
    
  const [{ apiCallSuccess, errorAdding, errorUpdating,errorDeleting }, dispatch] = useReducer(
	  groceryItemReducer,
	    initialState
  )
  const url = window.location.href
 
  const [items, setItems] = useState([])
  
  const [categoryList, setCategoryList] = useState([])
  
  const addItem = (item) => {	  
      const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify(item)
	    }
      let apiPath = '/groceryItem'
      fetchData(apiPath, requestOptions).then(() => {
	 let apiCallSuccess = true
	 dispatch({ type: 'SUCCESS', apiCallSuccess })
      }, error => {
	 dispatch({ type: 'ERRORADD', error })
      })
      
      
  }
  
  const deleteItem = (itemCd) => {
    const requestOptions = {
	        method: 'DELETE',
	        headers: { 'Content-Type': 'text/plain' }
	    }
    let apiPath = '/groceryItem/'+itemCd
    fetchData(apiPath, requestOptions).then(() => {
	let apiCallSuccess = true
	dispatch({ type: 'SUCCESS', apiCallSuccess })
    }, error => {
	dispatch({ type: 'ERRORDELETE', error })
    })
    
  }
  
  
  const [editing, setEditing] = useState(false)
  
  const initialFormState = {  itemCd: '', itemName: '', itemDescription: '', itemCategory:'' }
  
  const [currentItem, setCurrentItem] = useState(initialFormState)
  
  const editRow = (item) => {
	  setEditing(true)

	  setCurrentItem({ itemCd: item.itemCd, itemName: item.itemName, 
		  itemDescription: item.itemDescription, itemCategory:item.itemCategory })
  }
  
  const updateItem = (updatedItem) => {
    setEditing(false)
    const requestOptions = {
	        method: 'PUT',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify(updatedItem)
    }
    let apiPath = '/groceryItem'
    fetchData(apiPath, requestOptions).then(() => {
		 let apiCallSuccess = true
		 dispatch({ type: 'SUCCESS', apiCallSuccess })
	      }, error =>  {
		 dispatch({ type: 'ERRORUPDATE', error })
	      })
	
    
  }
  
  useEffect(() => {
      let apiPath = '/groceryItemCategory'
      let requestOptions = {
	       method: 'GET'
	   }
     fetchData(apiPath, requestOptions).then(jsonResponse=>{
	 let categoryList = jsonResponse.map(
		    ({ categoryName }) => ({
			itemCategory: categoryName
		    })
		  )
     
	 setCategoryList(categoryList) 
     })
   }, [])
  
  
  const [currentItemCategory, setCurrentItemCategory] = useState('')
  

  
  const useFetch = (apiRoot) => {
      const [data, setData] = useState([])

      const fetchData = async (apiPath, requestOptions) => {
         let json = ''
         const response = await fetch(apiRoot + apiPath, requestOptions )
         json = await response.json()
         setData(json)
          
         return json
       }

       return { data, fetchData}
    }
  
  const { data , fetchData} = useFetch(url)
  
 const searchItemsByCategory = (itemCategory) => {
      setCurrentItemCategory(itemCategory)
      let apiPath = '/groceryItem?itemCategory='+itemCategory
      let requestOptions = {
	       method: 'GET'
	   }
     fetchData(apiPath, requestOptions).then(jsonResponse=>{
	 setItems(jsonResponse) 
     }
      )
  }
  return (
    <div className="App">
      <h1 >Grocery Item</h1>
      <div className="flex-row">
	      <div className="flex-large">
	          <div>
	    		<h2>{editing? ('Edit Item Category'):('Add Item')}</h2>
	    		<ItemForm
	    		   setEditing={setEditing}
	    		   currentItem={currentItem}
	    		   updateItem={updateItem}
	    		   categoryList={categoryList}
	    		   editing={editing}
	    		   addItem={addItem} 
	    		 />
	    	   </div>
	    	
	      </div>
	      <div className="flex-large">
	        <h2>View Items By Category</h2>
	        <SearchForm searchItemsByCategory={searchItemsByCategory} 
	        	currentItemCategory={currentItemCategory} categoryList={categoryList} />
	        <GroceryTable data={items} editRow={editRow}  deleteItem={deleteItem} />
	      </div>
     </div>
     {errorAdding && <p style="background:#f99a9a" role="alert">An issue occured during Add! Please retry</p>}
     {errorUpdating && <p style="background:#f99a9a" role="alert">An issue occured during Update! Please retry</p>}
     {errorDeleting && <p style="background:#f99a9a"   role="alert">An issue occured during Delete! Please retry</p>}
     {apiCallSuccess && <p style="background:#b4dbb4" role="alert">Succesful!</p>}
    </div>   
  )
}

export default App;
