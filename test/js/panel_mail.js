Ext.ns("mail");
Ext.ns("mail.panel_mail");




mail.init = function(){
    var emailList;

    var emailStore;
    var PersonModel;
    var PersonPic;
    
    Ext.regModel('mailList', {
        fields: ['subject']
    });     

    emailStore = new Ext.data.Store({
        model :'mailList',              
        data:[
                // 공백
        ],
    });     
    
    emailList = new Ext.List({
        id:'emailList',
        title:'내 메일목록',
        store:emailStore,                       
        onItemDisclosure: {
            handler: function(record, btn, index) {
                alert('생략')                
            }
        },
        itemTpl:'<div><font size="2"><strong>{subject}</strong></font></div>',
    });        

    function setEmailList(Jv_data) {
        emailStore = new Ext.data.Store({
            model :'mailList',
            data:Jv_data,
        });
        Ext.getCmp('emailList').bindStore(emailStore);  
    };
                
    mail.panel_mail = new Ext.Panel({
        useCurrentLocation: true,               
        scroll:'vertical',
        cardSwitchAnimation:"cube",


        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        getMailList:function()
        {
            Ext.Ajax.request({
                url: common_url  + '/jsp/mail.jsp',
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                        setEmailList(JsonData.data.email_list);
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
            instructions: 'Email List입니다. ',
            defaults: {
                
                labelAlign: 'left' }
            ,
            items:emailList
        }]
    });
}       