package com.aidr.app.dto;

public class TaggerModelNominalLabel {

    private Double labelPrecision;

    private Double labelRecall;

    private Double labelAuc;

    private Integer classifiedDocumentCount;

    private TaggerLabel nominalLabel;

    private TaggerModelNominalLabelPK modelNominalLabelPK;

    public Double getLabelPrecision() {
        return labelPrecision;
    }

    public void setLabelPrecision(Double labelPrecision) {
        this.labelPrecision = labelPrecision;
    }

    public Double getLabelRecall() {
        return labelRecall;
    }

    public void setLabelRecall(Double labelRecall) {
        this.labelRecall = labelRecall;
    }

    public Double getLabelAuc() {
        return labelAuc;
    }

    public void setLabelAuc(Double labelAuc) {
        this.labelAuc = labelAuc;
    }

    public Integer getClassifiedDocumentCount() {
        return classifiedDocumentCount;
    }

    public void setClassifiedDocumentCount(Integer classifiedDocumentCount) {
        this.classifiedDocumentCount = classifiedDocumentCount;
    }

    public TaggerLabel getNominalLabel() {
        return nominalLabel;
    }

    public void setNominalLabel(TaggerLabel nominalLabel) {
        this.nominalLabel = nominalLabel;
    }

    public TaggerModelNominalLabelPK getModelNominalLabelPK() {
        return modelNominalLabelPK;
    }

    public void setModelNominalLabelPK(TaggerModelNominalLabelPK modelNominalLabelPK) {
        this.modelNominalLabelPK = modelNominalLabelPK;
    }
}
