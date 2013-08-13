Ext.require([
    'AIDRFM.common.AIDRFMFunctions'
]);

Ext.define('TAGGUI.home.view.TaggerHomePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tagger-home-view',
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

        this.taggerTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Tagger',
            flex: 1
        });

        this.taggerDescription = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '0 0 15 0',
            text: 'Tagger is enabled on the following collections:',
            flex: 1
        });

        this.horisontalLine = Ext.create('Ext.container.Container', {
            width: '100%',
            html: '<div class="horisontalLine"></div>'
        });

//        this.collectionStore = Ext.create('Ext.data.JsonStore', {
//            pageSize: 10,
//            storeId: 'collectionStore',
//            fields: ['id', 'code', 'name', 'target', 'langFilters', 'startDate', 'endDate', 'status', 'count', 'track', 'geo', 'follow', 'lastDocument'],
//            proxy: {
//                type: 'ajax',
//                url: 'collection/findAll.action',
//                reader: {
//                    root: 'data',
//                    totalProperty: 'total'
//                }
//            },
//            autoLoad: true
//        });
//
//        this.collectionTpl = new Ext.XTemplate(
//            '<div class="collections-list">',
//            '<tpl for=".">',
//
//            '<div class="collection-item">',
//
//            '<div class="content">',
//
//            '<div class="img">',
//            '<a href="collection-details?id={id}"><img alt="Collection image" height="70" src="/AIDRFetchManager/resources/img/collection-icon.png" width="70"></a>',
//            '</div>',
//
//            '<div class="info">',
//            '<div class="collection-title"><a href="collection-details?id={id}">{name}</a></div>',
//            '<div class="styled-text-14" id="statusField_{id}">{[this.getStatus(values.status)]}</div>',
//            '<div class="styled-text-14" id="docCountField_{id}">Downloaded items:&nbsp;&nbsp;&nbsp;{[this.getDocNumber(values.count)]}</div>',
//            '<div class="styled-text-14" id="lastDocField_{id}">Last downloaded item:&nbsp;&nbsp;&nbsp;<span class="tweet">{[this.getLastDoc(values.lastDocument)]}</span></div>',
//            '</div>',
//
//            '</div>',
//            '</div>',
//
//            '</tpl>',
//            '</div>',
//            {
//                getStatus: function (raw) {
//                    return AIDRFMFunctions.getStatusWithStyle(raw);
//                },
//                getLastDoc: function (r) {
//                    return r ? r : "<span class='na-text'>N/A</span>";
//                },
//                getDocNumber: function (r) {
//                    return r ? r : 0;
//                },
//                isButtonStartHidden: function (r) {
//                    if (r == 'RUNNING-WARNNING' || r == 'RUNNING'){
//                        return 'hidden';
//                    } else {
//                        return '';
//                    }
//                },
//                isButtonStopHidden: function (r) {
//                    if (r == 'RUNNING-WARNNING' || r == 'RUNNING'){
//                        return '';
//                    } else {
//                        return 'hidden';
//                    }
//                }
//            }
//        );
//
//        this.collectionView = Ext.create('Ext.view.View', {
//            store: this.collectionStore,
//            tpl: this.collectionTpl,
//            itemSelector: 'div.active'
//        });

        this.items = [
            {
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    this.taggerTitle,
                    this.taggerDescription
                ]
            },
            this.horisontalLine
//            ,
//            this.collectionView
        ];

        this.callParent(arguments);
    }

})