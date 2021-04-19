package com.example.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.service.ItemService;
import com.example.repository.entity.GroceryItem;
import com.example.repository.exception.RecordExistException;
import com.example.repository.exception.RecordNotFoundException;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * @author root
 * 
 *         CRUD for grocery Items
 *
 */
@RestController
@RequestMapping("/groceryItem")
public class GroceryItemController {

	@Autowired
	private ItemService service;

	/**
	 * Get all Items by Category
	 * 
	 * @param itemCategory - Item Category
	 * @return
	 */
	@GetMapping
	public ResponseEntity<List<GroceryItem>> getAllGroceryItemByCategory(
			@RequestParam("itemCategory") String itemCategory) {
		List<GroceryItem> list = service.getAllGroceryItemsByCategory(itemCategory);

		return new ResponseEntity<List<GroceryItem>>(list, new HttpHeaders(), HttpStatus.OK);
	}

	/**
	 * Create a new resource
	 * 
	 * @param groceryItem - Grocery item
	 * @return
	 */
	@PostMapping
	public ResponseEntity<GroceryItem> createitem(@RequestBody GroceryItem groceryItem) {

		GroceryItem created = null;
		try {
			created = service.createGroceryItem(groceryItem);
		} catch (RecordExistException e) {
			return new ResponseEntity<GroceryItem>(created, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<GroceryItem>(created, new HttpHeaders(), HttpStatus.OK);
	}

	/**
	 * Update grocery item
	 * 
	 * @param groceryItem - grocery item to update
	 * @return Object
	 */
	@PutMapping
	public ResponseEntity<GroceryItem> updateItem(@RequestBody GroceryItem groceryItem) {
		GroceryItem updated = null;
		try {
			updated = service.updateGroceryItem(groceryItem);
		} catch (RecordNotFoundException e) {
			return new ResponseEntity<GroceryItem>(updated, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<GroceryItem>(updated, new HttpHeaders(), HttpStatus.OK);
	}

	/**
	 * Deletes a particular Item
	 * 
	 * @param itemCode - Item code
	 * @return Object
	 * @throws RecordNotFoundException
	 */
	@DeleteMapping("/{itemCode}")
	public ResponseEntity<Map<String, String>> deleteItemByItemCd(@PathVariable("itemCode") String itemCode)
			throws RecordNotFoundException {

		try {
			service.deleteGroceryItem(itemCode);
		} catch (RecordNotFoundException e) {
			return new ResponseEntity<Map<String, String>>(Collections.singletonMap("response", "Failure"),
					HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Map<String, String>>(Collections.singletonMap("response", "Success"), HttpStatus.OK);
	}
}
