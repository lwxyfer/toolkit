var tocx = (function () {
    'use strict';

    /**
     * [debounce]
     * @param  {[function]} action [function you want to debounce]
     * @param  {[Number]} time   =  100 [debounce time,default is 100]
     */
    function debounce(action, time = 300) {
        let last
        if (last) {
            clearTimeout(last)
        }
        last = setTimeout(action, time)
    }

    /**
     * [highlight active item]
     * @param  {[Array]} x [nodes's absolute top value]
     * @return {[type]}   [description]
     */
    function active(x) {
        let arr = x.slice()
        let links = document.querySelectorAll('#put a')
        window.addEventListener('scroll', () => {
            debounce(() => {
                console.log('test')
                let y = window.pageYOffset
                let a = []
                for (let i = 0; i < arr.length; i++) {
                    a.push(Math.abs(y - arr[i]))
                    links[i].className = ''
                }
                links[a.indexOf(Math.min.apply(null, a))].className = 'active'
            }, 1000)
        }, false)
    }

    function scrollTo(node) {
        document.querySelector(node).addEventListener('click', (e) => {
            if (e.target && e.target.nodeName.toUpperCase() == "A") {
                e.preventDefault()
                let ele = e.target
                let eleLink = ele.getAttribute('href')
                console.log(eleLink)
                let to = document.querySelector(eleLink).getBoundingClientRect().top
                console.log(to)
                let y = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
                console.log(y)
                while (y > to + 5 || y < to - 5) {

                    window.setInterval(() => {
                        document.body.scrollTop += 5
                    }, 1000)
                    console.log('test')
                        //Math.floor((to - y) / 10)
                        // document.documentElement.scrollTop += Math.floor((to - y) / 10)
                }
            }

        }, false)
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
        let out = `<ul><li><a href=#${id0} class=active>${nodes[0].innerHTML}</a>`;
        let nodeTop = [nodes[0].getBoundingClientRect().top];
        for (let i = 1; i < nodes.length; i++) {
            let scrollTop = nodes[i].getBoundingClientRect().top
            nodeTop.push(Math.floor(Math.abs(scrollTop)))
            console.log(nodeTop)
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
        active(nodeTop)
        scrollTo('#put')
        return out;
    }

    return toc;

}());