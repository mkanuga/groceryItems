import { render, screen, fireEvent } from '@testing-library/react';
import GroceryTable from '../table/GroceryTable';



    test('renders table without data', () => {
	render(<GroceryTable data={[]}/>);
	const noDataViewText = screen.queryByText(/No items to view/i);
	expect(noDataViewText).toBeInTheDocument();
    });
  
    test('renders table with data', () => {
      	const data = [{  itemCd: 'FZ_BEAN', itemName: 'Frozen bean',
	  itemDescription: 'Frozen Beans 1 kg', itemCategory:'FROZEN' }]
      
      	render(<GroceryTable data={data}/>);
      		
      	const tableDataTextItemCd = screen.getByText('FZ_BEAN');
      	expect(tableDataTextItemCd).toBeInTheDocument();
      	const tableDataTextItemName = screen.getByText('Frozen bean');
      	expect(tableDataTextItemName).toBeInTheDocument();
      	const tableDataTextItemDesc = screen.getByText('Frozen Beans 1 kg');
      	expect(tableDataTextItemDesc).toBeInTheDocument();
      	const tableDataTextItemCat = screen.getByText('FROZEN');
      	expect(tableDataTextItemCat).toBeInTheDocument();
      	const tableDataEditButton = screen.getByText('Edit Category');
      	expect(tableDataEditButton).toBeInTheDocument();
      	const tableDataDeleteButton = screen.getByText('Delete');
      	expect(tableDataDeleteButton).toBeInTheDocument();
      	const noDataViewText = screen.queryByText(/No items to view/i);
      	expect(noDataViewText).not.toBeInTheDocument();
      });
      
      
      test('Edit button click check in table with data', () => {
	      const data = [{  itemCd: 'FZ_BEAN', itemName: 'Frozen bean',
		  itemDescription: 'Frozen Beans 1 kg', itemCategory:'FROZEN' }]
	      const baseProps = {
		      data : data,
		      editRow: jest.fn()		      
		    };
	      
	      render(<GroceryTable {...baseProps}/>);
	      
	     
	      fireEvent.click(screen.getByText('Edit Category'));	      
	      expect(baseProps.editRow).toHaveBeenCalledTimes(1);
	      expect(baseProps.editRow).toHaveBeenCalledWith(data[0]);
	});
	      
	      
	test('Delete button click check in table with data', () => {
	  const data = [{  itemCd: 'FZ_BEAN', itemName: 'Frozen bean',
		  itemDescription: 'Frozen Beans 1 kg', itemCategory:'FROZEN' }]
	      const baseProps = {
		      data : data,
		      deleteItem: jest.fn()		      
		    };
	      
	      render(<GroceryTable {...baseProps}/>);
	     
	      fireEvent.click(screen.getByText('Delete'));	      
	      expect(baseProps.deleteItem).toHaveBeenCalledTimes(1);
	      expect(baseProps.deleteItem).toHaveBeenCalledWith(data[0].itemCd);
	}); 
 
      

