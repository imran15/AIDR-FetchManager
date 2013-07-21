package com.aidr.app.repository.impl;

import java.io.Serializable;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.aidr.app.hibernateEntities.UserEntity;
import com.aidr.app.repository.UserRepository;

@Repository("userRepository")
public class UserRepositoryImpl extends GenericRepositoryImpl<UserEntity,Serializable> implements UserRepository {

	@Override
	public UserEntity fetchByUsername(String username) {
		
		Criteria criteria = getHibernateTemplate().getSessionFactory().getCurrentSession().createCriteria(UserEntity.class);
		criteria.add(Restrictions.eq("userName", username));
		return (UserEntity) criteria.uniqueResult();
	}

}
