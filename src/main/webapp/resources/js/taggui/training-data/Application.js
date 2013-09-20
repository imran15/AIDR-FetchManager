Ext.application({
    requires: [
        'Ext.container.Viewport'
    ],

    name: 'TAGGUI.training-data',

    controllers: [
        'TrainingDataController'
    ],

    appFolder: BASE_URL + '/resources/js/taggui/training-data',

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
                            xtype: 'training-data-view'
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