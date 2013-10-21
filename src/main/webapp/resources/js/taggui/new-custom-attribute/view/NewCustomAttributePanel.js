Ext.require([
    'AIDRFM.common.AIDRFMFunctions'
]);

Ext.define('TAGGUI.new-custom-attribute.view.NewCustomAttributePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.new-custom-attribute-view',
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

    initComponent: function () {
        var me = this;

        this.breadcrumbs = Ext.create('Ext.container.Container', {
            html: '<div class="bread-crumbs">' +
                '<a href="' + BASE_URL + '/protected/tagger-home">Tagger</a><span>&nbsp;>&nbsp;New Custom Category</span></div>',
            margin: 0,
            padding: 0
        });

        this.taggerTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'New Custom Attribute',
            flex: 1
        });

        this.horisontalLine = Ext.create('Ext.container.Container', {
            width: '100%',
            html: '<div class="horisontalLine"></div>'
        });

        this.codeE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Code',
            name: 'code',
            allowBlank: false,
            flex: 1,
            emptyText: 'Enter code for your category',
            maxLength: 15,
            maxLengthText: 'The maximum length for this field is 15 ',
            maskRe: /[^ ]/
        });

        this.nameE = Ext.create('Ext.form.field.Text', {
            flex: 1,
            fieldLabel: 'Name',
            name: 'name',
            allowBlank: false,
            emptyText: 'Enter name for category'
        });

        this.descriptionE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Description',
            name: 'description',
            allowBlank: true,
            flex: 1,
            emptyText: 'Enter description for category'
        });

        this.codeLabelE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Code',
            name: 'code',
            allowBlank: false,
            flex: 1,
            emptyText: 'Enter code for Label',
            maxLength: 15,
            maxLengthText: 'The maximum length for this field is 15 ',
            maskRe: /[^ ]/
        });

        this.nameLabelE = Ext.create('Ext.form.field.Text', {
            flex: 1,
            fieldLabel: 'Name',
            name: 'name',
            allowBlank: false,
            emptyText: 'Enter name for Label'
        });

        this.DescriptionLabelE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Description',
            name: 'description',
            allowBlank: true,
            flex: 1,
            emptyText: 'Enter description for Label'
        });

        this.newLabelL = Ext.create('Ext.form.Label', {
            flex: 1,
            text: 'New Label',
            padding: '15 0 0 0',
            cls: 'header-h2'
        });

        this.saveButton = Ext.create('Ext.Button', {
            text: 'Save',
            margin: '0 10 0 10',
            cls: 'btn btn-green',
            id: 'attributeCreate'
        });

        this.cancelButton = Ext.create('Ext.Button', {
            text: 'Cancel',
            cls: 'btn btn-red',
            id: 'attributeCancelCreate'
        });

        this.addLabelButton = Ext.create('Ext.Button', {
            text: 'Add Label',
            cls: 'btn btn-green',
            id: 'addLabel'
        });

        this.labelsStore = Ext.create('Ext.data.JsonStore', {
            pageSize: 100,
            storeId: 'labelsStore',
            fields: ['code', 'description', 'name'],
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
                '<div class="attributes-title"><div class="inner"><h2>Labels</h2></div></div>' +
            '</tpl>' +

            '<div class="attribute-item">',

            '<div class="content">',

            '<div class="img">',
            '<a href="' + BASE_URL + '/protected/{nominalAttributeID}/attribute-details"><img alt="Attribute image" src="/AIDRFetchManager/resources/img/AIDR/AIDR_EMBLEM_CMYK_COLOUR_HR.jpg" width="70"></a>',
            '</div>',

            '<div class="info">',
            '<div class="styled-text-14" id="docCountField_{id}">Name:&nbsp;&nbsp;&nbsp;{name}</div>',
            '<div class="styled-text-14" id="docCountField_{id}">Code:&nbsp;&nbsp;&nbsp;{code}</div>',
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

        this.editForm = Ext.create('Ext.form.Panel', {
            id: 'collectionForm',
            bodyCls: 'no-border',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        width: 350,
                        labelWidth: 120
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            items: [
                                this.codeE,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'codeInfo'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            items: [
                                this.nameE,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'nameInfo'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0 0 0',
                            padding: '0 0 20 0',
                            cls: 'bordered-bottom',
                            items: [
                                this.descriptionE,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'descriptionInfo'
                                }
                            ]
                        },
                        this.newLabelL,
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            items: [
                                this.codeLabelE
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            items: [
                                this.nameLabelE
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0 0 0',
                            items: [
                                this.DescriptionLabelE
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            padding: '15 0 15 0',
                            cls: 'bordered-bottom',
                            items: [
                                this.addLabelButton
                            ]
                        }
                    ]
                }
            ]
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
            this.editForm,
            this.labelsView,
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '15 0 0 0',
                items: [
                    this.saveButton,
                    this.cancelButton
                ]
            }
        ];

        this.callParent(arguments);
    }

})