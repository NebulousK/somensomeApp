Ext.ns("main");
Ext.ns("main.MainPanel");


Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        main.initMainPanel();
    	menu.init();                    	
        main.MainPanel.layout.setActiveItem(menu.panel_menu, "cube"); 
    }
});

main.initMainPanel = function()
{
    main.MainPanel = new Ext.Panel({
        fullscreen: true,
        id:'MainPanel',
        cardSwitchAnimation:"cube",
        layout:{
            type: 'card',
            align: 'center',
            pack: 'top',
            autoScroll:true,
        },
        autoScroll:true,
        dockedItems :[{
        	id:'main.toolbar',
            dock: 'bottom',
            xtype: 'toolbar',
            layout: {
            	type: 'hbox',
            	pack: 'center',
        	},
            items: [
                { 
                    cls:'Login',
                    //iconMask: true,
                    text: '<div align="center"><img src= "'+ local_img + 'compose.png">love</div>', 
                    //text: 'Login' ,
                    handler: function(btn,event){
                        main.MainPanel.layout.setActiveItem(somebaord.panel_somebaord); 
                    }               
                },               
                {   
                    cls:'Search',
                    text: '<div align="center"><img src= "'+ local_img + 'photo1.png">Photo</div>',
                    handler: function(btn,event){
                        list.init();
                        main.MainPanel.layout.setActiveItem(list.panel_list);    
                    }
                },
                {   
                    cls:'Camera',
                    text: '<div align="center"><img src= "'+ local_img + 'power_on.png">Calendar</div>',
                    handler: function(btn,event){
                        list.init();
                        callCamera(list.panel_list);    
                    }
				
                }]
        }], 
        receiveLocationPos:function(lng,lat)
        {
            daummap.init(lng,lat);
            main.MainPanel.layout.setActiveItem(daummap.panel_map);
        },        
    }); 
}

