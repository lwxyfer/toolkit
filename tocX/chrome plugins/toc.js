(function() {
    console.log('test');
    var a = document.querySelector('body');
    var b = document.createElement('div');

    function toc(get, n, put) {
        var node = document.querySelector(get);
        var nodes = node.querySelectorAll(n || 'h1,h2,h3,h4,h5');
        var out = '<ul><li>' + '<a href=#h' + '0' + '>' + nodes[0].innerText + '</a>';
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
            // var mao = node[i].getAttribute('id') ? node[i].getAttribute('id') : i; // 判断是否有ID
            if (a === 0) {
                out += '</li><li>' + '<a href=#h' + i + ' >' + nodes[i].innerText + '</a>';
            } else if (a === -1) {
                out += '</li></ul><li>' + '<a href=#h' + i + ' >' + nodes[i].innerText + '</a>';
            } else if (a === 1) {
                out += '<ul><li>' + '<a href=#h' + i + ' >' + nodes[i].inneText + '</a>';
            }
        }
        out += '</li></ul>';
        if (put) {
            var position = document.getElementById(put);
            position.innerHTML = out;
        }
        return out;
    }
    b.innerHTML = toc('main', 'h1,h2,h3')
    a.appendChild(b);

})()
