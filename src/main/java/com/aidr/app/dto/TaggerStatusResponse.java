package com.aidr.app.dto;

import java.io.Serializable;

public class TaggerStatusResponse implements Serializable{

	private String statusCode;

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }
}
