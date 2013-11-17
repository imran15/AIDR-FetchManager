Ext.require([
    'AIDRFM.common.AIDRFMFunctions',
    'TAGGUI.training-examples.view.LabelPanel'
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
            cls: 'header-h1',
            margin: '0 0 10 0',
            html: 'Document',
            flex: 1
        });

        this.documentTextLabel = Ext.create('Ext.form.Label', {
            cls:'tweet',
            margin: '0 15 20 15',
            html: '',
            flex: 1
        });

        this.labelsLabel = Ext.create('Ext.form.Label', {
            cls: 'header-h1',
            margin: '15 0 10 0',
            html: 'Labels',
            flex: 1
        });

        this.attributeNameLabel = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '0 15 10 15',
            html: '',
            flex: 1
        });

        this.instructionsLabel = Ext.create('Ext.form.Label', {
            cls: 'header-h1',
            margin: '0 0 10 0',
            html: 'Instructions',
            flex: 1
        });

        this.instructionsText = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '0 15 15 15',
            html: 'Teach the system how to label incoming documents by labeling examples.',
            flex: 1
        });

        this.optionPanel = Ext.create('Ext.container.Container', {
            flex: 1,
            layout: 'vbox',
            margin: '0 15 0 15',
            items: [

            ]
        });

        this.optinText = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '0 15 15 15',
            html: '',
            flex: 1
        });

        this.saveLabelsButton = Ext.create('Ext.Button', {
            text: 'Save labels',
            cls:'btn btn-green',
            id: 'saveLabels'
        });

        this.skipTaskButton = Ext.create('Ext.Button', {
            text: 'Skip task',
            cls:'btn btn-green',
            id: 'skipTask',
            margin: '0 0 0 15'
        });

        this.cancelButton = Ext.create('Ext.Button', {
            text: 'Cancel',
            cls:'btn btn-red',
            id: 'cancel',
            margin: '0 0 0 15'
        });

        this.buttonsBlock = Ext.create('Ext.container.Container', {
            flex: 1,
            layout: 'hbox',
            margin: '10 0 10 0',
            items: [
                this.saveLabelsButton,
                this.skipTaskButton,
                this.cancelButton
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
                    this.taggerTitle,
                    this.documentLabel,
                    this.documentTextLabel,
                    {
                        xtype: 'container',
                        margin: '5 0 0 0',
                        html: '<div class="horisontalLine"></div>'
                    },
                    this.labelsLabel,
                    this.optionPanel,
                    this.buttonsBlock,
                    {
                        xtype: 'container',
                        margin: '5 0 10 0',
                        html: '<div class="horisontalLine"></div>'
                    },
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