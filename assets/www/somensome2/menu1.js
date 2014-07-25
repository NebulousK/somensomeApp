Ext.ns("scrollList");
Ext.ns("scrollList.panel");

scrollList.init = function() {
	var i=5;
	
    Ext.regModel('someboard', {
    	fields: ['pic', 'name', 'date', 'content']
    });
    
    var orgData= [];              
    var addData= [];
    
    var store =   new Ext.data.Store({
            model: 'someboard',
            sorters: 'date',                
            data: orgData,
            autoLoad:true,
        });             

    var someboard_list = new Ext.List({
		name:'someboard_list',
		blockRefresh:true,
		height:400,
		itemTpl: '<tpl for="."><div><table border="1" width="100%" ><tr><td rowspan="2" width="25%"><img src="{pic}" style="max-width:100%"></td><td> {name}</td><tr><td>{date}</td></tr></tr><td colspan="2"><B>{content}</B></td></tr></table> </div></tpl>',			
        store:store,
	});
	 
    function setsomeboardList(Jv_data) {
    	addData = Jv_data;
    };
    
    function setsomeboardList2(Jv_data) {
    	orgData = Jv_data;
    	store.add(orgData);
    };
    
    function getsomeboardList2(){
    	Ext.Ajax.request({
            url: common_url +'/mlubstory.some?no='+ common_no +'&num='+ i,
            success: function(response, opts) {
                //console.log(response.responseText);
                var JsonData = JSON.parse(response.responseText);
                //console.log(JsonData);
                if(JsonData.data.err == "")
                {
                	i += 5;
                    setsomeboardList(JsonData.data.someboard_list);
                }
                else
                {
                    alert(JsonData.data.err);
                }
                
            }
        }); 
    }
    
    scrollList.panel = new Ext.Panel({
        fullscreen: true,
        html:'<BR><font size="2">아래로 내리면 글이 계속 나옴.',
        getsomeboardList:function()
        {
            Ext.Ajax.request({
                url: common_url +'/mlubstory.some?no='+ common_no +'&num='+ 0,
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                        setsomeboardList2(JsonData.data.someboard_list);
                    }
                    else
                    {
                        alert(JsonData.data.err);
                    }
                    
                }
            });         
        },
        items: 	someboard_list,
        addScrollList:function(a,b)
        {
        	//console.log(a);
        	//console.log(b);
        	if(b.offset <= 0)
        		getsomeboardList2();
        		store.add(addData);
        }
    });   
 	someboard_list.scroller.on('bouncestart', scrollList.panel.addScrollList, this);     	
}