Ext.application({
    requires: [
        'Ext.container.Viewport'
    ],

    name: 'TAGGUI.attribute-details',

    controllers: [
        'AttributeDetailsController'
    ],

    appFolder: BASE_URL + '/resources/js/taggui/attribute-details',

    launch: function () {
        Ext.QuickTips.init();
        Ext.create('Ext.container.Viewport', {
            cls: 'mainWraper',
            layout: 'fit',
            items: [
                {
                    xtype: 'container',
                    autoScroll: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: '100%',
                            html: '<div class="headerWrapper">' +
                                '<div id="header" class="header"></div>' +
                                '</div>'
                        },
                        {
                            xtype: 'attribute-details-view'
                        },
                        {
                            xtype: 'container',
                            width: '100%',
                            html: '<div class="site-footer">' +
                                '</div>'
                        }
                    ]
                }
            ]
        });
    }
});