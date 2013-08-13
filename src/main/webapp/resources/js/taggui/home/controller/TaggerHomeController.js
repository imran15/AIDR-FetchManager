Ext.define('TAGGUI.home.controller.TaggerHomeController', {
    extend: 'Ext.app.Controller',

    views: [
        'TaggerHomePanel'
    ],

    init: function () {

        this.control({

            'tagger-home-view': {
                beforerender: this.beforeRenderView
            }

        });

    },

    beforeRenderView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.mainComponent = component;
        taggerHomeController = this;

        var me = this;

        this.loadTaggerCollections();
    },

    loadTaggerCollections: function () {
        var me = this;

        var mask = AIDRFMFunctions.getMask(true);
        mask.show();

        Ext.Ajax.request({
            url: 'tagger/getAllRunningInCollectorForUser.action',
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                mask.hide();
                if (resp.success ) {
                    if (resp.data && resp.data.length > 0) {
//                        me.DetailsComponent.crisesTypeStore.loadData(resp.data);
//                        me.DetailsComponent.crisesTypeWin.show();
                    } else {
                        AIDRFMFunctions.setAlert("Error", "No collection found");
                    }
                } else {
                    AIDRFMFunctions.setAlert("Error", resp.message);
                }
            }
        });

    }

});