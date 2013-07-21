package com.aidr.app.repository;

import java.io.Serializable;

import com.aidr.app.hibernateEntities.AidrMaster;

public interface MasterRepository extends GenericRepository<AidrMaster, Serializable>{

	public AidrMaster findByKey(String key);
}
