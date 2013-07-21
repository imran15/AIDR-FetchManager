package com.aidr.app.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aidr.app.dto.CollectionDataResponse;
import com.aidr.app.hibernateEntities.AidrCollection;
import com.aidr.app.hibernateEntities.UserEntity;
import com.aidr.app.service.CollectionService;
import com.aidr.app.util.CollectionStatus;

@Controller
@RequestMapping("protected/collection")
public class CollectionController extends BaseController{

	private Logger logger = Logger.getLogger(CollectionController.class);
	
	@Autowired
	private CollectionService collectionService;
	
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	
	@RequestMapping(value = "/save.action", method={RequestMethod.POST})
	@ResponseBody
	public Map<String,Object> save(AidrCollection collection) throws Exception {
		logger.info("Save AidrCollection to Database having code : "+collection.getCode());
		try{
			UserEntity entity = getAuthenticatedUser();
			collection.setUser(entity);
			collection.setStatus(CollectionStatus.NOT_RUNNING);
			Calendar now = Calendar.getInstance();
			collection.setCreatedDate(now.getTime());
			collectionService.create(collection);
			return getUIWrapper(true);  
		}catch(Exception e){
			logger.error("Error while saving AidrCollection Info to database", e);
			return getUIWrapper(false); 
		}
	}
	
	@RequestMapping(value = "/delete.action", method = { RequestMethod.POST ,RequestMethod.GET })
	@ResponseBody
	public Map<String,Object> delete( AidrCollection collection) throws Exception {
		logger.info("Deleting AidrCollection Info from Database having id "+collection.getId());
		try{
			collectionService.delete(collection);
			return getUIWrapper(true);  
		}catch(Exception e){
			logger.error("Error while deleting AIDR Collection Info from database", e);
			return getUIWrapper(false); 
		}
	}
	
	@RequestMapping(value = "/update.action", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> update( AidrCollection collection) throws Exception {
		logger.info("Updating AidrCollection into Database having id "+collection.getId());
		try{
			AidrCollection dbCollection = collectionService.findById(collection.getId());
            collection.setStartDate(dbCollection.getStartDate());
            collection.setUser(dbCollection.getUser());
            collection.setCreatedDate(dbCollection.getCreatedDate());
            collectionService.update(collection);
			return getUIWrapper(true);  
		}catch(Exception e){
			logger.error("Error while Updating AidrCollection  Info into database", e);
			return getUIWrapper(false); 
		}
	}
	
	@RequestMapping(value = "/findById.action", method = RequestMethod.GET)
	@ResponseBody
	public AidrCollection findById(Integer id) throws Exception {
		logger.info("Fetch AidrCollection for Id  "+id);
                AidrCollection collection = collectionService.findById(id);
                System.out.println("-----------Collection :" + collection.getLangFilters());
		return collection;
	}
	
	@RequestMapping(value = "/findAll.action", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object>  findAll(@RequestParam Integer start, @RequestParam Integer limit ) throws Exception {
		start = (start != null) ? start : 0;
		limit = (limit != null) ? limit :50;
		UserEntity userEntity = getAuthenticatedUser();
		if(userEntity!=null){
			CollectionDataResponse dataResponse = collectionService.findAll(start,limit,userEntity.getId());
			return getUIWrapper(dataResponse.getData(),dataResponse.getTotal());
		}
		return getUIWrapper(false);

	}
	
	@RequestMapping(value = "/search.action", method = RequestMethod.GET)
	@ResponseBody
	public List<AidrCollection> search(@RequestParam String query) throws Exception {
		UserEntity userEntity = getAuthenticatedUser();
		if(userEntity!=null){
			return collectionService.searchByName(query , userEntity.getId());
		}
		return new ArrayList<AidrCollection>();
	}
	
	@RequestMapping(value = "/exist.action", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> exist(@RequestParam String code) throws Exception {
       return  getUIWrapper(collectionService.exist(code),true);
	}
	
	@RequestMapping(value = "/getRunningCollectionStatusByUser.action", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> runningCollectionByUser() throws Exception {
	   UserEntity userEntity = getAuthenticatedUser();
	   if(userEntity!=null){
		  return getUIWrapper(collectionService.getRunningCollectionStatusByUser(userEntity.getId()),true);
	   }
	   return getUIWrapper(false);
	}
	
	@RequestMapping(value = "/start.action", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> start(@RequestParam Integer id) throws Exception {
		UserEntity userEntity = getAuthenticatedUser();
		 if(userEntity!=null){
			AidrCollection collection = collectionService.start(id,userEntity.getId());
			return getUIWrapper(collection, true);
		 }
		return getUIWrapper(false);
	}
	
	@RequestMapping(value = "/stop.action", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> stop(@RequestParam Integer id) throws Exception {
         AidrCollection collection = collectionService.stop(id);
         return getUIWrapper(collection,true);
	}
	
	
	@RequestMapping(value = "/refreshCount.action", method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> refreshCount(@RequestParam Integer id) throws Exception {
         AidrCollection collection = collectionService.status(id);
         return getUIWrapper(collection,true);
	}
	
}
