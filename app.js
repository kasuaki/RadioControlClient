var io = require('socket.io-client');
//var rtc = require('webrtc.io-client');
var rpio = require('rpio');
rpio.setMode('gpio');      /* The default GPIOxx numbering system */
rpio.setFunction(18, rpio.PWM); // GPIO18/Pin12
rpio.pwmSetClockDivider(512);    /* Set PWM refresh rate to 38.2kHz */
rpio.pwmSetRange(18, 764);

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
socket.on('axis',         function(obj) { 
	console.log(obj.axis + ':' + obj.value); 
	if (obj.axis === 'LEFT_STICK_X') {
		var val = 55 + obj.value * 35;
		val = Math.round(val);
		console.log(obj.axis + ':' + val); 
  		rpio.pwmSetData(18, val);
	}
});

url = 'http://10.0.0.12:9000';

//rtc.createStream({"video": true, "audio":true}, function(stream){
//  // get local stream for manipulation
//});
//
//rtc.connect('ws://yourserveraddress:8001', optionalRoom);
////then a bunch of callbacks are available
