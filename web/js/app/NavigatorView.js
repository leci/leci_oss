define(['jQuery', 'skeleton'
    ],
function($, sk
    ) {
    var NavigatorView = sk.View.extend({
        vid: 'navigator',
        templateName: 'navigator',
        events: {
            "click #filter": "toFilter"
        },
        routes: {
            "desk": "desk"
        },
        getModelData: function(){
            var data = {};
            if(this.model){
                var model = _.result(this, 'model');
                data = this.getModelJson(model);
                data['targets'] = this.getChildModelData(model, 'targets');
            }

            return data;
        },
        configure: function(){

        },
        toFilter: function(e){
            var data = {};
            data.target = this.$('#target').val();
            data.caCroup = this.$('input[name=caCroup]:checked').val();
            data.orderCroup = this.$('input[name=orderCroup]:checked').val();
            data.ckCroup = this.$('input[name=ckCroup]:checked').val();
            alert('toFilter: ' + JSON.stringify(data));
            var vcbEntries = this.getParent().getChild('workbench').getChild('vcb-list').model;
            vcbEntries.fetch({
                error: function(){console.error('error');},
                success: function(){console.info('success');},
                data: data
            });
        },
        afterRender: function() {
        }
    });

    return NavigatorView;
});