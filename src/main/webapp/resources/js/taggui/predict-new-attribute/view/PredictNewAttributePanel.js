Ext.require([
    'AIDRFM.common.AIDRFMFunctions'
]);

Ext.define('TAGGUI.predict-new-attribute.view.PredictNewAttributePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.predict-new-attribute-view',
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

        this.pageTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Predict a new attribute in "' + COLLECTION_NAME + '"',
            flex: 1
        });

        this.pageDescription = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '0 0 15 0',
            text: 'Displaying: only attributes that your collection does not already have.',
            flex: 1
        });

        this.horisontalLine = Ext.create('Ext.container.Container', {
            width: '100%',
            html: '<div class="horisontalLine"></div>'
        });

        this.standardAttributesStore = Ext.create('Ext.data.JsonStore', {
            pageSize: 100,
            storeId: 'standardAttributesStore',
            fields: ['code', 'description', 'name', 'nominalAttributeID'],
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

        this.customAttributesStore = Ext.create('Ext.data.JsonStore', {
            pageSize: 100,
            storeId: 'customAttributesStore',
            fields: ['code', 'description', 'name', 'nominalAttributeID'],
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

        this.standardAttributesTpl = new Ext.XTemplate(
            '<div class="popup choose-crises">' +

                '<tpl if="xindex == 1">' +
                '<h2>Standard attributes</h2>' +
                '<div class="crises-list">' +
                '<ul>' +
                '</tpl>' +
                '<tpl for=".">',

            '<li class="crisesItem"><a>{name}</a></li>' +

                '</tpl>',
            '<tpl if="xindex == 1">' +
                '</ul>' +
                '</div>' +
                '</tpl>' +

                '</div>'
        );

        this.customAttributesTpl = new Ext.XTemplate(
            '<div class="popup choose-crises">' +

                '<tpl if="xindex == 1">' +
                '<h2>Custom attributes</h2>' +
                '<div class="crises-list">' +
                '<ul>' +
                '</tpl>' +
                '<tpl for=".">',

            '<li class="crisesItem"><a>{name}</a></li>' +

                '</tpl>',
            '<tpl if="xindex == 1">' +
                '</ul>' +
                '</div>' +
                '</tpl>' +

                '</div>'
        );

        this.standardAttributesView = Ext.create('Ext.view.View', {
            store: this.standardAttributesStore,
            id: 'standardAttributesViewId',
            tpl: this.standardAttributesTpl,
            itemSelector: 'li.crisesItem'
        });

        this.customAttributesView = Ext.create('Ext.view.View', {
            store: this.customAttributesStore,
            id: 'customAttributesViewId',
            tpl: this.customAttributesTpl,
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
                    this.pageTitle,
                    this.pageDescription
                ]
            },
            {
                xtype: 'container',
                width: '100%',
                html: '<div class="horisontalLine"></div>'
            },
            this.standardAttributesView,
            this.customAttributesView
        ];

        this.callParent(arguments);
    }

})