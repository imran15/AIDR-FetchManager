package com.aidr.app.repository.impl;

import java.io.Serializable;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.aidr.app.hibernateEntities.AidrCollection;
import com.aidr.app.hibernateEntities.AidrCollectionLog;
import com.aidr.app.repository.CollectionLogRepository;

@Repository("collectionLogRepository")
public class CollectionLogRepositoryImpl extends GenericRepositoryImpl<AidrCollectionLog, Serializable> implements CollectionLogRepository{

}