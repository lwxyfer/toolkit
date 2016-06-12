export let cssom = {
    // get node adsolute position to the whole page
    absPosition(x) {
        return x.getBoundingClientRect().top < 0 ? window.pageYOffset - Math.abs(x.getBoundingClientRect().top) : window.pageYOffset + x.getBoundingClientRect().top
    }
    readScrollY() {
        return window.pageYOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    }
    setScrollY(y) {
        document.documentElement.scrollLeft = y
        document.body.scrollLeft = y
    }
    scrollHeight() {
        return document.body.scrollHeight || document.documentElement.scrollHeight
    }
    viewHeight() {
        return (typeof window.innerHeight === "number") ? window.innerHeight : document.documentElement.clientHeight;
    }
    // use this to extend other methods
}
