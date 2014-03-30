define(['jQuery', 'jQueryCustom', 'skeleton',
    './Dict', './DictView'
    ],
function($, $custom, sk,
         Dict, DictView
    ){
    var ManagerView = sk.View.extend({
        vid: 'manager',
        templateName: 'manager',
        configure: function(){
            var dict = new Dict();

            var dictView = new DictView({
                renderPlacing: false,
                model: dict
            });
            this.addChild(dictView);
        },
        afterRenderChildren: function(){
        }
    });

    return ManagerView;
});