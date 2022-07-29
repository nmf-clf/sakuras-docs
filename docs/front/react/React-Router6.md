# React-Router6
> react-router6在2021年11月成为了默认版本
## _1. 概述_
1. React Router以三个不同的包发布到npm上，它们分别为：
    1. react-router：路由的核心库，提供了很多的组件、钩子
    2. react-router-dom：包含react-router所有内容，并添加一些专门用于DOM的组件，例如`<BrowserRouter>`等
    3. react-router-native: 包含react-router所有内容，并添加写专门用于ReactNative的API，例如`<NativeRouter>`等
2. 与React Router5.x 版本相比，改变了什么？
    1. 内置组件的变化：移除`<Switch />`, 新增`<Routes />`等    
    2. 语法的变化：component={About} 变为 `element={<About />}`等
    3. 新增多个hook：`useParams`、`useNavigate`、`useMatch`等
    4. 官方明确推荐函数式组件了！！！\
    ...
## _2. Component_
### 1. `<BrowserRouter>` 
1. 说明：`<BrowserRouter>`用于包裹整个应用。
2. 示例代码：
```jsx
import React from "react";
import ReactDOM from "react-dom";
import BrowserRouter from "react-router-dom";
ReactDOM.render(
    <BrowserRouter></BrowserRouter>,
    root
);
```
### 2. `<HashRouter>`
1. 说明：作用与`<BrowserRouter>`一样，但`<HashRouter>`修改的是地址栏的hash值。
2. 备注：6.x版本中`<HashRouter>`、`<BrowserRouter>`的用法与5.x相同。
### 3. `<Routes/>`与`<Route/>`
1. v6版本中移出了先前的`<Switch>`,引入了新的替代者：`<Routes>`。
2. `<Routes>`和`<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。
3. `<Route>`相当于一个if语句，如果其路径与当前URL匹配，则呈现其对应的组件。
4. `<Route caseSensitive>`属性用于指定：匹配时是否区分大小写（默认为false)。
5. 当URL发生变化时，`<Routes>`都会查看其所有子`<Route>`元素以找到最佳匹配并呈现组件。
6. `<Route:>`也可以嵌套使用，且可配合useRoutes()配置“路由表”，但需要通过`<Out1et>`组件来渲染其子路由。
7. 示例代码：
```jsx
<Routes>
    {/* path属性用于定义路径，element属性用于定义当前路径所对应的组件 */}
    <Route path="/login" element={<Login/>}></Route>
    {/* 用于定义嵌套路由，home是一级路由，对应的路径/home */}
    <Route path="home" element={<Home/>}>
        {/* test1和test2是二级路由，对应的路径是/home/test1或/home/test2 */}
        <Route path="test1" element={<Test/>}></Route>
        <Route path="test2" element={<Test2/>}></Route>
    </Route>
</Routes>
```

## _3.Hooks_


