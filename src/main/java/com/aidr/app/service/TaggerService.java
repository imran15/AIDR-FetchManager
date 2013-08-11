package com.aidr.app.service;

import com.aidr.app.dto.TaggerCrisisType;
import com.aidr.app.exception.AidrException;

import java.util.List;

public interface TaggerService {

    public List<TaggerCrisisType> getAllCrisis() throws AidrException;

}
