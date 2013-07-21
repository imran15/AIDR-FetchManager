package com.aidr.app.repository;

import com.aidr.app.hibernateEntities.AidrCollection;
import java.io.Serializable;

import com.aidr.app.hibernateEntities.AidrCollectionLog;

public interface CollectionLogRepository extends GenericRepository<AidrCollectionLog, Serializable> {

	//public Boolean exist(String code);
        //public void save(AidrCollectionLog collectionLog);
}
