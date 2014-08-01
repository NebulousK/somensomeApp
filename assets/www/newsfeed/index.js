function getreplylist(no, name){
	$("#replydiv"+no).load(common_url +"/newsfeed/replyproc1.jsp?no="+no+"&id="+name+"&index="+no);
};

//댓글 등록
function replypostJS(form){
	var no = form.no.value;
	var id = form.id.value;
	var index = form.index.value;
	form.submit();
	setTimeout("getreplylist("+no+"," +"'"+id+"',"+ index+")", 1000*0.2)
};

//댓글지우기
function replyDelete(Rno, id, index, Bno){
	if (confirm("정말 삭제하시겠습니까??") == true){ //확인
		document.Raction.no.value = Rno;
		document.Raction.submit();	
		setTimeout("getreplylist("+Bno+"," +"'"+id+"',"+ index+")", 1000*0.2);	
	}
	else{
		return;
	}
}

//댓글창 엔터시 row늘리기
function setLine( txa ){
       var line = 0;
       var new_line = txa.value.split( "\n" ).length + 1 -1;
       if( new_line < line ) new_line = line;
       txa.rows = new_line;
}

//좋아요 ajax
function like(no, id, index){
	var params = "no="+ no +"&id="+id+"&action=/LIKE.board";
	$("#inlikeunlike"+index).remove();"<span id=inlikeunlike"+index+"></span>";
	$("#likeunlike"+index).append('<span id=inlikeunlike'+index+'><span onclick="unlike('+no+', \''+id+'\', '+index+')"  name="unlike" id="unlike" style="cursor: pointer;">좋아요 취소</span>&nbsp;&nbsp;</span>');
	var cnt = $("#likecnt"+index).text() * 1 + 1;
	document.getElementById("likecnt"+index).innerHTML = cnt;
	sendRequest(common_url + "/LIKE.board", params, callback, "GET");
}
//좋아요 취소 ajax
function unlike(no, id, index){
	var params = "no="+ no +"&id="+id+"&action=/UNLIKE.board";
	$("#inlikeunlike"+index).remove();
	$("#likeunlike"+index).append('<span id=inlikeunlike'+index+'><span onclick="like('+no+', \''+id+'\', '+index+')"  name="like" id="like" style="cursor: pointer;">좋아요</span>&nbsp;&nbsp;</span>');
	var cnt = $("#likecnt"+index).text() * 1 - 1;
	document.getElementById("likecnt"+index).innerHTML = cnt;
	sendRequest(common_url + "/UNLIKE.board", params, callback, "GET");
}
//좋아요 callback
function callback(){
	if(XMLreq.readyState == 4){
		if(XMLreq.status == 200){
			//alert(XMLreq.status);
		}
		else{
			alert(XMLreq.status);
		}
	}
}

//글삭제 자바 스크립트
function Bdelete(no, index){
	if (confirm("정말 삭제하시겠습니까??") == true){    //확인	
		var params = "no="+no+"&action=/DELETE..board";
		$("#maindiv"+index).remove();
		sendRequest(common_url + "/DELETE.board", params, callback, "GET");
	}else{   //취소
	    return;
	}
}

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady : function() {
    	var i=5;  	
        Ext.regModel('someboard', {
        	fields: ['pic', 'name', 'date', 'content','no']
        });
      
        var orgData= [];
    	// 추가할 데이타 서버와의 통신시 Ajax로 계속 받아올 데이타를 임시로 만듬.                   
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
    		itemTpl: '<tpl for=".">'
    			+'<div id="maindiv{no}"><table border="1" width="100%">'
    			+'<col  style="width:25%;"></col><col  style="width:25%;"></col><col  style="width:25%;"></col><col  style="width:25%;"></col>'
    			+'<tr><td rowspan="2" width="25%"><img src="{pic}" width="100%" height="70px"></td><td colspan="3">{name}</td><tr><td colspan="3">{date}</td></tr><tr><td colspan="4">'
    			+'<div align="right" style="vertical-align: top;"><span id="{no}" style="cursor: pointer;" onclick="Bdelete({no},{no})")">삭제</span></div><B>{content}</B></td></tr>'
    			+'<tr><td colspan="2" style="text-align:center;">'
    			+'<span id="likeunlike{no}">'
    			+'<span id="inlikeunlike{no}">'
    			+'<tpl if="flag == 1">'
    			+'<span onclick="unlike({no}, \'{connectId}\', {no})" name="unlike" id="unlike{no}" style="cursor: pointer;">좋아요 취소</span>&nbsp;&nbsp;'
    			+'</tpl>'
    			+'<tpl if="flag == 0">'
        		+'<span onclick="like({no}, \'{connectId}\', {no})" name="like" id="like{no}" style="cursor: pointer;">좋아요</span>&nbsp;&nbsp;'
        		+'</tpl>'
        		+'</span></span>'
        		+'<img src="http://192.168.10.31/homepage/images/icon/iconmonstr-facebook-like-icon-256.png" style="width: 12px;height:12px;" />&nbsp;'
        		+'<span id="likecnt{no}">{like}</span>'
        		+'</td>'
    			+'<td colspan="2" style="text-align:center;"><span id="{no}" style="cursor: pointer;" onclick="getreplylist({no},\'{name}\')">댓글</span></td></tr></table>'
    			+'<div id=replydiv{no} style="background-color: #E6FFFF;"></div></div></tpl>',			
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
                url: common_url +'/mboard.board?id='+common_url+'&num='+ i,
                contentType : "application/x-www-form-urlencoded; charset=UTF-8",
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
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
        
        scrollList_panel = new Ext.Panel({
            fullscreen: true,
            html:'<BR><font size="2">아래로 드래그 하면 글을 더 불러 옵니다.',
            getsomeboardList:function()
            {
                Ext.Ajax.request({
                    url: common_url +'/mboard.board?id='+ common_id +'&num='+ 0,
                    contentType : "application/x-www-form-urlencoded; charset=UTF-8",
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
            	if(b.offset <= 0)
            		getsomeboardList2();
            		store.add(addData);
            }
        });   
     	someboard_list.scroller.on('bouncestart', scrollList_panel.addScrollList, this);  
      	scrollList_panel.getsomeboardList();
    }
});