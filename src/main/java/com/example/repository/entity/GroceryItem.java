package com.example.repository.entity;

import javax.persistence.*;

/**
 * @author root
 *
 */
@Entity
@Table(name = "groceryitem")
public class GroceryItem {
	
	@Id
	@Column(name = "item_cd")
    private String itemCd;

    @Column(name = "item_name")
    private String itemName;
    
    @Column(name = "item_description")
    private String itemDescription;
    
    @Column(name = "item_category")
    private String itemCategory;

	/**
	 * @return String - the itemCd
	 */
	public String getItemCd() {
		return itemCd;
	}

	/**
	 * @param itemCd - the itemCd to set
	 */
	public void setItemCd(String itemCd) {
		this.itemCd = itemCd;
	}

	/**
	 * @return String- the itemName
	 */
	public String getItemName() {
		return itemName;
	}

	/**
	 * @param itemName - the itemName to set
	 */
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	/**
	 * @return String - the itemDescription
	 */
	public String getItemDescription() {
		return itemDescription;
	}

	/**
	 * @param itemDescription - the itemDescription to set
	 */
	public void setItemDescription(String itemDescription) {
		this.itemDescription = itemDescription;
	}

	/**
	 * @return String - the itemCategory
	 */
	public String getItemCategory() {
		return itemCategory;
	}

	/**
	 * @param itemCategory - the itemCategory to set
	 */
	public void setItemCategory(String itemCategory) {
		this.itemCategory = itemCategory;
	}
    
    


}
