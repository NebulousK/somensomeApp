Ext.ns("login");

login.panel_login = new Ext.form.FormPanel({
useCurrentLocation: true,               
scroll:'vertical',
cardSwitchAnimation:"cube",

layout: {
    type: 'vbox',
    pack: 'center',
    align: 'stretch'
},
scroll: 'vertical',
                        
items:[{
    xtype: 'fieldset',
    title: '로그인',
    instructions: '아이디와 암호를 입력하십시오',
    defaults: {
        required: true,
        labelAlign: 'left',
        labelWidth: '40%'
    },
    items:[{
        xtype:'textfield',
        id:'login.user_id',
        label:'아이디',
        placeHolder:'직원번호',
        autoCapitalisze:true,
        useClearIcon:false
    },{
        xtype:'passwordfield',
        id: 'login.user_pwd',
        placeHolder:'영문자혼합 6자',
        label: '암호',
        useClearIcon:true
    },{
        layout: {
            type: 'hbox',
            pack: 'center',
            
        },  
        flex: 2, style: 'margin: .5em;',                
        items:[{
            xtype:'button',
            ui: 'decline-round',
            name:'button_login',
            handler:function(){                 
                Ext.Ajax.request({
                    url: common_url  + '/jsp/login.jsp?user_id=' + 
                    Ext.getCmp("login.user_id").getValue() + 
                    '&user_pwd=' + 
                    Ext.getCmp("login.user_pwd").getValue(),
                    success: function(response, opts) {
                        var JsonData = JSON.parse(response.responseText);
                        if(JsonData.data.err == "")
                        {
                            if(JsonData.data.longYn == "N")
                            {
                                alert(JsonData.data.err);
                            }
                            else
                            {
                                alert('로그인 성공!!');
                                mail.init();
                                mail.panel_mail.getMailList();
                                main.MainPanel.layout.setActiveItem(mail.panel_mail); 
                            }
                        }
                        else
                        {
                            alert(JsonData.data.err);
                        }
                        
                    }
                });                     
            },    
            text:'로그인'
        }]                                       
    }]
}],         
}); 