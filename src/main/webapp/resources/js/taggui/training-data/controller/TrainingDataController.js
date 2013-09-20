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

        var me = this;
    }

});