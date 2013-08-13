Ext.require('Ext.container.Viewport');
Ext.application({
    name: 'Web',
    controllers:['TaskController'],
    launch:function (){
    	Ext.getDom("header_task").className = Ext.getDom("header_task").className + " selectedHeader";
        Ext.create('Ext.panel.Panel',{
        	layout :'fit',
        	renderTo:'extjsBody',
        	border: false,
            items: [{
                xtype:'taskPanel',
                height : ((Ext.getBody().getViewSize().height)-(Ext.getDom("header").scrollHeight) - (Ext.getDom("footer").scrollHeight)-2),
                border:false
            }]
        });
    }
});