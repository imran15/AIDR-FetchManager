Ext.define('Web.controller.MasterController', {
    extend: 'Ext.app.Controller',
    init: function () {
        this.control({
        	'masterPanel [id=masterCreate]':{
   			 click:function(btn,e,eOpts){
   				var  form = Ext.getCmp('masterForm').getForm();
   				
   		        Ext.Ajax.request({
	   		            url: 'master/save.action',
	   		            method: 'POST',
		   		        params: {
		                     id: null,
  		                     key: form.findField('key').getValue(),
  	                         value: form.findField('value').getValue()
		                },
		                headers: {
		                    'Accept': 'application/json'    
		           	   	},
	   		            waitMsg: 'Updating Master  ...',
	   		            success: function (response) {
		                  form.reset();
	   		              Ext.getCmp('masterGrid').getStore().load();
	   		            }
	   		        });
   			 }
   		   },
	   		'masterPanel [id=masterUpdate]':{
	  			 click:function(btn,e,eOpts){
	  				 var grid = Ext.getCmp('masterGrid');
	   		         var form = Ext.getCmp('masterForm').getForm(); 
	  				 if(grid.getSelectionModel().hasSelection()) {
	  	   		        Ext.Ajax.request({
	  	   		            url: 'master/update.action',
	  	   		            method: 'POST',
	  		   		        params: {
	  		                     id: grid.getSelectionModel().getSelection()[0].get("id"),
	  		                     key: form.findField('key').getValue(),
	  	                         value: form.findField('value').getValue()
	  		                },
	  		                headers: {
	  		                    'Accept': 'application/json'    
	  		           	   	},
	  	   		            waitMsg: 'Updating sale ...',
	  	   		            success: function (response) {
	   		                  form.reset();
	  	   		              Ext.getCmp('masterGrid').getStore().load();
	  	   		            }
	  	   		        });
	  				 }
	  			 }
	  		  },
	  		'masterPanel [id=masterDelete]':{
	  			 click:function(btn,e,eOpts){
	  				 var grid = Ext.getCmp('masterGrid');
	  				 if(grid.getSelectionModel().hasSelection()) {
	  					 
	  	   		        Ext.Ajax.request({
	  	   		            url: 'master/delete.action',
	  	   		            method: 'POST',
	  		   		        params: {
	  		                     id: grid.getSelectionModel().getSelection()[0].get("id")
	  		                },
	  		                headers: {
	  		                    'Accept': 'application/json'    
	  		           	   	},
	  	   		            waitMsg: 'Deleting Master ...',
	  	   		            success: function (response) {
	  	   		               var form = Ext.getCmp('masterForm').getForm(); 
	  	   		               form.reset();
	  	   		               Ext.getCmp('masterGrid').getStore().load();
	  	   		            }
	  	   		        });
	  				 }
	  			 }
	  		  },
	  	    "masterPanel [id=masterGrid]": {
                selectionchange: function(model, selected, eOpts){
                	var  form = Ext.getCmp('masterForm').getForm();
                	if (model.hasSelection()) {
                    	var record = selected[0];
                    	form.findField("value").setValue(record.get("value"));
                    	form.findField("key").setValue(record.get("key"));
                    	
                    }else{
                    	form.reset();
                    }
                }
            },
            "masterPanel [id='masterReset']":{
            	 click:function(btn,e,eOpts){
            		 var  form = Ext.getCmp('masterForm').getForm();
            		 form.reset();
            		 var grid = Ext.getCmp('masterGrid');
            		 grid.getSelectionModel().deselectAll();
            	 }
            }
        });
    }
});