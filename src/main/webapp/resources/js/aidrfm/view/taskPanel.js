Ext.define('Web.view.TaskPanel', {
	extend: 'Ext.form.Panel',
	alias: 'widget.taskPanel',
    bodyPadding: 5,
    layout: {
    	type:'table',
    	columns:2,
    	tableAttrs: {
            style: {
                width: '100%'
            }
        }
    },
    itemCls :'alignTop',
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'side'
    },
    tbar: [ {xtype: 'tbtext', text: 'User Tasks' ,cls: 'tbarText'} ,'->','-',
            {xtype: 'button', text: 'Reset' ,id:'taskReset' }],
    items: [
    	    Ext.create('Ext.form.Panel', {
    	    columnWidth : 1,
    	    colspan : 2,
            width: 600,
            bodyPadding: 10,
            layout: 'anchor',
            border:false,
            items: [{
                xtype: 'combo',
                id:'collectionCombo',
                store:  Ext.create('Ext.data.Store', {
                    pageSize: 10,
                    proxy: {
                        type: 'ajax',
                        url : 'collection/search.action',
                        reader: {
                            type: 'json'
                        }
                    },
                    fields:['id', 'code', 'name','target']
                }),
                minChars :2,
                displayField: 'name',
                valueField:'id',
                typeAhead: false,
                hideTrigger:true,
                anchor: '100%',
                fieldLabel : "Collection",
                fieldWidth : 80,
                listConfig: {
                    loadingText: 'Searching...',
                    emptyText: 'No matching collection found.',
                    getInnerTpl: function() {
                    	 return '<table class="search-item">' +
	                    	        '<tr>'+
	                                '<td class="bold">{name}</td><td class="normalText">{code}</td>' +
	                               '</tr>'+
                                '</table>';
                    }
                },
                listeners:{
                	"select":function(combo, records, eOpts ){
           		        Ext.Ajax.request({
    	   		            url: 'task/fetchTasksByCollId.action',
    	   		            method: 'GET',
    		   		        params: {
    		                  collectionId : combo.getValue()
    		                },
    		                headers: {
    		                    'Accept': 'application/json'    
    		           	   	},
    	   		            waitMsg: 'Fetching Task ...',
    	   		            success: function (response) {
    	   		               var data = Ext.decode(response.responseText);
    		                   Ext.getCmp("taskGrid").getStore().loadData(data);
    	   		            }
    	   		        });

                	}
                },
                pageSize: 10
            }, {
                xtype: 'component',
                style: 'margin-top:10px',
                html: 'Minimum of 2 characters.'
             }]
    	    })
    ,{
        id:'taskGrid',
        xtype: 'gridpanel',
        width : 750,
        padding:10,
        store: Ext.create('Ext.data.JsonStore',{
            storeId:'taskStore',
            fields:['id', 'count', 'query','status','fromGeo','toGeo','startDate','endDate','follow','createdDate'],
            proxy: {
                type: 'ajax',
                url : 'task/fetchTasksByCollId.action',
                reader: {
                    type: 'json'
                }
            },
            listeners:{
            	"beforeload": function( store, operation, eOpts ){
            		store.getProxy().setExtraParam( "collectionId", Ext.getCmp("collectionCombo").getValue() );
            		return true;
            	}
            },
            autoLoad:false
          }),
        height: 400,
        title:'Task Grid',
        columns: [{
                id       :'id',
                text   : 'Id',
                sortable : true,
                dataIndex: 'id',
                width    : 75
            },{
                text   : 'Count',
                width    : 75,
                sortable : true,
                dataIndex: 'count'
            },{
                text   : 'Query',
                width    : 120,
                sortable : true,
                dataIndex: 'query',
                flex : 1
            },{
                text   : 'Status',
                width    : 80,
                sortable : true,
                dataIndex: 'status'
            },{
                text   : 'Follow',
                width    :150,
                sortable : true,
                dataIndex: 'follow'
            },{
                text   : 'StartDate',
                width    : 100,
                sortable : true,
                dataIndex: 'startDate'
            },{
                text   : 'EndDate',
                width    : 100,
                sortable : true,
                dataIndex: 'endDate'
            }
        ]
    }, {
    	xtype:'form',
    	border:false,
    	width : 350,
    	id:'taskForm',
    	margin: '0 0 0 10',
    	items:[{
            xtype: 'fieldset',
            title:'Task Information',
            defaults: {
                width: 240,
                labelWidth: 90
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Query',
                name: 'query',
                allowBlank:false
            },{
                fieldLabel: 'Follow',
                name: 'follow',
                allowBlank:false
            },{
                fieldLabel: 'Count',
                name: 'count',
                allowBlank:false,
                xtype:'numberfield'
            },{
                fieldLabel: 'From Geo',
                name: 'fromGeo',
                allowBlank:false
            },{
                fieldLabel: 'To Geo',
                name: 'toGeo',
                allowBlank:false
            }]
    	}],
        buttons: [{
		            text: 'Create',
		            id:'taskCreate'
	            },{
		            text: 'Update',
		            id:'taskUpdate'
	            },{
		        	text:'Start',
		        	id:'taskStart'
	            },{
		        	text:'Stop',
		        	id:'taskStop'
	            }]
    }]

  })
