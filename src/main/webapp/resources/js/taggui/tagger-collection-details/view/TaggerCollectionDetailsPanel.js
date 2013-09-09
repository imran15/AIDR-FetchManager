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
            flex:1
        });

        this.aucHint = Ext.create('Ext.container.Container', {
            html: '<span class="redInfo">*</span>If AUC is low, it is recommended that you add more training examples.',
            margin: 0
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

        this.crisisModelsStore = Ext.create('Ext.data.Store', {
            pageSize: 30,
            storeId: 'crisisModelsStore',
            fields: ['attribute', 'auc', 'classifiedDocuments', 'modelID', 'status', 'trainingExamples'],
            proxy: {
                type: 'ajax',
                url: BASE_URL + '/protected/tagger/getModelsForCrisis.action',
                reader: {
                    root: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                beforeload: function (s) {
                    s.getProxy().extraParams = {
                        id: CRISIS_ID
                    }
                }
            }
        });

        this.crisisModelsTpl = new Ext.XTemplate(
            '<div class="collections-list">',
            '<tpl for=".">',

            '<div class="collection-item">',

            '<div class="img">',
            '<img alt="Collection History image" src="/AIDRFetchManager/resources/img/AIDR/AIDR_EMBLEM_CMYK_COLOUR_HR.jpg" width="70">',
            '</div>',

            '<div class="content">',

            '<div class="rightColumn">',
            '<div class="styled-text-17">Attribute:</div>',
            '<div>Status:</div>',
            '<div>Training examples:</div>',
            '<div>Classified elements:</div>',
            '<div>AUC<span class="redInfo">*</span>:</div>',
            '<div>Operations:</div>',
            '</div>',

            '<div class="leftColumn">',
            '<div class="styled-text-17"><a href="' + BASE_URL +  '/protected/' + CRISIS_CODE + '/{modelID}/model-details">{[this.getField(values.attribute)]}</a></div>',
            '<div>{[this.getField(values.status)]}</div>',
            '<div>{[this.getNumber(values.trainingExamples)]}</div>',
            '<div>{[this.getNumber(values.classifiedDocuments)]}</div>',
            '<div>{[this.getAucNumber(values.auc)]}</div>',
            '<div><a href="#">Manage training examples >></a></div>',

            '</div>',

            '</div>',
            '</div>',

            '</tpl>',
            '</div>',
            {
                getField: function (r) {
                    return r ? r : "<span class='na-text'>Not specified</span>";
                },
                getNumber: function (r) {
                    return r ? r : 0;
                },
                getAucNumber: function (r) {
                    if (r){
                        if (r < 0.6){
                            return '<span class="redInfo">' + r + '</span>';
                        } else if (r <= 0.8){
                            return '<span class="warningFont">' + r + '</span>';
                        }
                        return '<span class="greenInfo">' + r + '</span>';
                    }
                    return '<span class="redInfo">0.0</span>';
                }
            }
        );

        this.crisisModelsView = Ext.create('Ext.view.View', {
            store: this.crisisModelsStore,
            tpl: this.crisisModelsTpl,
            itemSelector: 'div.active',
            loadMask: false
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
                layout: 'hbox',
                items: [
                    this.rightBlock,
                    this.leftBlock
                ]
            },
            this.modelsTitle,
            this.crisisModelsView,
            {
                xtype: 'container',
                layout: 'hbox',
                padding: '25 0 0 0',
                items: [
                    this.predictNewAttribute,
                    this.aucHint
                ]
            }
        ];

        this.callParent(arguments);
    }

})