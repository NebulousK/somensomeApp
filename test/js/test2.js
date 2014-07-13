 Ext.setup({
 icon: 'icon.png',
 tabletStartupScreen: 'tablet_startup.png',
 phoneStartupScreen: 'phone_startup.png',
 glossOnIcon: false,
 
 onReady: function(){
  var count = 0;
  var tabpanel = new Ext.TabPanel({
   tabBar: {
    dock: 'bottom',
    layout: {
     pack: 'center'
    }
   },
   
   fullscreen: true,
   
   ui: 'light',
   
   //카드 스위치 에니메이션
   cardSwitchAnimation:{
    //큐브형태 ,slide,pop,fade 기능이 있음
    type: 'cube',
    cover: true
   },
   
   iconAlign: 'left',
   
   defaults:{
    scroll: 'vertical'
   },
   
   items:[{
    title: 'About',
    html: '<center><font size="64" color="red"><BR/>1<BR/>첫번째</font></center>',
    iconCls: 'info',
    cls: 'card1',
    handler: function(){
     count = 0;
    }
   },
   {
    title: 'Favorites',
    html: '<center><font size="64" color="red"><BR/>2<BR/>두번째</font></center>',
    iconCls: 'favorites',
    cls: 'card2',
    //아이콘 상단 알림
    badgeText: '배지',
    handler: function(){
     count = 1;
    }
   },
   {
    title: 'Downloads',
    id: 'tab3',
    html: '<center><font size="64" color="red"><BR/>3<BR/>세번째</font></center>',
    iconCls: 'download',
    cls: 'card3',
    badgeText: '배지를 하나 더..',
    handler: function(){
     count = 2;
    }
   },
   {
    title:'Settings',
    html: '<center><font size="64" color="red"><BR/>4<BR/>네번째</font></center>',
    iconCls: 'settings',
    cls: 'card4',
    handler: function(){
     count = 3;
    }
   },
   {
    title: 'User',
    html: '<center><font size="64" color="red"><BR/>5<BR/>다섯번째</font></center>',
    
    iconCls: 'user',
    cls: 'card5',
    handler: function(){
     count = 4;
    }
   }],
   
   dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    defaults: {
     ui: 'plain'
    },
    scroll: 'horizontal',
    layout: {
     pack: 'center'
    },
    defaults: {
     iconMask: true,
     ui: 'plain'
    },
    items:[{
     //아이콘을 보여주는 여부
     iconMask: true,
     //아이콘 이름
     iconCls:'info',
     ui: 'back',
     id:'userbtn',
     text: 'back',
     handler: function(){
      console.log(tabpanel);
      count--;
      if(count < 0)
       count = 4;
      if(count > 4)
       count = 0;
      
      //해당 페이지 이동
      tabpanel.setActiveItem(count); 
     }
    },
    {
     iconMask: false,
     ui: 'forward',
     iconCls:'User',
     text: 'forward',
     handler: function(){
      count++;
      if(count < 0)
       count = 4;
      if(count > 4)
       count = 0;
      tabpanel.setActiveItem(count);
     }
    }
    ]
   }]
  });
 }
});