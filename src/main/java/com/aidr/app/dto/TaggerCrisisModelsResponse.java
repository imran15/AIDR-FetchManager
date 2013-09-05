package com.aidr.app.dto;

import java.util.List;

public class TaggerCrisisModelsResponse {

    private List<TaggerModel> modelWrapper;

    public List<TaggerModel> getModelWrapper() {
        return modelWrapper;
    }

    public void setModelWrapper(List<TaggerModel> modelWrapper) {
        this.modelWrapper = modelWrapper;
    }
}
