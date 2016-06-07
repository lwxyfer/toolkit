window.onload = function() {
                    function toc(get, n, put) {
                        var node = document.querySelector(get);
                        var nodes = node.querySelectorAll(n || 'h1,h2,h3,h4,h5');
                        var position = document.querySelector(put);
                        // h太少 || 屏幕太小 == 不加载TOC
                        if (nodes.length < 4 || document.body.clientWidth < 1366) {
                            position.innerHTML = "";
                            return true;
                        }
                        if (nodes[0].id !== "") {
                            var id0 = nodes[0].id
                        } else {
                            var id0 = 'toc' + 0;
                            nodes[0].id = 'toc' + 0;
                        }
                        var out = '<ul><li>' + '<a href=#' + id0 + '>' + nodes[0].innerHTML + '</a>';
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
                                nodeId = nodes[i].id
                            } else {
                                nodeId = 'toc' + i;
                                nodes[i].id = 'toc' + i;
                            }
                            switch (a) {
                                case 0:
                                    out += '</li><li>' + '<a href=#' + nodeId + ' >' + nodes[i].innerHTML + '</a>';
                                    break;
                                case -1:
                                    out += '</li></ul><li>' + '<a href=#' + nodeId + ' >' + nodes[i].innerHTML + '</a>';
                                    break;
                                case 1:
                                    out += '<ul><li>' + '<a href=#' + nodeId + ' >' + nodes[i].innerHTML + '</a>';
                                    break;
                            }
                        }
                        out += '</li></ul>';
                        position.innerHTML += out;
                        $('#putToc').css({
                                'display': 'block',
                                'position': 'absolute',
                                'left': '3rem'
                            })
                            // TOC元素位置改变
                        $(document).scroll(function() {
                            var a = document.querySelector('.post-title').getBoundingClientRect().top;
                            if (a < 80) {
                                $('#putToc').css({
                                    'position': 'fixed',
                                    'top': '80px'
                                })
                            } else if (a > 80) {
                                $('#putToc').css({
                                    'position': 'absolute',
                                    'left': '3rem',
                                    'top': 'initial'
                                })
                            }

                        })
                    }
                    toc('.post-content', 'h1,h2,h3,h4,h5', '#putToc');
                }
