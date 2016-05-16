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

- 默认匹配： article main id="content"
- 生成的TOC可以拖动改变位置，改变大小。
- 默认获取h1 h2 h3 ，判断节点数量，过多就只保留h1 h2

# TODO

- 自定义网站匹配规则
- 自定义css： 样式，位置，
- 高亮当前项
- 本地存储
