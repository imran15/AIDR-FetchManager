package com.aidr.app.service.impl;

import java.net.URLEncoder;
import java.util.List;

import javax.ws.rs.core.MediaType;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.aidr.app.dto.CollectionDataResponse;
import com.aidr.app.dto.FetcherRequestDTO;
import com.aidr.app.dto.FetcheResponseDTO;
import com.aidr.app.hibernateEntities.AidrCollection;
import com.aidr.app.hibernateEntities.AidrCollectionLog;
import com.aidr.app.hibernateEntities.UserConnection;
import com.aidr.app.repository.CollectionLogRepository;
import com.aidr.app.repository.CollectionRepository;
import com.aidr.app.repository.UserConnectionRepository;
import com.aidr.app.service.CollectionService;
import com.aidr.app.util.CollectionStatus;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

@Service("collectionService")
public class CollectionServiceImpl implements CollectionService {

    private Logger logger = Logger.getLogger(getClass());
    @Autowired
    private CollectionRepository collectionRepository;
    @Autowired
    private CollectionLogRepository collectionLogRepository;
    @Autowired
    private UserConnectionRepository userConnectionRepository;
    @Autowired
    private Client client;
    @Value("${fetchMainUrl}")
    private String fetchMainUrl;
    @Value("${twitter.consumerKey}")
    private String consumerKey;
    @Value("${twitter.consumerSecret}")
    private String consumerSecret;

