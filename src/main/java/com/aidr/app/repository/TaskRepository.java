package com.aidr.app.repository;

import java.io.Serializable;
import java.util.List;

import com.aidr.app.hibernateEntities.AidrTask;

public interface TaskRepository extends GenericRepository<AidrTask, Serializable> {

	public List<AidrTask> getAllTasksForACollection(Integer collectionId);
}
