Ext.ns("daummap");

daummap.init = function(lng, lat){

    console.log('aaa');
    inputElement = document.createElement("div");           
    inputElement.id="map";
    elementPat = document.getElementById("map_content").parentNode; 
    elementPat.appendChild(inputElement);    
    console.log('aaa1');

    var overlayToolbar = new Ext.Toolbar({
       dock: 'top'
    });

    var bottomToolbar = new Ext.Toolbar({
       dock: 'bottom'
    });
    
    var overlay = new Ext.Panel({
        floating: true,
        modal: true,
        centered: false,
        width: 400,
        height: 400,
        styleHtmlContent: true,
        dockedItems: overlayToolbar, //Ext.getCmp("main.toolbar"),
        scroll: 'vertical',
        contentEl: 'map',
        cls: 'htmlcontent'
    });
    
    var dockedItems = [{
        dock: 'top',
        xtype: 'toolbar',
        items: [{
            text: 'DAUM MAP종료',
            handler: function(btn,event){
                    elementMap = document.getElementById("map");
                    elementPat = document.getElementById("map_content").parentNode;             
                    elementPat.removeChild(elementMap);
                    main.MainPanel.layout.setActiveItem(map.panel_menu);                        
            }
        }]
    },{
        dock: 'bottom',
        xtype: 'toolbar',
        items: [{
            text: 'DAUM MAP종료',
            handler: function(btn,event){
                elementMap = document.getElementById("map");
                elementPat = document.getElementById("map_content").parentNode;
                elementPat.removeChild(elementMap);
                main.MainPanel.layout.setActiveItem(map.panel_menu);
            }
        }]
    }];

    var mMap = {
        pos_y:lng,
        pos_x:lat,
        info:'Sencha Touch',
        init:function() {
            map = new daum.maps.Map(document.getElementById('map'), {
                center: new daum.maps.LatLng(Number(this.pos_y), Number(this.pos_x))
            });
            var zoomControl = new daum.maps.ZoomControl();
            map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
            var mapTypeControl = new daum.maps.MapTypeControl();
            map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
    
            //원 그리기
            var circle = new daum.maps.Circle({
                center : new daum.maps.LatLng(this.pos_y, this.pos_x),
                radius : 150,
                strokeWeight : 4,
                strokeColor : "#ff0000"
            });
            circle.setMap(map);
            
            marker = new daum.maps.Marker({
                position: new daum.maps.LatLng(this.pos_y , this.pos_x )
            });
            infowindow  = new daum.maps.InfoWindow({
                content: this.info ,
                removable : true
            });
            console.log(infowindow );
            infowindow.open(map, marker );
            daum.maps.event.addListener(marker , "click", function( ) {

                infowindow.open(map, marker );
            });
            marker.setMap(map);     
        }       
    }   
    
    mMap.init();
    
    daummap.panel_map = new Ext.Panel({
        fullscreen: true,
        dockedItems: dockedItems        
    });            
}

