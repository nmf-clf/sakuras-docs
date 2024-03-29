# 网站性能优化

[前端大全-性能优化](https://mp.weixin.qq.com/s/xBYid9NZiMvNlbQLNEpp8w) \
[雅虎35条军规](https://www.jianshu.com/p/4cbcd202a591)

性能优化，一般的话，我们可以根据页面从访问到渲染的流程，分为两个方面：`网络方面`和`浏览器方面`<br>
- 第一个的话是`网络方面` <br>
    如果是网络方面的，主要涉及DNS解析（增加DNS缓存时间） ，TCP链接，HTTP响应，一般的话DNF解析和TCP链接方面的优化前端优化空间小
    所以的话可以考虑 优化HTTP：比如减少请求次数 和 减少单次请求所花的时间
    减少请求次数跟webpack没啥关系，
    如果是减少单次请求所花的时间，其实就是从请求到返回数据的时间，这个时间跟打包的体积有很直接的关系，
    所以我们可以从减少webpack打包体积入手
    - 通常的话，我们可以使用webpack-bundle-analyzer （模块分析器）插件，分析打包后的产物，哪些文件体积太大，
	    1. treeshaking ，可以无视那些基于ES6模块导入的死代码（默认支持）
        2. 利用UglifyJsPlugin 插件，压缩注释，但是会影响构建速度
        3. 代码分割，
        4. Gzip压缩
    - 另外的话其实就是 优化webpack构建速度，webpack在构建过程中基本都是处理loader和plugin花费时间，因此。。。
        1. 针对loader：使用loader的时候开启缓存，这个很重要，提升2倍以上构建速度，主要作用是将loader的转译结果缓存到文件系统
        2. 针对plugin：
            可以采用DllPlugin, 将常用的库单独打包到一个文件里，只要这些依赖库的版本不发生改变，那些库就不会被重新打包
            可以采用Happypack插件，利用nodejs的os模块获取当前CPU的处理器数量，作用是将任务分解成多个子进程交给CPU处理，提高处理速度

    - 对于网络方面的优化，图片的优化也是很重要的
- 第二个的话就是在`浏览器方面`的优化 
	- 1.缓存 <br>
        - 首先，当同时配置强缓存和协商缓存的时候，浏览器优先命中强缓存，其次是协商缓存。
		- 强制缓存 Expires、设置缓存过期日期，如果本地时间跟服务器时间不一样会有问题 无效 ,解决方法Cache-Control 设置maxage=23133缓存有效时长
		- 协商缓存 Cache-Control设置no-cache，表示不使用强缓存，使用协商缓存, 然后设置Last-Modified 客户端先问服务端缓存到期没，没到期就返回304状态码使用缓存，否则重新请求资源
				弊端：last-modified比对的是文件修改时间，如果时间改变，内容未变，仍然会重新请求资源 → 
				解决方法：响应头增加字段ETag 密码戳，当第一次请求时候，通过响应头传给客户端。第二次请求时请求头默认增加字段If-None-Match，然后浏览器
				去比较是否一致，如果一致就走缓存，不一致就重新请求
		- 缓存策略：经常更新的采用协商缓存，比如html，不常更新的比如js css 图片采用强缓存，然后配合文件的hash值，达到修改即变化的目的
	- 2.存储<br> 
        - cookie 
        - localstorage 
        - sessionstorage
        - indexDB
    - 3.CDN(内容分发网络)加速 
        - CDN属于从加载资源前优化，其他属于从加载资源后缓存提速 
    - 4.服务端渲染
    - 5.根据html渲染的机制，得出 <br>
        - 优化CSS样式表 避免使用通配符 标签选择器
        - 优化js css加载顺序
        - 优化DOM，减少DOM操作 即 减少回流和重绘 ,以及从事件循环角度