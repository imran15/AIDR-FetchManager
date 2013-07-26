package com.aidr.app.repository.impl;

import com.aidr.app.dto.CollectionLogDataResponse;
import com.aidr.app.hibernateEntities.AidrCollectionLog;
import com.aidr.app.repository.CollectionLogRepository;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

@Repository("collectionLogRepository")
public class CollectionLogRepositoryImpl extends GenericRepositoryImpl<AidrCollectionLog, Serializable> implements CollectionLogRepository {

    @SuppressWarnings("unchecked")
    @Override
    public CollectionLogDataResponse getPaginatedData(Integer start, Integer limit) {
        Criteria countCriteria = getHibernateTemplate().getSessionFactory().getCurrentSession().createCriteria(AidrCollectionLog.class);
        countCriteria.setProjection(Projections.rowCount());
        Long count = (Long) countCriteria.uniqueResult();
        if (count == 0){
            return new CollectionLogDataResponse(Collections.<AidrCollectionLog>emptyList(), count);
        }

        Criteria criteria = getHibernateTemplate().getSessionFactory().getCurrentSession().createCriteria(AidrCollectionLog.class);
        criteria.setFirstResult(start);
        criteria.setMaxResults(limit);
        criteria.addOrder(Order.desc("startDate"));

        return new CollectionLogDataResponse((List<AidrCollectionLog>) criteria.list(), count);
    }

    @SuppressWarnings("unchecked")
    @Override
    public CollectionLogDataResponse getPaginatedDataForCollection(Integer start, Integer limit, Integer collectionId) {
        Criteria countCriteria = getHibernateTemplate().getSessionFactory().getCurrentSession().createCriteria(AidrCollectionLog.class);
        countCriteria.add(Restrictions.eq("collectionID", collectionId));
        countCriteria.setProjection(Projections.rowCount());
        Long count = (Long) countCriteria.uniqueResult();
        if (count == 0){
            return new CollectionLogDataResponse(Collections.<AidrCollectionLog>emptyList(), count);
        }

        Criteria criteria = getHibernateTemplate().getSessionFactory().getCurrentSession().createCriteria(AidrCollectionLog.class);
        criteria.add(Restrictions.eq("collectionID", collectionId));
        criteria.setFirstResult(start);
        criteria.setMaxResults(limit);
        criteria.addOrder(Order.desc("startDate"));

        return new CollectionLogDataResponse((List<AidrCollectionLog>) criteria.list(), count);
    }

}