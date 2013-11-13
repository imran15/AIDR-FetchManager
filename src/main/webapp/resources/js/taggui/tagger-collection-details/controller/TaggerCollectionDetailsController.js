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
            },

            "#goToCollector": {
                click: function (btn, e, eOpts) {
                    this.goToCollector();
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
        var me = this;

        var crisisTypeId = me.mainComponent.crysisTypesCombo.getValue();
        var crisisTypeName = me.mainComponent.crisisTypesStore.findRecord("crisisTypeID", crisisTypeId).data.name;

        Ext.Ajax.request({
            url: BASE_URL + '/protected/tagger/updateCrisis.action',
            method: 'POST',
            params: {
                crisisID: CRISIS_ID,
                crisisTypeID: crisisTypeId,
                crisisTypeName: crisisTypeName
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (resp) {
                var response = Ext.decode(resp.responseText);
                if (response.success) {
                    me.mainComponent.saveButton.hide();
                    CRISIS_TYPE_ID = crisisTypeId;
                } else {
                    AIDRFMFunctions.setAlert("Error", 'Error while saving crisis.');
                }
            }
        });
    },

    goToCollector: function() {
        document.location.href = BASE_URL + '/protected/' + CRISIS_CODE +'/collection-details';
    }

});