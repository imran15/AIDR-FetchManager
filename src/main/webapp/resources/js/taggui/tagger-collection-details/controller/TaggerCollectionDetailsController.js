Ext.define('TAGGUI.tagger-collection-details.controller.TaggerCollectionDetailsController', {
    extend: 'Ext.app.Controller',

    views: [
        'TaggerCollectionDetailsPanel'
    ],

    init: function () {

        this.control({

            'tagger-collection-details-view': {
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