Ext.application({
    requires: [
        'Ext.container.Viewport'
    ],

    name: 'AIDRFM.home',

    controllers: [
        'CollectionController'
    ],

    appFolder: BASE_URL + '/resources/js/app/home',

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
                            xtype: 'collection-view'
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