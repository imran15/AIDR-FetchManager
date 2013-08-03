Ext.require([
    'AIDRFM.common.AIDRFMFunctions'
]);

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
            id: 'refreshBtn'
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