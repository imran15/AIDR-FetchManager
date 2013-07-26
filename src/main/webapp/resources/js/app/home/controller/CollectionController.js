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
                    var mask = this.getMask(false);
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
            }

        });


    },

    beforeRenderView: function (component, eOpts) {
        this.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
        this.msgCt.setStyle('position', 'absolute');
        this.msgCt.setStyle('z-index', 99999);
        this.msgCt.setWidth(300);

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
                    var mask = collectionController.getMask(false);
                    mask.hide();

                    me.setAlert("Ok", "Collection created successfully");

                    collectionController.mainComponent.win.hide();
                    collectionController.mainComponent.collectionStore.load();

                    collectionController.mainComponent.editForm.getForm().reset();
                }
            });
        }
    },

    getMask: function (show, msg) {
        if (show) {
            if (!msg) {
                msg = 'Loading...';
            }
        }
        if (this.maskScreen == null) {
            this.maskScreen = new Ext.LoadMask(Ext.getBody(), {msg: msg});
        } else {
            this.maskScreen.msg = msg;
        }
        return this.maskScreen;
    },

    setAlert: function (status, msg) {
        var message = '<ul>';
        if (Ext.isArray(msg)) {
            Ext.each(msg, function (ms) {
                message += '<li>' + ms + '</li>';
            })
        } else {
            message = '<li>' + msg + '</li>';
        }
        message += '</ul>';

        // add some smarts to msg's duration (div by 13.3 between 3 & 9 seconds)
        var delay = msg.length / 13.3;
        if (delay < 3) {
            delay = 3;
        }
        else if (delay > 9) {
            delay = 9;
        }
        delay = delay * 1000;

        this.msgCt.alignTo(document, 't-t');
        Ext.DomHelper.append(this.msgCt, {html: this.buildMessageBox(status, message)}, true).slideIn('t').ghost("t", {delay: delay, remove: true});
    },

    buildMessageBox : function(title, msg) {
        return [
            '<div class="app-msg">',
            '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
            '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3 class="x-icon-text icon-status-' + title + '">', title, '</h3>', msg, '</div></div></div>',
            '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
            '</div>'
        ].join('');
    }

});