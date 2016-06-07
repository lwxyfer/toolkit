export function toggleClass(obj, cls) {
    if (obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    } else {
        obj.className += " " + cls;
    }
}

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
export function active(x) {
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
        }, 100)
    }, false)
}

export function scrollTo(node) {
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
