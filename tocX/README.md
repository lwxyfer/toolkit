# TocX

DEMO:http://jsbin.com/yowepaqomu/edit?html,js,output

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

chrome 插件，与bookmark版本共存。
自定义css： 样式，位置，
网站匹配规则
标签匹配：匹配所有的标签，类名，或者独有的data属性


# 网站匹配

V2EX  SF  GITHUB的readme


# QAQ

由于用了锚点，所以提前匹配是否有id，若有就不自动添加，使用已有的ID。