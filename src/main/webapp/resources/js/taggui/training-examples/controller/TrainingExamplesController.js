Ext.define('TAGGUI.training-examples.controller.TrainingExamplesController', {
    extend: 'Ext.app.Controller',

    views: [
        'TrainingExamplesPanel'
    ],

    init: function () {

        this.control({

            'training-examples-view': {
                beforerender: this.beforeRenderView
            },

            "#saveLabels": {
                click: function (btn, e, eOpts) {
                    this.saveLabels();
                }
            },

            "#skipTask": {
                click: function (btn, e, eOpts) {
                    this.skipTask();
                }
            },

            "#cancel": {
                click: function (btn, e, eOpts) {
                    this.cancelTraining();
                }
            }

        });

    },

    beforeRenderView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.mainComponent = component;
        taggerCollectionDetailsController = this;
        var me = this;

        this.loadData();

        if (!MODEL_ID || MODEL_ID == 0) {
            me.mainComponent.breadcrumbs.setText('<div class="bread-crumbs">' +
                '<a href="' + BASE_URL + '/protected/tagger-home">Tagger</a><span>&nbsp;>&nbsp;</span>' +
                '<a href="' + BASE_URL + '/protected/' + CRISIS_CODE + '/tagger-collection-details">' + CRISIS_NAME + '</a><span>&nbsp;>&nbsp;' +
                MODEL_NAME + '&nbsp;>&nbsp;New training example</span></div>', false);
        }
    },

    loadData: function() {
        var me = this;

        var mask = AIDRFMFunctions.getMask(true);
        mask.show();

        Ext.Ajax.request({
            url: BASE_URL + '/protected/tagger/getAssignableTask.action',
            method: 'GET',
            params: {
                id: CRISIS_ID
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success) {
                    if (resp.data) {
                        try {
                            var obj = Ext.JSON.decode(resp.data);
                        } catch (e) {
                            AIDRFMFunctions.setAlert("Error", "Examples not available for this crisis.");
                        }
                        if (obj) {
                            var r = obj[0];
                            me.mainComponent.documentID = r.documentID;
                            if (r.data){
                                var tweetData = Ext.JSON.decode(r.data);
                                me.mainComponent.documentTextLabel.setText(tweetData.text);
                            }
                            if (r.attributeInfo){
                                if (r.attributeInfo) {
                                    var attr = r.attributeInfo[0];
                                    if (attr.name) {
                                        me.mainComponent.attributeNameLabel.setText(attr.name);
                                    }
                                    if (attr.nominalLabelJsonModelSet && Ext.isArray(attr.nominalLabelJsonModelSet)) {
                                        Ext.each(attr.nominalLabelJsonModelSet, function (lbl) {
                                            me.mainComponent.optionRG.add({
                                                boxLabel: lbl.name,
                                                name: 'rg',
                                                inputValue: lbl.norminalLabelID
                                            });
                                        })
                                    }
                                    if (attr.description) {
                                        me.mainComponent.optinText.setText('<div class="na-text">' + attr.description + '</div>', false);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    AIDRFMFunctions.setAlert("Error", resp.message);
                }
                mask.hide();
            },
            failure: function () {
                mask.hide();
                AIDRFMFunctions.setAlert("Error", "System is down or under maintenance. For further inquiries please contact admin.");
            }
        });
    },

    cancelTraining: function() {
        document.location.href = BASE_URL +  '/protected/' + CRISIS_CODE + '/' + MODEL_ID + '/' + MODEL_FAMILY_ID + '/training-data/' + MODEL_NAME;
    },

    saveLabels: function() {
        AIDRFMFunctions.setAlert("Ok", 'Will be implemented later');
//        TODO implement when we will have corresponding service.
    },

    skipTask: function() {
        var me = this;


//      TODO implement when service will return correct response.
        AIDRFMFunctions.setAlert("Ok", 'Will be implemented later');
        return false;



        if (!me.mainComponent.documentID) {
            AIDRFMFunctions.setAlert("Error", "Can not find Document Id");
            return false;
        }

        var mask = AIDRFMFunctions.getMask(true);
        mask.show();

        Ext.Ajax.request({
            url: BASE_URL + '/protected/tagger/skipTask.action',
            method: 'GET',
            params: {
                id: me.mainComponent.documentID
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success) {
                    if (resp.data) {
//                      TODO implement when service will return correct response.
                    }
                } else {
                    AIDRFMFunctions.setAlert("Error", resp.message);
                }
                mask.hide();
            },
            failure: function () {
                mask.hide();
                AIDRFMFunctions.setAlert("Error", "System is down or under maintenance. For further inquiries please contact admin.");
            }
        });
    }

});