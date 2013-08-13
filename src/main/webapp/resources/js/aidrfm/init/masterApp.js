Ext.application({
    name: 'Web',
    controllers:['MasterController'],
    launch:function (){
    	Ext.getDom("header_master").className = Ext.getDom("header_master").className + " selectedHeader";
        Ext.create('Ext.panel.Panel',{
        	layout :'fit',
        	renderTo:'extjsBody',
        	border: false,
            items: [{
                xtype:'masterPanel',
                height : ((Ext.getBody().getViewSize().height)-(Ext.getDom("header").scrollHeight) - (Ext.getDom("footer").scrollHeight)-2),
                border:false
            }]
        });
    }
});