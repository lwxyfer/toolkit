export function toggleClass(obj, cls) {
    if (obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    } else {
        obj.className += " " + cls;
    }
}




export function active() {
    console.log('scroll')
    let arr = boundClient.slice()
    console.log(arr)
    let a = arr.indexOf(Math.min.apply(null, arr)) // 总结下数组
    console.log(a)
    let links = document.querySelectorAll('#put a')
    links[a].className = 'active'
}
