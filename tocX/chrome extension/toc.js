(function() {
    function toc(get, n, put) {
        var node, nodes;
        try {
            node = document.querySelector(get);
            nodes = node.querySelectorAll(n || 'h1,h2,h3,h4,h5');
        } catch (err) {
            return 'no article or headers';
        }
        if (nodes.length > 20) {
            nodes = node.querySelectorAll('h1,h2');
        }
        if (nodes[0].id !== "") {
            id0 = nodes[0].id;
        } else {
            id0 = 'toc' + 0;
            nodes[0].id = 'toc' + 0;
        }
        var out = '<ul><li>' + '<a href=#' + id0 + '>' + nodes[0].innerText + '</a>';
        for (var i = 1; i < nodes.length; i++) {
            var a = nodes[i].nodeName.charAt(1) - nodes[i - 1].nodeName.charAt(1);
            for (var j = 1; j < a; a--) {
                out += '<ul><li>';
            }
            for (var k = -1; k > a; a++) {
                out += '</li></ul>';
            }
            var nodeId;
            if (nodes[i].id !== "") {
                nodeId = nodes[i].id;
            } else {
                nodeId = 'toc' + i;
                nodes[i].id = 'toc' + i;
            }
            switch (a) {
                case 0:
                    out += '</li><li>' + '<a href=#' + nodeId + ' >' + nodes[i].innerText + '</a>';
                    break;
                case -1:
                    out += '</li></ul><li>' + '<a href=#' + nodeId + ' >' + nodes[i].innerText + '</a>';
                    break;
                case 1:
                    out += '<ul><li>' + '<a href=#' + nodeId + ' >' + nodes[i].innerText + '</a>';
                    break;
            }
        }
        out += '</li></ul>';
        if (put) {
            var position = document.querySelector(put);
            position.innerHTML += out;
        }
        return out;
    }

    // toggle toc
    var chromeToc = document.getElementById('chromeToc');
    if (chromeToc) {
        document.body.removeChild(chromeToc);
        return true;
    }
    // create toc element
    var section = document.createElement('SECTION');
    section.id = 'chromeToc';
    section.innerHTML = toc('article', 'h1,h2,h3');
    document.body.appendChild(section);

    // create <style>, just paste css into here
    var style = document.createElement('STYLE');
    style.type = 'text/css';
    style.id = 'toc_css';
    style.textContent = "#chromeToc { position: fixed;z-index: 999;top:60px;right:30px;font-family:'MicroSoft YaHei';font-size:14px;max-width:15% ;height:80%;overflow:auto} #chromeToc a {color:#333;}#chromeToc a:hover{ color:#00ab6b} #chromeToc li{ list-style:square !important;margin:3px 0;} #chromeToc ul ul {padding-left: 2em; }";
    document.head.appendChild(style);
})();
