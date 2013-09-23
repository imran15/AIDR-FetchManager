Ext.require([
    'AIDRFM.common.AIDRFMFunctions'
]);

Ext.define('TAGGUI.training-data.view.TrainingDataPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.training-data-view',
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
                '<a href="' + BASE_URL + '/protected/tagger-home">Tagger</a><span>&nbsp;>&nbsp;</span>' +
                '<a href="' + BASE_URL + '/protected/' + CRISIS_CODE + '/tagger-collection-details">' + CRISIS_NAME + '</a><span>&nbsp;>&nbsp;</span>' +
//                TODO link to model details or to the attribute details?
                '<a href="#">' + MODEL_NAME + '</a><span>&nbsp;>&nbsp;Training data</span></div>',
            margin: 0,
            padding: 0
        });

        this.taggerTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Training data for "' + MODEL_NAME + '" in collection "' + CRISIS_NAME + '"',
            flex: 1
        });

        this.taggerDescription = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '0 0 15 0',
            html: 'Status: <b>Running</b>. Has classified <b>1250</b> messages.&nbsp;<a href="' + BASE_URL +  '/protected/' + CRISIS_CODE + '/' + MODEL_ID + '/model-details">Details for running model >></a>',
            flex: 1
        });

        this.taggerDescription2line = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '0 0 15 0',
            html: '100 training examples. Click on a message to see/edit details',
            flex: 1
        });

        this.addTrainingData = Ext.create('Ext.container.Container', {
            html: '<div class="bread-crumbs"><a href="#">Add training data >></a></div>',
            margin: 0,
            flex:1
        });

        this.horisontalLine = Ext.create('Ext.container.Container', {
            width: '100%',
            html: '<div class="horisontalLine"></div>'
        });

        this.trainingDataStore = Ext.create('Ext.data.JsonStore', {
            pageSize: 20,
            storeId: 'crisesStore',
            fields: ['crisisID', 'code', 'name', 'crisisType', 'users', 'modelFamilyCollection'],
            proxy: {
                type: 'ajax',
                url: BASE_URL + '/protected/tagger/getTrainingDataByModelIdAndCrisisId.action',
                reader: {
                    root: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                beforeload: function (s) {
                    s.getProxy().extraParams = {
                        modelId: MODEL_ID,
                        crisisId: CRISIS_ID
                    }
                }
            }
        });

        this.trainingDataTpl = new Ext.XTemplate(
            '<div class="collections-list">',
            '<tpl for=".">',

            '<div class="collection-item">',


            '<div class="content">',

            '<div class="img">',
            '<a href="{[this.getEncodedCode(values.code)]}/tagger-collection-details"><img alt="Collection image" height="70" src="/AIDRFetchManager/resources/img/collection-icon.png" width="70"></a>',
            '</div>',

            '<div class="info">',
            '<div class="collection-title"><a href="{[this.getEncodedCode(values.code)]}/tagger-collection-details">{name}</a></div>',
            '<div class="styled-text-14 div-top-padding" id="statusField_{crisisID}">{[this.getAttributes(values.modelFamilyCollection)]}</div>',
            '</div>',

            '</div>',
            '</div>',

            '</tpl>',
            '</div>'
        );

        this.trainingDataView = Ext.create('Ext.view.View', {
            store: this.trainingDataStore,
            tpl: this.trainingDataTpl,
            itemSelector: 'div.active',
            loadMask: false
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
                    this.taggerTitle,
                    this.taggerDescription,
                    this.taggerDescription2line
                ]
            },
            {
                xtype: 'container',
                width: '100%',
                html: '<div class="horisontalLine"></div>'
            },
            this.trainingDataView,
            {
                xtype: 'container',
                layout: 'hbox',
                padding: '25 0 0 0',
                items: [
                    this.addTrainingData
                ]
            }
        ];

        this.callParent(arguments);
    }

})