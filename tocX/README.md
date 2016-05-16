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

# TODO

- 自定义网站匹配规则
- 自定义css： 样式，位置，
- 高亮当前项
- 本地存储
