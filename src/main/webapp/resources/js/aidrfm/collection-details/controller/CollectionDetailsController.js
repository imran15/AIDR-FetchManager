Ext.define('AIDRFM.collection-details.controller.CollectionDetailsController', {
    extend: 'Ext.app.Controller',

    views: [
        'CollectionDetailsPanel'
    ],

    init: function () {
        this.control({

            'collection-details-view': {
                afterrender: this.afterRenderDetailsView
            },

            "#collectionNameInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'Give a name to your collection. For example, Hurricane Sandy, Earthquake Japan.',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionCodeInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: ' Collection code consists of alpha-numeric short code name to a collection. ' +
                            'Spaces are not allowed in the code name. For example, Sandy2012, EQJapan2013 are valid code names',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionkeywordsInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'This field represents comma separated keywords to filter the Twitter stream. Keywords are neither case sensitive nor #sensitive. Spaces between words will be treated as ANDing, and commas as ORing.',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionGeoInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: 'This field represents a comma-separated pairs of longitude and latitude. A valid geo location represents a bounding box with southwest corner of the box coming first. Visit <a href="http://boundingbox.klokantech.com/">http://boundingbox.klokantech.com</a> to get a valid bounding box.',
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionFollowInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: "Follow represents a comma-separated list twitter users� IDs to be followed. A valid twitter user id must be in the numeric format.",
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionLangInfo": {
                render: function (infoPanel, eOpts) {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        trackMouse: true,
                        html: "This field is used to set a comma separated list of language codes to filter results only to the specified languages. The language codes must be a valid BCP 47 language identifier.",
                        target: infoPanel.el,
                        dismissDelay: 0
                    });
                }
            },

            "#collectionStart": {
                click: function (btn, e, eOpts) {
                    var mask = AIDRFMFunctions.getMask();
                    mask.show();

                    Ext.Ajax.request({
                        url: BASE_URL + '/protected/collection/getRunningCollectionStatusByUser.action',
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json'
                        },
                        success: function (resp) {
                            var response = Ext.decode(resp.responseText);
                            var name = datailsController.DetailsComponent.currentCollection.name;
                            mask.hide();
                            if (response.success) {
                                if (response.data) {
                                    var collectionData = response.data;
                                    var collectionName = collectionData.name;
                                    Ext.MessageBox.confirm('Confirm', 'The collection <b>' + collectionName + '</b> is already running. ' +
                                        'Do you want to stop <b>' + collectionName + '</b>  and start <b>' + name + ' </b>?', function (buttonId) {
                                        if (buttonId === 'yes') {
                                            datailsController.startCollection();
                                        }
                                    });
                                } else {
                                    datailsController.startCollection();
                                }
                            } else {
                                AIDRFMFunctions.setAlert(
                                    "Error",
                                    ['Error while starting Collection .',
                                    'Please try again later or contact Support']
                                );
                            }
                        }
                    });

                }
            },

            "#collectionStop": {
                click: function (btn, e, eOpts) {
                    datailsController.stopCollection();
                }
            },

            '#collectionUpdate': {
                click: function (btn, e, eOpts) {
                    if (AIDRFMFunctions.mandatoryFieldsEntered()) {
                        datailsController.updateCollection();
                    }
                }
            },

            '#collectionEditCancel': {
                click: function (btn, e, eOpts) {
                    datailsController.cancelCollectionEdit();
                }
            },

            "#refreshBtn": {
                click: function (btn, e, eOpts) {
                    var id = datailsController.DetailsComponent.currentCollection.id;
                    this.refreshStatus(id);
                }
            },

            "#enableTagger": {
                click: function (btn, e, eOpts) {
                    this.getAllCrisisTypesFromTagger();
                }
            },

            "#crisesTypeViewId": {
                itemclick: function (view, record, item, index, e, eOpts) {
                    this.crisisTypeSelectHandler(view, record, item, index, e, eOpts);
                }
            },

            "#crisesTypeWin": {
                hide: function (btn, e, eOpts) {
                    AIDRFMFunctions.getMask().hide();
                }
            }

        });
    },

    afterRenderDetailsView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.DetailsComponent = component;
        datailsController = this;
        var me = this;

        var id = COLLECTION_ID;
        this.DetailsComponent.currentCollectionId = COLLECTION_ID;

        if (!id){
            AIDRFMFunctions.setAlert("Error", ["Collection not specified.", "You will be redirected to Home screen."]);

            var maskRedirect = AIDRFMFunctions.getMask(true, 'Redirecting ...');
            maskRedirect.show();

//            wait for 3 sec to let user read information box
            var isFirst = true;
            Ext.TaskManager.start({
                run: function () {
                    if (!isFirst) {
                        document.location.href = BASE_URL + '/protected/home';
                    }
                    isFirst = false;
                },
                interval: 3 * 1000
            });
        }

        me.na = "<span class='na-text'>N/A</span>";
        me.ns = "<span class='na-text'>Not specified</span>";

        this.loadCollection(id);

        var isFirstRun = true;
        Ext.TaskManager.start({
            run: function () {
                if (!isFirstRun) {
                    me.refreshStatus(id);
                }
                isFirstRun = false;
            },
//            5 minutes
            interval: 5 * 60 * 1000
        });

    },

    loadCollection: function (id) {
        var me = this;

        var mask = AIDRFMFunctions.getMask(true);
        mask.show();

        Ext.Ajax.request({
            url: BASE_URL + '/protected/collection/findById.action',
            method: 'GET',
            params: {
                id: id
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var jsonData = Ext.decode(response.responseText);
                me.updateDetailsPanel(jsonData);
                me.updateDownloadPanel(jsonData.code);
                me.updateEditPanel();
                mask.hide();
            }
        });
    },

    updateDetailsPanel: function (r) {
        var p = this.DetailsComponent;
        p.currentCollection = r;

        p.collectionTitle.setText('<b>' + r.name + '</b>', false);

        this.setStatus(r.status);
        this.setStartDate(r.startDate);
        this.setEndDate(r.endDate);

        p.codeL.setText(r.code);
        p.keywordsL.setText(r.track);

        p.geoL.setText(r.geo ? r.geo : this.ns, false);
        p.followL.setText(r.follow ? r.follow : this.ns, false);
        p.languageFiltersL.setText(r.langFilters ? r.langFilters : this.ns, false);

        p.createdL.setText(r.createdDate);
        this.setCountOfDocuments(r.count);
        this.setLastDowloadedDoc(r.lastDocument);
    },

    updateDownloadPanel: function (code) {
        var downloadTabText = '<div class="styled-text">You can read the collected tweets from:<br><br>' +
            '<b>1.</b>&nbsp;&nbsp;File /var/data/aidr/persister/' + code + '.json on server scd1.qcri.org<br>' +
            '<b>2.</b>&nbsp;&nbsp;Redis queue FetcherChannel.' + code + ' on host scd1.qcri.org port 6379<br></div>';

        this.DetailsComponent.downloadText.setText(downloadTabText, false);
    },

    setLastDowloadedDoc: function(raw) {
        var p = this.DetailsComponent;
        p.lastDocL.setText(raw ? raw : this.na, false);
    },

    updateEditPanel: function () {
        var p = this.DetailsComponent;
        var r = p.currentCollection;

        p.codeE.setValue(r.code);
        p.nameE.setValue(r.name);
        p.keywordsE.setValue(r.track);

        p.geoE.setValue(r.geo ? r.geo : '');
        p.followE.setValue(r.follow ? r.follow : '');
        p.languageFiltersE.setValue(r.langFilters ? r.langFilters : '');
    },

    setStatus: function (raw) {
        var statusText = AIDRFMFunctions.getStatusWithStyle(raw);

        if (raw == 'RUNNING-WARNNING' || raw == 'RUNNING'){
            this.DetailsComponent.startButton.hide();
            this.DetailsComponent.stopButton.show();
        } else {
            this.DetailsComponent.startButton.show();
            this.DetailsComponent.stopButton.hide();
        }

        this.DetailsComponent.statusL.setText(statusText, false);
    },

    setStartDate: function (raw) {
        var me = this;
        this.DetailsComponent.lastStartedL.setText(raw ? raw : me.na, false);
    },

    setEndDate: function (raw) {
        var me = this;
        this.DetailsComponent.lastStoppedL.setText(raw ? raw : me.na, false);
    },

    setCountOfDocuments: function (raw) {
        this.DetailsComponent.docCountL.setText(raw ? raw : 0);
    },

    startCollection: function () {
        var mask = AIDRFMFunctions.getMask();
        mask.show();

        var me = this;
        var id = datailsController.DetailsComponent.currentCollection.id;
        Ext.Ajax.request({
            url: BASE_URL + '/protected/collection/start.action',
            method: 'GET',
            params: {
                id: id
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.decode(response.responseText);
                if (resp.success) {
                    if (resp.data) {
                        var data = resp.data;
                        me.updateDetailsPanel(data);
                    }

                    var ranOnce = false;
                    var task = Ext.TaskManager.start({
                        run: function () {
                            if (ranOnce) {
                                me.refreshStatus(id);
                                Ext.TaskManager.stop(task);
                            }
                            ranOnce = true;
                        },
                        interval: 5000
                    });
                } else {
                    AIDRFMFunctions.setAlert("Error", resp.message);
                }
            }});
    },

    stopCollection: function () {
        var me = this;
        var id = datailsController.DetailsComponent.currentCollection.id;

        var mask = AIDRFMFunctions.getMask();
        mask.show();

        Ext.Ajax.request({
            url: BASE_URL + '/protected/collection/stop.action',
            method: 'GET',
            params: {
                id: id
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                mask.hide();
                var resp = Ext.decode(response.responseText);
                if (resp.success) {
                    if (resp.data) {
                        var data = resp.data;
                        me.updateDetailsPanel(data);
                    }
                } else {
                    AIDRFMFunctions.setAlert("Error", resp.message);
                }
            }
        });
    },

    updateCollection: function () {
        var me = this;

        var id = datailsController.DetailsComponent.currentCollection.id;
        var status = datailsController.DetailsComponent.currentCollection.status;
        var startDate = datailsController.DetailsComponent.currentCollection.startDate;
        var endDate = datailsController.DetailsComponent.currentCollection.endDate;

        var form = Ext.getCmp('collectionForm').getForm();
        Ext.Ajax.request({
            url: BASE_URL + '/protected/collection/update.action',
            method: 'POST',
            params: {
                id: id,
                name: form.findField('name').getValue(),
                code: form.findField('code').getValue(),
                track: form.findField('track').getValue(),
                follow: form.findField('follow').getValue(),
                geo: form.findField('geo').getValue(),
                status: status,
                fromDate: startDate,
                endDate: endDate,
                langFilters: form.findField('langFilters').getValue()
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                me.DetailsComponent.tabPanel.setActiveTab(0);
                me.loadCollection(id);
            }
        });
    },

    cancelCollectionEdit: function () {
        this.DetailsComponent.tabPanel.setActiveTab(0);
        this.updateEditPanel();
    },

    refreshStatus: function (id) {
        var me = this;

        this.DetailsComponent.collectionLogStore.load();
        Ext.Ajax.request({
            url: BASE_URL + '/protected/collection/refreshCount.action',
            method: 'GET',
            params: {
                id: id
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success ) {
                    if (resp.data) {
                        var data = resp.data;

                        me.setStatus(data.status);
                        me.setStartDate(data.startDate);
                        me.setEndDate(data.endDate);
                        me.setCountOfDocuments(data.count);
                        me.setLastDowloadedDoc(data.lastDocument);
                    }
                } else {
                    AIDRFMFunctions.setAlert("Error", resp.message);
                }
            }
        });
    },

    getAllCrisisTypesFromTagger: function() {
        var me = this,
            mask = AIDRFMFunctions.getMask();

        mask.show();

        Ext.Ajax.request({
            url: BASE_URL + '/protected/tagger/getAllCrisisTypes.action',
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success && resp.data && resp.data.length > 0) {
                    var count = resp.data.length;
                    if (count > 0) {
                        me.DetailsComponent.crisesTypeStore.loadData(resp.data);
                        me.DetailsComponent.crisesTypeWin.show();
                    } else {
                        AIDRFMFunctions.setAlert("Error", "Crises types list received from Tagger is empty");
                    }
                } else {
                    mask.hide();
                    AIDRFMFunctions.setAlert("Error", resp.message);
                }
            },
            failure: function () {
                AIDRFMFunctions.setAlert("Error", "System is down or under maintenance. For further inquiries please contact admin.");
                mask.hide();
            }
        });
    },

    crisisTypeSelectHandler: function(view, record, item, index, e, eOpts) {
        var me = this,
            collection = this.DetailsComponent.currentCollection,
            code = collection.code,
            name = collection.name,
            crisisTypeID = record.data.crisisTypeID;

        Ext.Ajax.request({
            url: BASE_URL + '/protected/tagger/createCrises.action',
            method: 'POST',
            params: {
                code: code,
                name: name,
                crisisTypeID: crisisTypeID
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (resp.success ) {
//                    TODO process the response
                    AIDRFMFunctions.setAlert("Ok", resp.message);
                } else {
                    AIDRFMFunctions.setAlert("Error", resp.message);
                }
            }
        });
    }

});