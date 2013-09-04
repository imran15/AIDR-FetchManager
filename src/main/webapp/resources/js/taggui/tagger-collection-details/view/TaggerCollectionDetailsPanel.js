Ext.require([
    'AIDRFM.common.AIDRFMFunctions'
]);

Ext.define('TAGGUI.tagger-collection-details.view.TaggerCollectionDetailsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tagger-collection-details-view',
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
            html: '<div class="bread-crumbs"><a href="' + BASE_URL + '/protected/tagger-home">Tagger</a></div>',
            margin: 0,
            padding: 0
        });

        this.taggerTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Details for crisis "' + CRISIS_NAME + '"',
            flex: 1
        });

        this.modelsTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Predicting is using the following models',
            flex: 1
        });

        this.horisontalLine = Ext.create('Ext.container.Container', {
            width: '100%',
            html: '<div class="horisontalLine"></div>'
        });

        this.predictNewAttribute = Ext.create('Ext.container.Container', {
            html: '<div class="bread-crumbs"><a href="' + BASE_URL + "/protected/" + encodeURI(CRISIS_CODE) + '/predict-new-attribute">Predict a new attribute >></a></div>',
            margin: 0,
            padding: '30 0 0 0'
        });

        this.crisisTypesStore = Ext.create('Ext.data.Store', {
            pageSize: 30,
            storeId: 'crisisTypesStore',
            fields: ['crisisTypeID', 'name'],
            proxy: {
                type: 'ajax',
                url: BASE_URL + '/protected/tagger/getAllCrisisTypes.action',
                reader: {
                    root: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (s) {
                    me.crysisTypesCombo.setValue(CRISIS_TYPE_ID);
                }
            }
        });

        this.crysisTypesCombo = Ext.create('Ext.form.ComboBox', {
            hideLabel: true,
            store: this.crisisTypesStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'crisisTypeID',
            width: 370,
            listeners: {
                change: function(combo, newValue, oldValue, eOpts) {
                    if (newValue == CRISIS_TYPE_ID) {
                        me.saveButton.hide();
                    } else {
                        me.saveButton.show();
                    }
                }
            }
        });

        this.saveButton = Ext.create('Ext.Button', {
            text: 'Save',
            cls:'btn btn-green',
            id: 'crisisSave',
            hidden: true
        });

        this.deleteButton = Ext.create('Ext.Button', {
            text: 'Delete',
            cls:'btn btn-red',
            id: 'crisisDelete',
            margin: '0 0 0 7'
        });

        this.rightBlock = Ext.create('Ext.container.Container', {
            margin: '0 15 0 0',
            flex: 1,
            layout: 'vbox',
            items: [
                {
                    xtype: 'container',
                    width: '100%',
                    html: '<div class="horisontalLine"></div>'
                },
                {
                    xtype: 'container',
                    defaultType: 'label',
                    padding: '0 10',
                    flex: 1,
                    layout: 'vbox',
                    defaults: {
                        margin: '5 0'
                    },
                    height: 130,
                    items: [
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 75,
                                    text: 'Code:'
                                },
                                {
                                    text: CRISIS_CODE
                                }
                            ]
                        },{
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 75,
                                    text: 'Name:'
                                },
                                {
                                    text: CRISIS_NAME
                                }
                            ]
                        },{
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 75,
                                    text: 'Type:'
                                },
                                this.crysisTypesCombo
                            ]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 0 75',
                                    width: 290,
                                    items: [
                                        this.saveButton
                                    ]
                                },
                                this.deleteButton
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    width: '100%',
                    html: '<div class="horisontalLine"></div>'
                }
            ]
        });

        this.leftBlock = Ext.create('Ext.container.Container', {
            margin: '0 0 0 15',
            flex: 1,
            layout: 'vbox',
            items: [
                {
                    xtype: 'container',
                    width: '100%',
                    html: '<div class="horisontalLine"></div>'
                },
                {
                    xtype: 'container',
                    defaultType: 'label',
                    padding: '0 10',
                    flex: 1,
                    layout: 'vbox',
                    defaults: {
                        margin: '5 0'
                    },
                    height: 130,
                    items: [
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 75,
                                    html: '<b>Data feed</b>'
                                },
                                {
                                    html: '<b>URL</b>'
                                }
                            ]
                        },{
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 75,
                                    text: 'Tweet-ids:'
                                },
                                {
                                    html: '<a href="http://aidr.qcri.org/predict/public/"' + CRISIS_CODE + '>http://aidr.qcri.org/predict/public/' + CRISIS_CODE + '</a>'
                                }
                            ]
                        },{
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 75,
                                    text: 'Full:'
                                },
                                {
                                    html: '<a href="http://aidr.qcri.org/predict/protected/"' + CRISIS_CODE + '>http://aidr.qcri.org/predict/protected/' + CRISIS_CODE + '</a><br>'
                                }
                            ]
                        },{
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 75,
                                    text: ''
                                },
                                {
                                    html: 'User: <span class="na-text">N/A</span> Pass: <span class="na-text">N/A</span>'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    width: '100%',
                    html: '<div class="horisontalLine"></div>'
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
            {
                xtype: 'container',
                defaultType: 'label',
                layout: 'hbox',
                items: [
                    this.rightBlock,
                    this.leftBlock
                ]
            },
            this.modelsTitle,
            this.predictNewAttribute
        ];

        this.callParent(arguments);
    }

})