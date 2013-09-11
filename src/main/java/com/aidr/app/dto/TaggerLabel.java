package com.aidr.app.dto;

public class TaggerLabel {

    private Integer nominalLabelID;

    private String name;

    private String nominalLabelCode;

    private String description;

    public TaggerLabel() {
    }

    public TaggerLabel(String name, Integer nominalLabelID) {
        this.name = name;
        this.nominalLabelID = nominalLabelID;
    }

    public Integer getNominalLabelID() {
        return nominalLabelID;
    }

    public void setNominalLabelID(Integer nominalLabelID) {
        this.nominalLabelID = nominalLabelID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNominalLabelCode() {
        return nominalLabelCode;
    }

    public void setNominalLabelCode(String nominalLabelCode) {
        this.nominalLabelCode = nominalLabelCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
