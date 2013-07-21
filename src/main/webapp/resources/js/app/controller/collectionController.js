Ext.define('Web.controller.CollectionController', {
    extend: 'Ext.app.Controller',
    init: function () {
    	
    	function mandatoryFieldsEntered(){
    		var isValid = true;
    		var form = Ext.getCmp('collectionForm').getForm();
    		if(!form.findField('code').getValue()){
    			form.findField('code').markInvalid(['Collection Code is mandatory']);
    		    Ext.MessageBox.alert('Error', 'Collection Code is mandatory', function (btnId) {
                });
    		    return false;
    		}
    		if(form.findField('code').getValue() && form.findField('code').getValue().length>15){
    			form.findField('code').markInvalid(['The maximum length for Collection Code field is 15']);
    			 Ext.MessageBox.alert('Error', 'The maximum length for Collection Code field is 15', function (btnId) {
                 });
    		}
    		if(!form.findField('name').getValue()){
    			form.findField('name').markInvalid(['Collection Name is mandatory']);
    			 Ext.MessageBox.alert('Error', 'Collection Name is mandatory', function (btnId) {
                 });
    		}
    		if(!(form.findField('track').getValue() || form.findField('geo').getValue() || form.findField('follow').getValue())){
    			 Ext.MessageBox.alert('Error', 'One of Keywords,Geo or Follow field is mandatory', function (btnId) {
                 });
    		    isValid = false;
    		}
    		return isValid;
    	}
    	
    	function saveCollection (){
    		var form = Ext.getCmp('collectionForm').getForm();
            Ext.Ajax.request({
                url: 'collection/save.action',
                method: 'POST',
                params: {
                    name: form.findField('name').getValue(),
                    code: form.findField('code').getValue(),
                    track: form.findField('track').getValue(),
                    follow: form.findField('follow').getValue(),
                    geo: form.findField('geo').getValue(),
                    langFilters: form.findField('langFilters').getValue()
                },
                headers: {
                    'Accept': 'application/json'
                },
                waitMsg: 'Saving collection ...',
                success: function (response) {
                    form.reset();
                    Ext.getCmp('collectionGrid').getStore().load();
                }
            });
    	}
    	
    	function updateCollection(){
    	    var grid = Ext.getCmp('collectionGrid');
            var form = Ext.getCmp('collectionForm').getForm();
            var selection = grid.getSelectionModel().getSelection()[0];
            Ext.Ajax.request({
                url: 'collection/update.action',
                method: 'POST',
                params: {
                    id: grid.getSelectionModel().getSelection()[0].get("id"),
                    name: form.findField('name').getValue(),
                    code: form.findField('code').getValue(),
                    track: form.findField('track').getValue(),
                    follow: form.findField('follow').getValue(),
                    geo: form.findField('geo').getValue(),
                    status: selection.get("status"),
                    fromDate: selection.get("startDate"),
                    endDate: selection.get("endDate"),
                    langFilters: form.findField('langFilters').getValue()
                },
                headers: {
                    'Accept': 'application/json'
                },
                waitMsg: 'Updating Collection ...',
                success: function (response) {
                    form.reset();
                    Ext.getCmp('collectionGrid').getStore().load();
                }
            });
    	}
    	
    	function isExist(isUpdate){
    		var form = Ext.getCmp('collectionForm').getForm();
            Ext.Ajax.request({
                url: 'collection/exist.action',
                method: 'GET',
                params: {
                    code: form.findField('code').getValue()
                },
                headers: {
                    'Accept': 'application/json'
                },
                waitMsg: '...',
                success: function (response) {
                    var response = Ext.decode(response.responseText);
                    if (!response.data) {
                    	if(!isUpdate){
                    		saveCollection();
                    	}else{
                    		updateCollection();
                    	}
                    } else {
                        Ext.MessageBox.alert('Error', 'Collection Code already exist .Please select another code', function (btnId) {
                            var form = Ext.getCmp('collectionForm').getForm();
                            form.findField("code").markInvalid("Collection Code already exist .Please select another code");
                        });
                    }
                }
            });
    	}
    	
    	function stopCollection (){
    	    var grid = Ext.getCmp('collectionGrid');
            var record = grid.getSelectionModel().getSelection()[0];
            
            Ext.Ajax.request({
                url: 'collection/stop.action',
                method: 'GET',
                params:{
                	id : record.get("id")
                },
                headers: {
                    'Accept': 'application/json'
                },
                waitMsg: '...',
                success:function(response){
                	 var response = Ext.decode(response.responseText);
                	 if (response.success && response.data) {
                		 var data = response.data;
                		 record.set("status",data.status);
                		 record.set("endDate",data.endDate);
                		 record.set("startDate",data.startDate); 
                                 Ext.getCmp("collectionStart").setDisabled(false);
                                 Ext.getCmp("collectionStop").setDisabled(true);
                		 updateinfoPanel(record);
                	 }
                }});
    	}
    	
    	function updateinfoPanel(record){
            var text = '';
            if(record.get("status")=='RUNNING'){
                text = "The Collection <b>"+record.get("name")+ "</b> is  <b class='greenInfo'> RUNNING </b>";
            }else if (record.get("status")=='INITIALIZING'){
            	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='blueInfo'> INITIALIZING </b>";
            }else if (record.get("status")=='STOPPED' || record.get("status")=='FATAL-ERROR'){
            	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='redInfo'>"+record.get("status")+" </b>";
            }else {
            	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='warningFont'>"+record.get("status")+" </b>";
            }
            
            
            Ext.getCmp("form_collectionStatus").update(text);
            Ext.getCmp("form_startDate").setText (": " + (record.get("startDate") ? record.get("startDate") : "N/A"));
            Ext.getCmp("form_endDate").setText (": "+ (record.get("endDate") ? record.get("endDate") : "N/A"));
            Ext.getCmp("form_count").setText (": "+(record.get("count") ? record.get("count") : 0));
            Ext.getCmp("lastDocument").setValue(record.get("lastDocument"));
            Ext.getCmp("form_code_name").setValue(record.get("code"));
            
    		
    	}
    	
    	function startCollection(refresh){
    		var grid = Ext.getCmp('collectionGrid');
            var selection = grid.getSelectionModel().getSelection()[0];
            Ext.Ajax.request({
                url: 'collection/start.action',
                method: 'GET',
                params:{
                	id : selection.get("id")
                },
                headers: {
                    'Accept': 'application/json'
                },
                waitMsg: '...',
                success:function(response){
               	     var response = Ext.decode(response.responseText);
	            	 if (response.success && response.data) {
	            		 var data = response.data;
	            		 selection.set("status",data.status);
	            		 selection.set("endDate",data.endDate);
	            		 selection.set("startDate",data.startDate);
	            		 updateinfoPanel(selection);
	                 }
	                 var ranOnce = false;
	            	 var task = Ext.TaskManager.start({
	            	     run: function(){
	            	    	 if(ranOnce){
	            	    		 refreshStatus(selection); 
	            	    		 Ext.TaskManager.stop(task);
	            	    	 }
	            	    	 ranOnce = true;
	            	     },
	            	     interval: 5000
	            	 });
	            	 if(refresh){
	            		 Ext.getCmp('collectionGrid').getStore().load();
	            	 }
                    
                }});
    	}
    	
    	function gridSelectionChange(model,selected){
            var form = Ext.getCmp('collectionForm').getForm();
            if (model.hasSelection()) {
                var record = selected[0];
                form.findField("name").setValue(record.get("name"));
                form.findField("code").setValue(record.get("code"));
                form.findField("code").setDisabled(true);
                form.findField("track").setValue(record.get("track"));
                form.findField("follow").setValue(record.get("follow"));
                form.findField("geo").setValue(record.get("geo"));
                form.findField("langFilters").setValue(record.get("langFilters"));
                var text = '';
                if(record.get("status")=='RUNNING'){
                    text = "The Collection <b>"+record.get("name")+ "</b> is  <b class='greenInfo'> RUNNING </b>";
                }else if (record.get("status")=='INITIALIZING'){
                	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='blueInfo'> INITIALIZING </b>";
                }else if (record.get("status")=='STOPPED' || record.get("status")=='FATAL-ERROR'){
                	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='redInfo'>"+record.get("status")+" </b>";
                }else {
                	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='warningFont'>"+record.get("status")+" </b>";
                }
                Ext.getCmp("lastDocument").setValue(record.get("lastDocument"));
                
                Ext.getCmp("form_collectionStatus").update(text);
                Ext.getCmp("form_startDate").setText (": " + (record.get("startDate") ? record.get("startDate") : "N/A"));
                Ext.getCmp("form_endDate").setText (": "+ (record.get("endDate") ? record.get("endDate") : "N/A"));
                Ext.getCmp("form_count").setText (": "+(record.get("count") ? record.get("count") : 0));
                Ext.getCmp("info_container").setVisible(true);
                Ext.getCmp("collectionCreate").setDisabled(true);
                var code_name = (record.get("code") ? record.get("code") : "N/A");
                Ext.getCmp("form_code_name").update("<p>You can read the collected tweets from:</p> 1. File /var/data/aidr/persister/" + code_name +".json on server scd1.qcri.org" +
                        "</p> 2. Redis queue FetcherChannel." + code_name + " on host scd1.qcri.org port 6379");
                
                var startDisabled = (record.get("status")=='RUNNING' || record.get("status")=='RUNNING_WARNING') ? true :false;
                Ext.getCmp("collectionStart").setDisabled(startDisabled);
                Ext.getCmp("collectionStop").setDisabled(!startDisabled);
            } else {
                form.reset();
                form.findField("code").setDisabled(false);
                Ext.getCmp("collectionCreate").setDisabled(false);
                Ext.getCmp("info_container").setVisible(false);
                Ext.getCmp("collectionStart").setDisabled(false);
                Ext.getCmp("collectionStop").setDisabled(false);
            }
    	}
    	
    	function refreshStatus(record){
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
                         }else if (status=='STOPPED' || status=='FATAL-ERROR'){
                         	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='redInfo'>"+record.get("status")+" </b>";
                         }else {
                         	text = "The Collection <b>"+record.get("name")+ "</b> is <b class='warningFont'>"+record.get("status")+" </b>";
                         }
                         
                         Ext.getCmp("form_collectionStatus").update(text);
                         Ext.getCmp("form_startDate").setText (": " + (data.startDate ? data.startDate : "N/A"));
                         Ext.getCmp("form_endDate").setText (": "+ (data.endDate ? data.endDate : "N/A"));
                         Ext.getCmp("form_count").setText (": "+(data.count  ? data.count  : 0));
                	 }
                }
            });
    		
    	}
    	
        this.control({
            'collectionPanel [id=collectionCreate]': {
                click: function (btn, e, eOpts) {
                	if(mandatoryFieldsEntered()){
                		isExist(false);
                	}
                }
            },
            'collectionPanel [id=collectionUpdate]': {
                click: function (btn, e, eOpts) {
                    var grid = Ext.getCmp('collectionGrid');
                    var form = Ext.getCmp('collectionForm').getForm();
                    var goUpdate = false;
                
                    if (grid.getSelectionModel().hasSelection()) {
                        if(mandatoryFieldsEntered()){
                            var selection = grid.getSelectionModel().getSelection()[0];
                            if (selection.get("code") == form.findField('code').getValue()) {
                            	updateCollection();
                            } else {
                            	isExist(true);
                            }
                        }
                    }
                }
            },
            "collectionPanel [id=collectionStart]": {
                click: function (btn, e, eOpts) {
                    var grid = Ext.getCmp('collectionGrid');
                    if (grid.getSelectionModel().hasSelection()) {
                      
                        Ext.Ajax.request({
                            url: 'collection/getRunningCollectionStatusByUser.action',
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json'
                            },
                            waitMsg: '...',
                            success: function (response) {
                                var response = Ext.decode(response.responseText);
                                var selection = grid.getSelectionModel().getSelection()[0];
                                if (response.success) {
                                    if (response.data) {
                                        var collectionData = response.data;
                                        var collectionName = collectionData.name;
                                        Ext.MessageBox.confirm('Confirm', 'The collection <b>' + collectionName + '</b> is already running. ' +
                                            'Do you want to stop <b>' + collectionName + '</b>  and start <b>' + selection.get("name") + ' </b>?', function (buttonId) {
                                                if (buttonId === 'yes') {
                                                	startCollection(true);
                                                	
                                                }
                                            });
                                    } else {
                                       startCollection(false);
                                    }
                                }else{
                    	           Ext.MessageBox.alert('Confirm', 'Error while starting Collection .' +
                                   'Please try again later or contact Support', function (buttonId) {
                    	               form.reset();
                                       Ext.getCmp('collectionGrid').getStore().load();
                                   });
                                }
                            }
                        });
                    }

                }
            },
            "collectionPanel [id=collectionStop]": {
                click: function (btn, e, eOpts) {
                    var grid = Ext.getCmp('collectionGrid');
                    if (grid.getSelectionModel().hasSelection()) {
                    	stopCollection();
                    }
                }
            },
            "collectionPanel [id=collectionGrid]": {
                selectionchange: function (model, selected, eOpts) {
                	gridSelectionChange(model,selected);
                }
            },
            "collectionPanel [id=collectionNameInfo]":{
            	render: function(infoPanel,eOpts){
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'Give a name to your collection. For example, Hurricane Sandy, Earthquake Japan.',
                        target:infoPanel.el,
                        dismissDelay:0
                    });
            	}
            },
            "collectionPanel [id=collectionCodeInfo]":{
            	render: function(infoPanel,eOpts){
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: ' Collection code consists of alpha-numeric short code name to a collection. '+
                        	'Spaces are not allowed in the code name. For example, Sandy2012, EQJapan2013 are valid code names',
                        target:infoPanel.el,
                        dismissDelay:0
                    });
            	}
            },
            "collectionPanel [id=collectionkeywordsInfo]":{
            	render: function(infoPanel,eOpts){
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'This field represents comma separated keywords to filter the Twitter stream. Keywords are neither case sensitive nor #sensitive. Spaces between words will be treated as ANDing, and commas as ORing.',
                        target:infoPanel.el,
                        dismissDelay:0
                    });
            	}
            },
            "collectionPanel [id=collectionGeoInfo]":{
            	render: function(infoPanel,eOpts){
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'This field represents a comma-separated pairs of longitude and latitude. A valid geo location represents a bounding box with southwest corner of the box coming first. Visit <a href="http://boundingbox.klokantech.com/">http://boundingbox.klokantech.com</a> to get a valid bounding box.',
                        target:infoPanel.el,
                        dismissDelay:0
                    });
            	}
            },
            "collectionPanel [id=collectionFollowInfo]":{
            	render: function(infoPanel,eOpts){
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: "Follow represents a comma-separated list twitter users’ IDs to be followed. A valid twitter user id must be in the numeric format.",
                        target:infoPanel.el,
                        dismissDelay:0
                    });
            	}
            },
            "collectionPanel [id=collectionLangInfo]":{
            	render: function(infoPanel,eOpts){
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: "This field is used to set a comma separated list of language codes to filter results only to the specified languages. The language codes must be a valid BCP 47 language identifier.",
                        target:infoPanel.el,
                        dismissDelay:0
                    });
            	}
            }
        });
    

       
    }
});