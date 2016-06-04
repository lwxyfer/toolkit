var tocx = (function () {
    'use strict';

    // 模考依赖，比如现在的情况，函数里面存在依赖，但是不导出。

    document.body.addEventListener('scoll', active, false)

    function active(arr) {
        let y = document.body.scrollTop || document.documentElement.scrollTop; // 页面滚动距离
        let x = []
        for (let i = 0; i < arr.legth; i++) {
            x.push(y - arr[i])
        }
        arr.indexOf(Math.max.apply(null, arr)) // 总结下数组
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
            let scrollTop = nodes[i].getBoundingClientRect().top + window.pageYOffset
            boundClient.push(Math.floor(scrollTop))
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
        return out;
    }

    return toc;

}());