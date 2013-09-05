package com.aidr.app.controller;

import com.aidr.app.dto.*;
import com.aidr.app.exception.AidrException;
import com.aidr.app.hibernateEntities.UserEntity;
import com.aidr.app.service.TaggerService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("protected/tagger")
public class TaggerController extends BaseController {

    private Logger logger = Logger.getLogger(TaggerController.class);

    @Autowired
    private TaggerService taggerService;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    @RequestMapping(value = "/getAllCrisisTypes.action", method = {RequestMethod.GET})
    @ResponseBody
    public Map<String, Object> getAllCrisis() {
        logger.info("Getting all Crisis from Tagger");
        try {
            return getUIWrapper(taggerService.getAllCrisisTypes(), true);
        } catch (AidrException e) {
            logger.error(e.getMessage(), e);
            return getUIWrapper(false, e.getMessage());
        }
    }

    @RequestMapping(value = "/getCrisesByUserId.action", method = {RequestMethod.GET})
    @ResponseBody
    public Map<String, Object> getCrisesByUserId() {
        logger.info("Getting crises from Tagger by User");
        try {
            String userName = getAuthenticatedUserName();
            Integer taggerUserId = taggerService.isUserExistsByUsername(userName);
            if (taggerUserId == null) {
                TaggerUser taggerUser = new TaggerUser(userName, "normal");
                taggerUserId = taggerService.addNewUser(taggerUser);
            }
            if (taggerUserId != null) {
                return getUIWrapper(taggerService.getCrisesByUserId(taggerUserId), true);
            } else {
                return getUIWrapper(false, "Error while getting all crisis for user in Tagger");
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return getUIWrapper(false, e.getMessage());
        }
    }

    @RequestMapping(value = "/createCrises.action", method = {RequestMethod.POST})
    @ResponseBody
    public Map<String, Object> createCrises(CrisisRequest crisisRequest) {
        logger.info("Creating new crises in Tagger");
        try {
            String userName = getAuthenticatedUserName();
            Integer taggerUserId = taggerService.isUserExistsByUsername(userName);
            if (taggerUserId == null) {
                TaggerUser taggerUser = new TaggerUser(userName, "normal");
                taggerUserId = taggerService.addNewUser(taggerUser);
            }

            TaggerCrisisRequest crisis = transformCrisesRequestToTaggerCrises(crisisRequest, taggerUserId);
            String response = taggerService.createNewCrises(crisis);
            if ("SUCCESS".equals(response)){
                return getUIWrapper(true);
            } else {
                return getUIWrapper(false, response);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return getUIWrapper(false, e.getMessage());
        }
    }

    @RequestMapping(value = "/getAttributesForCrises.action", method = {RequestMethod.GET})
    @ResponseBody
    public Map<String, Object> getAttributesForCrises(Integer id) {
        logger.info("Getting Attributes For Crises");
        try {
            return getUIWrapper(taggerService.getAttributesForCrises(id), true);
        } catch (AidrException e) {
            logger.error(e.getMessage(), e);
            return getUIWrapper(false, e.getMessage());
        }
    }

    @RequestMapping(value = "/addAttributeToCrisis.action", method = {RequestMethod.GET})
    @ResponseBody
    public Map<String, Object> addAttributeToCrisis(Integer crisesId, Integer attributeId) {
        logger.info("Add Attribute To Crises");
        try {
            TaggerModelFamily modelFamily = transformCrisesIdAndAttributeIdToTaggerModelFamily(crisesId, attributeId);
            Integer modelFamilyId = taggerService.addAttributeToCrisis(modelFamily);
            if (modelFamilyId != null) {
                return getUIWrapper(modelFamilyId, true);
            } else {
                return getUIWrapper("Error while adding attribute to crises", false);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return getUIWrapper(false, e.getMessage());
        }
    }

    @RequestMapping(value = "/updateCrisis.action", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> update(UpdateCrisisDTO dto) throws Exception {
        logger.info("Updating Crisis in Tagger having id " + dto.getCrisisID());
        TaggerCrisis crisis = transformCrisisDTOToCrisis(dto);
        try{
            TaggerCrisis updatedCrisis = taggerService.updateCode(crisis);
            return getUIWrapper(updatedCrisis != null);
        }catch(Exception e){
            logger.error("Error while Updating Crisis in Tagger", e);
            return getUIWrapper(false);
        }
    }

    @RequestMapping(value = "/getModelsForCrisis.action", method = {RequestMethod.GET})
    @ResponseBody
    public Map<String, Object> getModelsForCrisis(Integer id) {
        logger.info("Getting Attributes For Crises");
        try {
            return getUIWrapper(taggerService.getModelsForCrisis(id), true);
        } catch (AidrException e) {
            logger.error(e.getMessage(), e);
            return getUIWrapper(false, e.getMessage());
        }
    }

    private TaggerCrisisRequest transformCrisesRequestToTaggerCrises (CrisisRequest request, Integer taggerUserId) throws Exception{
        TaggerCrisisType crisisType = new TaggerCrisisType(request.getCrisisTypeID());
        TaggerUserRequest taggerUser = new TaggerUserRequest(taggerUserId);
        return new TaggerCrisisRequest(request.getCode(), request.getName(), crisisType, taggerUser);
    }

    private TaggerModelFamily transformCrisesIdAndAttributeIdToTaggerModelFamily (Integer crisesId, Integer attributeId) throws Exception{
        TaggerCrisis crisis = new TaggerCrisis(crisesId);
        TaggerAttribute nominalAttribute = new TaggerAttribute(attributeId);
        return new TaggerModelFamily(crisis, nominalAttribute, false);
    }

    private TaggerCrisis transformCrisisDTOToCrisis (UpdateCrisisDTO dto) throws Exception{
        TaggerCrisis crisis = new TaggerCrisis(dto.getCrisisID());
        if (dto.getCrisisTypeID() != null && dto.getCrisisTypeName() != null) {
            TaggerCrisisType crisisType = new TaggerCrisisType(dto.getCrisisTypeID(), dto.getCrisisTypeName());
            crisis.setCrisisType(crisisType);
        }
        return crisis;
    }

}