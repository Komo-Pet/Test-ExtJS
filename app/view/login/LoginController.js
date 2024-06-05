Ext.define('MyApp.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',



    onLoginClick: function() {
        var password = Ext.ComponentQuery.query('#password')[0].getValue();
        var login= Ext.ComponentQuery.query('#username')[0].getValue()
        if (password === 'padmin' && login === 'admin'){
            localStorage.setItem("TutorialLoggedIn", true);

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
        });
        }
        // This would be the ideal location to verify the user's credentials via
        // a server-side lookup. We'll just move forward for the sake of this example.

        // Set the localStorage value to true
        

    }
});