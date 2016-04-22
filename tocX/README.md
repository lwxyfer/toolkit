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


配合 scrollBy 滚动到指定位置