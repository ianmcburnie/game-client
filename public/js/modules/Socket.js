define(function () {
    function Socket(url) {
        var ws = this.ws = new WebSocket(url);

        ws.onopen = function (event) {
            console.log(event.type, event);
        };

        ws.onclose = function (event) {
            console.log(event.type, event);
        }; 

        ws.onmessage = $.proxy(this.onmessage, this);
    }

    Socket.prototype.send = function(data) {
        this.ws.send(JSON.stringify(data));
    };

    Socket.prototype.onmessage = function(event) {
        var data = JSON.parse(event.data);
        $(this).trigger(data.type, [data]);
    };

    return Socket;
});
