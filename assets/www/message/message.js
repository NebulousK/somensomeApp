Ext.ns("friend");
Ext.ns("friend.panel_friend");

friend.init = function(){
    var friendList;
    var friendStore;
    
    Ext.regModel('friend', {
        fields: ['photo','name','no']
    });     

    friendStore = new Ext.data.Store({
        model :'friend',               
        data:[
                // 공백
        ],
    });     
    
    friendList = new Ext.List({
        id:'friendList',
        store:friendStore,
        height:'100%',
        blockRefresh:true,
        onItemDisclosure: {
            handler: function(record, btn, index) {
            	main.MainPanel.layout.setActiveItem(mcall.panel_mcall);
            	mcall.panel_mcall.setUserId(record.get('name'));
            	mcall.panel_mcall.getUserInfo();
            }
        },
        itemTpl:'<div><div style="float: left"><input type="hidden" name="no" value="{no}"/><img src="'+ common_url +'/profile/{photo}" width="50px" height="50px" /></div><div style="float: left"><div style="float: left"><strong>이름 : {name}</strong></div></div>',
    });        

    function setfriendList(Jv_data) {
        friendStore = new Ext.data.Store({
            model :'friend',
            data:Jv_data,
        });
        Ext.getCmp('friendList').bindStore(friendStore);    
    };
               
    friend.panel_friend = new Ext.Panel({
        useCurrentLocation: true,
        fullscreen: true,
        cardSwitchAnimation:"cube",
        
        getfriendList:function()
        {
            Ext.Ajax.request({
                url: common_url + '/mList.friend?id='+ common_id,
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                    	setfriendList(JsonData.data.friend_list);
                    }
                    else
                    {
                        alert(JsonData.data.err);
                    }                
                }
            });         
        },
        items: friendList
    });
};   



