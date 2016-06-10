/**
 * the entry file
 * Using rollup.js to bundle module to different module loaders
 */
import {
    active
} from './activeItem.js'
import {
    scrollTo
} from './smoothScroll.js'
import {
    absPosition as absP
} from './util.js'

export default function toc(get, put, n = 'h1,h2,h3') {
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
    let nodeTop = [absP(nodes[0])]
    for (let i = 1; i < nodes.length; i++) {
        nodeTop.push(absP(nodes[i]))
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
