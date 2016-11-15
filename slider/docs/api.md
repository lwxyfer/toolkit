# slider API 说明

## 默认参数

```javascript
Slider.DEFAULTS = {
  width: '100%',
  height: '100%',
  speed: 200,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 1000,
  arrow: true,
  arrowPre: '<span class="slider-arrow-bf"><</span>',
  arrowNext: '<span class="slider-arrow-af">></span>',
  dots: true,
  dotClass: null,
  keyboard: true,
  resize: null,
  callback: null
};
```

## 属性获取

获取实际宽度：
```
$('your-slider').slider('width')
```

获取实际高度：
```
$('your-slider').slider('height')
```

其余属性以类似方式可获取。

## 方法

Destroy:
```javascript
$('your-slider').slider('destroy')
```

获取当前轮播页码：
```javascript
$('your-slider').slider('getIndex')
```

自动播放：
```javascript
$('your-slider').slider('autoplay')
```

切换上一张：
```javascript
$('your-slider').slider('prev')
```

切换下一张：
```javascript
$('your-slider').slider('next')
```

多页切换:
index为你想要滚动到的位置
```javascript
$('your-slider').slider('dotmove', index)
```

距离切换:
distance为切换的距离，可自定义，一般设置为整页的宽度。dotmove 方法依赖此方法。
```javascript
$('your-slider').slider('move', distance)
```

## 自定义事件

dot 和 arrow 的点击事件：
```javascript
$('youslider').on('click.slider'， function() {

})
```

键盘事件：
```javascript
$('youslider').on('keydown.slider'， function() {

})
```

其余事件待添加
