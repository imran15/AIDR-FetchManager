package com.aidr.app.service.impl;

import com.aidr.app.dto.*;
import com.aidr.app.exception.AidrException;
import com.aidr.app.service.TaggerService;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize;
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
            throw new AidrException("Error while getting all crisis from Tagger", e);
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
            throw new AidrException("Error while getting all crisis for user in Tagger", e);
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
            throw new AidrException("Error while creating new crises in Tagger", e);
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
            throw new AidrException("Error while getting all attributes for crisis from Tagger", e);
        }
    }

    public TaggerCrisisExist isCrisesExist(String code) throws AidrException{
        try {
            WebResource webResource = client.resource(taggerMainUrl + "/crisis/code/" + code);
            ObjectMapper objectMapper = new ObjectMapper();
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .get(ClientResponse.class);
            String jsonResponse = clientResponse.getEntity(String.class);

            TaggerCrisisExist crisisExist = objectMapper.readValue(jsonResponse, TaggerCrisisExist.class);
            if (crisisExist.getCrisisId() != null) {
                logger.info("Crises with the code " + code + " already exist in Tagger.");
                return crisisExist;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new AidrException("Error while checking if crisis exist in Tagger", e);
        }
    }


    public Integer isUserExistsByUsername(String userName) throws AidrException {
        try {
            /**
             * Rest call to Tagger
             */
            WebResource webResource = client.resource(taggerMainUrl + "/user/" + userName);
            ObjectMapper objectMapper = new ObjectMapper();

            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .get(ClientResponse.class);

            String jsonResponse = clientResponse.getEntity(String.class);
            TaggerUser taggerUser = objectMapper.readValue(jsonResponse, TaggerUser.class);
            if (taggerUser != null && taggerUser.getUserID() != null) {
                logger.info("User with the user name " + userName + " already exist in Tagger and has ID: " + taggerUser.getUserID());
                return taggerUser.getUserID();
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new AidrException("Error while checking if user exist in Tagger", e);
        }
    }

    public Integer addNewUser(TaggerUser taggerUser) throws AidrException {
        try {
            /**
             * Rest call to Tagger
             */
            WebResource webResource = client.resource(taggerMainUrl + "/user");
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);

            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .post(ClientResponse.class, objectMapper.writeValueAsString(taggerUser));

            String jsonResponse = clientResponse.getEntity(String.class);
            TaggerUser createdUser = objectMapper.readValue(jsonResponse, TaggerUser.class);
            if (createdUser != null && createdUser.getUserID() != null) {
                logger.info("User with ID " + createdUser.getUserID() + " was created in Tagger");
                return createdUser.getUserID();
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new AidrException("Error while adding new user to Tagger", e);
        }
    }

    public Integer addAttributeToCrisis(TaggerModelFamily modelFamily) throws AidrException {
        try {
            /**
             * Rest call to Tagger
             */
            WebResource webResource = client.resource(taggerMainUrl + "/modelfamily");
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);

            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .post(ClientResponse.class, objectMapper.writeValueAsString(modelFamily));

            String jsonResponse = clientResponse.getEntity(String.class);
            TaggerModelFamily createdModelFamily = objectMapper.readValue(jsonResponse, TaggerModelFamily.class);
            if (createdModelFamily != null && createdModelFamily.getModelFamilyID() != null) {
                logger.info("Attribute was added to crises");
                return createdModelFamily.getModelFamilyID();
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new AidrException("Error while adding attribute to crises", e);
        }
    }

    public TaggerCrisis getCrisesByCode(String code) throws AidrException{
        try {
            /**
             * Rest call to Tagger
             */
            WebResource webResource = client.resource(taggerMainUrl + "/crisis/by-code/" + code);
            ObjectMapper objectMapper = new ObjectMapper();
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .get(ClientResponse.class);
            String jsonResponse = clientResponse.getEntity(String.class);

            TaggerCrisis crisis = objectMapper.readValue(jsonResponse, TaggerCrisis.class);
            if (crisis != null) {
                logger.info("Tagger returned crisis with code" + crisis.getCode());
            }

            return crisis;
        } catch (Exception e) {
            throw new AidrException("Error while getting crisis by code from Tagger", e);
        }
    }

    public TaggerCrisis updateCode(TaggerCrisis crisis) throws AidrException{
        try {
            /**
             * Rest call to Tagger
             */
            WebResource webResource = client.resource(taggerMainUrl + "/crisis");
            ObjectMapper objectMapper = new ObjectMapper();
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .put(ClientResponse.class, objectMapper.writeValueAsString(crisis));
            String jsonResponse = clientResponse.getEntity(String.class);

            TaggerCrisis updatedCrisis = objectMapper.readValue(jsonResponse, TaggerCrisis.class);
            if (updatedCrisis != null) {
                logger.info("Crisis with id " + updatedCrisis.getCrisisID() + " was updated in Tagger");
            }

            return crisis;
        } catch (Exception e) {
            throw new AidrException("Error while getting crisis by code from Tagger", e);
        }
    }

    public List<TaggerModel> getModelsForCrisis(Integer crisisID) throws AidrException{
        try {
            /**
             * Rest call to Tagger
             */
            WebResource webResource = client.resource(taggerMainUrl + "/model/crisis/" + crisisID);
            ObjectMapper objectMapper = new ObjectMapper();
            ClientResponse clientResponse = webResource.type(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .get(ClientResponse.class);
            String jsonResponse = clientResponse.getEntity(String.class);

            TaggerCrisisModelsResponse crisisModelsResponse = objectMapper.readValue(jsonResponse, TaggerCrisisModelsResponse.class);
            if (crisisModelsResponse.getModelWrapper() != null) {
                logger.info("Tagger returned " + crisisModelsResponse.getModelWrapper().size() + " models for crises with ID " + crisisID);
                return crisisModelsResponse.getModelWrapper();
            }
            return null;
        } catch (Exception e) {
            throw new AidrException("Error while getting all models for crisis from Tagger", e);
        }
    }
}
