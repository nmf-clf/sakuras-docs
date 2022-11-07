# React项目升级
简要记录react项目升级过程和遇到的问题

### 目标
> 1. 升级react版本、实现懒加载、使用hooks开发
> 2. 集成redux 
> 3. 实现HMR热更新
> 4. 优化打包编译警告
> 5. 升级webpack4 → 5
> 6. 升级组件库and-mobile <br>
> .....

### 升级react版本
- `package.json`配置改变前后：
```json
"devDependencies": {
    "webpack-dev-middleware": "^3.1.3", //升级到 5.3.3
    "webpack-hot-middleware": "^2.25.2", //新增
},
"dependencies": {
    "react": "^16.4.1", //升级到 18.2.0
    "react-dom": "^16.4.1", //升级到 18.2.0
},
```
- 遇到的问题：<br>
    1. 渲染跟组件方式改变：`Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17.` 
    ```jsx
    //改变前
    import ReactDOM from 'react-dom';
    import { Provider } from 'react-redux';
    ReactDOM.render(<Router></Router>,  document.getElementById('index'), function(){ })
    //改变后
    import { createRoot } from "react-dom/client";
    const container = document.getElementById("index");
    const root = createRoot(container);
    root.render(<Router></Router>)
    ```
### 实现懒加载
- 修改前端入口文件`src/index.js`
```jsx
import React, { Suspense, lazy } from 'react';
//改变前
<ProtectedRoute path="/home" component={Home} />
//改变后 lazy函数配合import实现打包时代码分割
let  Auth = {};
Auth.Home = lazy(_ => import('./modules/home/Home.js'));
```
- 遇到的问题
    1. webpack开发环境不生效：`mode: development`

### 实现HMR热更新
- `package.json`配置改变前后：
```json
"devDependencies": {
    "webpack-dev-middleware": "^3.1.3", //升级到 5.3.3
    "webpack-hot-middleware": "^2.25.2", //新增(作用是实现热更新)
},
```
- 修改node服务`server/development.server.js`：
```js
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware'); //使用中间件部署前端静态资源
const webpackHotMiddleWare = require('webpack-hot-middleware');

const app = express();

const config = require('../webpack.config.js'); //获取原webpack配置对象
config.entry = { index: ['./src/index.js', 'webpack-hot-middleware/client?reload=true'] } //重写入口配置

const compiler = webpack(config); //根据webpack配置进行打包、返回一个

const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: { colors: true }
});

app.use(webpackDevMiddlewareInstance); //挂载打包后资源
app.use(webpackHotMiddleWare(compiler)); //开启热更新
```
- 修改前端入口文件`src/index.js`：
```js
if(module.hot){
    module.hot.accept(); //监听热更新
}
```

### 集成redux
- 修改redux文件`src/redux/index.js`
```js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; //处理dispatch函数
import CombineReducer from "./CombineReducer";
import { persistStore, persistReducer } from 'redux-persist'; //redux持久化存储
// import storage from 'redux-persist/lib/storage'; //存储机制-localStorage
import storageSession from 'redux-persist/lib/storage/session'; //存储机制-sessionStorage
import { encryptTransform } from 'redux-persist-transform-encrypt'; //redux数据加密

const storageConfig = {
    key: 'root',
    storage: storageSession, // 缓存机制
    transforms: [
        encryptTransform({
            secretKey: 'my-super-secret-key',
            onError: function (error) {
                // Handle the error.
            },
        }),
    ],
};

const myPersistReducer = persistReducer(storageConfig, CombineReducer);

const store = createStore(myPersistReducer, {}, applyMiddleware(thunkMiddleware))

export const persistor = persistStore(store);

export default (initState={}) => {
    return store
}
```
- 修改前端入口`src/index.js` <br>
注意：`<Provider />`的作用是全局注入store、`<PersistGate />`的作用是持久化缓存store数据(因为当刷新页面时候，store里的数据会丢失)
```jsx
import createStore, { persistor } from './modules/redux/index';
const store = createStore();
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router></Router>
        </PersistGate>
    </Provider>,  
    document.getElementById('index'), 
    function(){}
)
```

### 升级webpack4到5




