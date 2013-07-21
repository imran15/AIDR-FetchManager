Ext.application({
    name: 'Web',
    controllers:['CollectionController'],
    launch:function (){

        Ext.create('Ext.panel.Panel',{
        	layout :'fit',
        	renderTo:'extjsBody',
        	border: false,
            items: [{
                xtype:'collectionPanel', 
                border:false
            }]
        });
    }
});