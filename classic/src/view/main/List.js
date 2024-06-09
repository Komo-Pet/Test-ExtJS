/**
 * This view is an example list of people.
 */

Ext.define('MyApp.view.main.List', {
    extend: 'Ext.form.Panel',
    xtype: 'mainlist',

    requires: [
        'MyApp.store.Personnel',
    ],
    title: 'Список товаров',

    store: {
        type: 'personnel'
    },

    items:[{
        padding:10,
        xtype: 'textfield',
        emptyText: 'Введите фильтр...',
        reference: 'IDfilter',
        publishes: 'value',
        fieldLabel: 'IDfilter',
        displayField: 'IDfilter',
        minChars: 0,
        queryMode: 'local',
        typeAhead: true,
        store: {
            type: 'personnel'
        },
        enableKeyEvents: true,
        listeners: {
            keydown: (event, opts) => {
                if (opts.keyCode == Ext.event.Event.ENTER) {
                    
                }
            }
        }
    },
    {
        padding:10,
        xtype: 'textfield',
        emptyText: 'Введите фильтр...',
        reference: 'description',
        publishes: 'value',
        fieldLabel: 'Описание',
        displayField: 'description',
        minChars: 0,
        queryMode: 'local',
        typeAhead: true,
        store: {
            type: 'personnel'
        },
    },
    {
            xtype: 'gridpanel',
    
            height: 400,
            columnWidth: 0.65,
    
            bind: {
                selection: '{theCompany}'
            },
            store: {
                type: 'personnel'
            },
    
            columns: [{
                //id: 'ID',
                text: 'ID',
                dataIndex: 'ID',
    
                flex: 1,
                sortable: true
            }, {
                text: 'Имя',
                dataIndex: 'name',
                flex: 1,
                sortable: true
            }, {
                text: 'Описание',
                dataIndex: 'description',
    
                flex: 1,
                sortable: true,
            }, {
                text: 'Цена',
                dataIndex: 'price',
    
                flex: 1,
                sortable: true,
            }, {
                text: 'Количество',
                dataIndex: 'count',
    
                flex: 1,
                sortable: true,
                renderer : function(value, meta) {
                    if(parseInt(value) > 0) {
                        
                    } else {
                        meta.style = "background-color:red;";
                    }
                    return value;
                }
            }],
            listeners: {
                select: function () {
                    new Ext.form.Panel({
                        width: 400,
                        height: 350,
                        title: 'Карточка товара:' + this.up('#name'),
                        floating: true,
                        closable: true,
                        items:[{
                            xtype: 'displayfield',
                            fieldLabel: 'ID',
                            name: 'ID',
                            value: '1',
                            allowBlank: false,
                            padding:10
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Наименование',
                            name: 'name',
                            value: '1',
                            allowBlank: false,
                            padding:10
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Цена',
                            name: 'price',
                            value: 25,
                            allowBlank: false,
                            padding:10
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Количество',
                            name: 'count',
                            value: 25,
                            allowBlank: false,
                            padding:10
                        }],
                        buttons:[{
                            text: 'Сохранить',
                            formBind: true,
                            listeners:{

                            }
                        },
                        {
                            text: 'Отмена',
                            formBind: false,
                        }],
                    }).show();
                }
            }
    }],

    
    
});
