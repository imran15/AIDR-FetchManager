package com.aidr.app.repository.impl;

import java.io.Serializable;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.aidr.app.hibernateEntities.UserConnection;
import com.aidr.app.repository.UserConnectionRepository;

@Repository("userConnectionRepository")
public class UserConnectionRepositoryImpl  extends GenericRepositoryImpl<UserConnection,Serializable> implements UserConnectionRepository {

	@Override
	public UserConnection fetchbyUsername(String userName) {
		Criteria criteria = getHibernateTemplate().getSessionFactory().getCurrentSession().createCriteria(UserConnection.class);
		criteria.add(Restrictions.eq("userId", userName));
		criteria.setMaxResults(1);
		return (UserConnection) criteria.uniqueResult();
	}

}
