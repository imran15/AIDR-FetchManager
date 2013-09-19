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

        var r = {},
            name = me.mainComponent.nameLabelE.getValue(),
            code = me.mainComponent.codeLabelE.getValue(),
            error = false,
            msg;

//        find if label with code or name already exists, -1 means that record was not found
        var codeInStore = me.mainComponent.labelsStore.find('code', code);
        var nameInStore = me.mainComponent.labelsStore.find('name', name);

        if (!code) {
            msg = "This field is required";
            me.mainComponent.codeLabelE.markInvalid(msg);
            error = true;
        }
        if (!name) {
            msg = "This field is required";
            me.mainComponent.nameLabelE.markInvalid(msg);
            error = true;
        }
        if (error){
            return false;
        }

        if (codeInStore != -1) {
//            fire code invalid
            msg = "Label with this code already exist for attribute";
            me.mainComponent.codeLabelE.markInvalid(msg);
            error = true;
        }
        if (nameInStore != -1) {
//            fire name invalid
            msg = "Label with this name already exist for attribute";
            me.mainComponent.nameLabelE.markInvalid(msg);
            error = true;
        }
        if (error){
            return false;
        }

        r.name = name;
        r.description = me.mainComponent.DescriptionLabelE.getValue();
        r.code = code;

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
        var me = this;

        var name = me.mainComponent.nameE.getValue(),
            code = me.mainComponent.codeE.getValue(),
            description = me.mainComponent.descriptionE.getValue(),
            error = false;

        if (!code) {
            msg = "This field is required";
            me.mainComponent.codeE.markInvalid(msg);
            error = true;
        }
        if (!name) {
            msg = "This field is required";
            me.mainComponent.nameE.markInvalid(msg);
            error = true;
        }
        if (error){
            return false;
        }

        var mask = AIDRFMFunctions.getMask(true, 'Saving attribute ...');
        mask.show();

        Ext.Ajax.request({
            url: BASE_URL + '/protected/tagger/attribute-exists.action',
            method: 'GET',
            params: {
                code: code
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success) {
                    if (resp.data == true){
//                        Attribute exist it Tagger
                        var msg = 'Attribute with this code already exist. Please select another code';
                        AIDRFMFunctions.setAlert('Error', msg);
                        me.mainComponent.codeE.markInvalid(msg);
                        mask.hide();
                    } else {
                        me.saveAttribute(name, code, description, mask);
                    }
                } else {
                    mask.hide();
                    AIDRFMFunctions.setAlert('Error', 'Error in Tagger while validating attribute code');
                }
            }
        });
    },

    saveAttribute: function (name, code, description, mask) {
        var me = this;

        Ext.Ajax.request({
            url: BASE_URL + '/protected/tagger/createAttribute.action',
            method: 'POST',
            params: {
                name: name,
                code: code,
                description: description
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success && resp.data) {
                    var labels = me.mainComponent.labelsStore.getRange();

                    if (labels.length == 0) {
//                        redirect because attribute was created and there is no labels for it
                          me.redirectAfterSave(mask);
                    } else {
                        me.labelsCount = labels.length;
                        Ext.Array.each(labels, function(r, index) {
                            me.saveLabel(r.data.name, r.data.code, r.data.description, resp.data.nominalAttributeID, mask);
                        });
                    }
                } else {
                    mask.hide();
                    AIDRFMFunctions.setAlert('Error', 'Error while saving attribute in Tagger');
                }
            }
        });
    },

    saveLabel: function (name, code, description, attributeID, mask) {
        var me = this;
        Ext.Ajax.request({
            url: BASE_URL + '/protected/tagger/createLabel.action',
            method: 'POST',
            params: {
                name: name,
                nominalLabelCode: code,
                description: description,
                nominalAttributeID: attributeID
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success && resp.data) {
                    me.labelsCount = me.labelsCount - 1;
                    if (me.labelsCount == 0) {
                        me.redirectAfterSave(mask);
                    }
                } else {
                    mask.hide();
                    AIDRFMFunctions.setAlert('Error', 'Error while saving labels for attribute in Tagger');
                }
            }
        });
    },

    redirectAfterSave: function(mask) {
        AIDRFMFunctions.setAlert("Ok", ["Attribute created successfully.", 'You will be redirected to Predict a new attribute screen.']);
        mask.hide();

        var maskRedirect = AIDRFMFunctions.getMask(true, 'Redirecting ...');
        maskRedirect.show();

//      wait for 3 sec to let user read information box
        var isFirstRun = true;
        Ext.TaskManager.start({
            run: function () {
                if (!isFirstRun) {
                    document.location.href = BASE_URL + '/protected/' + CRISIS_CODE + '/predict-new-attribute';
                }
                isFirstRun = false;
            },
            interval: 3 * 1000
        });
    }

});