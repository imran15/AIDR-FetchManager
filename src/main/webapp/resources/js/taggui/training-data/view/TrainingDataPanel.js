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
                '<a href="' + BASE_URL +  '/protected/' + CRISIS_CODE + '/' + MODEL_ID + '/model-details">' + MODEL_NAME + '</a><span>&nbsp;>&nbsp;Training data</span></div>',
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
            storeId: 'trainingDataStore',
            fields: ['labelID', 'labelName', 'labeledTime', 'labelerID', 'labelerName', 'tweetJSON'],
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
                        modelFamilyId: MODEL_FAMILY_ID,
                        crisisId: CRISIS_ID
                    }
                }
            }
        });

        this.trainingDataTpl = new Ext.XTemplate(
            '<div class="collections-list">',
            '<tpl for=".">',

            '<div class="collection-item">',

            '<div class="img">',
                '<img alt="Collection History image" src="/AIDRFetchManager/resources/img/AIDR/AIDR_EMBLEM_CMYK_COLOUR_HR.jpg" width="70">',
            '</div>',

            '<div class="content">',

            '<div class="rightColumn">',
            '<div class="styled-text-17">Value:</div>',
            '<div>Text:</div>',
            '<div>Labeler:</div>',
            '</div>',

            '<div class="leftColumn">',
            '<div class="styled-text-17">{[this.getField(values.labelName)]}</div>',
//            TODO change to correct tweet text
//            '<div>{[this.getField(values.tweetJSON)]}</div>',
            '<div>{[this.getField("")]}</div>',
            '<div>{[this.getField(values.labelerName)]}</div>',
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
                }
            }
        );

        this.trainingDataView = Ext.create('Ext.view.View', {
            store: this.trainingDataStore,
            tpl: this.trainingDataTpl,
            itemSelector: 'div.active',
            loadMask: false
        });

        this.trainingDataPaging = Ext.create('Ext.toolbar.Paging', {
            cls: 'aidr-paging',
            margin: '12 2 0 2',
            store:'trainingDataStore',
            displayInfo:true,
            displayMsg:'Training Data records {0} - {1} of {2}',
            emptyMsg:'No Training Data records to display'
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
            this.trainingDataPaging,
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