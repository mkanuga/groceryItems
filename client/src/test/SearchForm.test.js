import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../forms/SearchForm';

test('renders Search with Disabled Button', () => {
    const data = [{  itemCategory: 'Frozen'}, 
		  {itemCategory: 'Diary'},
		  {itemCategory: 'Meat'},
		  {itemCategory: 'Pet'}]
    
    const baseProps = {
	      categoryList : data,
	      currentItemCategory: '',
	      searchItemsByCategory: jest.fn()
	    };
	render(<SearchForm {...baseProps}/>);
	const noSelectionText= screen.queryByText(/Please Select/i);
	expect(noSelectionText).toBeInTheDocument();
	
	const buttonText= screen.queryByText(/Search/i);
	expect(buttonText).toHaveAttribute('disabled') ;
});

test('Search form view after option selection', () => {
    const data = [{  itemCategory: 'Frozen'}, 
		  {itemCategory: 'Diary'},
		  {itemCategory: 'Meat'},
		  {itemCategory: 'Pet'}]
    
    const baseProps = {
	      categoryList : data,
	      currentItemCategory: '',
	      searchItemsByCategory: jest.fn()
	    };
    const { getByTestId, getAllByTestId } = render(<SearchForm {...baseProps}/>);
	let optionFrozen = data[0].itemCategory
	fireEvent.change(getByTestId("select"), {
	    target: { value: data[0].itemCategory },
	  });
	
	let options = getAllByTestId('select-option')
	 
	expect(options[1].selected).toBeTruthy();
	
	fireEvent.click(screen.getByText('Search'));	
	
	const buttonText= screen.queryByText(/Search/i);
	expect(buttonText).not.toHaveAttribute('disabled') ;
	
	expect(baseProps.searchItemsByCategory).toHaveBeenCalledTimes(1);
	expect(baseProps.searchItemsByCategory).toHaveBeenCalledWith(optionFrozen);
});