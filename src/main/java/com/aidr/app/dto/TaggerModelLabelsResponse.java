package com.aidr.app.dto;

import java.util.List;

public class TaggerModelLabelsResponse {

    private List<TaggerModelNominalLabel> modelNominalLabels;

    public List<TaggerModelNominalLabel> getModelNominalLabels() {
        return modelNominalLabels;
    }

    public void setModelNominalLabels(List<TaggerModelNominalLabel> modelNominalLabels) {
        this.modelNominalLabels = modelNominalLabels;
    }

}
