package com.aidr.app.dto;

public class TaggerUser {

    private Integer userID;

    public TaggerUser() {
    }

    public TaggerUser(Integer userID) {
        this.userID = userID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

}