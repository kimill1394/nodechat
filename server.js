var express = require('express');
var app = express();
var router = require('./router/main')(app);
var http = require('http');

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(3000, function() {
  console.log("Express server has started on port 3000");
});

var io = require('socket.io').listen(server);

// 입장한 유저 id를 주기 위한 변수
var userIndex = 0;		  var userIndex = 0;

var userArr = {};
io.sockets.on('connection', function(socket){

  // 입장 시, 입장 이벤트 발생
  var userData = {id: 'user'+userIndex,
                  nick: '(noname)'};
  // userArr.push(userData);
  userArr[userData.id] = userData;
  // socket.emit('entrance', {id:'user'+userIndex, nick: '(noname)', msg:'Welcome!'});
  userData.msg = 'Welcome!';
  socket.emit('entrance', userData, userArr);
  // socket.broadcast.emit('guest', {id:'user'+userIndex, nick: '(noname)', msg:'(noname)님이 입장하셨습니다!'});
  userData.msg = userData.id+'님이 입장하셨습니다!';
  socket.broadcast.emit('guest', userData, userArr);

  userIndex++;

  // 클라이언트로부터 메세지 전달 요청을 받은 이벤트 처리
  socket.on('fromclient', function(data){
    console.log('entrance');
    socket.broadcast.emit('toclient', data);
    socket.emit('toclient', data);
    console.log('Message from '+data.id+': '+data.msg);
  });

  // 클라이언트가 연결을 끊었을 때
  // socket.on('disconnect', function(id) {
  //   var newUserList = {};
  //   socket.broadcast.emit('aryouhere');
  //   socket.emit('areyouhere');
  //   socket.on('imhere', function(id, nick){
  //     newUserList[id] = {id: id, nick: nick};
  //   });
  //   if(newUserList
  //   delete userArr[id];
  //   userData.msg = id+'님이 퇴장하셨습니다TT';
  //   socket.broadcast.emit('exitguest', userArr, userData.msg);
  // });
})
