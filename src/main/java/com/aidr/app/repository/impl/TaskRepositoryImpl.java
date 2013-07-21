package com.aidr.app.repository.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.aidr.app.hibernateEntities.AidrTask;
import com.aidr.app.repository.TaskRepository;

@Repository("taskRepository")
public class TaskRepositoryImpl extends GenericRepositoryImpl<AidrTask, Serializable> implements TaskRepository{

	@SuppressWarnings("unchecked")
	@Override
	public List<AidrTask> getAllTasksForACollection(Integer collectionId) {
		Criteria criteria = getHibernateTemplate().getSessionFactory().getCurrentSession().createCriteria(AidrTask.class);
		criteria.add(Restrictions.eq("jobId.id", collectionId));
		return (List<AidrTask>) criteria.list();
	}

}
