define(['jQuery', 'skeleton'],
function($, sk) {
    var View = sk.View.extend({
        vid: 'vcb-list',
        templateName: 'vcb-list',
        renderPlacing: false,
        events: {
        },
        configure: function(){
            this.listenTo(this.model, 'load', function(){
                alert('load');
            });
        },
        afterRender: function() {
        }
    });

    return View;
});