    @Override
    @Transactional(readOnly = false)
    public void update(AidrCollection collection) throws Exception {
        collectionRepository.update(collection);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(AidrCollection collection) throws Exception {
        collectionRepository.delete(collection);

    }

    @Override
    public void create(AidrCollection collection) throws Exception {
        collectionRepository.save(collection);
    }

    @Override
    @Transactional(readOnly = true)
    public AidrCollection findById(Integer id) throws Exception {
        return collectionRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public CollectionDataResponse findAll(Integer start, Integer limit, Integer userId) throws Exception {
        return collectionRepository.getPaginatedData(start, limit, userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AidrCollection> searchByName(String query, Integer userId) throws Exception {
        return collectionRepository.searchByName(query, userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Boolean exist(String code) throws Exception {
        return collectionRepository.exist(code);
    }

    @Override
    @Transactional(readOnly = true)
    public AidrCollection getRunningCollectionStatusByUser(Integer userId) throws Exception {
        return collectionRepository.getRunningCollectionStatusByUser(userId);
    }

    @Override
    @Transactional(readOnly = false)
    public AidrCollection updateAndGetRunningCollectionStatusByUser(Integer userId) throws Exception {
        AidrCollection collection = collectionRepository.getRunningCollectionStatusByUser(userId);
        if (collection != null){
            return statusByCollection(collection);
        }
        return null;
    }

    @Override
    @Transactional(readOnly = false)
    public AidrCollection start(Integer collectionId, Integer userId) throws Exception {
        AidrCollection alreadyRunningCollection = collectionRepository.getRunningCollectionStatusByUser(userId);
        if (alreadyRunningCollection != null) {
            this.stop(alreadyRunningCollection.getId());
        }
        AidrCollection dbCollection = collectionRepository.findById(collectionId);
        return startFetcher(prepareFetcherRequest(dbCollection), dbCollection);
    }

    @Transactional(readOnly = true)
    public FetcherRequestDTO prepareFetcherRequest(AidrCollection dbCollection) {
        FetcherRequestDTO dto = new FetcherRequestDTO();

        UserConnection userconnection = userConnectionRepository.fetchbyUsername(dbCollection.getUser().getUserName());
        dto.setAccessToken(userconnection.getAccessToken());
        dto.setAccessTokenSecret(userconnection.getSecret());
        dto.setConsumerKey(consumerKey);
        dto.setConsumerSecret(consumerSecret);
        dto.setCollectionName(dbCollection.getName());
        dto.setCollectionCode(dbCollection.getCode());
        dto.setToFollow(dbCollection.getFollow());
        dto.setToTrack(dbCollection.getTrack());
        dto.setGeoLocation(dbCollection.getGeo());
        dto.setLanguageFilter(dbCollection.getLangFilters());
        return dto;
    }

    @Override
    @Transactional(readOnly = false)
    public AidrCollection stop(Integer collectionId) throws Exception {
        AidrCollection collection = collectionRepository.findById(collectionId);
        AidrCollection updateCollection = stopAidrFetcher(collection);

        AidrCollectionLog collectionLog = new AidrCollectionLog();
        collectionLog.setCount(collection.getCount());
        collectionLog.setEndDate(collection.getEndDate());
        collectionLog.setFollow(collection.getFollow());
        collectionLog.setGeo(collection.getGeo());
        collectionLog.setLangFilters(collection.getLangFilters());
        collectionLog.setStartDate(collection.getStartDate());
        collectionLog.setTrack(collection.getTrack());
        collectionLog.setCollectionID(collectionId);
        collectionLogRepository.save(collectionLog);

        return updateCollection;
    }

    public AidrCollection startFetcher(FetcherRequestDTO fetcherRequest, AidrCollection aidrCollection) {
        try {
            /**
             * Rest call to Fetcher
             */
            WebResource webResource = client.resource(fetchMainUrl + "/twitter/start");
            ObjectMapper objectMapper = new ObjectMapper();
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .post(ClientResponse.class, objectMapper.writeValueAsString(fetcherRequest));
            String jsonResponse = clientResponse.getEntity(String.class);
            FetcheResponseDTO response = objectMapper.readValue(jsonResponse, FetcheResponseDTO.class);
            logger.info("start Response from fetchMain " + objectMapper.writeValueAsString(response));
            aidrCollection.setStatus(CollectionStatus.getByStatus(response.getStatusCode()));
            /**
             * Update Status To database
             */
            collectionRepository.update(aidrCollection);
            return aidrCollection;
        } catch (Exception e) {
            logger.error("Error while starting Remote FetchMain Collection", e);
        }
        return null;
    }

    @SuppressWarnings("deprecation")
    public AidrCollection stopAidrFetcher(AidrCollection collection) {
        try {
            /**
             * Rest call to Fetcher
             */
            WebResource webResource = client.resource(fetchMainUrl + "/twitter/stop?id=" + URLEncoder.encode(collection.getCode()));
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON).get(ClientResponse.class);
            String response = clientResponse.getEntity(String.class);
            logger.info(response);
            /**
             * Change Database Status
             */
            return this.collectionRepository.stop(collection.getId());
        } catch (Exception e) {
            logger.error("Error while stopping Remote FetchMain Collection", e);
        }
        return null;
    }

    @SuppressWarnings("deprecation")
    @Override
    public AidrCollection statusById(Integer id) throws Exception {
        AidrCollection collection = this.findById(id);
        return statusByCollection(collection);
    }

    @SuppressWarnings("deprecation")
    public AidrCollection statusByCollection(AidrCollection collection) throws Exception {
        try {
            /**
             * Make a call to fetcher Status Rest API
             */
            WebResource webResource = client.resource(fetchMainUrl + "/twitter/status?id=" + URLEncoder.encode(collection.getCode()));
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON).get(ClientResponse.class);
            String jsonResponse = clientResponse.getEntity(String.class);
            logger.info("jsonResponse" + jsonResponse);
            ObjectMapper objectMapper = new ObjectMapper();
            FetcheResponseDTO response = objectMapper.readValue(jsonResponse, FetcheResponseDTO.class);
            if (response != null) {
                if (!CollectionStatus.getByStatus(response.getStatusCode()).equals(collection.getStatus())) {
                    //if local=running and fetcher=NOT-FOUND then put local as NOT-RUNNING
                    if (CollectionStatus.NOT_FOUND.equals(CollectionStatus.getByStatus(response.getStatusCode()))) {
                        collection.setStatus(CollectionStatus.NOT_RUNNING);
                        collectionRepository.update(collection);
                    }

                    if (CollectionStatus.RUNNING.equals(CollectionStatus.getByStatus(response.getStatusCode()))) {
                        collection = collectionRepository.start(collection.getId());
                    }
                }
                if ((response.getTweetsCount() != null && !response.getTweetsCount().equals(collection.getCount())) || response.getLastDocument() != null) {
                    collection.setCount(response.getTweetsCount());
                    collection.setLastDocument(response.getLastDocument());
                    this.update(collection);
                }
            }
            return collection;
        } catch (Exception e) {
            logger.error("Error while stopping Remote FetchMain Collection", e);
        }
        return null;
    }
}
