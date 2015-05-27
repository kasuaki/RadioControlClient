var io = require('socket.io-client');

var url = 'http://10.0.0.12:3000';

var socket = io.connect(url);

socket.on('connect',    function(){ console.log('connect'); });
socket.on('event',      function(data){ console.log(data); });
socket.on('disconnect', function(){ console.log('disconnect'); });

socket.on('init_failed',  function(obj) { console.log(obj.msg); });
socket.on('unsupported',  function(obj) { console.log(obj.msg); });
socket.on('connected',    function(obj) { console.log(obj.msg); });
socket.on('disconnected', function(obj) { console.log(obj.msg); });
socket.on('button_down',  function(obj) { console.log(obj.msg); });
socket.on('button_up',    function(obj) { console.log(obj.msg); });
socket.on('axis',         function(obj) { console.log(obj.msg); });
