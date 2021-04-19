package com.example.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.service.ItemCategoryService;
import com.example.repository.entity.GroceryCategory;

import java.util.List;

/**
 * @author root
 *
 */
@RestController
@RequestMapping("/groceryItemCategory")
public class GroceryItemCategoryController {

	@Autowired
	private ItemCategoryService service;

	/**
	 * Retrieves all item categories
	 * 
	 * @return Object
	 */
	@GetMapping
	public ResponseEntity<List<GroceryCategory>> getAllGroceryItemByCategory() {
		List<GroceryCategory> list = service.getAllGroceryItemCategory();

		return new ResponseEntity<List<GroceryCategory>>(list, new HttpHeaders(), HttpStatus.OK);
	}

}
