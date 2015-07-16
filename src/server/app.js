var io = require('socket.io').listen(1080);
var _ = require('lodash');

// ユーザーのidリスト
var userList = [];

io.sockets.on('connection', (socket) => {

    // 誰かが接続した事を監視
    socket.on('beforeconnect', () => {
        userList.push(socket.id);
        socket.broadcast.emit('connected', {
            hash: socket.id
        });
        console.info(userList);
    });

    // 誰かが接続が切れた事を監視
    socket.on('disconnect', () => {
        // ユーザー一覧から該当のユーザーを削除
        _.remove(userList, (_id) => {
            return socket.id === _id;
        });
        socket.broadcast.emit('disconect', {
            hash: socket.id
        });

        console.info(userList);
    });
});
