package com.aidr.app.dto;

import java.io.Serializable;
import java.util.List;

import com.aidr.app.hibernateEntities.AidrCollection;

public class CollectionDataResponse implements Serializable{
	/**
	 * 
	 */
	
	public CollectionDataResponse(){
		
	}
	
	public CollectionDataResponse(List<AidrCollection> data,Long total){
		this.total = total;
		this.data= data;
	}
	
	private static final long serialVersionUID = 1L;
	private Long total;
	private List<AidrCollection> data;
	public Long getTotal() {
		return total;
	}
	public void setTotal(Long total) {
		this.total = total;
	}
	public List<AidrCollection> getData() {
		return data;
	}
	public void setData(List<AidrCollection> data) {
		this.data = data;
	}
	
}
