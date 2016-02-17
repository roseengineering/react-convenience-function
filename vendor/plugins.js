
(function($){
    var _xhr = function(url, method, cb, data){
        var req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open(method, url);
        if (cb) {
            req.onreadystatechange = function(){
                if (this.readyState === 4) {
                    cb(this.response === null, this.response)
                }
            }            
        }
        req.setRequestHeader("Content-Type", "application/json");
        req.send(data === undefined ? data : JSON.stringify(data));
    };

    $.get = function(url, cb){
        _xhr(url, 'GET', cb)  
    };

    $.post = function(url, data, cb){
        _xhr(url, 'POST', cb, data)
    };

})($ = {});


