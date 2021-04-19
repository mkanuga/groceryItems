package com.example.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repository.datarepository.GroceryItemRepository;
import com.example.repository.entity.GroceryItem;
import com.example.repository.exception.RecordExistException;
import com.example.repository.exception.RecordNotFoundException;

@Service
public class ItemService {

	@Autowired
	private GroceryItemRepository groceryItemRepository;

	public List<GroceryItem> getAllGroceryItemsByCategory(String itemCategory) {
		return groceryItemRepository.findByItemCategory(itemCategory);
	}

	public GroceryItem createGroceryItem(GroceryItem entity) throws RecordExistException {
		Optional<GroceryItem> groceryItem = groceryItemRepository.findById(entity.getItemCd());

		if (!groceryItem.isPresent()) {
			entity = groceryItemRepository.save(entity);
			return entity;
		} else {
			throw new RecordExistException("Record exist for given code");
		}

	}

	public GroceryItem updateGroceryItem(GroceryItem entity) throws RecordNotFoundException {
		Optional<GroceryItem> groceryItem = groceryItemRepository.findById(entity.getItemCd());

		if (groceryItem.isPresent()) {
			GroceryItem newEntity = groceryItem.get();
			newEntity.setItemCd(entity.getItemCd());
			newEntity.setItemCategory(entity.getItemCategory());
			newEntity.setItemName(entity.getItemName());
			newEntity.setItemDescription(entity.getItemDescription());

			newEntity = groceryItemRepository.save(newEntity);

			return newEntity;
		} else {
			throw new RecordNotFoundException("No item exist for given code");
		}
	}

	public Boolean deleteGroceryItem(String itemCode) throws RecordNotFoundException {
		Optional<GroceryItem> groceryItem = groceryItemRepository.findById(itemCode);
		Boolean isSuccess = false;

		if (groceryItem.isPresent()) {
			groceryItemRepository.deleteById(itemCode);
			isSuccess = true;
		} else {
			throw new RecordNotFoundException("No item exist for given code");
		}

		return isSuccess;
	}

}
