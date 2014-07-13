Ext.ns("list");
Ext.ns("list.panel_list");

list.init = function(){
    var PersonList;
    var PersonStore;
    var PersonModel;
    var PersonPic;
    
    Ext.regModel('Persons', {
        fields: ['user_id','user_name','tel']
    });     

    PersonStore = new Ext.data.Store({
        model :'Persons',               
        data:[
                // 공백
        ],
    });     
    
    PersonList = new Ext.List({
        id:'PersonList',
        store:PersonStore,                      
        onItemDisclosure: {
            handler: function(record, btn, index) {  
                main.MainPanel.layout.setActiveItem(detail.panel_detail); 
                detail.panel_detail.setUserId(record.get('user_id'));
                detail.panel_detail.getUserInfo();
            }
        },
        itemTpl:'<div><strong>{user_id}</strong> {user_name}  tel:{tel} </div>',
    });        

    function setPersonsList(Jv_data) {
        PersonStore = new Ext.data.Store({
            model :'Persons',
            data:Jv_data,
        });
        Ext.getCmp('PersonList').bindStore(PersonStore);    
    };
               
    list.panel_list = new Ext.Panel({
        useCurrentLocation: true,               
        scroll:'vertical',
        cardSwitchAnimation:"cube",

        scroll: 'vertical',
        items:
        [{
            xtype: 'fieldset',
            title: '직원 조회',
            //instructions: '직원명을 입력하시고 조회버튼을 클릭하십시요',
            defaults: {
                required: true,
                labelAlign: 'left' }
            ,
            items:[{
                layout: {
                    type: 'hbox',
                    pack: 'center',
                    
                },  
                items:[{
                    xtype:'textfield',
                    id:'user_name',
                    width:'50%',
                    placeHolder:'직원명입력',
                    autoCapitalisze:true,
                    useClearIcon:false
                                
                },{
                    xtype:'spacer',
                    width:'10%',
                },{
                    xtype:'button',
                    ui: 'decline-round',
                    name:'button_search',
                    width:'30%',
                    handler:function(){                 
                    Ext.Ajax.request({
                        url: common_url  + '/jsp/psn_list.jsp?user_name=' + Ext.getCmp("user_name").getValue(),
                        success: function(response, opts) {
                            console.log(response.responseText);
                            var JsonData = JSON.parse(response.responseText);
                            console.log(JsonData);
                            if(JsonData.data.err == "")
                            {
                                setPersonsList(JsonData.data.psn_list);
                            }
                            else
                            {
                                alert(JsonData.data.err);
                            }
                        }
                    });                     
                    },                      
                    text:'조회'
                }]                                      
            }]
        },
        {
            xtype: 'fieldset',
            instructions: '상세정보를 보고 싶으시면 직원리스트를 클릭하십시요',
            defaults: {
                
                labelAlign: 'left' }
            ,
            items:PersonList
        }]
    });
}   

   