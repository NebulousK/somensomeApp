Ext.ns("someboard");
Ext.ns("someboard.panel_someboard");

someboard.init = function(){
    var someboardList;
    var someboardStore;
    
    Ext.regModel('someboardList', {
    	fields: ['pic', 'name', 'date', 'content']
    });     

    someboardStore = new Ext.data.Store({
        model :'someboardList',              
        data:[
                // 공백
        ],
    });     
    
    someboardList = new Ext.List({
        title:'내 메일목록',
        store:someboardStore,                       
        itemTpl: '<tpl for="."><div><table border="1" width="100%" ><tr><td rowspan="2" width="25%"><img src="{pic}" height=70></td><td> {name}</td><tr><td>{date}</td></tr></tr><td colspan="2"><B>{content}</B></td></tr></table> </div></tpl>',
    });        

    function setsomeboardList(Jv_data) {
        someboardStore = new Ext.data.Store({
            model :'someboardList',
            data:Jv_data,
        });
        someboardList.bindStore(someboardStore);  
    };


                
    someboard.panel_someboard = new Ext.Panel({
    	/*fullscreen: true,
        useCurrentLocation: true,
        scroll:'vertical',
        cardSwitchAnimation:"slide",*/
    	/*fullscreen: true,
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'center',
        },*/
    	useCurrentLocation: true,               
        scroll:'vertical',
        cardSwitchAnimation:"cube",
        scroll: 'vertical',
        getsomeboardList:function()
        {
            Ext.Ajax.request({
                url: common_url +'/mlubstory.some?no=532',
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                        setsomeboardList(JsonData.data.someboard_list);
                    }
                    else
                    {
                        alert(JsonData.data.err);
                    }
                    
                }
            });         
        },
                        
        items:
        [{
            xtype: 'fieldset',
            instructions: '우리들만의 게시판입니다.',
            defaults: {
                
                labelAlign: 'left' }
            ,
            items:someboardList
        }]
    });
}      

/*Ext.ns("gesipan");
Ext.ns("gesipan.panel_gesipan");

gesipan.init = function(){
    var gesipanList;

    var gesipanStore;
    var PersonModel;
    var PersonPic;
    
    Ext.regModel('gesipanList', {
        fields: ['id','subject','content','writer']
    });     

    gesipanStore = new Ext.data.Store({
        model :'gesipanList',              
        data:[
                // 공백
        ],
    });     
    
    gesipanList = new Ext.List({
        //id:'gesipan.gesipanList',
        title:'내 메일목록',
        store:gesipanStore,                       
        onItemDisclosure: {
            handler: function(record, btn, index) {
		            overlay_gesipan.setCentered(true);
		            gesipanOverlayToolbar.setTitle('공지사항정보');
		            overlay_gesipan.show();   
		            overlay_gesipan.update(record.get('subject') + "<BR><hr>" + record.get('content') + "<BR><hr>" + record.get('writer'));
            }
        },
        itemTpl:'<div><font size="2">{subject}</div><div> {writer}</font></div>',
    });        

    function setgesipanList(Jv_data) {
        gesipanStore = new Ext.data.Store({
            model :'gesipanList',
            data:Jv_data,
        });
        gesipanList.bindStore(gesipanStore);  
    };


                
    gesipan.panel_gesipan = new Ext.Panel({
        useCurrentLocation: true,               
        scroll:'vertical',
        cardSwitchAnimation:"cube",


        scroll: 'vertical',
        
        getgesipanList:function()
        {
            Ext.Ajax.request({
                url: common_url +'/jsp/gesipan_list.jsp',
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                        setgesipanList(JsonData.data.gesipan_list);
                    }
                    else
                    {
                        alert(JsonData.data.err);
                    }
                    
                }
            });         
        },
                        
        items:
        [{
            xtype: 'fieldset',
            instructions: '공지목록 입니다. ',
            defaults: {
                
                labelAlign: 'left' }
            ,
            items:gesipanList
        }]
    });


    var gesipanOverlayToolbar = new Ext.Toolbar({
       dock: 'top'
    });
    
	var overlay_gesipan = new Ext.Panel({
	
        floating: true,
        modal: true,
        centered: true,
        width: 310,
        height: 300,
        dockedItems: gesipanOverlayToolbar,
		html:'상세정보'
	});    
}      */