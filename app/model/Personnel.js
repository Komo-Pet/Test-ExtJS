Ext.define('MyApp.model.Personnel', {
    extend: 'MyApp.model.Base',

    fields: [
        {name: 'ID', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'price', type: 'float'},
        {name: 'count', type: 'int'}
    ]
});
