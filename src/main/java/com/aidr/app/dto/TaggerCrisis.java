package com.aidr.app.dto;

public class TaggerCrisis {

    private String code;

    private String name;

    private TaggerCrisisType crisisType;

    private TaggerUser users;

    public TaggerCrisis() {
    }

    public TaggerCrisis(String code, String name, TaggerCrisisType crisisType, TaggerUser users) {
        this.code = code;
        this.name = name;
        this.crisisType = crisisType;
        this.users = users;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TaggerCrisisType getCrisisType() {
        return crisisType;
    }

    public void setCrisisType(TaggerCrisisType crisisType) {
        this.crisisType = crisisType;
    }

    public TaggerUser getUsers() {
        return users;
    }

    public void setUsers(TaggerUser users) {
        this.users = users;
    }

}