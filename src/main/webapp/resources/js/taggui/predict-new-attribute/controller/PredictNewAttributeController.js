Ext.define('TAGGUI.predict-new-attribute.controller.PredictNewAttributeController', {
    extend: 'Ext.app.Controller',

    views: [
        'PredictNewAttributePanel'
    ],

    init: function () {

        this.control({

            'predict-new-attribute-view': {
                beforerender: this.beforeRenderView
            }

        });

    },

    beforeRenderView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.mainComponent = component;
        taggerCollectionDetailsController = this;

        var me = this;
    }

});