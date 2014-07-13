Ext.ns("movie");
Ext.ns("movie.panel_movie");

movie.init = function(){

    var movieList;
    var movieStore;    
    Ext.regModel('movieModel', {
        fields: ['id','subject','movie_url']
    });     

    movieStore = new Ext.data.Store({
        model :'movieModel',              
        data:[
                // 공백
        ],
    });     
    
    movieList = new Ext.List({
        id:'movie.movieList',
        title:'교육동영상목록',
        store:movieStore,                       
        onItemDisclosure: {
            handler: function(record, btn, index) {
            	//alert('hi1' + common_url + '/mov/' +  record.get('movie_url' ));
            	callMoviePlayer(common_url + '/mov/' +  record.get('movie_url'));
            }
        },
        itemTpl:'<div><font size="2">{subject}</div><div> {movie_url}</font></div>',
    });        

    function setmovieList(Jv_data) {
        movieStore = new Ext.data.Store({
            model :'movieModel',
            data:Jv_data,
        });
        Ext.getCmp('movie.movieList').bindStore(movieStore);  
    };
                
    movie.panel_movie = new Ext.Panel({
        useCurrentLocation: true,               
        scroll:'vertical',
        cardSwitchAnimation:"cube",


        scroll: 'vertical',
        
        getmovieList:function()
        {
            Ext.Ajax.request({
                url: common_url + '/jsp/movie_list.jsp',
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                        setmovieList(JsonData.data.movie_list);
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
            instructions: '교육자료 입니다. ',
            defaults: {
                
                labelAlign: 'left' }
            ,
            items:movieList
        }]
    });

    var movieOverlayToolbar = new Ext.Toolbar({
       dock: 'top'
    });
    
	var overlay_movie = new Ext.Panel({
	
        floating: true,
        modal: true,
        centered: true,
        width: 310,
        height: 300,
        dockedItems: movieOverlayToolbar,
		html:'상세정보'
	});    
}       