Ext.define('AIDRFM.home.view.CollectionDetailsPanel', {
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

        this.collectionTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1',
            text: 'Collection: '
        });

        this.collectionHistoryTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1',
            text: 'Collection History'
        });

        this.statusL = Ext.create('Ext.form.Label', {flex: 1});
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
            fieldLabel: 'Geo',
            name: 'geo',
            flex: 1,
            emptyText: 'e.g., 43.43, 22.44, 89.32, 56.43'
        });

        this.followE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Follow',
            name: 'follow',
            flex: 1,
            emptyText: 'e.g., 47423744, 53324456'
        });

        this.languageFiltersE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Language Filters',
            name: 'langFilters',
            flex: 1,
            emptyText: 'e.g., en, ar, ja'
        });

        this.startButton = Ext.create('Ext.Button', {
            text: 'Start',
            margin: '0 10 0 10',
            cls:'btn btn-blue',
            id: 'collectionStart'
        });

        this.stopButton = Ext.create('Ext.Button', {
            text: 'Stop',
            cls:'btn btn-red',
            id: 'collectionStop'
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
                    var id = datailsController.DetailsComponent.currentCollection.id;
                    s.getProxy().extraParams = {
                        id: id
                    }
                },
                load: function (s) {
                    var count = s.getCount();
                    if (count > 0) {
                        me.collectionHistoryTitle.show();
                        me.collectionLogGrid.show();
                    } else {
                        me.collectionHistoryTitle.hide();
                        me.collectionLogGrid.hide();
                    }
                }
            }
        });

        this.collectionLogGrid = Ext.create('Ext.grid.Panel', {
            id: 'collectionLogGrid',
            margin: '0 0 15 0',
            store: this.collectionLogStore,
            height: 300,
            title: 'Collection History',
            columns: [
                {
                    text: 'ID',
                    width: 25,
                    sortable: true,
                    dataIndex: 'id'
                },
                {
                    text: 'Start Date',
                    width: 80,
                    sortable: true,
                    dataIndex: 'startDate'
                },
                {
                    text: 'End Date',
                    width: 80,
                    sortable: true,
                    dataIndex: 'endDate'
                },
                {
                    text: 'Keywords',
                    width: 210,
                    sortable: true,
                    dataIndex: 'track'
                },
                {
                    text: 'Geo',
                    width: 140,
                    sortable: true,
                    dataIndex: 'geo'
                },
                {
                    text: 'Follow',
                    width: 140,
                    sortable: true,
                    dataIndex: 'follow'
                },
                {
                    text: 'Language Filters',
                    width: 140,
                    sortable: true,
                    dataIndex: 'langFilters'
                },
                {
                    text: 'Documents Count',
                    width: 140,
                    sortable: true,
                    dataIndex: 'count',
                    renderer: function (value, p, record) {
                        return value ? value : 0;
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: this.collectionLogStore,
                    dock: 'bottom',
                    displayInfo: true,
                    displayMsg: 'Displaying collections history entries {0} - {1} of {2}',
                    emptyMsg: 'No collections history entries to display'
                }
            ]
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
                            margin: '5 0 10 0',
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
                        {
                            xtype: 'fieldset',
                            title: 'Optional',
                            items: [
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
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
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
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Status:'
                                },
                                this.statusL
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
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Last Stopped On:'
                                },
                                this.lastStoppedL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
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
                                    text: 'Geo:'
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
                                    text: 'Follow:'
                                },
                                this.followL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Language Filters:'
                                },
                                this.languageFiltersL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Created:'
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
                                    text: 'Downloaded documents:'
                                },
                                this.docCountL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 170,
                                    text: 'Last downloaded document:'
                                },
                                this.lastDocL
                            ]
                        }


                    ]
                },
                {
                    xtype: 'container',
                    defaultType: 'label',
                    layout: 'hbox',
                    items: [
                        this.startButton,
                        this.stopButton
                    ]
                }
            ]
        });

        this.tabPanel = Ext.create('Ext.tab.Panel', {
            width: '100%',
            minHeight: 400,
            activeTab: 0,
            defaults: {
                bodyPadding: 10
            },
            items: [
                {
                    title: 'Details',
                    items: [
                        this.detailsPanel
                    ]
                },
                {
                    title: 'Edit',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        this.editForm
                    ]
                },
                {
                    title: 'Download',
                    html: '<div class="styled-text">You can read the collected tweets from:<br><br>' +
                        '<b>1.</b>&nbsp;&nbsp;File /var/data/aidr/persister/syria_civil_war.json on server scd1.qcri.org<br>' +
                        '<b>2.</b>&nbsp;&nbsp;Redis queue FetcherChannel.syria_civil_war on host scd1.qcri.org port 6379<br></div>'
                }
            ]
        });

        this.items = [
            this.collectionTitle,
            this.tabPanel,
            this.collectionHistoryTitle,
            this.collectionLogGrid
        ];

        this.callParent(arguments);
    }

})
