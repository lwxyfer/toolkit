var tocx = (function () {
    'use strict';

    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(obj, cls) {
        if (!hasClass(obj, cls)) obj.className += " " + cls;
    }

    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    }
    function toggleClass(obj, cls) {
        if (hasClass(obj, cls)) {
            removeClass(obj, cls);
        } else {
            addClass(obj, cls);
        }
    }

    function toc(get, put, n = 'h1,h2,h3') {
        let node = document.querySelector(get);
        let nodes = node.querySelectorAll(n);
        let id0;
        if (nodes[0].id !== "") {
            id0 = nodes[0].id;
        } else {
            id0 = 'toc' + 0;
            nodes[0].id = 'toc' + 0;
        }
        let out = `<ul><li><a href=#${id0} >${nodes[0].innerHTML}</a>`;
        let boundClient = [];
        for (let i = 1; i < nodes.length; i++) {
            boundClient.push(nodes[i].getBoundingClientRect().top)
            console.log(boundClient)
            toggleClass(nodes[i], 'active')
            let a = nodes[i].nodeName.charAt(1) - nodes[i - 1].nodeName.charAt(1);
            for (let j = 1; j < a; a--) {
                out += '<ul><li>';
            }
            for (let k = -1; k > a; a++) {
                out += '</li></ul>';
            }
            let nodeId;
            if (nodes[i].id !== "") {
                nodeId = nodes[i].id;
            } else {
                nodeId = 'toc' + i;
                nodes[i].id = 'toc' + i;
            }
            let aa = `<a href=#${nodeId} >${nodes[i].innerText}</a>`
            switch (a) {
                case 0:
                    out += `</li><li>${aa}`;
                    break;
                case -1:
                    out += `</li></ul><li>${aa}`;
                    break;
                case 1:
                    out += `<ul><li>${aa}`;
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

    return toc;

}());