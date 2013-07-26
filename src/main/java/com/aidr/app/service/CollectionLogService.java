package com.aidr.app.service;

import com.aidr.app.dto.CollectionLogDataResponse;
import com.aidr.app.hibernateEntities.AidrCollectionLog;

public interface CollectionLogService {

    public void update(AidrCollectionLog collection) throws Exception;

    public void delete(AidrCollectionLog collection) throws Exception;

    public void create(AidrCollectionLog collection) throws Exception;

    public AidrCollectionLog findById(Integer id) throws Exception;

    public CollectionLogDataResponse findAll(Integer start, Integer limit) throws Exception;

    public CollectionLogDataResponse findAllForCollection(Integer start, Integer limit, Integer collectionId) throws Exception;

}
