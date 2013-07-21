package com.aidr.app.service;

import java.util.List;

import com.aidr.app.hibernateEntities.AidrTask;

public interface TaskService {
	public void update(AidrTask task) throws Exception;
	public void delete(AidrTask task) throws Exception;
	public void create(AidrTask task) throws Exception;
	public AidrTask findById(Integer id) throws Exception; 
	public List <AidrTask> getAllTasksForACollection(Integer collectionId) throws Exception; 
}
