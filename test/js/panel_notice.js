Ext.ns("notice");
Ext.ns("notice.panel_notice");

notice.init = function(){

    var noticeList;
    var noticeStore;
    var PersonModel;
    var PersonPic;
    
    Ext.regModel('noticeList', {
        fields: ['id','subject','content','writer']
    });     
    noticeStore = new Ext.data.Store({
        model :'noticeList',              
        data:[
                // 공백
        ],
    });
    noticeList = new Ext.List({
        //id:'notice.noticeList',
        title:'내 메일목록',
        store:noticeStore,                       
        onItemDisclosure: {
            handler: function(record, btn, index) {
		            overlay_notice.setCentered(true);
		            noticeOverlayToolbar.setTitle('공지사항정보');
		            overlay_notice.show();   
		            overlay_notice.update(record.get('subject') + "<BR><hr>" + 
		                record.get('content') + "<BR><hr>" + record.get('writer'));
            }
        },
        itemTpl:'<div><font size="2">{subject}</div><div> {writer}</font></div>',
    });        

    function setnoticeList(Jv_data) {
        noticeStore = new Ext.data.Store({
            model :'noticeList',
            data:Jv_data,
        });
        noticeList.bindStore(noticeStore);  
    };
                
    notice.panel_notice = new Ext.Panel({
        useCurrentLocation: true,               
        scroll:'vertical',
        cardSwitchAnimation:"cube",


        scroll: 'vertical',
        
        getnoticeList:function()
        {
            Ext.Ajax.request({
                url: common_url + '/jsp/notice_list.jsp',
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                        setnoticeList(JsonData.data.notice_list);
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
            items:noticeList
        }]
    });

    var noticeOverlayToolbar = new Ext.Toolbar({
       dock: 'top'
    });
    
	var overlay_notice = new Ext.Panel({
        floating: true,
        modal: true,
        centered: true,
        width: 310,
        height: 300,
        dockedItems: noticeOverlayToolbar,
		html:'상세정보'
	});    
}       