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
                '<div><table border="1" width="100%" ><tr><td rowspan="2" width="25%">({#})<img src="{pic}" height=70></td><td> {[this.getDegree("�Ķ�")]} {name}</td><tr><td>{date}</td></tr></tr><td colspan="2"><B>{content}</B>',                       
                '</td></tr></table> </div>',            
            '</tpl>',
            {
                getDegree:function(input)
                {
                    if(input=="�Ķ�")
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
                    {pic:'./img/psn1.png', name: '���', date: '����1��', content: 'ȫ�浿'},
                    {pic:'./img/psn2.png', name: '�븮', date: '����2��', content: '�Ӳ���'},
                    {pic:'./img/psn3.png', name: '����', date: '�λ��', content: '�̼���'},
                    {pic:'./img/psn4.png', name: '����', date: '�ѹ���', content: '�Ѹ�'}
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
