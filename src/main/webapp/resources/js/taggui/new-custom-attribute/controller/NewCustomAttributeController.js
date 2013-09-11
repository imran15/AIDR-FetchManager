Ext.define('TAGGUI.new-custom-attribute.controller.NewCustomAttributeController', {
    extend: 'Ext.app.Controller',

    views: [
        'NewCustomAttributePanel'
    ],

    init: function () {

        this.control({

            'new-custom-attribute-view': {
                beforerender: this.beforeRenderView
            },

            "#nameInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'Give a name to your attribute. For example, Violence, Region.',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#codeInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'Attribute code consists of alpha-numeric short code name to a attribute. ' +
                            'Spaces are not allowed in the code name. For example, missing_person, syria_region are valid code names',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#descriptionInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'Give a description to your attribute. For example, Geographic regions centered on Syria, Report of violence.',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#attributeCancelCreate": {
                click: function (btn, e, eOpts) {
                    document.location.href = BASE_URL + '/protected/' + CRISIS_CODE + '/predict-new-attribute';
                }
            },

            "#attributeCreate": {
                click: function (btn, e, eOpts) {
                    this.isExist();
                }
            },

            "#addLabel": {
                click: function (btn, e, eOpts) {
                    this.addLabel();
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

    addLabel: function() {
        var me = this;

        var labels = me.mainComponent.labelsStore.getRange();

//      TODO validation. If fields empty of if attribute with code already exist
        var r = {};
        r.name = me.mainComponent.nameLabelE.getValue();
        r.description = me.mainComponent.DescriptionLabelE.getValue();
        r.code = me.mainComponent.codeLabelE.getValue();
        me.clearAttributeFields();

        labels.push(r);

        me.mainComponent.labelsStore.loadData(labels, true);
    },

    clearAttributeFields: function(){
        var me = this;
        me.mainComponent.nameLabelE.setValue();
        me.mainComponent.DescriptionLabelE.setValue();
        me.mainComponent.codeLabelE.setValue();
        me.mainComponent.nameLabelE.clearInvalid();
        me.mainComponent.DescriptionLabelE.clearInvalid();
        me.mainComponent.codeLabelE.clearInvalid();
    },

    isExist: function () {
        AIDRFMFunctions.setAlert("Ok", "Will be implemented soon.");

        var me = this;

//        var form = Ext.getCmp('collectionForm').getForm();
//        var code = form.findField('code');
//        Ext.Ajax.request({
//            url: 'collection/exist.action',
//            method: 'GET',
//            params: {
//                code: code.getValue()
//            },
//            headers: {
//                'Accept': 'application/json'
//            },
//            success: function (response) {
//                var response = Ext.decode(response.responseText);
//                if (response.data) {
//                    AIDRFMFunctions.setAlert('Error', 'Collection Code already exist. Please select another code');
//                    code.markInvalid("Collection Code already exist. Please select another code");
//                } else {
//                    me.saveAttribute();
//                }
//            }
//        });
    },

    saveAttribute: function () {
        var me = this;

//        var mask = AIDRFMFunctions.getMask(true, 'Saving collection ...');
//        mask.show();
//
//        if (AIDRFMFunctions.mandatoryFieldsEntered()) {
//            var form = Ext.getCmp('collectionForm').getForm();
//            Ext.Ajax.request({
//                url: 'collection/save.action',
//                method: 'POST',
//                params: {
//                    name: form.findField('name').getValue(),
//                    code: form.findField('code').getValue(),
//                    track: form.findField('track').getValue(),
//                    follow: form.findField('follow').getValue(),
//                    geo: form.findField('geo').getValue(),
//                    langFilters: form.findField('langFilters').getValue()
//                },
//                headers: {
//                    'Accept': 'application/json'
//                },
//                success: function (response) {
//                    AIDRFMFunctions.setAlert("Ok", ["Collection created successfully.", "You will be redirected to Home screen."]);
//                    mask.hide();
//
//                    var maskRedirect = AIDRFMFunctions.getMask(true, 'Redirecting ...');
//                    maskRedirect.show();
//
////                    wait for 3 sec to let user read information box
//                    var isFirstRun = true;
//                    Ext.TaskManager.start({
//                        run: function () {
//                            if (!isFirstRun) {
//                                document.location.href = BASE_URL + '/protected/home';
//                            }
//                            isFirstRun = false;
//                        },
//                        interval: 3 * 1000
//                    });
//                }
//            });
//        } else {
//            mask.hide();
//        }
    }

});