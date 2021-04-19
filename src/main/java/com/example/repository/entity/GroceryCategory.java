package com.example.repository.entity;

import javax.persistence.*;

/**
 * @author root
 *
 */
@Entity
@Table(name = "grocerycategory")
public class GroceryCategory {
	
	@Id
	@Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_description")
    private String categoryDescription;
    
    /**
     * @return String - get Category Name
     */
    public String getCategoryName() {
        return categoryName;
    }

    /**
     * @param categoryName - Category name
     */
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    /**
     * @return String - Get Category Description
     */
    public String getCategoryDescription() {
        return categoryDescription;
    }

    /**
     * @param categoryDescription - Category Description
     */
    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }


}
