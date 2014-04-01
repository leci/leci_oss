define(['jQuery', 'skeleton', './Word', './WordView'],
function($, sk, Word, WordView) {
    var WorkbenchView = sk.View.extend({
        vid: 'workbench',
        templateName: 'workbench',
        events: {
        },
        configure: function(){
            this.listenTo(this.model, 'change:wordId', this.changeWordView, this);
            this.listenTo(this.model, 'reset', this.resetWordView, this);
        },
        changeWordView: function(model, value, options) {
            this.removeLastWordView();
            this.addWordView(value);
        },
        addWordView: function(wordId){
            var word = new Word({id: wordId});
            word.fetched = true;
            var wordView = new WordView({
                model: word,
                renderPlacing: false,
                prerendered: false
            });
            this.addChild(wordView);
            word.fetch({
                error: function(model, response, options){
                    console.error(response);
                },
                success: function(model, response, options){
                    console.info(model);
                }
            });
        },
        removeLastWordView: function(){
            var childView = this.getChild('word-detail');
            if(childView){
                this.removeChild('word-detail');
                childView.destroy();
            }
        },
        renderContent: function(){
            var childView = this.getChild('word-detail');
            if(childView){
                childView.doRender();
                this.renderChild(childView);
            }
        },
        resetWordView: function(){
            this.removeLastWordView();
        },
        afterRender: function() {
            var me = this;
            $(document.body).keydown(function(e){
                console.info('workbench is paging');
                if(e.keyCode==33){
                    me.model.pageAction(false);
                }
                else if(e.keyCode==34){
                    me.model.pageAction(true);
                }
            });
        }
    });

    return WorkbenchView;
});