Ext.define('Web.view.MasterPanel', {
	extend: 'Ext.form.Panel',
	alias: 'widget.masterPanel',
    bodyPadding: 5,
    width: 750,
    layout: 'column',
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'side'
    },
    tbar: [ {xtype: 'tbtext', text: 'Master' ,styleHtmlCls:'tbarText' ,cls: 'tbarText'} ,'->','-',
            {xtype: 'button', text: 'Reset' ,id:'masterReset' }
         ],
    items: [{
        columnWidth: 0.60,
        id:'masterGrid',
        xtype: 'gridpanel',
        store: Ext.create('Ext.data.JsonStore',{
            storeId:'masterStore',
            fields:['id', 'key', 'value'],
            proxy: {
                type: 'ajax',
                url:'master/getAll.action',
                reader:{
                	type:'json',
                	root:'data'
                }
            },
            autoLoad:true
          }),
        height: 400,
        title:'Master Data',
        columns: [{
                id     :'id',
                text   : 'Id',
                sortable : true,
                dataIndex: 'id'
            },{
                text   : 'Key',
                width    : 75,
                sortable : true,
                dataIndex: 'key'
            },{
                text   : 'Value',
                width    : 75,
                sortable : true,
                flex: 1,
                dataIndex: 'value'
            }
        ]
    }, {
    	xtype:'form',
    	border:false,
    	id:'masterForm',
    	columnWidth: 0.4,
    	margin: '0 0 0 10',
    	items:[{
            xtype: 'fieldset',
            title:'Master Information',
            defaults: {
                width: 240,
                labelWidth: 90
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Key',
                name: 'key',
                allowBlank:false
            },{
                fieldLabel: 'Value',
                name: 'value',
                allowBlank:false
            }]
    	}],
        buttons: [{
		            text: 'Create',
		            id:'masterCreate'
	            },{
		            text: 'Update',
		            id:'masterUpdate'
	            },{
		        	text:'Delete',
		        	id:'masterDelete'
	            }]
    }]

  })
