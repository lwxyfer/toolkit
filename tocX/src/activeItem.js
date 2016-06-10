/**
 * [toggle class]
 */
export function toggleClass(obj, cls) {
    if (obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    } else {
        obj.className += " " + cls;
    }
}

/**
 * [highlight active item]
 * @param  {[Array]} x [nodes's absolute top value]
 */
export function active(x) {
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
