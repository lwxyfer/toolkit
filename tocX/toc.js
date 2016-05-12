/**
 * [toc : simply achieve a TOC]
 * @param  {[string]} get [querySelector]
 * @param  {[string]} put [where to put the headers]
 * @param  {[string]} n   [which headers you like to get and put]
 * @return {[type]}     [description]
 */
(function(window, factory) {
	if (typeof exports === 'object') {
		module.exports = factory;
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		window.toc = factory;
	}
})(this, function(get, n, put) {
	var node = document.querySelector(get);
	var nodes = node.querySelectorAll(n || 'h1,h2,h3,h4,h5');
	if(nodes[0].id !=="") {
		id0 = nodes[0].id
	}
	else {
		id0 = 'toc'+0;
		nodes[0].id= 'toc'+0;
	}
	var out = '<ul><li>' + '<a href=#' + id0 + '>' + nodes[0].innerHTML + '</a>';
	for (var i = 1; i < nodes.length; i++) {
		var a = nodes[i].nodeName.charAt(1) - nodes[i - 1].nodeName.charAt(1);
		for (var j = 1; j < a; a--) {
			out += '<ul><li>';
		}
		for (var k = -1; k > a; a++) {
			out += '</li></ul>';
		}
		var nodeId;
		if(nodes[i].id !=="") {
			nodeId = nodes[i].id
		}
		else {
			nodeId = 'toc'+i;
			nodes[i].id= 'toc'+i;
		}
		switch(a) {
			case 0: out += '</li><li>' + '<a href=#' + nodeId + ' >' + nodes[i].innerHTML + '</a>';
			break;
			case -1 : out += '</li></ul><li>' + '<a href=#' + nodeId + ' >' + nodes[i].innerHTML + '</a>';
			break;
			case 1: out += '<ul><li>' + '<a href=#' + nodeId + ' >' + nodes[i].innerHTML + '</a>';
			break;
		}
	}
	out += '</li></ul>';
	if (put) {
		var position = document.querySelector(put);
		position.innerHTML += out;
	}
	return out;
});
