require(['modules/Socket', 'modules/Board'], function(Socket, Board) {

    var socket = new Socket('ws://localhost:8080'),
        playerId,
        board;

    $('#controls').on('click', function(e) {
        socket.send({type: 'move', playerId: playerId, value: e.target.innerHTML});
    });

    $(socket).on('init', function(e, data) {
        console.log('init', data);
        playerId = data.playerId;
        board = new Board(data.board, {doRender: true});
    });

    $(socket).on('move', function(e, data) {
        console.log('move', data);
        board.setModel(data.board);
    });

    $(socket).on('leave', function(e, data) {
        console.log('leave', data);
        board.setModel(data.board);
    });

    $(socket).on('join', function(e, data) {
        console.log('join', data);
        board.setModel(data.board);
    });

    $(window).on('keydown', function(e) {
        console.log(e.keyCode);
    });
});
