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
                    var mask = AIDRFMFunctions.getMask(false);
                    mask.show();

                    collectionController.mainComponent.win.show();
                }
            },

            "#collectionNameInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'Give a name to your collection. For example, Hurricane Sandy, Earthquake Japan.',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionCodeInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: ' Collection code consists of alpha-numeric short code name to a collection. ' +
                            'Spaces are not allowed in the code name. For example, Sandy2012, EQJapan2013 are valid code names',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionkeywordsInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'This field represents comma separated keywords to filter the Twitter stream. Keywords are neither case sensitive nor #sensitive. Spaces between words will be treated as ANDing, and commas as ORing.',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionGeoInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'This field represents a comma-separated pairs of longitude and latitude. A valid geo location represents a bounding box with southwest corner of the box coming first. Visit <a href="http://boundingbox.klokantech.com/">http://boundingbox.klokantech.com</a> to get a valid bounding box.',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionFollowInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: "Follow represents a comma-separated list twitter users� IDs to be followed. A valid twitter user id must be in the numeric format.",
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionLangInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: "This field is used to set a comma separated list of language codes to filter results only to the specified languages. The language codes must be a valid BCP 47 language identifier.",
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
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
    },

    mandatoryFieldsEntered: function () {
        var isValid = true;
        var form = Ext.getCmp('collectionForm').getForm();
        if (!form.findField('code').getValue()) {
            form.findField('code').markInvalid(['Collection Code is mandatory']);
            Ext.MessageBox.alert('Error', 'Collection Code is mandatory', function (btnId) {
            });
            return false;
        }
        if (form.findField('code').getValue() && form.findField('code').getValue().length > 15) {
            form.findField('code').markInvalid(['The maximum length for Collection Code field is 15']);
            Ext.MessageBox.alert('Error', 'The maximum length for Collection Code field is 15', function (btnId) {
            });
        }
        if (!form.findField('name').getValue()) {
            form.findField('name').markInvalid(['Collection Name is mandatory']);
            Ext.MessageBox.alert('Error', 'Collection Name is mandatory', function (btnId) {
            });
        }
        if (!(form.findField('track').getValue() || form.findField('geo').getValue() || form.findField('follow').getValue())) {
            Ext.MessageBox.alert('Error', 'One of Keywords,Geo or Follow field is mandatory', function (btnId) {
            });
            isValid = false;
        }
        return isValid;
    },

    saveCollection: function () {
        var me = this;

        if (collectionController.mandatoryFieldsEntered()) {
            var form = Ext.getCmp('collectionForm').getForm();
            Ext.Ajax.request({
                url: 'collection/save.action',
                method: 'POST',
                params: {
                    name: form.findField('name').getValue(),
                    code: form.findField('code').getValue(),
                    track: form.findField('track').getValue(),
                    follow: form.findField('follow').getValue(),
                    geo: form.findField('geo').getValue(),
                    langFilters: form.findField('langFilters').getValue()
                },
                headers: {
                    'Accept': 'application/json'
                },
                waitMsg: 'Saving collection ...',
                success: function (response) {
                    var mask = AIDRFMFunctions.getMask(false);
                    mask.hide();

                    AIDRFMFunctions.setAlert("Ok", "Collection created successfully");

                    collectionController.mainComponent.win.hide();
                    collectionController.mainComponent.collectionStore.load();

                    collectionController.mainComponent.editForm.getForm().reset();
                }
            });
        }
    }

});