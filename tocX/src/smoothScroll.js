export function scrollTo(node) {
    document.querySelector(node).addEventListener('click', (e) => {
        if (e.target && e.target.nodeName.toUpperCase() == "A") {
            e.preventDefault()
            let ele = e.target
            let eleLink = ele.getAttribute('href')
            let to = document.querySelector(eleLink).getBoundingClientRect().top + window.pageYOffset
            smoothScroll(to, 20)
        }
    }, false)
}

/**
 * [smoothScroll description]
 * @param  {[NUMBER]} y     [set destination]
 * @param  {[NUMBER]} speed = 30 [scroll speed]
 */
function smoothScroll(y, speed = 30) {
    let timer
    let distance
    let leap
    let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    let viewHeight = Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientWidth)
    if (scrollHeight - y - viewHeight - 20 < 0) {
        y = scrollHeight - viewHeight - 20
    }
    timer = setInterval(() => {
            distance = y - window.pageYOffset
            if (distance < 2 && distance > -2) {
                clearInterval(timer)
            }
            leap = Math.round(distance / 10)
            distance > 0 && distance < 10 ? leap = 1 : leap = leap
            distance < 0 && distance > -10 ? leap = -1 : leap = leap
            window.scroll(0, window.pageYOffset += leap)
        },
        speed)
    console.log('test=====')
}
