package com.aidr.app.repository;

import java.io.Serializable;

import com.aidr.app.hibernateEntities.UserEntity;

public interface UserRepository extends GenericRepository<UserEntity, Serializable>{

	public UserEntity fetchByUsername(String username);
	
}
