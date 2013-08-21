Ext.define('TAGGUI.attribute-details.controller.AttributeDetailsController', {
    extend: 'Ext.app.Controller',

    views: [
        'AttributeDetailsPanel'
    ],

    init: function () {

        this.control({

            'attribute-details-view': {
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