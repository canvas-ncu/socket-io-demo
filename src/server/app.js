var io = require('socket.io').listen(1080);
var _ = require('lodash');

// ユーザーのidリスト
var userList = [];

io.sockets.on('connection', (socket) => {

    // 誰かが接続した事を監視
    socket.on('beforeconnect', () => {
        userList.push(socket.id);
        // 自分が接続完了したことを知らせる
        socket.emit('connected', {
            userId: socket.id,
            userList: userList
        });
        // 他人に接続したことを知らせる
        socket.broadcast.emit('loginuser', {
            userId: socket.id,
            userList: userList
        });
    });

    // 誰かが接続が切れた事を監視
    socket.on('disconnect', () => {
        // ユーザー一覧から該当のユーザーを削除
        _.remove(userList, (_id) => {
            return socket.id === _id;
        });
        socket.broadcast.emit('logoutuser', {
            userId: socket.id
        });
    });

    // 誰かが動いた事を監視
    socket.on('move', (direction) => {
        // 自分以外に動いたことを知らせる
        socket.broadcast.emit('moveuser', {
            userId: socket.id,
            direction: direction
        });
    });
});
