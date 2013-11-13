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
            html: '<div class="bread-crumbs">' +
                '<a href="' + BASE_URL + '/protected/tagger-home">Tagger</a><span>&nbsp;>&nbsp;Details</span></div>',
            margin: 0,
            padding: 0
        });

        this.taggerTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Tagger for "' + CRISIS_NAME + '"',
            flex: 1
        });

        this.classifiersTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Classifiers',
            flex: 1
        });

        this.gotoCollectorButton = Ext.create('Ext.Button', {
            text: 'Go To Collector',
            cls:'btn btn-blue',
            id: 'goToCollector',
            margin: '30 0 0 0'
        });

        this.settingsTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Settings',
            flex: 1
        });

        this.publicLink = Ext.create('Ext.container.Container', {
            html: 'Public link for volunteers:',
            margin: '6 15 0 0'
        });

        this.socialIcons = Ext.create('Ext.container.Container', {
            flex: 1,
            layout: 'hbox',
            defaults: {
                margin: '0 5 0 0'
            },
            items: [
                {
                    xtype: 'image',
                    src: '/AIDRFetchManager/resources/img/icons/twitter-icon.png'
                },{
                    xtype: 'image',
                    src: '/AIDRFetchManager/resources/img/icons/facebook-icon.png'
                },{
                    xtype: 'image',
                    src: '/AIDRFetchManager/resources/img/icons/google-icon.png'
                },{
                    xtype: 'image',
                    src: '/AIDRFetchManager/resources/img/icons/pinterest-icon.png'
                }
            ]
        });

        this.pyBossaLink = Ext.create('Ext.container.Container', {
            html: '<div class="gray-backgrpund"><i>http://pybossa-dev.qcri.org/AIDRCrowdsourcingAPI/crisisContent.html?code=' + CRISIS_CODE + '</i></div>',
            margin: '5 0 5 0'
        });

        this.horisontalLine = Ext.create('Ext.container.Container', {
            width: '100%',
            html: '<div class="horisontalLine"></div>'
        });

        this.predictNewAttribute = Ext.create('Ext.container.Container', {
            html: '<div class="bread-crumbs"><a href="' + BASE_URL + "/protected/" + encodeURI(CRISIS_CODE) + '/predict-new-attribute">Add a new classifier</a></div>',
            margin: 0,
            flex:1
        });

        this.aucHint = Ext.create('Ext.container.Container', {
            html: '<span class="redInfo">*</span>If AUC is lower than 0.8-0.9, or AUC is 1.0, you urgently need more training examples.',
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
            fields: ['attribute', 'auc', 'classifiedDocuments', 'modelID', 'status', 'trainingExamples', 'modelFamilyID'],
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
            '<div class="styled-text-17">Name:</div>',
            '<div>Status:</div>',
            '<div>Training examples:</div>',
            '<div>Classified elements (since last change of the classifier):</div>',
            '<div>Quality (AUC)<span class="redInfo">*</span>:</div>',
            '</div>',

            '<div class="leftColumn">',
            '<div class="styled-text-17">{[this.getModelName(values.modelID, values.attribute)]}</div>',
            '<div>{[this.getStatus(values.modelID)]}</div>',
            '<div>{[this.getNumber(values.trainingExamples)]} &mdash; <a href="' + BASE_URL +  '/protected/'
                + CRISIS_CODE + '/{modelID}/{modelFamilyID}/training-data">Manage training examples &raquo;</a></div>',
            '<div>{[this.getNumber(values.classifiedDocuments)]}</div>',
            '<div>{[this.getAucNumber(values.auc)]}</div>',

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
                            return '<span class="redInfo">' + r.toFixed(2) + '</span>';
                        } else if (r <= 0.8){
                            return '<span class="warningFont">' + r.toFixed(2) + '</span>';
                        }
                        return '<span class="greenInfo">' + r.toFixed(2) + '</span>';
                    }
                    return '<span class="redInfo">0.0</span>';
                },
                getModelName: function (modelId, modelName) {
                    if (modelId && modelId != 0) {
                        return '<a href="' + BASE_URL + '/protected/' + CRISIS_CODE + '/' + modelId + '/model-details">' + modelName + '</a>';
                    } else {
                        return modelName;
                    }
                },
                getStatus: function (modelId) {
                    if (modelId && modelId != 0) {
                        return 'Running';
                    } else {
                        return 'Waiting training examples';
                    }
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
            width: 280,
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

        this.detailsBlock = Ext.create('Ext.container.Container', {
            flex: 1,
            layout: 'vbox',
            items: [
//                {
//                    xtype: 'container',
//                    width: '100%',
//                    html: '<div class="horisontalLine"></div>'
//                },
                {
                    xtype: 'container',
                    defaultType: 'label',
                    padding: '0 10',
                    flex: 1,
                    layout: 'vbox',
                    defaults: {
                        margin: '5 0'
                    },
                    height: 120,
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


        this.feedsBlock = Ext.create('Ext.container.Container', {
            flex: 1,
            layout: 'vbox',
            items: [
                {
                    xtype: 'container',
                    defaultType: 'label',
                    padding: '0 10',
                    flex: 1,
                    layout: 'vbox',
                    defaults: {
                        margin: '5 0'
                    },
                    height: 100,
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
                flex: 1,
                layout: 'hbox',
                margin: '0 0 5 0',
                items: [
                    this.publicLink,
                    this.socialIcons
                ]
            },
            this.pyBossaLink,
            {
                xtype: 'container',
                margin: '15 0 0 0',
                html: '<div class="horisontalLine"></div>'
            },
            this.classifiersTitle,
            this.crisisModelsView,
            {
                xtype: 'container',
                layout: 'hbox',
                padding: '15 0 0 0',
                items: [
                    this.predictNewAttribute,
                    this.aucHint
                ]
            },
            {
                xtype: 'container',
                margin: '15 0 0 0',
                html: '<div class="horisontalLine"></div>'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    this.settingsTitle,
                    this.gotoCollectorButton
                ]
            },
            this.detailsBlock,
            this.feedsBlock
        ];

        this.callParent(arguments);
    }

})