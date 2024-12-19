# 兼容性问题

### 1. IOS 日期兼容问题

```js
new Date("2020-01-01"); // IOS √
new Date("2020-01-01 20:00:00"); // IOS × → NaN-NaN NaN
// 解决办法 - 使用分别传值形式
new Date(2020, 1, 1, 20, 0, 0);
```

### 2. 定位问题

在混合开发 APP 中，由于 IOS webview 组件