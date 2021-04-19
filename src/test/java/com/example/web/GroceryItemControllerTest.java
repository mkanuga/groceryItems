package com.example.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito.Then;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.domain.service.ItemService;
import com.example.repository.entity.GroceryItem;
import com.example.repository.exception.RecordNotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = GroceryItemController.class)
public class GroceryItemControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private ItemService service;

	@BeforeEach
	public void setUp() {

	}

	@Test
	void whenValidGetInput_thenReturns200() throws Exception {
		mockMvc.perform(get("/groceryItem?itemCategory=Frozen").contentType("application/json"))
				.andExpect(status().isOk());
	}

	@Test
	void whenGetReturnsOutput() throws Exception {
		GroceryItem groceryItemFzBean = new GroceryItem();
		groceryItemFzBean.setItemCd("FZ_BEAN");
		groceryItemFzBean.setItemName("Beans");
		groceryItemFzBean.setItemDescription("Frozen bean");
		groceryItemFzBean.setItemCategory("Frozen");

		List<GroceryItem> groceryItemList = new ArrayList<>();
		groceryItemList.add(groceryItemFzBean);
		Mockito.when(service.getAllGroceryItemsByCategory(groceryItemFzBean.getItemCategory()))
				.thenReturn(groceryItemList);

		mockMvc.perform(get("/groceryItem?itemCategory=Frozen").contentType("application/json")).andReturn()
				.equals(groceryItemList);
	}

	@Test
	void whenValidPostInput_thenReturns200() throws Exception {
		GroceryItem groceryItem = new GroceryItem();
		groceryItem.setItemCd("FZ_BEAN");
		groceryItem.setItemName("Beans");
		groceryItem.setItemDescription("Frozen bean");
		groceryItem.setItemCategory("Frozen");
		
		Mockito.when(service.createGroceryItem(groceryItem))
		.thenReturn(groceryItem);

		String json = objectMapper.writeValueAsString(groceryItem);
		mockMvc.perform(post("/groceryItem").content(json).
				contentType("application/json")).
				andExpect(status().isOk()).andReturn().equals(groceryItem);
	}
	
	@Test
	void whenValidPostInput_thenReturnsSavedObject() throws Exception {
		GroceryItem groceryItem = new GroceryItem();
		groceryItem.setItemCd("FZ_BEAN");
		groceryItem.setItemName("Beans");
		groceryItem.setItemDescription("Frozen bean");
		groceryItem.setItemCategory("Frozen");
		
		Mockito.when(service.createGroceryItem(groceryItem))
		.thenReturn(groceryItem);

		String json = objectMapper.writeValueAsString(groceryItem);
		mockMvc.perform(post("/groceryItem").content(json).
				contentType("application/json")).
				andExpect(status().isOk()).andReturn().equals(groceryItem);
	}
	
	@Test
	void whenValidDeleteInput_thenReturns200() throws Exception {

		mockMvc.perform(delete("/groceryItem/FZ_BEAN").contentType("application/json"))
				.andExpect(status().isOk());
	}
	
	@Test
	void whenValidDeleteInput_thenNotFound() throws Exception {
		
		Mockito.when(service.deleteGroceryItem("FZ_BEAN")).thenThrow(new RecordNotFoundException("Record not found"));
		
		mockMvc.perform(delete("/groceryItem/FZ_BEAN").contentType("application/json"))
				.andExpect(status().isNotFound());
	}

}
