define(['jQuery', 'skeleton', './VcbEntries', './VcbEntriesView'],
function($, sk, VcbEntries, VcbEntriesView) {
    var WorkbenchView = sk.View.extend({
        vid: 'workbench',
        templateName: 'workbench',
        events: {
        },
        configure: function(){
            var vcbEntries = new VcbEntries();
            this.model.addChild('vcbEntries', vcbEntries);
            var vcbEntriesView = new VcbEntriesView({
                model: vcbEntries
            });
            this.addChild(vcbEntriesView);
        },
        afterRender: function() {
        }
    });

    return WorkbenchView;
});