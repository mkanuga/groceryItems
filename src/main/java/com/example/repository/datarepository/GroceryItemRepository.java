package com.example.repository.datarepository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.repository.entity.GroceryItem;

@Repository
public interface GroceryItemRepository extends PagingAndSortingRepository<GroceryItem, String> {
	List<GroceryItem> findByItemCategory(String itemCategory);
	GroceryItem findByItemCd(String itemCd);
}
