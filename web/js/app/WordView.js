define(['jQuery', 'skeleton', './VcbEntries', './VcbEntriesView'],
function($, sk, VcbEntries, VcbEntriesView) {
    var View = sk.View.extend({
        vid: 'word-detail',
        templateName: 'word-detail',
        events: {
            'click button[name="review"]': "toReview"
        },
        configure: function(){
            this.listenTo(this.model, 'load', this.onLoad, this);
            this.listenTo(this.model, 'change:review', this.onReviewChanged, this);
        },
        onLoad: function() {
            this.getParent().renderContent();
        },
        toReview: function(e){
            var v = $(e.target).val();
            this.model.updateReview(Number(v));

//            var apiUrl = '/word/' + thingId + (liked ? '/like' : '/unlike');
//            $.get(apiUrl, function() {
//            })
//                .fail(function() {
//                    console.error('failed: ' + apiUrl);
//                    thing.toggleLike(!liked);
//                });

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