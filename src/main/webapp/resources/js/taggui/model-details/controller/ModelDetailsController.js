Ext.define('TAGGUI.model-details.controller.ModelDetailsController', {
    extend: 'Ext.app.Controller',

    views: [
        'ModelDetailsPanel'
    ],

    init: function () {

        this.control({

            'model-details-view': {
                beforerender: this.beforeRenderView
            }

        });

    },

    beforeRenderView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.mainComponent = component;
        modelDetailsController = this;

        var me = this;

        this.getAllLabelsForModel();
    },

    getAllLabelsForModel: function() {
        var me = this;

        Ext.Ajax.request({
            url: BASE_URL + '/protected/tagger/getAllLabelsForModel.action',
            method: 'GET',
            params: {
                id: MODEL_ID
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success && resp.data) {
                    var count = resp.data.length;
                    if (count > 0) {
                        var models = [],
                            totalMessages = 0,
                            totalAUC = 0,
                            totalPrecision = 0,
                            totalRecall = 0;
                        Ext.Array.each(resp.data, function(r, index) {
                            if (r.classifiedDocumentCount && r.classifiedDocumentCount > 0) {
                                totalMessages += r.classifiedDocumentCount;
                            }
                            if (r.labelAuc && r.labelAuc > 0) {
                                totalAUC += r.labelAuc;
                            }
                            if (r.labelPrecision && r.labelPrecision > 0) {
                                totalPrecision += r.labelPrecision;
                            }
                            if (r.labelRecall && r.labelRecall > 0) {
                                totalRecall += r.labelRecall;
                            }
                        });

                        Ext.Array.each(resp.data, function(r, index) {
                            var model = {};
                            if (r.nominalLabel && r.nominalLabel.name) {
                                model.value = r.nominalLabel.name;
                            }
                            var classifiedMessages = '0 (0%)';
                            if (r.classifiedDocumentCount){
                                var classifiedMessagesPercentage = ((r.classifiedDocumentCount * 100) / totalMessages).toFixed(2)
                                classifiedMessages = r.classifiedDocumentCount + ' (' + classifiedMessagesPercentage + '%)';
                            }
                            model.classifiedDocumentCount = classifiedMessages;
                            model.labelAuc = r.labelAuc;
                            model.labelPrecision = r.labelPrecision;
                            model.labelRecall = r.labelRecall;
                            models.push(model);
                        });

                        var totalModel = {};
                        totalModel.value = '';
                        totalModel.classifiedDocumentCount = totalMessages + ' total';
                        totalModel.labelAuc = (totalAUC / count).toFixed(2) + ' avg';
                        totalModel.labelPrecision = (totalPrecision / count).toFixed(2) + ' avg';
                        totalModel.labelRecall = (totalRecall / count).toFixed(2) + ' avg';
                        models.push(totalModel);

                        me.mainComponent.modelDetails.setText('Has classified <b>' + totalMessages
                            + '</b> messages.&nbsp;<a href="#">Manage training examples >></a>', false);
                        me.mainComponent.modelLabelsStore.loadData(models);
                    }
                } else {
                    AIDRFMFunctions.setAlert("Error", resp.message);
                }
            },
            failure: function () {
                AIDRFMFunctions.setAlert("Error", "System is down or under maintenance. For further inquiries please contact admin.");
            }
        });
    }

});