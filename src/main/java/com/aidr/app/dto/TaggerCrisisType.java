package com.aidr.app.dto;

public class TaggerCrisisType {

    private Integer crisisTypeID;

    private String name;

    public TaggerCrisisType() {
    }

    public TaggerCrisisType(Integer crisisTypeID) {
        this.crisisTypeID = crisisTypeID;
    }

    public TaggerCrisisType(Integer crisisTypeID, String name) {
        this.crisisTypeID = crisisTypeID;
        this.name = name;
    }

    public Integer getCrisisTypeID() {
        return crisisTypeID;
    }

    public void setCrisisTypeID(Integer crisisTypeID) {
        this.crisisTypeID = crisisTypeID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
