Ext.define('AIDRFM.home.controller.CollectionController', {
    extend: 'Ext.app.Controller',

    views: [
        'CollectionPanel'
    ],

    init: function () {

        this.control({

            'collection-view': {
                beforerender: this.beforeRenderView
            },

            "#newCollection": {
                click: function (btn, e, eOpts) {
                    document.location.href = BASE_URL + '/protected/collection-create';
                }
            },

            "#refreshBtn": {
                click: function (btn, e, eOpts) {
                    alert("Will be implemented soon");
                }
            }

        });

    },

    beforeRenderView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.mainComponent = component;
        collectionController = this;
    }

});