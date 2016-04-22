/**
 * [toc : simply achieve a TOC]
 * @param  {[string]} get [where to get the headers]
 * @param  {[string]} put [where to put the headers]
 * @param  {[string]} n   [which headers you like to get and put]
 * @return {[type]}     [description]
 */
export {
	toc
};

function toc(get, n, put) {
	let node = document.getElementById(get);
	let nodes = node.querySelectorAll(n || 'h1,h2,h3,h4,h5');
	let out = '<ul><li>' + '<a href=#h' + '0' + '>' + nodes[0].innerHTML + '</a>';
	nodes[0].setAttribute('id', 'h0');
	for (var i = 1; i < nodes.length; i++) {
		var a = nodes[i].nodeName.charAt(1) - nodes[i - 1].nodeName.charAt(1);
		nodes[i].setAttribute('id', 'h' + i);
		for (let j = 1; j < a; a--) {
			out += '<ul><li>';
		}
		for (let k = -1; k > a; a++) {
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
	() => {
		console.log('ok')
	}
	if (put) {
		let position = document.getElementById(put);
		position.innerHTML = out;
	}
	return out;
}

// 使用babel CLI（command - Line - interfere） 有问题，没有转为ES5