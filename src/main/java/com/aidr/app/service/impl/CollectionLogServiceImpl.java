package com.aidr.app.service.impl;

import com.aidr.app.dto.CollectionLogDataResponse;
import com.aidr.app.exception.AidrException;
import com.aidr.app.hibernateEntities.AidrCollectionLog;
import com.aidr.app.repository.CollectionLogRepository;
import com.aidr.app.service.CollectionLogService;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.ws.rs.core.MediaType;

@Service("collectionLogService")
public class CollectionLogServiceImpl implements CollectionLogService {

    private Logger logger = Logger.getLogger(getClass());

    @Autowired
    private Client client;

    @Autowired
    private CollectionLogRepository collectionLogRepository;

    @Value("${persisterMainUrl}")
    private String persisterMainUrl;

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

    public String generateCSVLink(String code) throws AidrException {
        try {
            WebResource webResource = client.resource(persisterMainUrl + "/genCSV?collectionCode=" + code);
            ClientResponse clientResponse = webResource.type(MediaType.TEXT_PLAIN)
                    .get(ClientResponse.class);
            String jsonResponse = clientResponse.getEntity(String.class);

            if (jsonResponse != null && "http".equals(jsonResponse.substring(0, 4))) {
                return jsonResponse;
            } else {
                return "";
            }
        } catch (Exception e) {
            throw new AidrException("Error while generating CSV link in Persister", e);
        }
    }

    public String generateTweetIdsLink(String code) throws AidrException {
        try {
            WebResource webResource = client.resource(persisterMainUrl + "/genTweetIds?collectionCode=" + code);
            ClientResponse clientResponse = webResource.type(MediaType.TEXT_PLAIN)
                    .get(ClientResponse.class);
            String jsonResponse = clientResponse.getEntity(String.class);

            if (jsonResponse != null && "http".equals(jsonResponse.substring(0, 4))) {
                return jsonResponse;
            } else {
                return "";
            }
        } catch (Exception e) {
            throw new AidrException("Error while generating Tweet Ids link in Persister", e);
        }
    }

}