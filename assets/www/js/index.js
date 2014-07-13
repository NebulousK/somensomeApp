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
        menu.panel_menu.getNoticeList();  
    }
});

main.initMainPanel = function()
{
    main.MainPanel = new Ext.Panel({
        fullscreen: true,
        id:'MainPanel',
        cardSwitchAnimation:"cube",
        layout:'card',          
        
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
                    text: '<div align="center"><img src= "'+ local_img + 'power_on.png">Login</div>', 
                    //text: 'Login' ,
                    handler: function(btn,event){
                        main.MainPanel.layout.setActiveItem(login.panel_login); 
                    }               
                },               
                {   
                    cls:'Search',
                    text: '<div align="center"><img src= "'+ local_img + 'user_list.png">Search</div>',
                    handler: function(btn,event){
                        list.init();
                        main.MainPanel.layout.setActiveItem(list.panel_list);    
                    }
                },
                {   
                    cls:'Camera',
                    text: '<div align="center"><img src= "'+ local_img + 'photo1.png">Camera</div>',
                    handler: function(btn,event){
                        list.init();
                        callCamera(list.panel_list);    
                    }
				
                },                
                { 
                    cls:'Map',
                    text: '<div align="center"><img src= "'+ local_img + 'globe1.png">Map</div>',
                    handler: function(btn,event){
                   	
						callLocationPos('menu.panel_menu.receiveLocationPos');		
			  
                    } 
                }
            ]
        },
        {
            dock: 'top',
            xtype: 'toolbar',
            title: '¸ð¹ÙÀÏ HYBRID',
            items: [
            {
                cls:'home',
                iconMask: true,
                iconCls:'home',
                text: '',
                handler: function(btn,event){
               	
                    	menu.init();      
                    	       	
                        main.MainPanel.layout.setActiveItem(menu.panel_menu, "cube"); 
                        menu.panel_menu.getNoticeList();        
                         
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

