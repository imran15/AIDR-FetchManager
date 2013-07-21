Ext.define("Web.model.CollectionModel", {
    extend: 'Ext.data.Model',
    alias: 'widget.CollectionModel',
    proxy: {
        type: 'ajax',
        url : 'collection/search.action',
        reader: {
            type: 'json'
        }
    },
    fields:['id', 'code', 'name','target']
});