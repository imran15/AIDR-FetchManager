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
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @RequestMapping(value = "/getAllRunningInCollectorForUser.action", method = {RequestMethod.GET})
    @ResponseBody
    public Map<String, Object> getAllRunningInCollectorForUser() {
        logger.info("Getting collections running in the collector by User");
        try {
            UserEntity user = getAuthenticatedUser();
            List<TaggerCollection> collections = taggerService.getAllRunningInCollectorForUser(user.getId());
            return getUIWrapper(collections, true);
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
            TaggerCrisis crisis = transformCrisesRequestToTaggerCrises(crisisRequest);
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

    private TaggerCrisis transformCrisesRequestToTaggerCrises (CrisisRequest request) throws Exception{
        TaggerCrisisType crisisType = new TaggerCrisisType(request.getCrisisTypeID());
        TaggerUser taggerUser = new TaggerUser(getAuthenticatedUser().getId());
        return new TaggerCrisis(request.getCode(), request.getName(), crisisType, taggerUser);
    }

}