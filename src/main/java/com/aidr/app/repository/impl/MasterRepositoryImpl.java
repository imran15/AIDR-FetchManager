package com.aidr.app.repository.impl;

import java.io.Serializable;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.aidr.app.hibernateEntities.AidrMaster;
import com.aidr.app.repository.MasterRepository;

@Repository("masterRepository")
public class MasterRepositoryImpl extends GenericRepositoryImpl<AidrMaster,Serializable>  implements MasterRepository{

	@Override
	public AidrMaster findByKey(String key) {
		Criteria criteria = getHibernateTemplate().getSessionFactory().getCurrentSession().createCriteria(AidrMaster.class);
		criteria.add(Restrictions.eq("key", key));
		return (AidrMaster) criteria.uniqueResult();
	}

}
