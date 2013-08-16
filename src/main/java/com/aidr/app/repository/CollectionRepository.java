package com.aidr.app.repository;

import java.io.Serializable;
import java.util.List;

import com.aidr.app.dto.CollectionDataResponse;
import com.aidr.app.hibernateEntities.AidrCollection;

public interface CollectionRepository extends GenericRepository<AidrCollection, Serializable> {

	public List<AidrCollection> searchByName(String query,Integer userId) throws Exception ;
	public CollectionDataResponse getPaginatedData(Integer start ,Integer limit,Integer userId);
	public Boolean exist(String code);
	public AidrCollection getRunningCollectionStatusByUser(Integer userId);
	public AidrCollection start(Integer collectionId);
	public AidrCollection stop(Integer collectionId);
	public AidrCollection findByCode(String code);
}
