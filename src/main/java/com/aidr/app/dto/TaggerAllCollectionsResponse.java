package com.aidr.app.dto;

import java.util.List;

public class TaggerAllCollectionsResponse {

    private String message;

//  TODO check, because I was not able to get any collections in response
    private List<TaggerCollection> collections;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<TaggerCollection> getCollections() {
        return collections;
    }

    public void setCollections(List<TaggerCollection> collections) {
        this.collections = collections;
    }
}
