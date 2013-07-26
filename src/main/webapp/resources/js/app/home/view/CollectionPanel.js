Ext.define('AIDRFM.home.view.CollectionPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.collection-view',
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

        this.collectionTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'My Collections',
            flex: 1
        });

        this.collectionDescription = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '0 0 15 0',
            text: 'Status as of ' + Ext.Date.format(new Date(), "Y F d h:i:s A"),
            flex: 1
        });

        this.horisontalLine = Ext.create('Ext.container.Container', {
            width: '100%',
            html: '<div class="horisontalLine"></div>'
        });

        this.newCollectionButton = Ext.create('Ext.Button', {
            text: 'Create New Collection',
            margin: '27 0 0 0',
            cls:'btn btn-blue',
            id: 'newCollection'
        });

        this.refreshButton = Ext.create('Ext.Button', {
            text: null,
            height: 32,
            width: 32,
            tooltip: 'Refresh',
            iconCls: 'refrashIcon',
            id: 'refresh'
        });

        this.collectionStore = Ext.create('Ext.data.JsonStore', {
            pageSize: 10,
            storeId: 'collectionStore',
            fields: ['id', 'code', 'name', 'target', 'langFilters', 'startDate', 'endDate', 'status', 'count', 'track', 'geo', 'follow', 'lastDocument'],
            proxy: {
                type: 'ajax',
                url: 'collection/findAll.action',
                reader: {
                    root: 'items',
                    totalProperty: 'total'
                }
            },
            autoLoad: true
        });

        this.collectionTpl = new Ext.XTemplate(
            '<div class="collections-list">',
            '<tpl for=".">',

            '<div class="collection-item">',

            '<button class="btn btn-green" onclick="return false">',
            '<span>Start</span>',
            '</button>',
            '<button class="btn btn-red hidden" onclick="return false">',
                '<span>Stop</span>',
            '</button>',

            '<div class="img">',
            '<a href="collection-details?id={id}"><img alt="Collection image" height="70" src="/AIDRFetchManager/resources/img/collection-icon.png" width="70"></a>',
            '</div>',

            '<div class="content">',
            '<div class="info">',
            '<div class="collection-title"><a href="collection-details?id={id}">{name}</a></div>',
            '<div class="styled-text-14">{[this.getStatus(values.status)]}</div>',
            '<div class="styled-text-14">Downloaded documents: {[this.getDocNumber(values.count)]}</div>',
            '<div class="styled-text-14">Last downloaded document: {[this.getLastDoc(values.lastDocument)]}</div>',

            '</div>',
            '</div>',
            '</div>',

            '</tpl>',
            '</div>',
            {
                getStatus: function (raw) {
                    var statusText = '';
                    if (raw == 'RUNNING') {
                        statusText = "<b class='greenInfo'> RUNNING </b>";
                    } else if (raw == 'INITIALIZING') {
                        statusText = "<b class='blueInfo'> INITIALIZING </b>";
                    } else if (raw == 'STOPPED' || raw == 'FATAL-ERROR') {
                        statusText = "<b class='redInfo'>" + raw + " </b>";
                    } else {
                        statusText = "<b class='warningFont'>" + raw + " </b>";
                    }
                    return statusText;
                },
                getLastDoc: function (r) {
                    return r ? r : "<span class='na-text'>N/A</span>";
                },
                getDocNumber: function (r) {
                    return r ? r : 0;
                }
            }
        );

        this.collectionView = Ext.create('Ext.view.View', {
            store: this.collectionStore,
            tpl: this.collectionTpl,
            itemSelector: 'div.active'
        });

        this.codeE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Code',
            name: 'code',
            allowBlank: false,
            flex: 1,
            emptyText: 'e.g., Sandy2012 or EQJapan2011',
            maxLength: 15,
            maxLengthText: 'The maximum length for this field is 15 ',
            maskRe: /[^ ]/
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

        this.editForm = Ext.create('Ext.form.Panel', {
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
                        }
                    ]
                }
            ]
        });

        this.win = Ext.create('widget.window', {
            title: 'New Collection',
            closable: true,
            resizable: false,
            closeAction: 'hide',
            width: 650,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyStyle: 'padding: 5px;',
            defaults: {
                bodyPadding: 10
            },
            items: [
                this.editForm
            ],
            listeners: {
                hide: function () {
                    var mask = collectionController.getMask(false);
                    mask.hide();
                }
            },
            buttons: [
                {
                    text: 'Save',
                    cls:'btn btn-green',
                    handler: function() {
                        collectionController.saveCollection();
                    }
                },
                {
                    text: 'Cancel',
                    cls:'btn btn-red',
                    handler: function(button) {
                        button.up('.window').hide();
                        me.editForm.getForm().reset();
                    }
                }
            ]
        });

        this.items = [
            {
                xtype: 'container',
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
                            this.collectionTitle,
                            this.newCollectionButton
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        margin: '5 0',
                        items: [
                            this.collectionDescription,
                            this.refreshButton
                        ]
                    }
                ]
            },
            this.horisontalLine,
            this.collectionView
        ];

        this.callParent(arguments);
    }

})