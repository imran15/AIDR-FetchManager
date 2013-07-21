package com.aidr.app.repository;

import java.io.Serializable;
import com.aidr.app.hibernateEntities.UserConnection;

public interface UserConnectionRepository extends GenericRepository<UserConnection, Serializable>{

	public UserConnection fetchbyUsername(String userName);
}
