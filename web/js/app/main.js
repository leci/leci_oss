define(['./Leci', 'JST', 'config'],
function(Leci, JST, config) {
    var appConfig = window.appConfig;

    var App = new Leci({
        mode: appConfig.mode,
        JST: JST
    });
    return App;
});