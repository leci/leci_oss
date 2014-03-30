define(['skeleton', 'config', './VcbEntry'],
function(sk, config, VcbEntry) {
    var Collection = sk.Collection.extend({
        model: VcbEntry,
        url: '/vcbs',
        configure: function(){

        },
        emptyFn: function(){}
    });
    return Collection;
});