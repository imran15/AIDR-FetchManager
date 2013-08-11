package com.aidr.app.service.impl;

import com.aidr.app.dto.TaggerAllCrisesTypesResponse;
import com.aidr.app.dto.TaggerCrisisType;
import com.aidr.app.exception.AidrException;
import com.aidr.app.repository.UserConnectionRepository;
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

    public List<TaggerCrisisType> getAllCrisis() throws AidrException{
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
            logger.info("Tagger returned " + crisesTypesResponse.getCrisisTypes().size() + " crises types");

            return crisesTypesResponse.getCrisisTypes();
        } catch (Exception e) {
            throw new AidrException("Error While Getting All Crisis from Tagger", e);
        }
    }

}
