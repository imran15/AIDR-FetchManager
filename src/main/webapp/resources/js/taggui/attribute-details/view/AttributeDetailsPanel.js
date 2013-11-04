Ext.require([
    'AIDRFM.common.AIDRFMFunctions'
]);

Ext.define('TAGGUI.attribute-details.view.AttributeDetailsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.attribute-details-view',
    border: false,
    bodyPadding: 40,
    margin: '25 0',
    width: 1040,
    layout: {
        type: 'vbox',
        align: 'left'
    },

    defaults: {
        width: '100%'
    },

    attributeName: '',

    initComponent: function () {
        var me = this;

        this.breadcrumbs = Ext.create('Ext.container.Container', {
            html: '<div class="bread-crumbs">' +
                '<a href="' + BASE_URL + '/protected/tagger-home">Tagger</a><span>&nbsp;>&nbsp;Attribute details</span></div>',
            margin: 0,
            padding: 0
        });

        this.taggerTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Details for attribute',
            flex: 1
        });

        this.horisontalLine = Ext.create('Ext.container.Container', {
            width: '100%',
            html: '<div class="horisontalLine"></div>'
        });

        this.saveButton = Ext.create('Ext.Button', {
            text: 'Save',
            cls:'btn btn-green',
            id: 'attributeSave',
            hidden: true,
            disabled: true
        });

        this.cancelButton = Ext.create('Ext.Button', {
            text: 'Cancel',
            margin: '0 0 0 10',
            cls:'btn btn-green',
            id: 'attributeCancel',
            hidden: true
        });

        this.editButton = Ext.create('Ext.Button', {
            text: 'Edit',
            cls:'btn btn-green',
            id: 'attributeEdit'
        });

        this.deleteButton = Ext.create('Ext.Button', {
            text: 'Delete',
            cls:'btn btn-red',
            id: 'attributeDelete',
            margin: '0 0 0 7'
        });

        this.buttonsBlock = Ext.create('Ext.container.Container', {
            layout: 'hbox',
            margin: '5 0',
            padding: '0 10',
            hidden: true,
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 0 0',
                    width: 250,
                    items: [
                        this.editButton,
                        this.saveButton,
                        this.cancelButton
                    ]
                },
                this.deleteButton
            ]
        });

        this.codeValue = Ext.create('Ext.form.Label', {flex: 1});
        this.nameValue = Ext.create('Ext.form.Label', {flex: 1});
        this.typeValue = Ext.create('Ext.form.Label', {flex: 1});

        this.nameTextBox = Ext.create('Ext.form.field.Text', {
            flex: 1,
            allowBlank: false,
            hidden: true,
            listeners: {
            change: function(combo, newValue, oldValue, eOpts) {
                if (newValue == '' || newValue == me.attributeName) {
                    me.saveButton.disable();
                } else {
                    me.saveButton.enable();
                }
            }
        }
        });

        this.codeBlock = Ext.create('Ext.container.Container', {
            defaultType: 'label',
            layout: 'hbox',
            height: 22,
            margin: '2 0',
            padding: '0 10',
            items: [
                {
                    width: 75,
                    html: '<b>Code:</b>'
                },
                this.codeValue
            ]
        });

        this.nameBlock = Ext.create('Ext.container.Container', {
            xtype: 'container',
            defaultType: 'label',
            layout: 'hbox',
            height: 22,
            margin: '2 0',
            padding: '0 10',
            items: [
                {
                    width: 75,
                    text: 'Name:'
                },
                this.nameValue,
                this.nameTextBox
            ]
        });

        this.typeBlock = Ext.create('Ext.container.Container', {
            xtype: 'container',
            defaultType: 'label',
            layout: 'hbox',
            height: 22,
            margin: '2 0',
            padding: '0 10',
            items: [
                {
                    width: 75,
                    text: 'Type:'
                },
                this.typeValue
            ]
        });

        this.labelsStore = Ext.create('Ext.data.JsonStore', {
            pageSize: 100,
            storeId: 'labelsStore',
            fields: ['nominalLabelCode', 'description', 'name', 'nominalLabelID'],
            proxy: {
                type: 'ajax',
                url: '',
                reader: {
                    root: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: false
        });

        this.labelsTpl = new Ext.XTemplate(
            '<div class="attribute-list">',

            '<tpl for=".">',

            '<tpl if="xindex == 1">' +
                '<div class="attributes-title"><div class="inner"><h2>Values</h2></div></div>' +
            '</tpl>' +

            '<div class="attribute-item">',

            '<div class="content">',

            '<div class="img">',
            '<img alt="Attribute image" src="/AIDRFetchManager/resources/img/AIDR/AIDR_EMBLEM_CMYK_COLOUR_HR.jpg" width="70">',
            '</div>',

            '<div class="info">',
            '<div class="styled-text-14" id="docCountField_{id}">Name:&nbsp;&nbsp;&nbsp;{name}</div>',
            '<div class="styled-text-14" id="docCountField_{id}">Code:&nbsp;&nbsp;&nbsp;{nominalLabelCode}</div>',
            '<div class="styled-text-14" id="docCountField_{id}">Description:&nbsp;&nbsp;&nbsp;{description}</div>',
            '</div>',

            '</div>',
            '</div>',

            '</tpl>',

            '</div>'
        );

        this.labelsView = Ext.create('Ext.view.View', {
            store: this.labelsStore,
            id: 'labelsViewId',
            tpl: this.labelsTpl,
            itemSelector: 'li.crisesItem'
        });

        this.items = [
            this.breadcrumbs,
            {
                xtype: 'container',
                margin: '5 0 0 0',
                html: '<div class="horisontalLine"></div>'
            },
            {
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    this.taggerTitle
                ]
            },
            {
                xtype: 'container',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'container',
                        width: '100%',
                        html: '<div class="horisontalLine"></div>'
                    },
                    this.codeBlock,
                    this.nameBlock,
                    this.typeBlock,
                    this.buttonsBlock
                ]
            },
            {
                xtype: 'container',
                width: '100%',
                html: '<div class="horisontalLine"></div>'
            },
            this.labelsView
        ];

        this.callParent(arguments);
    }

})