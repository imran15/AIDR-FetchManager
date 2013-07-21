package com.aidr.app.service;

import java.util.List;

import com.aidr.app.dto.CollectionDataResponse;
import com.aidr.app.hibernateEntities.AidrCollection;

public interface CollectionService {

	public void update(AidrCollection collection) throws Exception;
	public void delete(AidrCollection collection) throws Exception;
	public void create(AidrCollection collection) throws Exception;
	public AidrCollection findById(Integer id) throws Exception; 
	public CollectionDataResponse findAll(Integer start , Integer limit,Integer userId) throws Exception; 
	public List<AidrCollection> searchByName(String query,Integer userId) throws Exception;
	public Boolean exist(String code) throws Exception; 
	public AidrCollection getRunningCollectionStatusByUser(Integer userId) throws Exception; 
	public AidrCollection start(Integer collectionId,Integer userId) throws Exception; 
	public AidrCollection stop(Integer collectionId) throws Exception; 
	public AidrCollection status(Integer collectionId) throws Exception; 
}
