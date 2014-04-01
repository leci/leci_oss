define(['skeleton'], function(sk) {
    var Model = sk.Model.extend({
        name: 'Word',
        urlRoot: '/word',
        idAttribute: 'id',
        configure: function(){

        }
    });
    return Model;
});