module.exports = {
    id: 'leci',
    name: '乐词',
    creator: 'Henry Leu',
    secretKey: 'quick',
    mysql:{
//        host: '192.168.1.100',
        host: 'localhost',
        user: 'leci',
        password: 'leci',
        database:'word_dict',
        port: 3316
    },
    mongo:{
        db: 'favor',
        host: 'localhost',
        port: 27017
    },
    redis:{
        host: 'localhost',
        port: 6379
    },
    session: {
        storeType: 'redis',
        expires: 60 // minutes
    },
    logging: {
        reloadSecs: 0, //INFO: set 0 could let nodeunit tests which use log4js exit properly
        level: 'DEBUG'
    },
    resources: {
        appName: '乐词',
        appTitle: '乐词',
        appCreator: '乐词精英',
        errorUnknown: '不好意思，系统出了点小问题'
    }
}
;
