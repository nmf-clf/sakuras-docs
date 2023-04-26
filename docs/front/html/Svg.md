# SVG
[文档](https://developer.mozilla.org/zh-CN/docs/Web/SVG)

## 基础
### 示例
```xml
<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="red" />
    <circle cx="150" cy="100" r="80" fill="green" /> 
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text> 
</svg> 
```
### 标签 / 属性
- svg
    - version="1.1"：指定 SVG 版本为 1.1。
    - baseProfile="full"：指定 SVG 基本配置文件为 full。
    - width="300" height="200"：指定 SVG 图像的宽度和高度为 300 和 200 个单位（可以是像素或其他单位）。
    - xmlns="http://www.w3.org/2000/svg"：指定 SVG 命名空间为 http://www.w3.org/2000/svg。
- rect
    - width="100%" height="100%"：指定矩形的宽度和高度为 SVG 图像的宽度和高度。
    - fill="red"：指定矩形的填充颜色为红色。

- circle
    - cx="150" cy="100"：指定圆心的水平和垂直位置为 150 和 100 个单位。
    - r="80"：指定圆的半径为 80 个单位。
    - fill="green"：指定圆的填充颜色为绿色。

- text
    - x="150"：文本的水平位置，相对于 SVG 图像左侧边缘的距离为 150 个单位（可以是像素或其他单位）。
    - y="125"：文本的垂直位置，相对于 SVG 图像顶部的距离为 125 个单位。
    - font-size="60"：文本的字体大小为 60 个单位。
    - text-anchor="middle"：文本的水平对齐方式为居中对齐。
    - fill="white"：文本的填充颜色为白色。

### 嵌入方式
- 可以通过 object 元素引用 SVG 文件
```html
    <object data="image.svg" type="image/svg+xml" />
```
- 也可以使用 iframe 元素引用 SVG 文件
```html
<iframe src="image.svg"></iframe>
```
- 使用 img 元素，但是在低于 4.0 版本的 Firefox 中不起作用

### 基本形状
- 矩形 rect
- 圆形 circle 
- 椭圆 ellipse 
- 线条 line
- 折线 polyline 
- 多边形 polygon 
- 路径 path 

### 路径
每一个命令都有两种表示方式，一种是用大写字母，表示采用绝对定位。另一种是用小写字母，表示采用相对定位
- 直线命令
    - M、m 起点
    - L、l 画线
    - H、h 水平线
    - V、v 垂直线
    - Z 自闭合
- 曲线命令
    - C、c 三次贝塞尔曲线 S、s 延长
    - Q、q 二次贝塞尔曲线 T、t 延长
- 弧形
    - A rx ry x-axis-rotation(旋转情况) large-arc-flag(角度大小) sweep-flag(弧线方向) x y
    - a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
    ```xml
    <svg width="325" height="325" xmlns="http://www.w3.org/2000/svg">
        <!-- 小角度 逆时针 画圆闭合 -->
        <path d="M 80 80 A 45 45, 0, 0, 0, 125 125 L 125 80 Z" fill="green"/>
        <!-- 大角度 逆时针 画圆闭合 -->
        <path d="M 230 80 A 45 45, 0, 1, 0, 275 125 L 275 80 Z" fill="red"/>
        <!-- 小角度 顺时针 画圆闭合 -->
        <path d="M 80 230 A 45 45, 0, 0, 1, 125 275 L 125 230 Z" fill="purple"/>
        <!-- 大角度 顺时针 画圆闭合 -->
        <path d="M 230 230 A 45 45, 0, 1, 1, 275 275 L 275 230 Z" fill="blue"/>
    </svg>
    ```
### 填充和边框
- 上色
    - 边框 stroke="blue" 
    - 填充 fill="purple"
    - 填充透明度 fill-opacity="0.5" 
    - 边框透明度 stroke-opacity="0.8“
- 描边
    - stroke-width 描边的宽度
    - stroke-linecap 控制边框终点的形状
        - butt 用直边结束线段，它是常规做法，线段边界 90 度垂直于描边的方向、贯穿它的终点。
        - square 的效果差不多，但是会稍微超出实际路径的范围，超出的大小由stroke-width控制。
        - round 表示边框的终点是圆角，圆角的半径也是由stroke-width控制的。

<CodeGroup>
  <CodeBlock title="HTML" lang="html">
    <div>
      <h1>Hello World!</h1>
      <p>This is an example of HTML code.</p>
    </div>
  </CodeBlock>

  <CodeBlock title="CSS" lang="css">
    body {
      background-color: #f5f5f5;
    }
    h1 {
      color: #333;
    }
    p {
      color: #666;
    }
  </CodeBlock>
</CodeGroup>