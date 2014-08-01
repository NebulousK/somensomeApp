Ext.ns("message");
Ext.ns("message.panel_message");

message.init = function(){
    var messageList;
    var messageStore;
    
    Ext.regModel('message', {
    	fields: ['content','sender','no','day','dear','photo']
    });
    
  
    
    messageStore = new Ext.data.Store({
        model :'message',               
        data:[
                // 공백
        ],
    });     
    
    function setmessage(Jv_data) {
    	messageStore.add(Jv_data);
    };
   
    messageList = new Ext.XTemplate(//'+ common_id +'
    		'<tpl for=".">',
    		'<tpl if="sender==\'happyhiphop\'">',
    	    '<div id="memo_area" class="me">',
    	    '</tpl>',
    	    '<tpl if="sender==\'iyou\'">',
    	    '<div id="memo_area" class="you">',
    	    '</tpl>',
    		'<div class="nick_area">',
    			'<table border="0" cellpadding="5" cellspacing="0">',
    				'<tr>',
    					'<td align="right"><img class="hu_icon" src="'+ common_url +'/profile/{photo}" width="25" height="25" style="width:25px;height:25px;" /></td>',
    					'<td width="5"></td>',
    					'<td align="left" valign="center">',
    											'{sender}',
    											'<br>',
    						'<span class="date">',
    							'{day}',
    						'</span>',
    					'</td>',
    				'</tr>',
    			'</table>',
    		'</div>',
    					'<div class="tri"> </div>',
    				'<span class="memotext">',
    							'{content}',
    					'</span>',
    					'</div>',
    					'</tpl>'
    	);
    
    message.panel_message = new Ext.Panel({
        useCurrentLocation: true,
        //fullscreen: true,
        height:'100%',
        cardSwitchAnimation:"cube",
        setUserId:function(user_id)
        {
            this.input_user_id = user_id;
        },
        getmessageList:function()
        {
            Ext.Ajax.request({
                url: common_url + '/mmemseage.me?id='+ common_id + '&id2=' + this.input_user_id,
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                    	setmessage(JsonData.data.message_list);
                    }
                    else
                    {
                        alert(JsonData.data.err);
                    }                
                }
            });         
        },
        dockedItems :[{
        	id:'main.toolbar',
            dock: 'bottom',
            xtype: 'toolbar',
            layout: {
            	type: 'hbox',
            	pack: 'center',
        	},
            items: [{   
            	 	xtype:'textfield',
            	 	id:'message.comment',
            	 	autoCapitalisze:true,
            	 	useClearIcon:false,
            	 	width : '80%',
                },                
                { 
                	xtype:'button',
                    ui: 'decline-round',
                    name:'button_login',
                    text: '전송',
                    handler: function(btn,event){
						alert(Ext.getCmp("message.comment").getValue());	
                    } 
                }
            ]
        },
        {
            dock: 'top',
            xtype: 'toolbar',
            title: '쪽지함',
            items: [
            {
                cls:'home',
                iconMask: true,
                iconCls:'home',
                text: '',
                handler: function(btn,event){
                	 	friend.init();
                	 	friend.panel_friend.getfriendList();
                	 	main.MainPanel.layout.setActiveItem(friend.panel_friend); 
                    }      
                }
            ]
        }], 
        items: new Ext.DataView({
        	id:'myview',
            store: messageStore,
            tpl: messageList,
            //autoHeight:true,
            height: '100%',
            autoScroll: true,
            emptyText: '쪽지가 없습니다.',
            itemSelector:'div.thumb-wrap',
        }),
        addScrollList:function(a,b)
        {
        	if(b.offset <= 0)
        		getsomeboardList2();
        		store.add(addData);
        }
    }); /*
    someboard_list.scroller.scrollTo({
        x: 0,
        y: 300
    });*/
};   