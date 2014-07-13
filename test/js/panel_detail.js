Ext.ns("detail");
Ext.ns("detail.panel_detail");

detail.panel_detail = new Ext.form.FormPanel({
    useCurrentLocation: true,               
    scroll:'vertical',
    cardSwitchAnimation:"cube",
    width: '100%',
    input_user_id:'',
    tel: '',
    sms: '',
    setUserId:function(user_id)
    {
        this.input_user_id = user_id;
    },
    
    getUserInfo:function()
    {
        Ext.Ajax.request({
            url: common_url + '/jsp/psn_detail.jsp?user_id=' + this.input_user_id,
            success: function(response, opts) {
                console.log(response.responseText);
                var JsonData = JSON.parse(response.responseText);
                console.log(JsonData);
                if(JsonData.data.err == "")
                {
                    detail.panel_detail.setPersonFields(JsonData.data.psn_detail);
                }
                else
                {
                    alert(JsonData.data.err);
                }                
            }
        });         
    },  
    setPersonFields:function(psnDetail)
    {
        var psnPic =  '<table width="100%"><tr><td><center>' + 
                      '<img src="' + common_url + 
                      '/img/' +  psnDetail.user_id +  '.png" height="150"></td></tr></table>'

                          
        Ext.getCmp("panel_detail.user_id").setValue(psnDetail.user_id);
        Ext.getCmp("panel_detail.user_name").setValue(psnDetail.user_name);
        Ext.getCmp("panel_detail.tel").setValue(psnDetail.tel);
        Ext.getCmp("panel_detail.adr").setValue(psnDetail.adr);
        Ext.getCmp("panel_detail.user_pic").update(psnPic);
        
    },
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },
    scroll: 'vertical',                         
    items:
    [{
        xtype: 'fieldset',
        title: '직원 조회',
        //instructions: '직원명을 입력하시고 조회버튼을 클릭하십시요',
        pack: 'center',
        defaults: {
            required: true,
            labelAlign: 'left' ,
            labelWidth:'40%',
        },
        items:[
            {
                xtype:'panel',
                id:'panel_detail.user_pic',
                xtype: 'fieldset',
                html:'',            
            },    
            {
                layout: {
                    type: 'hbox',
                    pack: 'center',
                },
                items:[{  
                    xtype:'button',
                    text:'전화하기',
                    ui: 'decline-round',
                    name:'button_login',
                    handler:function(){
                    	
                        callPhone(Ext.getCmp("panel_detail.tel").getValue());
                    }
                    
                },{
                    xtype:'spacer',
                    width:'10%',
                },{  
                    xtype:'button',
                    text:'SMS전송',
                    ui: 'decline-round',
                    name:'button_login',
                    handler:function(){
                        callSms(Ext.getCmp("panel_detail.tel").getValue(),'전화를 주세요');
                    }                   
                }]
            },
            {
                xtype:'textfield',
                label:'직원번호',
                id:'panel_detail.user_id',               
                placeHolder:'직원번호',
                autoCapitalisze:true,
                useClearIcon:false
                            
            },{
                xtype:'textfield',
                label:'직원번호',
                id:'panel_detail.user_id',               
                placeHolder:'직원번호',
                autoCapitalisze:true,
                useClearIcon:false
                            
            },            
            {
                xtype:'textfield',
                id:'panel_detail.user_name',
                label:'직원명',
                placeHolder:'직원명',
                autoCapitalisze:true,
                useClearIcon:false
                            
            },    
            {
                xtype:'textfield',
                id:'panel_detail.tel',
                label:'전화번호',
                placeHolder:'전화번호',
                autoCapitalisze:true,
                useClearIcon:false                          
            },           
            {
                xtype:'textareafield',
                id:'panel_detail.adr',
                label:'주소',
                placeHolder:'주소',
                useClearIcon:false,
                            
            }, 
            {
                xtype:'button',
                ui: 'decline-round',                
                name:'panel_detail.button_close',
                width:'30%',
                handler:function(){                                     
                   main.MainPanel.layout.setActiveItem(list.panel_list); 
                },
                text:'목록'
            }]                                  
    }]
});     
