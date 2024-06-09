Ext.define('MyApp.store.Store', {
    extend: 'Ext.data.Store',

    alias: 'store.store',

    model: 'MyApp.model.Store',

    data: { items: [
        { ID: "1", name: "Notebook Lenovo", description: `Ноутбук ThinkPad T460 14"FH..."`, price: "100", count: "2" },
        { ID: "2", name: "Keyboard OKLICK", description: `Клавиатура OKLICK 140M, US...`, price: "50", count: "8" },
        { ID: "3", name: "Network adapter", description: `Сетевой адаптер WiFi D-Link...`, price: "7", count: "0" },
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
