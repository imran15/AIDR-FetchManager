package com.aidr.app.service;

import java.util.List;

import com.aidr.app.hibernateEntities.AidrMaster;

public interface MasterService {

	public List<AidrMaster> getAll() throws Exception;
	public void update(AidrMaster master) throws Exception;
	public void delete(AidrMaster master) throws Exception;
	public void create(AidrMaster master) throws Exception;
	public AidrMaster findById(Integer id) throws Exception; 
	public AidrMaster findByKey(String key) throws Exception; 
}
