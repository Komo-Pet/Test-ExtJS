

filterGrid = function (grid, property, value) {
    //debugger;
    
    if (grid.store.filters) {
         grid.store.filters.each(function(item) {
          if (item.property === property) {
              grid.store.removeFilter(item);
          }  
        })
    };
   
    if (value) {
        grid.store.addFilter({
            filterFn: function (record) {
                switch (property){
                    case 'ID':
                    return value == record.get(property);
                    case 'description':
                    return record.get(property).indexOf(value) >= 0;
                }
                
            }
        });
        grid.store.filters.getAt(grid.store.filters.length-1).property=property;
    }
};


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
        //id: 'test',
        itemId: 'IDFilter',
        padding:10,
        xtype: 'textfield',
        emptyText: 'Введите фильтр...',
        //reference: 'ID',
        publishes: 'value',
        fieldLabel: 'ID',
        displayField: 'ID',
        minChars: 0,
        queryMode: 'local',
        typeAhead: true,
        store: {
            type: 'personnel'
        },
        enableKeyEvents: true,
        listeners: {
            specialkey: (field, event) => { 
                if(event.getKey()==event.ENTER){
                    //debugger;
                    const filter_id = field.getValue();  
                    filterGrid(field.up().query('gridpanel')[0], 'ID', filter_id);
                }
            }
        }
    },
    {
        padding:10,
        xtype: 'textfield',
        emptyText: 'Введите фильтр...',
        //reference: 'description',
        publishes: 'value',
        fieldLabel: 'Описание',
        displayField: 'description',
        minChars: 0,
        queryMode: 'local',
        typeAhead: true,
        store: {
            type: 'personnel'
        },
        enableKeyEvents: true,
        listeners: {
            specialkey: (field, event) => { 
                if(event.getKey()==event.ENTER){
                    const descSubString = field.getValue();
                    //debugger;  
                    filterGrid(field.up().query('gridpanel')[0], 'description', descSubString);
                }
            }
        }
    },
    {
            xtype: 'gridpanel',
            itemId: 'gridPanel',
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
                itemId: 'price',
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
                cellclick: function (gridView,htmlElement,columnIndex,dataRecord) {
                    //debugger;
                    if(columnIndex == 1){
                        //debugger;
                        
                        new Ext.form.Panel({
                            xtype: 'cardInfo',
                            width: 400,
                            height: 350,
                            itemId: 'cardInfo',
                            title: 'Карточка товара:' + dataRecord.data.name,
                            floating: true,
                            closable: true,
                            items:{
                                xtype: 'form',
                                reference: 'form',
                            items:[{
                                xtype: 'displayfield',
                                fieldLabel: 'ID',
                                name: 'ID',
                                itemId: 'ID',
                                value: dataRecord.data.ID,
                                allowBlank: false,
                                padding:10
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Наименование',
                                name: 'name',
                                value: dataRecord.data.description,
                                allowBlank: false,
                                padding:10
                            },
                            {   
                                xtype: 'numberfield',
                                fieldLabel: 'Цена',
                                name: 'price',
                                itemId: 'cardPrice',
                                value: dataRecord.data.price,
                                allowBlank: false,
                                padding:10
                            },
                            {
                                xtype: 'numberfield',
                                fieldLabel: 'Количество',
                                name: 'count',
                                itemId: 'cardCount',
                                value: dataRecord.data.count,
                                allowBlank: false,
                                padding:10
                            }],
                            buttons: [{
                                id: 'Save',
                                text: 'Сохранить',
                                //disabled: true,
                                formBind: true,
                                listeners:{
                                    click: function(){
                                        //debugger;
                                        var arrayID = Ext.ComponentQuery.query('#ID')[0].getValue();
                                        var validPrice = Ext.ComponentQuery.query('#cardPrice')[0].getValue();
                                        var validCount = Ext.ComponentQuery.query('#cardCount')[0].getValue();
                                        if((Number.isSafeInteger(validCount)) && (!isNaN(validPrice)) && (!isNaN(validCount) && (validCount >= 0) && (validPrice >= 0))) {
                                            Ext.getStore('storage').getAt(arrayID-1).set(
                                                'count',
                                                validCount)
                                            Ext.getStore('storage').getAt(arrayID-1).set(
                                                'price',
                                                validPrice,
                                                Ext.ComponentQuery.query('#cardInfo')[0].close()
                                            );
                                            alert('Данные были изменены');
                                            var mainlistLength = Ext.ComponentQuery.query('mainlist').length-1;
                                            for (let i = 0;
                                                 i <= mainlistLength ;
                                                 i++){
                                                Ext.ComponentQuery.query('gridpanel')[i].getView().refresh();
                                            }
                                        } else{
                                            alert('Данные неверные, данные должны быть неотрицательными, а количество товаров не может быть дробным числом')
                                        }
                                    }
                                }
                            },
                            {
                                text: 'Отмена',
                                handler: function(){
                                    //debugger;
                                    Ext.ComponentQuery.query('#cardInfo')[0].close();
                                }
                            }]
                        },
                        //listeners: {
                        //    InputEvent: function() {
                        //        Ext.ComponentQuery.query('#Save')[0].setDisabled(false)
                        //    }
                        //}
                        }).show();
                    }
                }
            }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        emptyMsg: "No topics to display",
    }
    
    
});
