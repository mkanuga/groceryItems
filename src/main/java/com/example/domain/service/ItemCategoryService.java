package com.example.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repository.datarepository.GroceryItemCategoryRepository;
import com.example.repository.entity.GroceryCategory;

@Service
public class ItemCategoryService {

	@Autowired
	private GroceryItemCategoryRepository groceryItemCategoryRepository;

	public List<GroceryCategory> getAllGroceryItemCategory() {
		return groceryItemCategoryRepository.findAll();
	}


}
