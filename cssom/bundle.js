(function (exports) {
    'use strict';

    var cssom = {
        // 获取元素在页面的绝对位置

        absPosition: function absPosition(node) {
            return node.getBoundingClientRect().top < 0 ? window.pageYOffset - Math.abs(node.getBoundingClientRect().top) : window.pageYOffset + node.getBoundingClientRect().top;
        },

        // 读取页面垂直方向已滚动距离
        readScrollY: function readScrollY() {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        },

        // 设置页面垂直滚动位置
        setScrollY: function setScrollY(num) {
            document.documentElement.scrollTop = num;
            document.body.scrollTop = num;
        },

        // 获取整个页面长度
        scrollHeight: function scrollHeight() {
            return document.body.scrollHeight || document.documentElement.scrollHeight;
        },

        // 浏览器可视区域高度
        viewHeight: function viewHeight() {
            return typeof window.innerHeight === "number" ? window.innerHeight : document.documentElement.clientHeight;
        },

        // 浏览器可视区域宽度
        viewWidth: function viewWidth() {
            return typeof window.innerWidth === "number" ? window.innerWidth : document.documentElement.clientWidth;
        }
        // use this to extend other methods

    };

    exports.cssom = cssom;

}((this.cssom = this.cssom || {})));