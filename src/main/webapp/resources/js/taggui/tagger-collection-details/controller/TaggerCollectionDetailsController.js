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
            },

            "#addNewClassifier": {
                click: function (btn, e, eOpts) {
                    this.addNewClassifier();
                }
            }

        });

    },

    beforeRenderView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.mainComponent = component;
        taggerCollectionDetailsController = this;
        this.getTemplateStatus();

        var me = this;
    },

    crisisDelete: function () {
        Ext.MessageBox.confirm('Confirm Crisis Delete', 'Do you want to delete <b>"' + CRISIS_NAME + '"</b>?',
            function (buttonId) {
            if (buttonId === 'yes') {
                AIDRFMFunctions.setAlert("Ok", 'Will be implemented later');
            }
        });
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
    },

    addNewClassifier: function() {
        document.location.href = BASE_URL + "/protected/" + CRISIS_CODE + '/predict-new-attribute';
    },

    getTemplateStatus: function() {
        var me = this;

        Ext.Ajax.request({
            url: BASE_URL + '/protected/tagger/getTemplateStatus.action',
            method: 'GET',
            params: {
                code: CRISIS_CODE
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success && resp.data) {
                    try {
                        var data = Ext.JSON.decode(resp.data);
                        if (data && data.status) {
                            if (data.status == 'ready') {
                                me.mainComponent.pyBossaLink.setText('<div class="gray-backgrpund"><a href="' + data.url + '"><i>' + data.url + '</i></a></div>', false);
                            } else if (data.status == 'not_ready') {
                                me.mainComponent.pyBossaLink.setText('<div class="gray-backgrpund"><i>' + data.message + '</i></div>', false);
                            }
                        }
                    } catch (e) {
                        me.mainComponent.pyBossaLink.setText('<div class="gray-backgrpund"><i>Initializing crowdsourcing task. Please come back in a few minutes.</i></div>', false);
                    }
                } else {
                    me.mainComponent.pyBossaLink.setText('<div class="gray-backgrpund"><i>Initializing crowdsourcing task. Please come back in a few minutes.</i></div>', false);
                }
            },
            failure: function () {
                me.mainComponent.pyBossaLink.setText('<div class="gray-backgrpund"><i>Initializing crowdsourcing task. Please come back in a few minutes.</i></div>', false);
            }
        });
    }

});