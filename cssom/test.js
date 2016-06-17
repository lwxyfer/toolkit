var cssom = cssom.cssom;
function se(id) {
    return document.getElementById(id)
}
function addEL(node,e,foo) {
    node.addEventListener(e,foo,false)
}

var sy = se('scrollY');
var setSY = se('setSY')

addEL(window,'scroll',function(){
    sy.innerHTML = '页面滚动位置：' + cssom.readScrollY() +'|&nbsp;页面长度&nbsp;:' + cssom.scrollHeight() + '|&nbsp;页面可视区域宽度&nbsp;:' + cssom.viewWidth() + '高度' + cssom.viewHeight()
})

setSY.onclick = function() {
    cssom.setScrollY(200)
}
