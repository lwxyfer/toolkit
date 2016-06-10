// get node adsolute position to the whole page
export function absPosition(x) {
    return x.getBoundingClientRect().top < 0 ? window.pageYOffset - Math.abs(x.getBoundingClientRect().top) : window.pageYOffset + x.getBoundingClientRect().top
}

function readScrollY() {
    return window.pageYOffset || document.documentElement.scrollLeft || document.body.scrollLeft
}

function setScrollY(y) {
    document.documentElement.scrollLeft = y
    document.body.scrollLeft = y
}
