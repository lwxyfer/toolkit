export function scrollTo(node) {
    let timer
    document.querySelector(node).addEventListener('click', (e) => {
        if (e.target && e.target.nodeName.toUpperCase() == "A") {
            e.preventDefault()
            let ele = e.target
            let eleLink = ele.getAttribute('href')
            let to = document.querySelector(eleLink).getBoundingClientRect().top + window.pageYOffset

            let smoothScroll = (y, speed = 30) => {
                let distance
                let leap
                let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                let viewHeight = Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientWidth)
                if (scrollHeight - y - viewHeight - 20 < 0) {
                    y = scrollHeight - viewHeight - 20
                }
                if (timer) {
                    clearInterval(timer)
                }
                console.log('before', timer)
                timer = setInterval(() => {
                        distance = y - window.pageYOffset
                        if (distance < 5 && distance > -5) {
                            clearInterval(timer)
                        };
                        leap = Math.round(distance / 5);
                        distance > 0 && distance < 10 ? leap = 2 : leap = leap;
                        distance < 0 && distance > -10 ? leap = -2 : leap = leap;
                        document.body.scrollTop += leap;
                        document.documentElement.scrollTop += leap;
                    },
                    speed)
            }
            smoothScroll(to, 20)
        }
    }, false)
}

/**
 * [smoothScroll description]
 * @param  {[NUMBER]} y     [set destination]
 * @param  {[NUMBER]} speed = 30 [scroll speed]
 */
// function smoothScroll(y, speed = 30) {
//     let timer
//     let distance
//     let leap
//     let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
//     let viewHeight = Math.max(window.innerHeight, document.documentElement.clientHeight, document.body.clientWidth)
//     if (scrollHeight - y - viewHeight - 20 < 0) {
//         y = scrollHeight - viewHeight - 20
//     }
//     timer = setInterval(() => {
//             // kill = true
//             distance = y - window.pageYOffset
//             if (distance < 2 && distance > -2) {
//                 clearInterval(timer)
//                 console.log('okok')
//             }
//             leap = Math.round(distance / 10)
//             distance > 0 && distance < 10 ? leap = 1 : leap = leap
//             distance < 0 && distance > -10 ? leap = -1 : leap = leap
//             window.scroll(0, window.pageYOffset += leap)
//         },
//         speed)
//     console.log('after', timer)
//     console.log('test=====')
// }
