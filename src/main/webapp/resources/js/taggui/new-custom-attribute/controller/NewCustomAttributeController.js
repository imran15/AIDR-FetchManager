Ext.define('TAGGUI.new-custom-attribute.controller.NewCustomAttributeController', {
    extend: 'Ext.app.Controller',

    views: [
        'NewCustomAttributePanel'
    ],

    init: function () {

        this.control({

            'new-custom-attribute-view': {
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