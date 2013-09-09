Ext.application({
    requires: [
        'Ext.container.Viewport'
    ],

    name: 'TAGGUI.model-details',

    controllers: [
        'ModelDetailsController'
    ],

    appFolder: BASE_URL + '/resources/js/taggui/model-details',

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
                            xtype: 'model-details-view'
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