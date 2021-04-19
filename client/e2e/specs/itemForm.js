import { load, getTitle } from "../pageObjects/index";
import {getAlertText, getEditButton, getDeleteButton} from "../pageObjects/app";
import { getItemCodeTextSelector, getItemNameTextSelector, getItemDescriptionTextSelector, 
	getItemCategoryOptionSelector, getButtonSelector } from "../pageObjects/itemform";
import { getSearchItemCategoryOptionSelector, getSearchButtonSelector } from "../pageObjects/searchform";

describe("Item Form Actions", () => {
  beforeEach(async () => {
    await load();
  });
  
  it("should show success for Add Form", async () => {
	const itemCode = await getItemCodeTextSelector();
	await itemCode.type("FZ_PIE")
	const itemName = await getItemNameTextSelector();
	await itemName.type("Frozen Pie")
	const itemDesc =await  getItemDescriptionTextSelector();
    await itemDesc.type("Frozen Pie")
	const itemCat =await getItemCategoryOptionSelector();
	await itemCat.select("Frozen");
	const button = await getButtonSelector();
	await button.click();
	const alert =await  getAlertText();
	expect(alert).toBe("Succesful!")
	
	//cleanup the data
	const searchitemCat =await getSearchItemCategoryOptionSelector();
	await searchitemCat.select("Frozen");
	const searchButton = await getSearchButtonSelector();
	await searchButton.click();
	const deletebutton = await getDeleteButton();
	await deletebutton.click();
	
  });
  
  
  it("should show success for Update Form", async () => {
	  
	  //ADD item
	 const itemCode = await getItemCodeTextSelector();
	await itemCode.type("FZ_PIE")
	const itemName = await getItemNameTextSelector();
	await itemName.type("Frozen Pie")
	const itemDesc =await  getItemDescriptionTextSelector();
    await itemDesc.type("Frozen Pie")
	const itemCat =await getItemCategoryOptionSelector();
	await itemCat.select("Frozen");
	const button = await getButtonSelector();
	await button.click();
	
	  
	  //update item
	const searchitemCat =await getSearchItemCategoryOptionSelector();
	await searchitemCat.select("Frozen");
	const searchbutton = await getSearchButtonSelector();
	await searchbutton.click();
	const editbutton = await getEditButton();
	await editbutton.click();
	
	const itemCategory =await getItemCategoryOptionSelector();
	await itemCategory.select("Diary");
	const updateButton = await getButtonSelector();
	await updateButton.click();
	const alert =await  getAlertText();
	expect(alert).toBe("Succesful!")
	
	//cleanup the data
	await searchitemCat.select("Diary");
	const searchbuttonfordelete = await getSearchButtonSelector();
	await searchbuttonfordelete.click();
	const deletebutton = await getDeleteButton();
	await deletebutton.click();
  });
  
  
  
  it("should show success for Delete Form", async () => {
	
	const itemCode = await getItemCodeTextSelector();
	await itemCode.type("FZ_PIE")
	const itemName = await getItemNameTextSelector();
	await itemName.type("Frozen Pie")
	const itemDesc =await  getItemDescriptionTextSelector();
    await itemDesc.type("Frozen Pie")
	const itemCat =await getItemCategoryOptionSelector();
	await itemCat.select("Frozen");
	const button = await getButtonSelector();
	await button.click();
	
	
	const searchitemCat =await getSearchItemCategoryOptionSelector();
	await searchitemCat.select("Frozen");
	const searchbutton = await getSearchButtonSelector();
	await searchbutton.click();
	const deletebutton = await getDeleteButton();
	await deletebutton.click();
	
	const alert =await  getAlertText();
	expect(alert).toBe("Succesful!")
	
  });
  
  

});
