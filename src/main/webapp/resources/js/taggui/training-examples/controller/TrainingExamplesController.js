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
        var me = this;

        this.loadData();

        if (!MODEL_ID || MODEL_ID == 0) {
            me.mainComponent.breadcrumbs.setText('<div class="bread-crumbs">' +
                '<a href="' + BASE_URL + '/protected/tagger-home">Tagger</a><span>&nbsp;>&nbsp;</span>' +
                '<a href="' + BASE_URL + '/protected/' + CRISIS_CODE + '/tagger-collection-details">' + CRISIS_NAME + '</a><span>&nbsp;>&nbsp;' +
                MODEL_NAME + '&nbsp;>&nbsp;New training example</span></div>', false);
        }
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