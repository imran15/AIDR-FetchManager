Ext.define('TAGGUI.training-examples.view.LabelPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.label-panel-view',

    layout: 'vbox',
    padding: '12 0 12 0',
    width: '100%',

    initComponent: function () {
        var me = this;

        this.attributeNameLabel = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            html: '',
            flex: 1
        });

        this.optionRG = Ext.create('Ext.form.RadioGroup', {
            columns: 2,
            vertical: true,
            width: 700,
            items: []
        });

        this.optionPanel = Ext.create('Ext.container.Container', {
            flex: 1,
            margin: '5 0 5 0',
            layout: 'hbox',
            items: [
                this.optionRG
            ]
        });

        this.optinText = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            html: '',
            flex: 1
        });

        this.items = [
            this.attributeNameLabel,
            this.optionPanel,
            this.optinText
        ];

        this.callParent(arguments);
    },

    showData: function(attr){
        var me = this;

        if (attr.name) {
            me.attributeNameLabel.setText(attr.name);
        }
        if (attr.nominalLabelJsonModelSet && Ext.isArray(attr.nominalLabelJsonModelSet)) {
            Ext.each(attr.nominalLabelJsonModelSet, function (lbl) {
                me.optionRG.add({
                    boxLabel: lbl.name,
                    name: lbl.norminalLabelCode,
                    inputValue: lbl.norminalLabelID
                });
            })
        }
        if (attr.description) {
            me.optinText.setText('<div class="na-text">' + attr.description + '</div>', false);
        }
    }

});