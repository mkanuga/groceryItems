package com.example.repository.datarepository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.repository.entity.GroceryCategory;

@Repository
public interface GroceryItemCategoryRepository extends PagingAndSortingRepository<GroceryCategory, String> {
	List<GroceryCategory> findAll();
	
}
