var tocx = (function () {
    'use strict';

    /**
     * [highlight active item]
     * @param  {[Array]} x [nodes's absolute top value]
     */
    function active(x) {
        var arr = x.slice();
        var links = document.querySelectorAll('#put a');
        var last = void 0;
        window.addEventListener('scroll', function () {
            if (last) {
                clearTimeout(last);
            }
            // use timer to avoid infinitely invoke
            last = setTimeout(function () {
                var y = window.pageYOffset;
                var a = [];
                for (var i = 0; i < arr.length; i++) {
                    a.push(Math.abs(y - arr[i]));
                    links[i].className = '';
                }
                links[a.indexOf(Math.min.apply(null, a))].className = 'active';
            }, 50);
        }, false);
    }

    function scrollTo(node) {
        var timer = void 0;
        document.querySelector(node).addEventListener('click', function (e) {
            if (e.target && e.target.nodeName.toUpperCase() == "A") {
                e.preventDefault();
                var ele = e.target;
                var eleLink = ele.getAttribute('href');
                var to = document.querySelector(eleLink).getBoundingClientRect().top + window.pageYOffset;

                var smoothScroll = function smoothScroll(y) {
                    var speed = arguments.length <= 1 || arguments[1] === undefined ? 30 : arguments[1];

                    var distance = void 0;
                    var leap = void 0;
                    var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                    var viewHeight = Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientWidth);
                    if (scrollHeight - y - viewHeight - 20 < 0) {
                        y = scrollHeight - viewHeight - 20;
                    }
                    if (timer) {
                        clearInterval(timer);
                    }
                    console.log('before', timer);
                    timer = setInterval(function () {
                        distance = y - window.pageYOffset;
                        if (distance < 5 && distance > -5) {
                            clearInterval(timer);
                        };
                        leap = Math.round(distance / 5);
                        distance > 0 && distance < 10 ? leap = 2 : leap = leap;
                        distance < 0 && distance > -10 ? leap = -2 : leap = leap;
                        document.body.scrollTop += leap;
                        document.documentElement.scrollTop += leap;
                    }, speed);
                };
                smoothScroll(to, 20);
            }
        }, false);
    }

    // get node adsolute position to the whole page
    function absPosition(x) {
        return x.getBoundingClientRect().top < 0 ? window.pageYOffset - Math.abs(x.getBoundingClientRect().top) : window.pageYOffset + x.getBoundingClientRect().top;
    }

    function toc(get, put) {
        var n = arguments.length <= 2 || arguments[2] === undefined ? 'h1,h2,h3' : arguments[2];

        var node = document.querySelector(get);
        var nodes = node.querySelectorAll(n);
        var id0 = void 0;
        if (nodes[0].id !== "") {
            id0 = nodes[0].id;
        } else {
            id0 = 'toc' + 0;
            nodes[0].id = 'toc' + 0;
        }
        var outHtml = '<ul><li><a href=#' + id0 + ' class=active>' + nodes[0].innerHTML + '</a>';
        var nodeTop = [absPosition(nodes[0])];
        for (var i = 1; i < nodes.length; i++) {
            nodeTop.push(absPosition(nodes[i]));
            var a = nodes[i].nodeName.charAt(1) - nodes[i - 1].nodeName.charAt(1);
            for (var j = 1; j < a; a--) {
                outHtml += '<ul><li>';
            }
            for (var k = -1; k > a; a++) {
                outHtml += '</li></ul>';
            }
            var nodeId = void 0;
            if (nodes[i].id !== "") {
                nodeId = nodes[i].id;
            } else {
                nodeId = 'toc' + i;
                nodes[i].id = 'toc' + i;
            }
            var aa = '<a href=#' + nodeId + ' >' + nodes[i].innerText + '</a>';
            switch (a) {
                case 0:
                    outHtml += '</li><li>' + aa;
                    break;
                case -1:
                    outHtml += '</li></ul><li>' + aa;
                    break;
                case 1:
                    outHtml += '<ul><li>' + aa;
                    break;
            }
        }
        outHtml += '</li></ul>';
        if (put) {
            var position = document.querySelector(put);
            position.innerHTML += outHtml;
        }
        active(nodeTop);
        scrollTo('#put');
        return outHtml;
    }

    return toc;

}());