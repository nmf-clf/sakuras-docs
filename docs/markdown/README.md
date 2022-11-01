# 基础

## 标题

```md
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 粗体与斜体
```md
**粗体**
_斜体_
**_粗体与斜体_**
```

## 删除线
```md
~~删除线~~
```

## 分割线
```md
---
```

## 空格
一个汉字占用两个空格大小，所以使用4个空格就可以达到首行缩进2个汉字的效果。例如：\
&ensp;&ensp;1个空格大小的表示：`&ensp;`或`&#8194`，使用2个可以缩进1个汉字的效果 \
&emsp;&emsp;2个空格大小的表示: `&emsp;`或`&#8195` 使用2个可以缩进2个汉字的效果`(推荐使用)` \
&nbsp;&nbsp;&nbsp;&nbsp;不换行空格的表示：`&nbsp;`或`&#160`，使用4个可以缩进1个汉字的效果 \
　　也可以使用中文全角，按1个空格就是一个汉字

## 列表
### 无序列表
```md
- first
- second
- thirdly
\* first
\* second
\* thirdly
```
### 有序列表
```md
1. first  
2. second  
3. thirdly
```

## 链接 
```md
[夜语清梦](https://www.sakuras.group/)
```

## 插入图片
```md
![图片名称](图片路径)
```

## 生成目录
```md
[toc]
```

## 代码块
### 大片代码块
```md
    ​```文件类型
    ```
```
```js
var obj = new Object();
```
### 行内代码块
```md
`System.out.println(HelloWorld!);`
```
`System.out.println(HelloWorld!);`

## 引用
```md
> 这里是引用
```
> 这里是引用

## 下划线
```md
<u>这里的文字会带有下划线</u>
```
<u>这里的文字会带有下划线</u>

## 任务列表
```md
-   [ ]
```

## 为文字添加注释
```md
文字[^注释]
```
文字[^这里是注释]

## 隐藏剩余内容
```md
<!-- more -->
```
<!-- more -->

## 表格
```md
Title1 | Title2 | Title3 <!-- 表格标题 -->
-|-|-  <!-- 这一行必须要有，且不能修改 - 为其他 -->
column1,row1 | column2,row1 | column3,row1  <!-- 表格内容 -->
column1,row2 | column2,row2 | column3,row2 
```
Title1 | Title2 | Title3
-|-|-
column1,row1 | column2,row1 | column3,row1
column1,row2 | column2,row2 | column3,row2 