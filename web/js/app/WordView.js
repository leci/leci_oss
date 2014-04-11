define(['jQuery', 'skeleton', './VcbEntries', './VcbEntriesView', 'Holder'],
function($, sk, VcbEntries, VcbEntriesView, Holder) {
    var View = sk.View.extend({
        vid: 'word-detail',
        templateName: 'word-detail',
        events: {
            'click i.player': "toPlay",
            'click button[name="review"]': "toReview"
        },
        configure: function(){
            this.listenTo(this.model, 'load', this.onLoad, this);
            this.listenTo(this.model, 'change:review', this.onReviewChanged, this);
        },
        onLoad: function() {
            this.getParent().renderContent();
            Holder.run({images: "#wordPic"});
        },
        toPlay: function(e){
            var playerId = $(e.target).attr('player');
            this.$('#'+playerId)[0].play();
        },
        toReview: function(e){
            var v = $(e.target).val();
            this.model.updateReview(Number(v));
        },
        onReviewChanged: function(model, value){
            this.getParent().model.trigger('review', model.toJSON());
            var previous = model.previous('review');
            this.$('button[value="' +previous+ '"]').removeClass('active');
            this.$('button[value="' +value+ '"]').addClass('active');
        },
        afterRender: function() {
        }
    });

    return View;
});