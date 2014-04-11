var logger = require('../commons/logging').logger;
var util = require('util');
var DictService = require('../services/DictService');

module.exports = function(app) {
    var mode = app.get('env') || 'development';
    var asseton = require('../middlewares/asseton')(mode);

    var indexPage = function(req, res, next) {
        asseton(req, res);
        var input = {};
        var user = req.user;
        if(req.user.isNew){
            input.user = user;
            res.render('layout', input);
        }
        else{
            var uid = req.user.id;
            UserService.loadMeta(uid, function(err, meta ){
                user.meta = meta;
                input.user = user;
                res.render('dict', input);
            })
        }
    };
    var dictPage = function(req, res, next) {
        asseton(req, res);
        var input = {};
        var page = {};
        input.page = page;
        var user = req.user;
        page.user = user;
        DictService.listTargets(function(err, targets ){
            page.targets = targets;
            res.render('dict', input);
        });
    };
    var filterTargetWords = function(req, res, next) {
        if(!req.query.target){
            logger.warn('invalid query parameters for filter vocabularies');
            res.json(200, {});
            return;
        }

        DictService.filterTargetWords(req.query, function(err, results) {
            if (err) {
                logger.error(err);
                res.json(500, err); //TODO response a json document with error info
                return;
            }
            res.json(200, results);
        });
    };

    app.get('/',      dictPage);
    app.get('/dict', dictPage);
    app.get('/words', filterTargetWords);

    var getWordDetail = function(req, res) {
        var deckWordId = req.params.id;
        DictService.getWordDetail(deckWordId, function(err, wordDetail) {
            if (err) {
                logger.error(err);
                res.json(500, err); //TODO response a json document with error info
                return;
            }
            res.json(200, wordDetail);
        });
    };
    app.get('/word/:id', getWordDetail);

    var putWordDetail = function(req, res) {
        var deckWordId = req.params.id;
        var update = JSON.parse(JSON.stringify(req.body));
        console.log(update);
        DictService.reviewWordDetail(deckWordId, update.review, function(err, result) {
            if (err) {
                logger.error(err);
                res.json(500, err); //TODO response a json document with error info
                return;
            }
            res.json(200, {
                success: result
            });
        });
    };
    app.put('/word/:id', putWordDetail);

};