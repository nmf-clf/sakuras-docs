# 常见问题

### 1. 无法重新声明块范围变量“url”
```ts
/* src/index.ts */
const url: string = 'https://www.sakuras.group/sakuras-api/user/test'; 
/* src/other.js */
const url: string = 'https://www.sakuras.group/sakuras-api/user/test';
```
- 原因：其实问题出在了变量命名空间，如果不把文件当作模块使用的话typescript会认为所有文件里的代码都是在一个作用域里的，所以即使在不同文件也不能声明同名变量
- 解决：
    - 最简单的解决办法就是关掉js文件；
    - 或者将此ts文件引入到其他模块内，比如html；
    - 或者修改同一个项目根目录内其他的js文件变量命名，保证项目内的变量命名不冲突（当然，这种方式不推荐）。
