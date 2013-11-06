Ext.require([
    'AIDRFM.common.AIDRFMFunctions'
]);

Ext.define('TAGGUI.training-examples.view.TrainingExamplesPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.training-examples-view',
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

        this.breadcrumbs = Ext.create('Ext.form.Label', {
            html: '<div class="bread-crumbs">' +
                '<a href="' + BASE_URL + '/protected/tagger-home">Tagger</a><span>&nbsp;>&nbsp;</span>' +
                '<a href="' + BASE_URL + '/protected/' + CRISIS_CODE + '/tagger-collection-details">' + CRISIS_NAME + '</a><span>&nbsp;>&nbsp;</span>' +
                '<a href="' + BASE_URL + '/protected/' + CRISIS_CODE + '/' + MODEL_ID + '/model-details">' + MODEL_NAME + '</a><span>&nbsp;>&nbsp;New training example</span></div>',
            margin: 0,
            padding: 0
        });

        this.taggerTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Add new training example for "' + MODEL_NAME + '" in collection "' + CRISIS_NAME + '"',
            flex: 1
        });

        this.documentLabel = Ext.create('Ext.form.Label', {
            cls: 'styled-text-20',
            margin: '0 0 15 0',
            html: 'Document',
            flex: 1
        });

        this.labelsLabel = Ext.create('Ext.form.Label', {
            cls: 'styled-text-20',
            margin: '0 0 15 0',
            html: 'Labels',
            flex: 1
        });

        this.instructionsLabel = Ext.create('Ext.form.Label', {
            cls: 'styled-text-20',
            margin: '0 0 15 0',
            html: 'Instructions',
            flex: 1
        });

        this.instructionsText = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '0 0 15 0',
            html: 'Teach the system how to label incoming documents by labeling examples.',
            flex: 1
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
                    this.documentLabel,
                    this.labelsLabel,
                    this.instructionsLabel,
                    this.instructionsText
                ]
            },
            {
                xtype: 'container',
                width: '100%',
                html: '<div class="horisontalLine"></div>'
            }
        ];

        this.callParent(arguments);
    }

});