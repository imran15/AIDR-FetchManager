Ext.require([
    'AIDRFM.common.AIDRFMFunctions'
]);

Ext.define('TAGGUI.attribute-details.view.AttributeDetailsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.attribute-details-view',
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

    attributeName: '',

    initComponent: function () {
        var me = this;

        this.breadcrumbs = Ext.create('Ext.container.Container', {
            html: '<div class="bread-crumbs">' +
                '<a href="' + BASE_URL + '/protected/tagger-home">Tagger</a><span>&nbsp;>&nbsp;Attribute details</span></div>',
            margin: 0,
            padding: 0
        });

        this.taggerTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1 bold-text',
            text: 'Details for attribute',
            flex: 1
        });

        this.horisontalLine = Ext.create('Ext.container.Container', {
            width: '100%',
            html: '<div class="horisontalLine"></div>'
        });

        this.saveButton = Ext.create('Ext.Button', {
            text: 'Save',
            cls:'btn btn-green',
            id: 'attributeSave',
            hidden: true
        });

        this.cancelButton = Ext.create('Ext.Button', {
            text: 'Cancel',
            margin: '0 0 0 10',
            cls:'btn btn-green',
            id: 'attributeCancel',
            hidden: true
        });

        this.editButton = Ext.create('Ext.Button', {
            text: 'Edit',
            cls:'btn btn-green',
            id: 'attributeEdit'
        });

        this.deleteButton = Ext.create('Ext.Button', {
            text: 'Delete',
            cls:'btn btn-red',
            id: 'attributeDelete',
            margin: '0 0 0 7'
        });

        this.buttonsBlock = Ext.create('Ext.container.Container', {
            layout: 'hbox',
            margin: '5 0',
            padding: '0 10',
            hidden: true,
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 0 0',
                    width: 250,
                    items: [
                        this.editButton,
                        this.saveButton,
                        this.cancelButton
                    ]
                },
                this.deleteButton
            ]
        });

        this.codeValue = Ext.create('Ext.form.Label', {flex: 1});
        this.nameValue = Ext.create('Ext.form.Label', {flex: 1});
        this.typeValue = Ext.create('Ext.form.Label', {flex: 1});

        this.nameTextBox = Ext.create('Ext.form.field.Text', {
            flex: 1,
            allowBlank: false,
            hidden: true
//            TODO add listener to enable save button only if this value was changed
        });

        this.codeBlock = Ext.create('Ext.container.Container', {
            defaultType: 'label',
            layout: 'hbox',
            height: 22,
            margin: '2 0',
            padding: '0 10',
            items: [
                {
                    width: 75,
                    html: '<b>Code:</b>'
                },
                this.codeValue
            ]
        });

        this.nameBlock = Ext.create('Ext.container.Container', {
            xtype: 'container',
            defaultType: 'label',
            layout: 'hbox',
            height: 22,
            margin: '2 0',
            padding: '0 10',
            items: [
                {
                    width: 75,
                    text: 'Name:'
                },
                this.nameValue,
                this.nameTextBox
            ]
        });

        this.typeBlock = Ext.create('Ext.container.Container', {
            xtype: 'container',
            defaultType: 'label',
            layout: 'hbox',
            height: 22,
            margin: '2 0',
            padding: '0 10',
            items: [
                {
                    width: 75,
                    text: 'Type:'
                },
                this.typeValue
            ]
        });

//        this.crisesStore = Ext.create('Ext.data.JsonStore', {
//            pageSize: 10,
//            storeId: 'crisesStore',
//            fields: ['crisisID', 'code', 'name', 'crisisType', 'users', 'modelFamilyCollection'],
//            proxy: {
//                type: 'ajax',
//                url: 'tagger/getCrisesByUserId.action',
//                reader: {
//                    root: 'data',
//                    totalProperty: 'total'
//                }
//            },
//            autoLoad: true
//        });
//
//        this.crisesTpl = new Ext.XTemplate(
//            '<div class="collections-list">',
//            '<tpl for=".">',
//
//            '<div class="collection-item">',
//
//
//            '<div class="content">',
//
//            '<div class="img">',
//            '<a href="{[this.getEncodedCode(values.code)]}/tagger-collection-details"><img alt="Collection image" height="70" src="/AIDRFetchManager/resources/img/collection-icon.png" width="70"></a>',
//            '</div>',
//
//            '<div class="info">',
//            '<div class="collection-title"><a href="{[this.getEncodedCode(values.code)]}/tagger-collection-details">{name}</a></div>',
//            '<div class="styled-text-14 div-top-padding" id="statusField_{crisisID}">{[this.getAttributes(values.modelFamilyCollection)]}</div>',
//            '</div>',
//
//            '</div>',
//            '</div>',
//
//            '</tpl>',
//            '</div>',
//            {
//                getAttributes: function (raw) {
//                    var result = '';
//                    if (raw && raw.length > 0) {
//                        Ext.Array.each(raw, function(r, index) {
//                            if (index == 1){
//                                result = 'Attributes being predicted:&nbsp;&nbsp;';
//                            }
//                            var nominalAttribute = r.nominalAttribute;
//                            if (nominalAttribute && nominalAttribute.name) {
//                                result = result + nominalAttribute.name + ', ';
//                            }
//                        });
//                        return result.substring(0, result.length - 2);
//                    } else {
//                        return '<a href="predict-new-attribute">Predict a new attribute >></a>';
//                    }
//                },
//                getEncodedCode: function(code) {
//                    return encodeURI(code);
//                }
//            }
//        );
//
//        this.crisesView = Ext.create('Ext.view.View', {
//            store: this.crisesStore,
//            tpl: this.crisesTpl,
//            itemSelector: 'div.active',
//            loadMask: false
//        });

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
                    this.taggerTitle
                ]
            },
            {
                xtype: 'container',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'container',
                        width: '100%',
                        html: '<div class="horisontalLine"></div>'
                    },
                    this.codeBlock,
                    this.nameBlock,
                    this.typeBlock,
                    this.buttonsBlock,
                    {
                        xtype: 'container',
                        width: '100%',
                        html: '<div class="horisontalLine"></div>'
                    }
                ]
            },
            {
                xtype: 'container',
                width: '100%',
                html: '<div class="horisontalLine"></div>'
            }
//            ,
//            this.crisesView
        ];

        this.callParent(arguments);
    }

})