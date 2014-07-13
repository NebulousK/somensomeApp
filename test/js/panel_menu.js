/*Ext.ns("menu");

menu.init = function(){
menu.panel_menu = new Ext.form.FormPanel({
    useCurrentLocation: true,               
    scroll:'vertical',
    cardSwitchAnimation:"cube",
    items:[{
        xtype: 'fieldset',
        title: 'MOBILE HYBRID APP..',
        width:'80%',
        align: 'center',
        layout: {
                align: 'center'
            },
        defaults: {
            required: true,
            height:100,
            labelAlign: 'center',
            labelWidth: '80%' },
        items:[     
        { 
                xtype:'spacer',
                height:'30',
        },      
        {
            align:'center',
            width: '100%',
            defaults: {
                required: true,
                height:80,
                labelAlign: 'center',
            },
            layout: {
                align: 'center',
                type: 'hbox',
                pack: 'center'},  
            flex: 2, style: 'margin: .5em;',
            items:[
            { 
                xtype:'spacer',
                height:'5%',
            },          
            {
                xtype:'button',
                margin:0,
                cls:'x-btn-text-icon',
                width: '30%',
                textAlign:'center',
                text:'<div align="center"><img src= "'+ local_img + 'info.png">공지</div>',
                handler: function(){
                    notice.init();
                    notice.panel_notice.getnoticeList();
                    main.MainPanel.layout.setActiveItem(notice.panel_notice);
                }                               
            },{ 
                xtype:'spacer',
                width:'5%',
            },{
                xtype:'button',
                width: '30%',
                textAlign:'center',
                text:'<div align="center"><img src= "'+ local_img + 'user_list.png">직원</div>',
                handler: function(){
                    list.init();
                    main.MainPanel.layout.setActiveItem(list.panel_list);  
                }
            },{ 
                xtype:'spacer',
                width:'5%',
            },{

                xtype:'button',
                width: '30%',
                textAlign:'center',
                text:'<div align="center"><img src= "'+ local_img + 'compose.png">게시판</div>',
                handler: function(){
                    gesipan.init();
                    gesipan.panel_gesipan.getgesipanList();
                    main.MainPanel.layout.setActiveItem(gesipan.panel_gesipan);
                }
            }]
        },
        {
            align: 'center',
            width: '100%',
            layout: {
                type: 'hbox',
                pack: 'center'},  
            flex: 1, style: 'margin: .5em;',
            items:[{
                xtype:'button',
                width: '30%',
                textAlign:'center',
                text:'<div align="center"><img src = "'+ local_img + 'photo1.png">카메라</div>',                   
                handler: function(){
                    callCamera();
                }                                       
            },{ 
                xtype:'spacer',
                width:'5%',
            },{
                xtype:'button',
                width: '30%',
                textAlign:'center',
                text:'<div align="center"><img src= "'+ local_img + 'tv.png">동영상</div>',                    
                handler: function(){
                    movie.init();
                    movie.panel_movie.getmovieList();
                    main.MainPanel.layout.setActiveItem(movie.panel_movie); 
                }                                   
            },{ 
                xtype:'spacer',
                width:'5%',
            },{

                xtype:'button',
                width: '30%',
                textAlign:'center',
                text:'<div align="center"><img src= "'+ local_img + 'globe1.png">다음맵</div>',                    
                handler: function(){
                    callLocationPos('menu.panel_menu.receiveLocationPos');
                }   
            }]
        }]
    },{
        xtype: 'fieldset',
        id:'menu.noticeFieldset',
        color:'white',
        title:'공지사항',
        html:'...',
        defaults: {                
            labelAlign: 'left' }
    }],
    receiveLocationPos:function(lng,lat)
    {
        daummap.init(lng,lat);
        main.MainPanel.layout.setActiveItem(daummap.panel_map);

    },
    getNoticeList:function()
    {
        Ext.Ajax.request({
            url: 'http://localhost:8080/books' + '/jsp/notice_list.jsp',
            success: function(response, opts) {
                var JsonData = JSON.parse(response.responseText);
                if(JsonData.data.err == "")
                {
                    var noticeHtml = "<table width='100%' bgcolor='white'>"
                    for(var i=0; i< JsonData.data.notice_list.length;i++)
                    {
                        noticeHtml = noticeHtml + "<tr><td>" + JsonData.data.notice_list[i].subject + "</td></tr>";
                    }
                    noticeHtml= noticeHtml + "</table>";
                    Ext.getCmp('menu.noticeFieldset').update(noticeHtml);
                }
                else
                {
                    alert(JsonData.data.err);
                }                   
            }
        });         
    },    
});   
}*/


Ext.ns("menu");

menu.init = function(){
menu.panel_menu = new Ext.form.FormPanel({
    useCurrentLocation: true,               
    scroll:'vertical',
    cardSwitchAnimation:"cube",
    items:[{
        xtype: 'fieldset',
        title: 'Some N somE',
        width:'80%',
        align: 'center',
        layout: {
                align: 'center'
            },
        defaults: {
            required: true,
            height:100,
            labelAlign: 'center',
            labelWidth: '80%' },
        items:[     
        { 
                xtype:'spacer',
                height:'30',
        },      
        {
            align:'center',
            width: '100%',
            defaults: {
                required: true,
                height:80,
                labelAlign: 'center',
            },
            layout: {
                align: 'center',
                type: 'hbox',
                pack: 'center'},  
            flex: 2, style: 'margin: .5em;',
            items:[
            { 
                xtype:'spacer',
                height:'5%',
            },          
            {
                xtype:'button',
                margin:0,
                cls:'x-btn-text-icon',
                width: '30%',
                textAlign:'center',
                text:'<div align="center"><img src= "'+ local_img + 'compose.png">love board</div>',
                handler: function(){
                	someboard.init();
                    someboard.panel_someboard.getsomeboardList();
                    main.MainPanel.layout.setActiveItem(someboard.panel_someboard);
                }                               
            },{ 
                xtype:'spacer',
                width:'5%',
            },{
                xtype:'button',
                width: '30%',
                textAlign:'center',
                text:'<div align="center"><img src= "'+ local_img + 'photo1.png">사진첩</div>',
                handler: function(){
                	gesipan.init();
                    gesipan.panel_gesipan.getgesipanList();
                    main.MainPanel.layout.setActiveItem(gesipan.panel_gesipan);
                }
            },{ 
                xtype:'spacer',
                width:'5%',
            },{

                xtype:'button',
                width: '30%',
                textAlign:'center',
                text:'<div align="center"><img src= "'+ local_img + 'info.png">일정 관리</div>',
                handler: function(){
                    gesipan.init();
                    gesipan.panel_gesipan.getgesipanList();
                    main.MainPanel.layout.setActiveItem(gesipan.panel_gesipan);
                }
            }]
        }]
    }],
    receiveLocationPos:function(lng,lat)
    {
        daummap.init(lng,lat);
        main.MainPanel.layout.setActiveItem(daummap.panel_map);
    },   
});  
}


