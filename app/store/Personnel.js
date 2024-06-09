Ext.define('MyApp.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',

    model: 'MyApp.model.Personnel',

    data: { items: [
        { ID: '1', name: 'Notebook Lenovo', description: 'Ноутбук ThinkPad T460', price: '100', count: '2'},
        { ID: '2', name: 'Keyboard OKCLICK', description: 'Клавиатура OKCLIK 140M', price: '50', count: '8'},
        { ID: '3', name: 'Network adapter', description: 'Сетевой адаптер WiFi D-Link', price: '7', count: '0'}
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
