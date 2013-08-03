Ext.require([
    'AIDRFM.common.AIDRFMFunctions'
]);

Ext.define('AIDRFM.collection-details.view.CollectionDetailsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.collection-details-view',
    border: false,
    bodyPadding: 40,
    margin: '25 0',
    width: 1040,
    layout: {
        type: 'vbox',
        align: 'left'
    },

    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'side'
    },

    defaults: {
        width: '100%'
    },

    initComponent: function () {
        var me = this;

        this.breadcrumbs = Ext.create('Ext.container.Container', {
            html: '<div class="bread-crumbs"><a href="home">Home</a></div>',
            margin: 0,
            padding: 0
        });

        this.horisontalLine = Ext.create('Ext.container.Container', {
            margin: '5 0 0 0',
            html: '<div class="horisontalLine"></div>'
        });

        this.collectionTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1',
            margin: '10 0 15 0',
            padding: 0,
            text: 'Collection: ',
            flex: 1
        });

        this.refreshButton = Ext.create('Ext.Button', {
            text: null,
            height: 32,
            width: 32,
            margin: '13 0 0 0',
            tooltip: 'Refresh',
            iconCls: 'refrashIcon',
            id: 'refreshBtn'
        });

        this.collectionHistoryTitle = Ext.create('Ext.form.Label', {
            hidden: true,
            padding: '10 0 0 0',
            cls: 'header-h1',
            text: 'Collection History'
        });

        this.statusL = Ext.create('Ext.form.Label', {padding: '0 10 0 0'});
        this.lastStartedL = Ext.create('Ext.form.Label', {flex: 1});
        this.lastStoppedL = Ext.create('Ext.form.Label', {flex: 1});
        this.codeL = Ext.create('Ext.form.Label', {flex: 1});
        this.keywordsL = Ext.create('Ext.form.Label', {flex: 1});
        this.geoL = Ext.create('Ext.form.Label', {flex: 1});
        this.followL = Ext.create('Ext.form.Label', {flex: 1});
        this.languageFiltersL = Ext.create('Ext.form.Label', {flex: 1});
        this.createdL = Ext.create('Ext.form.Label', {flex: 1});
        this.docCountL = Ext.create('Ext.form.Label', {flex: 1});
        this.lastDocL = Ext.create('Ext.form.Label', {flex: 1});

        this.timeDurationL = Ext.create('Ext.form.Label', {
            flex: 1,
            text: 'Time duration',
            padding: '15 0 0 0',
            cls: 'header-h2'
        });

        this.configurationsL = Ext.create('Ext.form.Label', {
            flex: 1,
            text: 'Configurations',
            padding: '15 0 0 0',
            cls: 'header-h2'
        });

        this.codeE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Code',
            name: 'code',
            allowBlank: false,
            flex: 1,
            emptyText: 'e.g., Sandy2012 or EQJapan2011',
            maxLength: 15,
            maxLengthText: 'The maximum length for this field is 15 ',
            maskRe: /[^ ]/,
            disabled: true
        });

        this.nameE = Ext.create('Ext.form.field.Text', {
            flex: 1,
            fieldLabel: 'Name',
            name: 'name',
            allowBlank: false,
            emptyText: 'e.g., Hurricane Sandy'
        });

        this.keywordsE = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: 'Keywords',
            name: 'track',
            allowBlank: false,
            flex: 1,
            rows: 8,
            emptyText: 'e.g., #sandy, #newyork,#joplin'
        });

        this.geoE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Geographical region',
            labelWidth: 120,
            name: 'geo',
            flex: 1,
            emptyText: 'e.g., 43.43, 22.44, 89.32, 56.43'
        });

        this.followE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Follow specific users',
            name: 'follow',
            labelWidth: 120,
            flex: 1,
            emptyText: 'e.g., 47423744, 53324456'
        });

        this.languageFiltersE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Language Filters',
            name: 'langFilters',
            labelWidth: 120,
            flex: 1,
            emptyText: 'e.g., en, ar, ja'
        });

        this.startButton = Ext.create('Ext.Button', {
            text: 'Start',
            margin: 0,
            cls:'btn btn-blue',
            id: 'collectionStart',
            hidden: true
        });

        this.stopButton = Ext.create('Ext.Button', {
            text: 'Stop',
            cls:'btn btn-red',
            id: 'collectionStop',
            margin: '0 0 0 10',
            hidden: true
        });

        this.configurationsL = Ext.create('Ext.form.Label', {
            flex: 1,
            text: 'Configurations',
            padding: '15 0 0 0',
            cls: 'header-h2'
        });

        this.saveButton = Ext.create('Ext.Button', {
            text: 'Save',
            margin: '0 10 0 10',
            cls:'btn btn-green',
            id: 'collectionUpdate'
        });

        this.cancelButton = Ext.create('Ext.Button', {
            text: 'Cancel',
            cls:'btn btn-red',
            id: 'collectionEditCancel'
        });

        this.collectionLogStore = Ext.create('Ext.data.Store', {
            pageSize: 10,
            storeId: 'collectionLogStore',
            fields: ['id', 'collectionID', 'langFilters', 'startDate', 'endDate', 'count', 'track', 'geo', 'follow'],
            proxy: {
                type: 'ajax',
                url: 'collection-log/findAllForCollection.action',
                reader: {
                    root: 'items',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                beforeload: function (s) {
                    var id = me.currentCollectionId;
                    s.getProxy().extraParams = {
                        id: id
                    }
                },
                load: function (s) {
                    var count = s.getCount();
                    if (count > 0) {
                        me.collectionHistoryTitle.show();
                        me.collectionLogView.show();
                    } else {
                        me.collectionHistoryTitle.hide();
                        me.collectionLogView.hide();
                    }
                }
            }
        });

        this.collectionLogTpl = new Ext.XTemplate(
            '<div class="collections-list">',
            '<tpl for=".">',

            '<div class="collection-item">',

            '<div class="img">',
            '<img alt="Collection History image" height="70" src="/AIDRFetchManager/resources/img/twitter_icon2.png" width="70">',
            '</div>',

            '<div class="content">',

            '<div class="rightColumn">',
            '<div>Downloaded documents:</div>',
            '<div>Start Date:</div>',
            '<div>End Date:</div>',
            '<div>Geographical region:</div>',
            '<div>Follow specific users:</div>',
            '<div>Language Filters:</div>',
            '<div>Keywords:</div>',
            '</div>',

            '<div class="leftColumn">',
            '<div>{[this.getDocNumber(values.count)]}</div>',
            '<div>{[this.getField(values.startDate)]}</div>',
            '<div>{[this.getField(values.endDate)]}</div>',
            '<div>{[this.getField(values.geo)]}</div>',
            '<div>{[this.getField(values.follow)]}</div>',
            '<div>{[this.getField(values.langFilters)]}</div>',
            '<div>{[this.getField(values.track)]}</div>',
            '</div>',

            '</div>',
            '</div>',

            '</tpl>',
            '</div>',
            {
                getField: function (r) {
                    return r ? r : "<span class='na-text'>Not specified</span>";
                },
                getDocNumber: function (r) {
                    return r ? r : 0;
                }
            }
        );

        this.collectionLogView = Ext.create('Ext.view.View', {
            hidden: true,
            store: this.collectionLogStore,
            tpl: this.collectionLogTpl,
            itemSelector: 'div.active'
        });

        this.editForm = {
            xtype: 'form',
            border: false,
            id: 'collectionForm',
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
                                    id: 'collectionCodeInfo'
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
                                    id: 'collectionNameInfo'
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
                                this.keywordsE,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionkeywordsInfo'
                                }
                            ]
                        },
                        this.configurationsL,
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            items: [
                                this.geoE,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionGeoInfo'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            items: [
                                this.followE,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionFollowInfo'
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
                                this.languageFiltersE,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionLangInfo'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            padding: '15 0 0 0',
                            items: [
                                this.saveButton,
                                this.cancelButton
                            ]
                        }
                    ]
                }
            ]
        };

        this.detailsPanel = Ext.create('Ext.container.Container', {
            defaults: {
                margin: '5 0'
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '5 0'
                    },
                    minHeight: 300,
                    items: [
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            padding: '10 0',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'container',
                                    padding: '0 20 0 0',
                                    html: '<img src="/AIDRFetchManager/resources/img/collection-icon.png"/>'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaultType: 'label',
                                    layout: 'vbox',
                                    defaults: {
                                        margin: '5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            defaultType: 'label',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    padding: '0 10 0 0',
                                                    text: 'Code:'
                                                },
                                                this.codeL
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            defaultType: 'label',
                                            layout: 'hbox',
                                            items: [
                                                this.statusL,
                                                {
                                                    flex: 1,
                                                    text: 'Status'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaultType: 'label',
                                    padding: '22 0 0 0',
                                    layout: 'hbox',
                                    items: [
                                        this.startButton,
                                        this.stopButton
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            cls: 'bordered-top',
                            items: [
                                {
                                    width: 170,
                                    text: 'Last downloaded document:'
                                },
                                this.lastDocL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            cls: 'bordered-bottom',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Downloaded documents:'
                                },
                                this.docCountL
                            ]
                        },
                        this.timeDurationL,
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Created on:'
                                },
                                this.createdL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Last Started On:'
                                },
                                this.lastStartedL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            cls: 'bordered-bottom',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Last Stopped On:'
                                },
                                this.lastStoppedL
                            ]
                        },
                        this.configurationsL,
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Keywords:'
                                },
                                this.keywordsL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Geographical region:'
                                },
                                this.geoL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Follow specific users:'
                                },
                                this.followL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            cls: 'bordered-bottom',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Language Filters:'
                                },
                                this.languageFiltersL
                            ]
                        }

                    ]
                }
            ]
        });

        this.tabPanel = Ext.create('Ext.tab.Panel', {
            cls: 'tabPanel',
            width: '100%',
            minHeight: 400,
            activeTab: 0,
            items: [
                {
                    title: 'Details',
                    items: [
                        this.detailsPanel
                    ]
                },
                {
                    title: 'Edit',
                    padding: '10 0 0 0',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        this.editForm
                    ]
                },
                {
                    title: 'Download',
                    padding: '10 0 0 0',
                    html: '<div class="styled-text">You can read the collected tweets from:<br><br>' +
                        '<b>1.</b>&nbsp;&nbsp;File /var/data/aidr/persister/syria_civil_war.json on server scd1.qcri.org<br>' +
                        '<b>2.</b>&nbsp;&nbsp;Redis queue FetcherChannel.syria_civil_war on host scd1.qcri.org port 6379<br></div>'
                }
            ],
            listeners: {
                'tabchange': function (tabPanel, tab) {
                    var tabIndex = tabPanel.items.findIndex('id', tab.id)
                    if (tabIndex == 0){
                        me.collectionHistoryTitle.show();
                        me.collectionLogView.show();
                    } else {
                        me.collectionHistoryTitle.hide();
                        me.collectionLogView.hide();
                    }
                }
            }
        });

        this.items = [
            this.breadcrumbs,
            this.horisontalLine,
            {
                xtype: 'container',
                layout: 'hbox',
                padding: '10 0',
                items: [
                    this.collectionTitle,
                    this.refreshButton
                ]
            },
            this.tabPanel,
            this.collectionHistoryTitle,
            this.collectionLogView
        ];

        this.callParent(arguments);
    }

})