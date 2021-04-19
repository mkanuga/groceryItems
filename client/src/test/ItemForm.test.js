import { render, screen, fireEvent } from '@testing-library/react';
import ItemForm from '../forms/ItemForm';




test('renders Add Item Form', () => {
    const data = {  itemCd: '', itemName: '',
	  itemDescription: '', itemCategory:'' }
    
    const categoryData = [{  itemCategory: 'Frozen'}, 
	  {itemCategory: 'Diary'},
	  {itemCategory: 'Meat'},
	  {itemCategory: 'Pet'}]
    
    const baseProps = {
	    editing : false,
	    currentItemCategory: '',
	    currentItem:data,
	    addItem: jest.fn(),
	    updateItem: jest.fn(),
	    categoryList:categoryData
    };
    render(<ItemForm {...baseProps}/>);
	
    const buttonText= screen.queryByText(/Add Item/i);
    expect(buttonText).toBeInTheDocument();
});
    
    test('renders Edit Item Form', () => {
	    const data = {  itemCd: 'FZ_PIES', itemName: 'Frozen Pies',
		  itemDescription: 'Frozen pies', itemCategory:'Frozen' }
	    
	    
	    const categoryData = [{  itemCategory: 'Frozen'}, 
		  {itemCategory: 'Diary'},
		  {itemCategory: 'Meat'},
		  {itemCategory: 'Pet'}]
	    
	    
	    const baseProps = {
		    editing : true,
		    currentItemCategory: '',
		    currentItem:data,
		    addItem: jest.fn(),
		    updateItem: jest.fn(),
		    categoryList:categoryData
	    };
	    render(<ItemForm {...baseProps}/>);
		
	    const buttonText= screen.queryByText(/Update Item Category/i);
	    expect(buttonText).toBeInTheDocument();
	});