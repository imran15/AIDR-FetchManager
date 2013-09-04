Ext.define('TAGGUI.tagger-collection-details.controller.TaggerCollectionDetailsController', {
    extend: 'Ext.app.Controller',

    views: [
        'TaggerCollectionDetailsPanel'
    ],

    init: function () {

        this.control({

            'tagger-collection-details-view': {
                beforerender: this.beforeRenderView
            },

            "#crisisDelete": {
                click: function (btn, e, eOpts) {
                    this.crisisDelete();
                }
            },

            "#crisisSave": {
                click: function (btn, e, eOpts) {
                    this.crisisSave();
                }
            }

        });

    },

    beforeRenderView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.mainComponent = component;
        taggerCollectionDetailsController = this;

        var me = this;
    },

    crisisDelete: function () {
        AIDRFMFunctions.setAlert("Ok", 'Will be implemented later');
    },

    crisisSave: function () {
        AIDRFMFunctions.setAlert("Ok", 'Will be implemented later');
    }

});