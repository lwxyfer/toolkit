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
	let node = document.querySelector(get);
	let nodes = node.querySelectorAll(n || 'h1,h2,h3,h4,h5');
	let id0 = "";
	if(nodes[0].id !=="") {
		id0 = nodes[0].id;
	}
	else {
		id0 = 'toc'+0;
		nodes[0].id= 'toc'+0;
	}
	let out = '<ul><li>' + '<a href=#' + id0 + '>' + nodes[0].innerHTML + '</a>';
	for (let i = 1; i < nodes.length; i++) {
		let a = nodes[i].nodeName.charAt(1) - nodes[i - 1].nodeName.charAt(1);
		let nodeId;
		for (let j = 1; j < a; a--) {
			out += '<ul><li>';
		}
		for (let k = -1; k > a; a++) {
			out += '</li></ul>';
		}
		if(nodes[i].id !=="") {
			nodeId = nodes[i].id;
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
		let position = document.querySelector(put);
		position.innerHTML += out;
	}
	return out;
}
