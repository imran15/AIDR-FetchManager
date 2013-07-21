package com.aidr.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.aidr.app.hibernateEntities.UserEntity;
import com.aidr.app.service.UserService;

public class BaseController {
	
	@Resource(name="userService")
	private UserService userService;
	
	protected <T> Map<String, Object> getUIWrapper(List<T> entityList,Boolean success) {
		Map<String, Object> modelMap = new HashMap<String, Object>(4);
		modelMap.put("total", entityList != null ? entityList.size() : 0);
		modelMap.put("items", entityList);
		modelMap.put("success", success);
		modelMap.put("message", success ? "Successful" : "Failure");
		return modelMap;
	}
	
	protected <T> Map<String, Object> getUIWrapper(List<T> entityList,Long total) {
		Map<String, Object> modelMap = new HashMap<String, Object>(4);
		modelMap.put("total", total);
		modelMap.put("items", entityList);
		modelMap.put("success", true);
		modelMap.put("message", "Successful");
		return modelMap;
	}
	
	protected <T> Map<String, Object> getUIWrapper(Boolean success) {
		return getUIWrapper(null,success);
	}
	
	protected <T> Map<String, Object> getUIWrapper(Object object ,Boolean success) {
		Map<String, Object> modelMap = new HashMap<String, Object>(3);
		modelMap.put("success", success);
		modelMap.put("data", object);
		modelMap.put("message", success ? "Successful" : "Failure");
		return modelMap;
	}
	
	protected UserEntity getAuthenticatedUser() throws Exception{
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if(authentication!=null){
			return userService.fetchByUserName(authentication.getName());
		}else{
			throw new Exception("No user logged in ");
		}
	}

}
