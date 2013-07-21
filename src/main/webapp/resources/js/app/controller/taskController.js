Ext.define('Web.controller.TaskController', {
    extend: 'Ext.app.Controller',
    init: function () {
        this.control({
        	'taskPanel [id=taskCreate]':{
      			 click:function(btn,e,eOpts){
      				var  form = Ext.getCmp('taskForm').getForm();
      				
      				if(!form.isValid()){
      					return false;
      				}
      				if(!Ext.getCmp("collectionCombo").getValue()){
      					Ext.Msg.alert('Status', 'Please select Collection to create Task');
      				}
    		        Ext.Ajax.request({
   	   		            url: 'task/save.action',
   	   		            method: 'POST',
   		   		        params: {
   		                         "id": null,
     		                     "follow": form.findField('follow').getValue(),
     	                         "fromGeo": form.findField('fromGeo').getValue(),
     	                         "toGeo": form.findField('toGeo').getValue(),
     	                         "count": form.findField('count').getValue(),
     	                         "query" : form.findField('query').getValue(),
     	                         "jobId.id": Ext.getCmp("collectionCombo").getValue()
   		                },
   		                headers: {
   		                    'Accept': 'application/json'    
   		           	   	},
   	   		            waitMsg: 'Saving Task ...',
   	   		            success: function (response) {
   		              
   	   		              Ext.getCmp('taskGrid').getStore().load();
   	   		              form.reset();
   	   		            }
   	   		        });
      			 }
      		   },
   	   		'taskPanel [id=taskUpdate]':{
   	  			 click:function(btn,e,eOpts){
   	  				 var grid = Ext.getCmp('taskGrid');
   	  			
   	   		         var form = Ext.getCmp('taskForm').getForm(); 
   	  				 if(grid.getSelectionModel().hasSelection()) {
   	  					var selection = grid.getSelectionModel().getSelection()[0]; 
   	  	   		        Ext.Ajax.request({
   	  	   		            url: 'task/update.action',
   	  	   		            method: 'POST',
   	  	   		            jsonData : {
   	  		                     "id": selection.get("id"),
   	  		                     "follow": form.findField('follow').getValue(),
   		  	                     "fromGeo": form.findField('fromGeo').getValue(),
   		  	                     "toGeo": form.findField('toGeo').getValue(),
   		  	                     "query": form.findField('query').getValue(),
   		  	                     "status" : selection.get("status"),
   	  	   		                 "count" : form.findField('count').getValue(),
   	  	   		                 "startDate" : selection.get("startDate"),
   	  	   		                 "endDate" :selection.get("endDate"),
   	  	   		                 "createdDate":selection.get("createdDate"),
   	  	   		                 "jobId" : {id:Ext.getCmp("collectionCombo").getValue()}
   	  		                },
   	  		                headers: {
   	  		                    'Accept': 'application/json'
   	  		           	   	},
   	  	   		            waitMsg: 'Updating task ...',
   	  	   		            success: function (response) {
   	   		                  form.reset();
   	  	   		              Ext.getCmp('taskGrid').getStore().load();
   	  	   		            }
   	  	   		        });
   	  				 }
   	  			 }
   	  		  },
   	  		'taskPanel [id=taskStart]':{
   	  			 click:function(btn,e,eOpts){
   	  				 var grid = Ext.getCmp('taskGrid');
   	  				 
   	  				 if(grid.getSelectionModel().hasSelection()) {
   	  	   		        Ext.Ajax.request({
   	  	   		            url: 'task/start.action',
   	  	   		            method: 'POST',
   	  		   		        params: {
   	  		                     id: grid.getSelectionModel().getSelection()[0].get("id")
   	  		                },
   	  		                headers: {
   	  		                    'Accept': 'application/json'    
   	  		           	   	},
   	  	   		            waitMsg: 'Starting task ...',
   	  	   		            success: function (response) {
   	  	   		               Ext.getCmp('taskGrid').getStore().load();
		   	  	   		       var form = Ext.getCmp('taskForm').getForm(); 
		 	   		           form.reset();
   	  	   		            }
   	  	   		        });
   	  				 }
   	  			 }
   	  		  },'taskPanel [id=taskStop]':{
    	  			 click:function(btn,e,eOpts){
       	  				 var grid = Ext.getCmp('taskGrid');
       	  				 
       	  				 if(grid.getSelectionModel().hasSelection()) {
       	  	   		        Ext.Ajax.request({
       	  	   		            url: 'task/stop.action',
       	  	   		            method: 'POST',
       	  		   		        params: {
       	  		                     id: grid.getSelectionModel().getSelection()[0].get("id")
       	  		                },
       	  		                headers: {
       	  		                    'Accept': 'application/json'    
       	  		           	   	},
       	  	   		            waitMsg: 'sTopping task ...',
       	  	   		            success: function (response) {
       	  	   		               Ext.getCmp('taskGrid').getStore().load();
    		   	  	   		       var form = Ext.getCmp('taskForm').getForm(); 
    		 	   		           form.reset();
       	  	   		            }
       	  	   		        });
       	  				 }
       	  			 }
       	  		  },
   	  	    "taskPanel [id=taskGrid]": {
                   selectionchange: function(model, selected, eOpts){
                   	var  form = Ext.getCmp('taskForm').getForm();
                   	if (model.hasSelection()) {
	                       	var record = selected[0];
	                       	form.findField("query").setValue(record.get("query"));
	                       	form.findField("follow").setValue(record.get("follow"));
	                       	form.findField("fromGeo").setValue(record.get("fromGeo"));
	                    	form.findField("toGeo").setValue(record.get("toGeo"));
	                    	form.findField("count").setValue(record.get("count"));
	                     
                       }else{
                    	   form.reset();
                       }
                   }
               },
               "taskPanel [id='taskReset']":{
               	 click:function(btn,e,eOpts){
               		 var  form = Ext.getCmp('taskForm').getForm();
               		 form.reset();
               		 var grid = Ext.getCmp('taskGrid');
               		 grid.getSelectionModel().deselectAll();
               	 }
               }
        });
    }
});