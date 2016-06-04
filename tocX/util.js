// function hasClass(obj, cls) {
//     return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
// }
//
// function addClass(obj, cls) {
//     if (!hasClass(obj, cls)) obj.className += " " + cls;
// }
//
// function removeClass(obj, cls) {
//     if (hasClass(obj, cls)) {
//         var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
//         obj.className = obj.className.replace(reg, ' ');
//     }
// }
// export function toggleClass(obj, cls) {
//     if (hasClass(obj, cls)) {
//         removeClass(obj, cls);
//     } else {
//         addClass(obj, cls);
//     }
// }


export function toggleClass(obj, cls) {
    if (obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    } else {
        obj.className += " " + cls;
    }
}

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

export function test() {
    console.log('test roolup')
}
