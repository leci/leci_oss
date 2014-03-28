define(['jQuery', 'jQueryCustom', 'skeleton'
   ],
function($, $custom, sk
     ) {
    var ManagerView = sk.View.extend({
        vid: 'manager',
        templateName: 'manager',
        configure: function(){

        },
        afterRenderChildren: function(){
        }
    });

    return ManagerView;
});