package com.aidr.app.service;

import com.aidr.app.dto.TaggerCollection;
import com.aidr.app.dto.TaggerCrisis;
import com.aidr.app.dto.TaggerCrisisType;
import com.aidr.app.exception.AidrException;

import java.util.List;

public interface TaggerService {

    public List<TaggerCrisisType> getAllCrisisTypes() throws AidrException;

    public List<TaggerCollection> getAllRunningInCollectorForUser(Integer userId) throws AidrException;

    public String createNewCrises(TaggerCrisis crisis) throws AidrException;

}
