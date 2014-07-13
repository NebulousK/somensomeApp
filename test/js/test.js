Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady : function() {
        Ext.regModel('company', {
            fields: ['pic', 'name', 'date', 'content']
        });

        Ext.regModel('history', {
            fields: ['degree']
        });

        var itemTemplate = new Ext.XTemplate(
            '<tpl for=".">',
                '<div><table border="1" width="100%" ><tr><td rowspan="2" width="25%">({#})<img src="{pic}" height=70></td><td> {[this.getDegree("파랑")]} {name}</td><tr><td>{date}</td></tr></tr><td colspan="2"><B>{content}</B>',                       
                '</td></tr></table> </div>',            
            '</tpl>',
            {
                getDegree:function(input)
                {
                    if(input=="파랑")
                        return '<font color="blue">';
                    else 
                        return '';
                }           
            }        
        ); 
        
        
        company_list = new Ext.List({
            fullscreen:true,
            itemTpl: itemTemplate,

            store: new Ext.data.Store({
                model: 'company',
                sorters: 'companygrade',
             
                data: [
                    {pic:'./img/psn1.png', name: '사원', date: '영업1부', content: '홍길동'},
                    {pic:'./img/psn2.png', name: '대리', date: '영업2부', content: '임꺽정'},
                    {pic:'./img/psn3.png', name: '과장', date: '인사부', content: '이순신'},
                    {pic:'./img/psn4.png', name: '차장', date: '총무부', content: '둘리'}
                ]
            })
        });
        new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'center',
            },
            items: company_list
        });             
    }
});
