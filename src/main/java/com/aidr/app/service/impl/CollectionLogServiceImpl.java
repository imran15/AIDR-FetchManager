package com.aidr.app.service.impl;

import com.aidr.app.dto.CollectionLogDataResponse;
import com.aidr.app.hibernateEntities.AidrCollectionLog;
import com.aidr.app.repository.CollectionLogRepository;
import com.aidr.app.service.CollectionLogService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("collectionLogService")
public class CollectionLogServiceImpl implements CollectionLogService {

    private Logger logger = Logger.getLogger(getClass());

    @Autowired
    private CollectionLogRepository collectionLogRepository;

    @Override
    @Transactional(readOnly = false)
    public void update(AidrCollectionLog collectionLog) throws Exception {
        collectionLogRepository.update(collectionLog);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(AidrCollectionLog collectionLog) throws Exception {
        collectionLogRepository.delete(collectionLog);

    }

    @Override
    public void create(AidrCollectionLog collectionLog) throws Exception {
        collectionLogRepository.save(collectionLog);
    }

    @Override
    @Transactional(readOnly = true)
    public AidrCollectionLog findById(Integer id) throws Exception {
        return collectionLogRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public CollectionLogDataResponse findAll(Integer start, Integer limit) throws Exception {
        return collectionLogRepository.getPaginatedData(start, limit);
    }

    @Override
    @Transactional(readOnly = true)
    public CollectionLogDataResponse findAllForCollection(Integer start, Integer limit, Integer collectionId) throws Exception {
        return collectionLogRepository.getPaginatedDataForCollection(start, limit, collectionId);
    }

    @Override
    @Transactional(readOnly = true)
    public Integer countTotalDownloadedItemsForCollection(Integer collectionId) throws Exception {
        return collectionLogRepository.countTotalDownloadedItemsForCollection(collectionId);
    }

}