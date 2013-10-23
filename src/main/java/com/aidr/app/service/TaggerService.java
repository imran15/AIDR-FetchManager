package com.aidr.app.service;

import com.aidr.app.dto.*;
import com.aidr.app.exception.AidrException;

import java.util.Collection;
import java.util.List;

public interface TaggerService {

    public List<TaggerCrisisType> getAllCrisisTypes() throws AidrException;

    public List<TaggerCrisis> getCrisesByUserId(Integer userId) throws AidrException;

    public String createNewCrises(TaggerCrisisRequest crisis) throws AidrException;

    public Collection<TaggerAttribute> getAttributesForCrises(Integer crisisID, Integer userId) throws AidrException;

    public TaggerCrisisExist isCrisesExist(String code) throws AidrException;

    public Integer isUserExistsByUsername(String userName) throws AidrException;

    public Integer addNewUser(TaggerUser taggerUser) throws AidrException;

    public Integer addAttributeToCrisis(TaggerModelFamily modelFamily) throws AidrException;

    public TaggerCrisis getCrisesByCode(String code) throws AidrException;

    public TaggerCrisis updateCode(TaggerCrisis crisis) throws AidrException;

    public List<TaggerModel> getModelsForCrisis(Integer crisisID) throws AidrException;

    public List<TaggerModelNominalLabel> getAllLabelsForModel(Integer modelID) throws AidrException;

    public TaggerAttribute createNewAttribute(TaggerAttribute attribute) throws AidrException;

    public TaggerLabel createNewLabel(TaggerLabelRequest label) throws AidrException;

    public TaggerAttribute attributeExists(String code) throws AidrException;

    public List<TrainingDataDTO> getTrainingDataByModelIdAndCrisisId(Integer modelId, Integer crisisId, Integer start, Integer limit) throws AidrException;
}
