package com.aidr.app.dto;

public class TaggerCrisisExist {

    private String crisisCode;

    private Boolean exists;

    public String getCrisisCode() {
        return crisisCode;
    }

    public void setCrisisCode(String crisisCode) {
        this.crisisCode = crisisCode;
    }

    public Boolean getExists() {
        return exists;
    }

    public void setExists(Boolean exists) {
        this.exists = exists;
    }
}