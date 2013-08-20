package com.aidr.app.service;

import com.aidr.app.dto.TaggerCrisis;
import com.aidr.app.dto.TaggerCrisisRequest;
import com.aidr.app.dto.TaggerCrisisType;
import com.aidr.app.exception.AidrException;

import java.util.List;

public interface TaggerService {

    public List<TaggerCrisisType> getAllCrisisTypes() throws AidrException;

    public List<TaggerCrisis> getCrisesByUserId(Integer userId) throws AidrException;

    public String createNewCrises(TaggerCrisisRequest crisis) throws AidrException;

}
