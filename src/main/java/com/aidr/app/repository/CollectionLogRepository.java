package com.aidr.app.repository;

import com.aidr.app.dto.CollectionLogDataResponse;
import com.aidr.app.hibernateEntities.AidrCollectionLog;

import java.io.Serializable;

public interface CollectionLogRepository extends GenericRepository<AidrCollectionLog, Serializable> {

    //public Boolean exist(String code);

    public CollectionLogDataResponse getPaginatedData(Integer start, Integer limit);

    public CollectionLogDataResponse getPaginatedDataForCollection(Integer start, Integer limit, Integer collectionId);

    public Integer countTotalDownloadedItemsForCollection(Integer collectionId);
}
