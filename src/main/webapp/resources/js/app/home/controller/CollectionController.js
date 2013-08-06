Ext.define('AIDRFM.home.controller.CollectionController', {
    extend: 'Ext.app.Controller',

    views: [
        'CollectionPanel'
    ],

    init: function () {

        this.control({

            'collection-view': {
                beforerender: this.beforeRenderView
            },

            "#newCollection": {
                click: function (btn, e, eOpts) {
                    document.location.href = BASE_URL + '/protected/collection-create';
                }
            },

            "#refreshBtn": {
                click: function (btn, e, eOpts) {
                    collectionController.refreshButtonAction();
                }
            }

        });

    },

    beforeRenderView: function (component, eOpts) {
        AIDRFMFunctions.initMessageContainer();

        this.mainComponent = component;
        collectionController = this;

        var me = this;

        var isFirstRun = true;
        Ext.TaskManager.start({
            run: function () {
                if (!isFirstRun) {
                    me.refreshButtonAction();
                }
                isFirstRun = false;
            },
//            5 minutes
            interval: 5 * 60 * 1000
        });
    },

    startCollectionCheck: function(id, name) {
        var me = this;

        var mask = AIDRFMFunctions.getMask(true, 'Starting collection ...');
        mask.show();

        Ext.Ajax.request({
            url: 'collection/getRunningCollectionStatusByUser.action',
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            success: function (resp) {
                var response = Ext.decode(resp.responseText);
                mask.hide();
                if (response.success) {
                    if (response.data) {
                        var collectionData = response.data;
                        var collectionName = collectionData.name;
                        Ext.MessageBox.confirm('Confirm', 'The collection <b>' + collectionName + '</b> is already running. ' +
                            'Do you want to stop <b>' + collectionName + '</b>  and start <b>' + name + ' </b>?', function (buttonId) {
                            if (buttonId === 'yes') {
                                me.refreshStatus(collectionData.id);
                                me.startCollection(id);
                            }
                        });
                    } else {
                        me.startCollection(id);
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

    },

    stopCollection: function(id) {
        var me = this;

        var mask = AIDRFMFunctions.getMask(true, 'Stopping collection ...');
        mask.show();

        Ext.Ajax.request({
            url: 'collection/stop.action',
            method: 'GET',
            params: {
                id: id
            },
            headers: {
                'Accept': 'application/json'
            },
            success: function (response) {
                mask.hide();
                AIDRFMFunctions.setAlert("Ok", "Collection Stopped");

                var resp = Ext.decode(response.responseText);
                if (resp.success && resp.data) {
                    var data = resp.data;
                    me.updateCollectionInfo(data);
                }
            }
        });
    },

    startCollection: function (id) {
        var mask = AIDRFMFunctions.getMask(true, 'Starting collection ...');
        mask.show();

        var me = this;
        Ext.Ajax.request({
            url: 'collection/start.action',
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
                AIDRFMFunctions.setAlert("Ok", "Collection Started");

                if (resp.success && resp.data) {
                    var data = resp.data;
                    me.updateCollectionInfo(data);
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

            }});
    },

    updateCollectionInfo: function(data) {
        var id = data.id
        if (id) {
            var statusField = document.getElementById("statusField_" + id),
                docCountField = document.getElementById("docCountField_" + id),
                lastDocField = document.getElementById("lastDocField_" + id),
                docCount = data.count ? data.count : 0,
                lastDoc = data.lastDocument ? data.lastDocument : "<span class='na-text'>N/A</span>";


            statusField.innerHTML = AIDRFMFunctions.getStatusWithStyle(data.status);
            docCountField.innerHTML = 'Downloaded items: ' + docCount;
            lastDocField.innerHTML = 'Last downloaded item: ' + lastDoc;

            this.updateStartStopButtonsState(data.status, id);
        }
    },

    refreshStatus: function (id) {
        var me = this;

        Ext.Ajax.request({
            url: 'collection/refreshCount.action',
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
                    AIDRFMFunctions.setAlert("Ok", "Collection status was updated");
                    if (resp.data) {
                        var data = resp.data;

                        var statusField = document.getElementById("statusField_" + id),
                            docCountField = document.getElementById("docCountField_" + id),
                            docCount = data.count ? data.count : 0;

                        statusField.innerHTML = AIDRFMFunctions.getStatusWithStyle(data.status);
                        docCountField.innerHTML = 'Downloaded items: ' + docCount;

                        me.updateStartStopButtonsState(data.status, id);
                    }
                } else {
                    AIDRFMFunctions.setAlert("Error", "While Collection status update");
                }
            }
        });
    },

    updateStartStopButtonsState: function(status, id) {
        var buttonStart = document.getElementById("buttonStart_" + id),
            buttonStop = document.getElementById("buttonStop_" + id);

        if (status == 'RUNNING-WARNNING' || status == 'RUNNING'){
            buttonStart.className = 'btn btn-green hidden';
            buttonStop.className = 'btn btn-red';
        } else {
            buttonStart.className = 'btn btn-green';
            buttonStop.className = 'btn btn-red  hidden';
        }
    },

    refreshButtonAction: function() {
        var me = this;

        Ext.Ajax.request({
            url: 'collection/updateAndGetRunningCollectionStatusByUser.action',
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            success: function (resp) {
                try
                {
                    var response = Ext.decode(resp.responseText);
                    if (response.success) {
                        if (response.data) {
                            var collectionData = response.data;
                            me.updateCollectionInfo(collectionData);
                        } else {
                            AIDRFMFunctions.setAlert("Ok","You don't have Running Collections");
                        }
                    } else {
                        AIDRFMFunctions.setAlert(
                            "Error",
                            ['Error while updating Collections.',
                                'Please try again later or contact Support']
                        );
                    }
                }
                catch(err)
                {
                    /*
                     * if decode fail
                     * so user is not authenticated,
                     * redirecting to "home page" (which will redirect to "connect to twitter page" )
                     *
                     */
                    document.location.href = BASE_URL + '/protected/home'
                }
            }
        });
    }

});