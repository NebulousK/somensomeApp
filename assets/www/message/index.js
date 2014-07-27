Ext.ns("main");
Ext.ns("main.MainPanel");

Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        main.initMainPanel();	
        friend.init();
        main.MainPanel.layout.setActiveItem(friend.panel_friend); 
    }
});

main.initMainPanel = function()
{
    main.MainPanel = new Ext.Panel({
        fullscreen: true,
        id:'MainPanel',
        cardSwitchAnimation:"cube",
        layout:'card',                 
    }); 
   
};
