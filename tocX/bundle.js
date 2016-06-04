var tocx = (function () {
    'use strict';

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
        let out = `<ul><li><a href=#${id0} class=active>${nodes[0].innerHTML}</a>`;
        let boundClient = [nodes[0].getBoundingClientRect().top];
        for (let i = 1; i < nodes.length; i++) {
            let scrollTop = nodes[i].getBoundingClientRect().top
            boundClient.push(Math.floor(Math.abs(scrollTop)))
            console.log(boundClient)
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
        window.addEventListener('scroll', () => {
            console.log('111')
            let arr = boundClient.slice()
            let y = window.pageYOffset
            console.log(y)
            let aaa = []
            let links = document.querySelectorAll('#put a')
            for (let i = 0; i < boundClient.length; i++) {
                aaa.push(Math.abs(y - boundClient[i]))
                links[i].className = ''
            }
            let a = aaa.indexOf(Math.min.apply(null, aaa)) // 总结下数组
            links[a].className = 'active'
        }, false)
        return out;
    }

    return toc;

}());