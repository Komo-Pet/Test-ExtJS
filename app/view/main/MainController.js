let i = toString(1);

Ext.define('MyApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onTabChange: function(tabs, newTab, oldTab) {
        Ext.suspendLayouts();
        newTab.setTitle('Active Tab');
        oldTab.setTitle('Inactive Tab');
        Ext.resumeLayouts(true);
    },

    createNewField: function () {
        //debugger;
        i = toString(parseInt(i)+ 1);
        var tabPanel = this.getView(),
            tab = tabPanel.add({
                title: 'Товары',
                name: 'Tab'+i,
                items: [{
                    xtype: 'mainlist',
                }]
            });
        tabPanel.setActiveTab(tab);
        console.log();
    },

    onLogOut: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
             // Remove the localStorage key/value
            localStorage.removeItem('TutorialLoggedIn');

            // Remove Main View
            this.getView().destroy();

            // Add the Login Window
            Ext.create({
            xtype: 'login'
            });   
        }
    },
    createWindow: function () {
        var me = this;
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('itemmanagement-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'itemmanagement-win',
                title: 'Item Management',
                width: 600,
                height: 505,
                iconCls: 'icon-itemmanagement',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit'
            });
        }
        win.show();
        return win;
    }
});