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
export function toggleClass(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
}

//模考依赖，比如现在的情况，函数里面存在依赖，但是不导出。

// document.body.addEventListener('scoll', (x) => {
//     let y =
//         let arr = []
//     for (let i; i < x.length; i++) {
//
//     }
//     nodes[arr.indexOf(Math.max.apply(null, arr))].className = 'active';
// }, false)

export function test() {
    console.log('test roolup')
}
