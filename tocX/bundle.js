var tocx = (function () {
    'use strict';

    /**
     * [highlight active item]
     * @param  {[Array]} x [nodes's absolute top value]
     */
    function active(x) {
        let arr = x.slice()
        let links = document.querySelectorAll('#put a')
        let last
        window.addEventListener('scroll', () => {
            if (last) {
                clearTimeout(last)
            }
            // use timer to avoid infinitely invoke
            last = setTimeout(() => {
                let y = window.pageYOffset
                let a = []
                for (let i = 0; i < arr.length; i++) {
                    a.push(Math.abs(y - arr[i]));
                    links[i].className = '';
                }
                links[a.indexOf(Math.min.apply(null, a))].className = 'active'
            }, 50)

        }, false)
    }

    function scrollTo(node) {
        let timer
        document.querySelector(node).addEventListener('click', (e) => {
            if (e.target && e.target.nodeName.toUpperCase() == "A") {
                e.preventDefault()
                let ele = e.target
                let eleLink = ele.getAttribute('href')
                let to = document.querySelector(eleLink).getBoundingClientRect().top + window.pageYOffset

                let smoothScroll = (y, speed = 30) => {
                    let distance
                    let leap
                    let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                    let viewHeight = Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientWidth)
                    if (scrollHeight - y - viewHeight - 20 < 0) {
                        y = scrollHeight - viewHeight - 20
                    }
                    if (timer) {
                        clearInterval(timer)
                    }
                    console.log('before', timer)
                    timer = setInterval(() => {
                            distance = y - window.pageYOffset
                            if (distance < 5 && distance > -5) {
                                clearInterval(timer)
                            };
                            leap = Math.round(distance / 5);
                            distance > 0 && distance < 10 ? leap = 2 : leap = leap;
                            distance < 0 && distance > -10 ? leap = -2 : leap = leap;
                            document.body.scrollTop += leap;
                            document.documentElement.scrollTop += leap;
                        },
                        speed)
                }
                smoothScroll(to, 20)
            }
        }, false)
    }

    /**
     * [smoothScroll description]
     * @param  {[NUMBER]} y     [set destination]
     * @param  {[NUMBER]} speed = 30 [scroll speed]
     */
    // function smoothScroll(y, speed = 30) {
    //     let timer
    //     let distance
    //     let leap
    //     let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    //     let viewHeight = Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientWidth)
    //     if (scrollHeight - y - viewHeight - 20 < 0) {
    //         y = scrollHeight - viewHeight - 20
    //     }
    //     timer = setInterval(() => {
    //             // kill = true
    //             distance = y - window.pageYOffset
    //             if (distance < 2 && distance > -2) {
    //                 clearInterval(timer)
    //                 console.log('okok')
    //             }
    //             leap = Math.round(distance / 10)
    //             distance > 0 && distance < 10 ? leap = 1 : leap = leap
    //             distance < 0 && distance > -10 ? leap = -1 : leap = leap
    //             window.scroll(0, window.pageYOffset += leap)
    //         },
    //         speed)
    //     console.log('after', timer)
    //     console.log('test=====')
    // }

    // get node adsolute position to the whole page
    function absPosition(x) {
        return x.getBoundingClientRect().top < 0 ? window.pageYOffset - Math.abs(x.getBoundingClientRect().top) : window.pageYOffset + x.getBoundingClientRect().top
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
        let outHtml = `<ul><li><a href=#${id0} class=active>${nodes[0].innerHTML}</a>`;
        let nodeTop = [absPosition(nodes[0])]
        for (let i = 1; i < nodes.length; i++) {
            nodeTop.push(absPosition(nodes[i]))
            let a = nodes[i].nodeName.charAt(1) - nodes[i - 1].nodeName.charAt(1);
            for (let j = 1; j < a; a--) {
                outHtml += '<ul><li>';
            }
            for (let k = -1; k > a; a++) {
                outHtml += '</li></ul>';
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
                    outHtml += `</li><li>${aa}`;
                    break;
                case -1:
                    outHtml += `</li></ul><li>${aa}`;
                    break;
                case 1:
                    outHtml += `<ul><li>${aa}`;
                    break;
            }
        }
        outHtml += '</li></ul>';
        if (put) {
            let position = document.querySelector(put);
            position.innerHTML += outHtml;
        }
        active(nodeTop)
        scrollTo('#put')
        return outHtml;
    }

    return toc;

}());