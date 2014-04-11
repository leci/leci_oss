var settings = require('../../settings');
var logger = require('../commons/logging').logger;
var pool = require("../commons/mysql");
var async = require("async");

var Service = {};

var generateFinder = function(pool, sql, multiple) {
    return function(callback){
        pool.getConnection(function(err, connection) {
            if(err){
                logger.error(err);
                callback(err, null);
                return;
            }

            connection.query(sql, function(err, rows, fields) {
                if(err){
                    logger.error(err);
                    callback(err, null);
                }
                else{
                    if(multiple){
                        callback(null, rows);
                    }
                    else{
                        if(rows && rows.length>0){
                            callback(null, rows[0]);
                        }
                        else{
                            callback(null, null);
                        }
                    }
                }
                connection.release();
            });
        });
    };
};

Service.listTargets = function(callback) {
    var sql = 'SELECT id, name from decks where id <= 20 order by displayorder';
    generateFinder(pool, sql, true)(callback);
};

var genSqlFilterDeckWords = function(deckId, core){
    var sql = 'SELECT id, word, review FROM deckworddetail WHERE deckid=' + deckId;
    if(core=='all'){

    }
    else if(core=='core'){
        sql += ' AND core=1';
    }
    else if(core=='uncore'){
        sql += ' AND core=0';
    }
    sql += ' ORDER BY id ASC';
    return sql;
};

Service.filterTargetWords = function(query, callback) {
    generateFinder(pool, genSqlFilterDeckWords(query.target, query.core), true)(callback);
};

var genSqlWord = function(word){
    return 'SELECT word, wordAlt, hardLevel, phoneticSymbolEn, phoneticSymbolUs, picLocal, picSource FROM words WHERE word= \''+word+'\' LIMIT 1';
};
var getWord = function(word, callback) {
    generateFinder(pool, genSqlWord(word))(callback);
};

var genSqlWordSpeech = function(word){
    return 'SELECT speechId FROM wordspeeches WHERE word= \''+word+'\' ORDER BY extentPercentage DESC, speechOrder ASC LIMIT 1';
};
var getWordSpeech = function(word, callback) {
    generateFinder(pool, genSqlWordSpeech(word))(callback);
};

var genSqlWordSentences = function(word){
    return 'SELECT sentence, sentenceChinese, soundLocal FROM wordsentences WHERE word= \''+word+'\' AND soundLocal IS NOT NULL ORDER BY sentenceOrder ASC LIMIT 1';
};
var getWordSentences = function(word, callback) {
    generateFinder(pool, genSqlWordSentences(word), true)(callback);
};

var genSqlDeckWordDetail = function(deckWordId){
    return 'SELECT id, word, briefdef, method, review FROM deckworddetail WHERE id=' + deckWordId;
};

Service.getWordDetail = function(deckWordId, callback) {
    generateFinder(pool, genSqlDeckWordDetail(deckWordId))(function(err, result){
        if(err){
            logger.error(err);
            callback(err, null);
            return;
        }
        if(!result){
            callback(null, {id: deckWordId});
        }
        else{
            var wordDetail = result;
            async.parallel(
                [
                    function(cb){
                        getWord(wordDetail.word, function(err, result){
                            cb(err, result);
                        });
                    }
                    ,function(cb){
                        getWordSentences(wordDetail.word, function(err, result){
                            cb(err, result);
                        });
                    }
//                    ,function(cb){
//                        getWordSpeech(wordDetail.word, function(err, result){
//                            cb(err, result);
//                        });
//                    }
                ],

                function(err, results){
                    if(err){
                        throw err; //TODO do more error handling
                    }
                    if(results[0]){
                        var word = results[0];
                        wordDetail.wordAlt = word.wordAlt;
                        wordDetail.pictureUrl = word.picLocal;
                        wordDetail.phoneticSymbolEn = word.phoneticSymbolEn;
                    }
                    if(results[1]){
                        wordDetail.sentences = results[1];
                    }

                    callback(null, wordDetail);
                }
            );
        }
    });
};


var genSqlReviewWordDetail = function(deckWordId, review){
    return 'UPDATE deckworddetail SET review = '+review+' WHERE id=' + deckWordId;
};

Service.reviewWordDetail = function(id, review, callback) {
    var sqlReviewWordDetail = genSqlReviewWordDetail(id, review);
    pool.getConnection(function(err, connection) {
        if(err){
            logger.error(err);
            callback(err, null);
            return;
        }

        connection.query(sqlReviewWordDetail, function(err, rows) {
            if(err){
                logger.error(err);
                callback(err, null);
            }
            else{
                var result = rows.affectedRows>0;
                callback(null, result);
            }
            connection.release();
        });
    });
};




module.exports = Service;