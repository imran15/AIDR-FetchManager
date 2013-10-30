Ext.define('TAGGUI.training-data.controller.TrainingDataController', {
    extend: 'Ext.app.Controller',

    views: [
        'TrainingDataPanel'
    ],

    init: function () {

        this.control({

            'training-data-view': {
                beforerender: this.beforeRenderView
            }

        });

    },

    beforeRenderView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.mainComponent = component;
        taggerCollectionDetailsController = this;

        this.loadModelData();
    },

    loadModelData: function() {
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
                        var totalMessages = 0,
                            totalExamples = 0;
                        Ext.Array.each(resp.data, function(r, index) {
                            if (r.classifiedDocumentCount && r.classifiedDocumentCount > 0) {
                                totalMessages += r.classifiedDocumentCount;
                            }
                            if (r.trainingDocuments && r.trainingDocuments > 0) {
                                totalExamples += r.trainingDocuments;
                            }
                        });

                        me.mainComponent.taggerDescription.setText('Status: <b>Running</b>. ' +
                            'Has classified <b>' + totalMessages + '</b> messages.&nbsp;<a href="' + BASE_URL +  '/protected/' + CRISIS_CODE + '/' + MODEL_ID + '/model-details">Details for running model >></a>', false);

                        me.mainComponent.taggerDescription2line.setText('<b>' + totalExamples + '</b> training examples. Click on a message to see/edit details', false);
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