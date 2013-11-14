Ext.define('TAGGUI.attribute-details.view.AttributeValuePanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.attribute-value-view',

    name: '',
    code: '',
    description: '',

    layout: 'hbox',
    border: true,
    cls: 'horizontalLineTop',
    padding: '10 0 10 0',
    width: '100%',
    labelId: 0,

    initComponent: function () {
        var me = this;

        this.nameValue = Ext.create('Ext.form.Label', {
            flex: 1,
            cls: 'styled-text-14',
            text: this.name
        });

        this.nameTextBox = Ext.create('Ext.form.field.Text', {
            flex: 1,
            allowBlank: false,
            hidden: true,
            value: this.name
            ,
            listeners: {
                change: function(combo, newValue) {
                    if (newValue != '' && newValue != me.attributeName) {
                        me.enableParentSaveButton();
                    }
                }
            }
        });

        this.codeValue = Ext.create('Ext.form.Label', {
            flex: 1,
            cls: 'styled-text-14',
            text: this.code
        });

        this.descriptionValue = Ext.create('Ext.form.Label', {
            flex: 1,
            cls: 'styled-text-14',
            text: this.description
        });

        this.items = [
            {
                xtype: 'image',
                width: 70,
                height: 70,
                src: '/AIDRFetchManager/resources/img/AIDR/AIDR_EMBLEM_CMYK_COLOUR_HR.jpg'
            },
            {
                xtype: 'container',
                layout: 'vbox',
                padding: '5 0 0 20',
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        height: 22,
                        items: [
                            {
                                xtype: 'label',
                                width: 100,
                                html: 'Name:',
                                cls: 'styled-text-14'
                            },
                            this.nameValue,
                            this.nameTextBox
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        height: 22,
                        items: [
                            {
                                xtype: 'label',
                                width: 100,
                                html: 'Code:',
                                cls: 'styled-text-14'
                            },
                            this.codeValue
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        height: 22,
                        items: [
                            {
                                xtype: 'label',
                                width: 100,
                                html: 'Description:',
                                cls: 'styled-text-14'
                            },
                            this.descriptionValue
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    },

    edit: function(){
        this.nameValue.hide();
        this.nameTextBox.show();
    },

    cancel: function(){
        this.nameValue.show();
        this.nameTextBox.hide();

        this.nameTextBox.setValue(this.name);
    },

    save: function(){
        var me = this;

        var newName = this.nameTextBox.getValue();
        if (this.name != newName && newName != '') {

            Ext.Ajax.request({
                url: BASE_URL + '/protected/tagger/updateLabel.action',
                method: 'POST',
                params: {
                    labelID: me.labelId,
                    labelName: newName
                },
                headers: {
                    'Accept': 'application/json'
                },
                success: function (resp) {
                    var response = Ext.decode(resp.responseText);
//                    TODO change response handler after updateLabel service will be fixed in Tagger
//                    if (response.success) {
//                        me.mainComponent.nameTextBox.hide();
//                        me.mainComponent.saveButton.hide();
//                        me.mainComponent.cancelButton.hide();
//
//                        me.mainComponent.nameValue.setText(attributeName, false);
//                        me.mainComponent.nameValue.show();
//                        me.mainComponent.editButton.show();
//                    } else {
//                        AIDRFMFunctions.setAlert("Error", 'Error while updating attribute in Tagger.');
//                    }
//                    me.mainComponent.cancelButton.enable();
//                    me.mainComponent.deleteButton.enable();
                },
                failure: function () {
                    AIDRFMFunctions.setAlert("Error", "System is down or under maintenance. For further inquiries please contact admin.");
//                    me.attributeCancel();
//                    me.mainComponent.cancelButton.enable();
//                    me.mainComponent.deleteButton.enable();
                }
            });



            this.nameValue.setText(newName);
            this.name = newName;
        }
        this.cancel();
    },

    enableParentSaveButton: function() {
        Ext.getCmp('valuesSave').enable();
    }

});