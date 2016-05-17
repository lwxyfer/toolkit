# TocX

DEMO:https://blog.lwxyfer.com/ghost-kai-fa-ji-lu/

# USAGE

1. script
```js
<script src="toc.js"></script>
<script type="text/javascript">
	toc(get, n, put)
</script>
```
2. support CMD/CommonJS
```js
var toc = require('toc.js')
toc(get,n,put)
// or
var where = toc(get,n)
node.innerHTML = where
```

# 插件配置

chrome extension为chrome插件

生成图预览：
![](https://ooo.0o0.ooo/2016/05/17/573abc571a948.png)

# TODO

- 自定义网站匹配规则：默认获取h1 h2 h3 ，判断节点数量，过多就只保留h1 h2
- 自定义css
- 拖动改变位置
- 高亮当前项
- 本地存储
