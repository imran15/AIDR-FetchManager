Ext.define('TAGGUI.training-examples.controller.TrainingExamplesController', {
    extend: 'Ext.app.Controller',

    views: [
        'TrainingExamplesPanel'
    ],

    init: function () {

        this.control({

            'training-examples-view': {
                beforerender: this.beforeRenderView
            }

        });

    },

    beforeRenderView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.mainComponent = component;
        taggerCollectionDetailsController = this;

        this.loadData();
    },

    loadData: function() {
        var me = this;

//        Ext.Ajax.request({
//            url: BASE_URL + '/protected/tagger/getAllLabelsForModel.action',
//            method: 'GET',
//            params: {
//                id: 12
//            },
//            headers: {
//                'Accept': 'application/json'
//            },
//            success: function (response) {
//                var resp = Ext.decode(response.responseText);
//                if (resp.success && resp.data) {
//                    console.log(resp.data);
//                } else {
//                    AIDRFMFunctions.setAlert("Error", resp.message);
//                }
//            },
//            failure: function () {
//                AIDRFMFunctions.setAlert("Error", "System is down or under maintenance. For further inquiries please contact admin.");
//            }
//        });
    }

});