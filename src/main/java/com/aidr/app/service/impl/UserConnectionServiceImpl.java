package com.aidr.app.service.impl;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aidr.app.hibernateEntities.UserConnection;
import com.aidr.app.repository.UserConnectionRepository;
import com.aidr.app.service.UserConnectionService;

@Service("userConnectionService")
public class UserConnectionServiceImpl implements UserConnectionService{

	@Inject
	private UserConnectionRepository userConnectionRepository;
	
	@Override
	@Transactional(readOnly=false)
	public void register(UserConnection userConnection) {
		userConnectionRepository.save(userConnection);
	}


}
