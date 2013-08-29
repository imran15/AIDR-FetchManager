package com.aidr.app.service.impl;

import com.aidr.app.dto.*;
import com.aidr.app.exception.AidrException;
import com.aidr.app.service.TaggerService;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.MediaType;
import java.util.List;

@Service("taggerService")
public class TaggerServiceImpl implements TaggerService {

    private Logger logger = Logger.getLogger(getClass());
    @Autowired
    private Client client;
    @Value("${taggerMainUrl}")
    private String taggerMainUrl;

    public List<TaggerCrisisType> getAllCrisisTypes() throws AidrException{
        try {
            /**
             * Rest call to Tagger
             */
            WebResource webResource = client.resource(taggerMainUrl + "/crisisType/all");
            ObjectMapper objectMapper = new ObjectMapper();
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .get(ClientResponse.class);
            String jsonResponse = clientResponse.getEntity(String.class);

            TaggerAllCrisesTypesResponse crisesTypesResponse = objectMapper.readValue(jsonResponse, TaggerAllCrisesTypesResponse.class);
            if (crisesTypesResponse.getCrisisTypes() != null) {
                logger.info("Tagger returned " + crisesTypesResponse.getCrisisTypes().size() + " crises types");
            }

            return crisesTypesResponse.getCrisisTypes();
        } catch (Exception e) {
            throw new AidrException("Error While Getting All Crisis from Tagger", e);
        }
    }

    public List<TaggerCrisis> getCrisesByUserId(Integer userId) throws AidrException{
        try {
            /**
             * Rest call to Tagger
             */
            WebResource webResource = client.resource(taggerMainUrl + "/crisis?userID=" + userId);
            ObjectMapper objectMapper = new ObjectMapper();
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .get(ClientResponse.class);
            String jsonResponse = clientResponse.getEntity(String.class);

            TaggerAllCrisesResponse taggerAllCrisesResponse = objectMapper.readValue(jsonResponse, TaggerAllCrisesResponse.class);
            if (taggerAllCrisesResponse.getCrisises() != null) {
                logger.info("Tagger returned " + taggerAllCrisesResponse.getCrisises().size() + " crisis for user");
            }

            return taggerAllCrisesResponse.getCrisises();
        } catch (Exception e) {
            throw new AidrException("Error While Getting all crisis for user in Tagger", e);
        }
    }


    public String createNewCrises(TaggerCrisisRequest crisis) throws AidrException {
        try {
            /**
             * Rest call to Tagger
             */
            WebResource webResource = client.resource(taggerMainUrl + "/crisis");
            ObjectMapper objectMapper = new ObjectMapper();

            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .post(ClientResponse.class, objectMapper.writeValueAsString(crisis));

            return clientResponse.getEntity(String.class);
        } catch (Exception e) {
            throw new AidrException("Error While Getting collections running for user in Tagger", e);
        }
    }

    public List<TaggerCrisesAttribute> getAttributesForCrises(Integer crisisID) throws AidrException{
        try {
            /**
             * Rest call to Tagger
             */
            WebResource webResource = client.resource(taggerMainUrl + "/attribute/crisis/all?exceptCrisis=" + crisisID);
            ObjectMapper objectMapper = new ObjectMapper();
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .get(ClientResponse.class);
            String jsonResponse = clientResponse.getEntity(String.class);

            TaggerCrisisAttributesResponse crisisAttributesResponse = objectMapper.readValue(jsonResponse, TaggerCrisisAttributesResponse.class);
            if (crisisAttributesResponse.getCrisisAttributes() != null) {
                logger.info("Tagger returned " + crisisAttributesResponse.getCrisisAttributes().size() + " attributes available for crises with ID " + crisisID);
            }

            return crisisAttributesResponse.getCrisisAttributes();
        } catch (Exception e) {
            throw new AidrException("Error While Getting All Crisis from Tagger", e);
        }
    }

    public boolean isCrisesExist(String code) throws AidrException{
        try {
            WebResource webResource = client.resource(taggerMainUrl + "/crisis/code/" + code);
            ObjectMapper objectMapper = new ObjectMapper();
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .get(ClientResponse.class);
            String jsonResponse = clientResponse.getEntity(String.class);

            TaggerCrisisExist crisisExist = objectMapper.readValue(jsonResponse, TaggerCrisisExist.class);
            if (crisisExist.getExists() != null && crisisExist.getExists()) {
                logger.info("Crises with the code " + code + " already exist in Tagger.");
                return crisisExist.getExists();
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new AidrException("Error While Getting All Crisis from Tagger", e);
        }
    }

}
