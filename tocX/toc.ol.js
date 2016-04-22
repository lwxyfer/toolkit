/**
 * [toc : simply achieve a TOC]
 * @param  {[string]} get [where to get the headers]
 * @param  {[string]} put [where to put the headers]
 * @param  {[string]} n   [which headers you like to get and put]
 * @return {[type]}     [description]
 */
function toc(get, n, put) {
	var node = document.getElementById(get);
	var nodes = node.querySelectorAll(n || 'h1,h2,h3,h4,h5');
	var out = '<ol><li>' + '<a href=#h' + '0' + '>' + nodes[0].innerHTML + '</a>';
	nodes[0].setAttribute('id', 'h0');
	for (var i = 1; i < nodes.length; i++) {
		var a = nodes[i].nodeName.charAt(1) - nodes[i - 1].nodeName.charAt(1);
		nodes[i].setAttribute('id', 'h' + i);
		for (var j = 1; j < a; a--) {
			out += '<ol><li>';
		}
		for (var k = -1; k > a; a++) {
			out += '</li></ol>';
		}
		if (a === 0) {
			out += '</li><li>' + '<a href=#h' + i + ' >' + nodes[i].innerHTML + '</a>';
		} else if (a === -1) {
			out += '</li></ol><li>' + '<a href=#h' + i + ' >' + nodes[i].innerHTML + '</a>';
		} else if (a === 1) {
			out += '<ol><li>' + '<a href=#h' + i + ' >' + nodes[i].innerHTML + '</a>';
		}
	}
	out += '</li></ol>';
	if (put) {
		var position = document.getElementById(put);
		position.innerHTML = out;
	}
	return out;
}
toc('con', 'h1,h2,h3,h4,h5', 'qw');