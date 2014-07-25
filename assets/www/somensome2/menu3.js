Ext.ns("cel");
Ext.ns("cel.panel");

cel.init = function() {
    cel.panel = new Ext.Panel({
    	fullscreen: true,
        html:'<iframe width="100%" height="100%" src="'+ common_url +'/mcel.me?some=1" frameborder="0" allowfullscreen></iframe>',
    });
}