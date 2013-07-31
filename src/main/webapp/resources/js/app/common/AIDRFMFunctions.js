Ext.define('AIDRFM.app.common.AIDRFMFunctions', {

    initMessageContainer: function (){
        msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
        msgCt.setStyle('position', 'absolute');
        msgCt.setStyle('z-index', 99999);
        msgCt.setWidth(300);
    },

    setAlert: function (status, msg) {
        var message = '<ul>';
        if (Ext.isArray(msg)) {
            Ext.each(msg, function (ms) {
                message += '<li>' + ms + '</li>';
            })
        } else {
            message = '<li>' + msg + '</li>';
        }
        message += '</ul>';

        // add some smarts to msg's duration (div by 13.3 between 3 & 9 seconds)
        var delay = msg.length / 13.3;
        if (delay < 3) {
            delay = 3;
        }
        else if (delay > 9) {
            delay = 9;
        }
        delay = delay * 1000;

        msgCt.alignTo(document, 't-t');
        Ext.DomHelper.append(msgCt, {html: this.buildMessageBox(status, message)}, true).slideIn('t').ghost("t", {delay: delay, remove: true});
    },

    buildMessageBox : function(title, msg) {
        return [
            '<div class="app-msg">',
            '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
            '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3 class="x-icon-text icon-status-' + title + '">', title, '</h3>', msg, '</div></div></div>',
            '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
            '</div>'
        ].join('');
    },

    getMask: function (showMessage, msg) {
        if (showMessage) {
            if (!msg) {
                msg = 'Loading...';
            }
        }
        if (this.maskScreen == null) {
            this.maskScreen = new Ext.LoadMask(Ext.getBody(), {msg: msg});
        } else {
            this.maskScreen.msg = msg;
        }
        return this.maskScreen;
    }

});

AIDRFMFunctions = new AIDRFM.app.common.AIDRFMFunctions();