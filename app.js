var url = 'http://10.0.0.12:3000';

var Promise = require('bluebird');

var phantomjs = require('phantomjs');
var phantom = require('node-phantom-async');

var ph = {};
var page = {};

Promise.resolve()
.then(function() {
	return phantom.create({
		phantomPath: phantomjs.path
	});
}).then(function(_ph) {
	ph = _ph;
	return _ph.createPage();
}).then(function(_page) {

	page = _page;

	_page.onAlert               = function(_ret) { console.log(_ret); console.log('onAlert'); };
//	_page.onCallback            = function(_ret) { console.log(_ret); console.log('onCallback'); };
	_page.onClosing             = function(_ret) { console.log(_ret); console.log('onClosing'); };
	_page.onConfirm             = function(_ret) { console.log(_ret); console.log('onConfirm'); };
	_page.onConsoleMessage      = function(_ret) { console.log(_ret); console.log('onConsoleMessage'); };
	_page.onError               = function(_ret) { console.log(_ret); console.log('onError'); };
	_page.onFilePicker          = function(_ret) { console.log(_ret); console.log('onFilePicker'); };
	_page.onInitialized         = function(_ret) { console.log(_ret); console.log('onInitialized'); };
	_page.onLoadStarted         = function(_ret) { console.log(_ret); console.log('onLoadStarted'); };
	_page.onNavigationRequested = function(_ret) { console.log(_ret); console.log('onNavigationRequested'); };
	_page.onPageCreated         = function(_ret) { console.log(_ret); console.log('onPageCreated'); };
	_page.onPrompt              = function(_ret) { console.log(_ret); console.log('onPrompt'); };
	_page.onResourceError       = function(_ret) { console.log(_ret); console.log('onResourceError'); };
//	_page.onResourceReceived    = function(_ret) { console.log(_ret); console.log('onResourceReceived'); };
//	_page.onResourceRequested   = function(_ret) { console.log(_ret); console.log('onResourceRequested'); };
	_page.onResourceTimeout     = function(_ret) { console.log(_ret); console.log('onResourceTimeout'); };
	_page.onUrlChanged          = function(_ret) { console.log(_ret); console.log('onUrlChanged'); };


	return new Promise(function(resolve, reject) {

		_page.onLoadFinished = function(_ret) {

			console.log('onLoadFinished');
			resolve(_ret);
		};

		_page.open(url);
	});
}).then(function(_ret) {

	page.onCallback = function(obj) {

		console.log('onCallback' + obj.msg);
	};

	page.evaluate(function() {

		window.socket.on('init_failed',  function(obj) { window.callPhantom(obj); });
		window.socket.on('unsupported',  function(obj) { window.callPhantom(obj); });
		window.socket.on('connected',    function(obj) { window.callPhantom(obj); });
		window.socket.on('disconnected', function(obj) { window.callPhantom(obj); });
		window.socket.on('button_down',  function(obj) { window.callPhantom(obj); });
		window.socket.on('button_up',    function(obj) { window.callPhantom(obj); });
		window.socket.on('axis',         function(obj) { window.callPhantom(obj); });

	});

}).catch(function(e) {
	console.log(new Error(e));
	ph.exit();
});

