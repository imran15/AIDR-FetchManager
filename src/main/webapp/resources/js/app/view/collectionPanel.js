Ext.define('Web.view.CollectionPanel', {
	extend: 'Ext.form.Panel',
	alias: 'widget.collectionPanel',
    bodyPadding: 10,
    width: 750,
    layout: 'column',
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'side'
    },
    items: [{
    	columnWidth: .98,
    	xtype:'label',
    	cls :'collectionHeaderH1',
    	text :'AIDR Collector Manager'
    },{
     	columnWidth: .98,
    	xtype:'label',
    	margin :'0 0 15 0',
    	text :'This page allows you to create Twitter collections'
    },{
      	columnWidth:.20,
    	xtype:'label',
    	cls :'collectionHeaderH2 padding_bottom_10 clickable',
    	text :'Create New Collection',
      	listeners:{
    		afterrender: function(lb){
    			lb.getEl().on("click",function(){
    				 var form = Ext.getCmp('collectionForm').getForm();
    				 form.reset();
    				 form.findField("code").setDisabled(false);
    				 form.findField("code").focus();
    				 Ext.getCmp("info_container").setVisible(false);
    				 Ext.getCmp("collectionCreate").setDisabled(false);
    				 Ext.getCmp("collectionStart").setDisabled(false);
    				 Ext.getCmp("collectionStop").setDisabled(false);
    				 var grid = Ext.getCmp('collectionGrid');
                     grid.getSelectionModel().deselectAll();
    			});
    		}
    	}
    	
    },{
        columnWidth: .98,
        id:'collectionGrid',
        xtype: 'gridpanel',
        margin :'0 0 15 0',
        store: Ext.create('Ext.data.JsonStore',{
        	pageSize: 3,
            storeId:'collectionStore',
            fields:['id', 'code', 'name','target','langFilters','startDate','endDate','status','count','track','geo','follow','lastDocument'],
            proxy: {
                type: 'ajax',
                url:'collection/findAll.action',
                reader: {
                    root: 'items',
                    totalProperty: 'total'
                }
            },
            autoLoad:true
          }),
        height: 160,
        title:'Click on a Collection to see details or Edit',
        columns: [{
                text   : 'Name',
                width    : 150,
                sortable : true,
                dataIndex: 'name'
            },{
                text   : 'Keywords',
                width    : 300,
                sortable : true,
                dataIndex: 'track'
            },{
                text   : 'Geo',
                width    : 180,
                sortable : true,
                dataIndex: 'geo'
            },{
                text   : 'Follow',
                width    : 180,
                sortable : true,
                dataIndex: 'follow'
            },{
                text   : 'Language Filters',
                width    : 180,
                sortable : true,
                dataIndex: 'langFilters'
            },{
                text   : 'Status',
                width    : 110,
                sortable : true,
                dataIndex: 'status'
            },{
                text   : 'Count',
                width    : 80,
                sortable : true,
                dataIndex: 'count',
                renderer : function (value, p, record){
                	return value ? value : 0;
                }
            },{
            	text   : '',
            	width    : 100,
            	 renderer : function (value, p, record){
            		 var status = record.get("status");
            		 if(status=='RUNNING' || status=='INITIALIZING' || status=='RUNNING-WARNING'){
            			 return '<a href="#">Refresh</a>';
            		 }
            		 return '';
                 }
            }
        ],
        bbar: Ext.create('Ext.PagingToolbar', {
            displayInfo: true,
            displayMsg: 'Displaying collections {0} - {1} of {2}',
            emptyMsg: "No collections to display",
            listeners:{
            	afterrender:function(bbar){
            		bbar.bindStore(Ext.getCmp("collectionGrid").getStore(),true);
            	}
            }
        }),
        listeners:{
        	cellclick : function( tgrid, td, cellIndex, record, tr, rowIndex, e, eOpts ){
                var fieldName = tgrid.ownerCt.columns[cellIndex].text;
                if(!fieldName){
                    Ext.Ajax.request({
                        url: 'collection/refreshCount.action',
                        method: 'GET',
                        params: {
                            id: record.get("id")
                        },
                        headers: {
                            'Accept': 'application/json'
                        },
                        waitMsg: 'Refresh count status ...',
                        success: function (response) {
                        	 var response = Ext.decode(response.responseText);
                        	 if (response.success && response.data) {
                        		 var data = response.data;
                        		 record.set("status",data.status);
                        		 record.set("count",data.count);
                        		 var status = data.status;
                                 var text = '';
                                 if(status=='RUNNING'){
                                     text = "The Collection <b>"+record.get("name")+ "</b> is  <b class='greenInfo'> RUNNING </b>";
                                     Ext.getCmp("collectionStart").setDisabled(true);
                                     Ext.getCmp("collectionStop").setDisabled(false);
                                 }else if (status=='INITIALIZING'){
                                 	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='blueInfo'> INITIALIZING </b>";
                                 }else if (status=='STOPPED' || status=='FATAL-ERROR' || status=='NOT_RUNNING'){
                                 	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='redInfo'>"+record.get("status")+" </b>";
                                        //chaning buttons states, seems not working with it
                                        Ext.getCmp("collectionStart").setDisabled(false); 
                                        Ext.getCmp("collectionStop").setDisabled(true);
                                 }else {
                                 	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='warningFont'>"+record.get("status")+" </b>";
                                 }
                                 
                                 Ext.getCmp("form_collectionStatus").update(text);
                                 Ext.getCmp("form_startDate").setText (": " + (data.startDate ? data.startDate : "N/A"));
                                 Ext.getCmp("form_endDate").setText (": "+ (data.endDate ? data.endDate : "N/A"));
                                 Ext.getCmp("form_count").setText (": "+(data.count  ? data.count  : 0));
                                 Ext.getCmp("lastDocument").setValue(data.lastDocument);
                                 
                        	 }
                        }
                    });
                }
        	}
        }
    }, {
    	xtype:'form',
    	border:false,
    	id:'collectionForm',
    	columnWidth: 1,
    	items:[{
            xtype: 'fieldset',
            title:'Create / Edit Collection',
            defaults: {
                width: 350,
                labelWidth: 120
            },
            layout  :{
            	type:'hbox'
            },
            anchor :'98%',
            items:[{
            	xtype:'fieldset',
            	border:false,
            	width : (Ext.getBody().getViewSize().width/2 - 30),
                items: [{
                   xtype:'fieldset',
                   border:false,
                   id:'info_container',
                   hideMode :'visibility',
                   hidden:true,
                   height : 140,
                   margin :'0',
                   items:[{
                    xtype:'panel',
                    layout :'hbox',
                    border:false,
                    items:[{
                        id:'form_collectionStatus',
                        xtype:'panel',
                        width : 400,
                        html:'&nbsp;',
                        border:false,
                        bodyCls:'font16',
                        margin : '0 0 5 0'
                        	
                    }]
                },
                {
                    xtype:'panel',
                    layout :'hbox',
                    border:false,
                    items:[{
                       xtype:'label',
                       text:'Last Started On',
                       width : 150,
                       margin:'0 0 5 0'
                    },{
                        xtype:'label',
                        html:'&nbsp;',
                        id:'form_startDate'
                    }]
                },{
                    xtype:'panel',
                    layout :'hbox',
                    border:false,
                    items:[{
                       xtype:'label',
                       text:'Last Stopped On',
                       margin:'0 0 5 0',
                       width : 150
                    },{
                        xtype:'label',
                        html:'&nbsp;',
                        id:'form_endDate'
                    }]
                },{
                    xtype:'panel',
                    layout :'hbox',
                    border:false,
                    items:[{
                       xtype:'label',
                       text:'Downloaded Documents',
                       margin:'0 0 5 0',
                       width : 150	   
                    },{
                        xtype:'label',
                        html:'&nbsp;',
                        id:'form_count'
                    }]
                },{
                    xtype:'panel',
                    layout :'hbox',
                    border:false,
                    items:[{
                       xtype:'label',
                       html:'You can read the collected tweets from:',
                       id:'form_code_name'
                    }]
                }]},{
                    xtype:'panel',
                    layout :'hbox',
                    border:false,
                    margin:"0 0 0 12",
                    items:[{
                        fieldLabel: 'Code',
                        name: 'code',
                        allowBlank:false,
                        xtype: 'textfield',
                        width : 400,
                        emptyText:'e.g., Sandy2012 or EQJapan2011',
                        maxLength :15,
                        maxLengthText :'The maximum length for this field is 15 ',
                        maskRe :/[^ ]/
                    },{
                    	border:false,
                    	html:'<img src="/AIDRFetchManager/resources/img/info.png"></img>',
                    	height :30,
                    	width:30,
                    	id:'collectionCodeInfo'
                    }]
                },{
                    xtype:'panel',
                    layout :'hbox',
                    border:false,
                    margin:"0 0 0 12",
                    items:[{
                        fieldLabel: 'Name',
                        name: 'name',
                        allowBlank:false,
                        xtype: 'textfield',
                        width : 400,
                        emptyText:'e.g., Hurricane Sandy'
                    },{
                    	border:false,
                    	html:'<img src="/AIDRFetchManager/resources/img/info.png"></img>',
                    	height :30,
                    	width:30,
                    	id:'collectionNameInfo'
                    }]
                },{
                    xtype:'panel',
                    layout :'hbox',
                    border:false,
                    margin:"0 0 0 12",
                    items:[{
                        fieldLabel: 'Keywords',
                        labelAlign:'top',
                        name: 'track',
                        allowBlank:false,
                        xtype: 'textareafield',
                        width : 400,
                        //height : 80,
                        emptyText:'e.g., #sandy, #newyork,#joplin'
                    },{
                    	border:false,
                    	html:'<img src="/AIDRFetchManager/resources/img/info.png"></img>',
                    	height :30,
                    	width:30,
                    	id:'collectionkeywordsInfo'
                    }]
                }]
            },{
            	xtype:'form',
            	width : (Ext.getBody().getViewSize().width/2 - 30),
            	border:false,
                items: [{
                	xtype:'box',
                	html:'Clear Form',
                	cls :'collectionHeaderH2 textAlignRight clickable',
                	margin :'0 80 0 0',
                	listeners:{
                		afterrender: function(lb){
                			lb.getEl().on("click",function(){
                				 var form = Ext.getCmp('collectionForm').getForm();
                				 form.reset();
                				 form.findField("code").setDisabled(false);
                				 Ext.getCmp("collectionCreate").setDisabled(false);
                				 var grid = Ext.getCmp('collectionGrid');
                                 grid.getSelectionModel().deselectAll();
                			});
                		}
                	}
                	
                },{
                	xtype:'textareafield',
                	id:'lastDocument',
                	fieldLabel:'Last Downloaded Document',
                	labelAlign:'top',
                        readOnly:true,
                        border:false,
                	width : 400,
                	height : 70
                },
                 {
                	xtype:'fieldset',
                	title:'Optional',
                	width : 400,
                	items:[{
                        xtype:'panel',
                        layout :'hbox',
                        border:false,
                        items:[{
                            fieldLabel: 'Geo',
                            name: 'geo',
                            xtype: 'textfield',
                            width : 300,
                            emptyText:'e.g., 43.43, 22.44, 89.32, 56.43'
                        },{
                        	border:false,
                        	html:'<img src="/AIDRFetchManager/resources/img/info.png"></img>',
                        	height :30,
                        	width:30,
                        	id:'collectionGeoInfo'
                        	
                        }]
                    },{
                        xtype:'panel',
                        layout :'hbox',
                        border:false,
                        items:[{
                            fieldLabel: 'Follow',
                            name: 'follow',
                            xtype: 'textfield',
                            width : 300,
                            emptyText:'e.g., 47423744, 53324456'
                        },{
                        	border:false,
                        	html:'<img src="/AIDRFetchManager/resources/img/info.png"></img>',
                        	height :30,
                        	width:30,
                        	id:'collectionFollowInfo'
                        }]
                    },{
                        xtype:'panel',
                        layout :'hbox',
                        border:false,
                        items:[{
                            fieldLabel: 'Language Filters',
                            name: 'langFilters',
                            xtype: 'textfield',
                            width : 300,
                            emptyText:'e.g., en, ar, ja'
                        },{
                        	border:false,
                        	html:'<img src="/AIDRFetchManager/resources/img/info.png"></img>',
                        	height :30,
                        	width:30,
                        	id:'collectionLangInfo'
                        }]
                    }]
                 }]
            }]	

    	}],
        buttons: [{
		            text: 'Create',
		            id:'collectionCreate',
		            cls:'btnGreen'
	            },{
		            text: 'Update',
		            id:'collectionUpdate'
	            },{
		        	text:'Start',
		        	id:'collectionStart'
	            },{
		        	text:'Stop',
		        	id:'collectionStop',
		        	margin :"0 50 0 0"
	            }]
    }]

  })
