Ext.application({
    requires: [
        'Ext.container.Viewport'
    ],

    name: 'TAGGUI.tagger-collection-details',

    controllers: [
        'TaggerCollectionDetailsController'
    ],

    appFolder: BASE_URL + '/resources/js/taggui/tagger-collection-details',

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
                            xtype: 'tagger-collection-details-view'
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