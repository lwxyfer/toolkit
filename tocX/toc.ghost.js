/**
 * no ghost. Make it a chrome plugin.作为一个通用版插件为所有网站加载TOC
 * 启用正则匹配，
 */
if (window.location.pathname) {
	toc('.rendered-markdown', 'h1,h2,h3,h4,h5')
	var a = document.createElement('div');
	var aa = document.createElement('div');
	aa.className = 'toc';
	aa.innerHTML = '=='

	function toc(get, n, put) {
		var node = document.querySelector(get);
		var nodes = node.querySelectorAll(n || 'h1,h2,h3,h4,h5');
		var out = '<ul><li>' + '<a href=#h' + '0' + '>' + nodes[0].innerHTML + '</a>';
		nodes[0].setAttribute('id', 'h0');
		for (var i = 1; i < nodes.length; i++) {
			var a = nodes[i].nodeName.charAt(1) - nodes[i - 1].nodeName.charAt(1);
			nodes[i].setAttribute('id', 'h' + i);
			for (var j = 1; j < a; a--) {
				out += '<ul><li>';
			}
			for (var k = -1; k > a; a++) {
				out += '</li></ul>';
			}
			if (a === 0) {
				out += '</li><li>' + '<a href=#h' + i + ' >' + nodes[i].innerHTML + '</a>';
			} else if (a === -1) {
				out += '</li></ul><li>' + '<a href=#h' + i + ' >' + nodes[i].innerHTML + '</a>';
			} else if (a === 1) {
				out += '<ul><li>' + '<a href=#h' + i + ' >' + nodes[i].innerHTML + '</a>';
			}
		}
		out += '</li></ul>';
		if (put) {
			var position = document.getElementById(put);
			position.innerHTML = out;
		}
		return out
	}
}