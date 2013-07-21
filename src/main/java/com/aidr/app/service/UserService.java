package com.aidr.app.service;

import com.aidr.app.hibernateEntities.UserEntity;

public interface UserService {

	public void save(UserEntity user);
	public UserEntity fetchByUserName(String username);
	
}
