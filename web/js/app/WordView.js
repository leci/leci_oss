define(['jQuery', 'skeleton', './VcbEntries', './VcbEntriesView'],
function($, sk, VcbEntries, VcbEntriesView) {
    var View = sk.View.extend({
        vid: 'word-detail',
        templateName: 'word-detail',
        events: {
        },
        configure: function(){
            this.listenTo(this.model, 'load', this.onLoad, this);
        },
        onLoad: function() {
            this.getParent().renderContent();
        },
        afterRender: function() {
        }
    });

    return View;
});