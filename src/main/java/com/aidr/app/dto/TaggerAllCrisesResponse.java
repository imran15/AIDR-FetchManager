package com.aidr.app.dto;

import java.util.List;

public class TaggerAllCrisesResponse {

    private List<TaggerCrisis> crisises;

    public List<TaggerCrisis> getCrisises() {
        return crisises;
    }

    public void setCrisises(List<TaggerCrisis> crisises) {
        this.crisises = crisises;
    }
}
