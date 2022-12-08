# 项目练习

> _书山有路勤为径，学海无涯苦作舟。 ——  韩愈_

## 1. 表格的增删改查
- 在根目录执行`tsc --init`进行编译初始化
- 目标功能：
    - 点击添加，调用接口添加一行数据
    - 点击删除，删除此行数据

--- 
<details>
<summary>查看：TS中DOM的类型表示</summary>

```js
"a": HTMLAnchorElement;
"abbr": HTMLElement;
"address": HTMLElement;
"applet": HTMLAppletElement;
"area": HTMLAreaElement;
"article": HTMLElement;
"aside": HTMLElement;
"audio": HTMLAudioElement;
"b": HTMLElement;
"base": HTMLBaseElement;
"bdi": HTMLElement;
"bdo": HTMLElement;
"blockquote": HTMLQuoteElement;
"body": HTMLBodyElement;
"br": HTMLBRElement;
"button": HTMLButtonElement;
"canvas": HTMLCanvasElement;
"caption": HTMLTableCaptionElement;
"cite": HTMLElement;
"code": HTMLElement;
"col": HTMLTableColElement;
"colgroup": HTMLTableColElement;
"data": HTMLDataElement;
"datalist": HTMLDataListElement;
"dd": HTMLElement;
"del": HTMLModElement;
"details": HTMLDetailsElement;
"dfn": HTMLElement;
"dialog": HTMLDialogElement;
"dir": HTMLDirectoryElement;
"div": HTMLDivElement;
"dl": HTMLDListElement;
"dt": HTMLElement;
"em": HTMLElement;
"embed": HTMLEmbedElement;
"fieldset": HTMLFieldSetElement;
"figcaption": HTMLElement;
"figure": HTMLElement;
"font": HTMLFontElement;
"footer": HTMLElement;
"form": HTMLFormElement;
"frame": HTMLFrameElement;
"frameset": HTMLFrameSetElement;
"h1": HTMLHeadingElement;
"h2": HTMLHeadingElement;
"h3": HTMLHeadingElement;
"h4": HTMLHeadingElement;
"h5": HTMLHeadingElement;
"h6": HTMLHeadingElement;
"head": HTMLHeadElement;
"header": HTMLElement;
"hgroup": HTMLElement;
"hr": HTMLHRElement;
"html": HTMLHtmlElement;
"i": HTMLElement;
"iframe": HTMLIFrameElement;
"img": HTMLImageElement;
"input": HTMLInputElement;
"ins": HTMLModElement;
"kbd": HTMLElement;
"label": HTMLLabelElement;
"legend": HTMLLegendElement;
"li": HTMLLIElement;
"link": HTMLLinkElement;
"main": HTMLElement;
"map": HTMLMapElement;
"mark": HTMLElement;
"marquee": HTMLMarqueeElement;
"menu": HTMLMenuElement;
"meta": HTMLMetaElement;
"meter": HTMLMeterElement;
"nav": HTMLElement;
"noscript": HTMLElement;
"object": HTMLObjectElement;
"ol": HTMLOListElement;
"optgroup": HTMLOptGroupElement;
"option": HTMLOptionElement;
"output": HTMLOutputElement;
"p": HTMLParagraphElement;
"param": HTMLParamElement;
"picture": HTMLPictureElement;
"pre": HTMLPreElement;
"progress": HTMLProgressElement;
"q": HTMLQuoteElement;
"rp": HTMLElement;
"rt": HTMLElement;
"ruby": HTMLElement;
"s": HTMLElement;
"samp": HTMLElement;
"script": HTMLScriptElement;
"section": HTMLElement;
"select": HTMLSelectElement;
"slot": HTMLSlotElement;
"small": HTMLElement;
"source": HTMLSourceElement;
"span": HTMLSpanElement;
"strong": HTMLElement;
"style": HTMLStyleElement;
"sub": HTMLElement;
"summary": HTMLElement;
"sup": HTMLElement;
"table": HTMLTableElement;
"tbody": HTMLTableSectionElement;
"td": HTMLTableDataCellElement;
"template": HTMLTemplateElement;
"textarea": HTMLTextAreaElement;
"tfoot": HTMLTableSectionElement;
"th": HTMLTableHeaderCellElement;
"thead": HTMLTableSectionElement;
"time": HTMLTimeElement;
"title": HTMLTitleElement;
"tr": HTMLTableRowElement;
"track": HTMLTrackElement;
"u": HTMLElement;
"ul": HTMLUListElement;
"var": HTMLElement;
"video": HTMLVideoElement;
"wbr": HTMLElement;
```
</details>

_index.ts：_
```ts
const url = 'https://api.thecatapi.com/v1/images/search';
// const _button = document.querySelector('button') as HTMLButtonElement; //非空断言: xxx as HTMLButtonElement
const button: HTMLButtonElement | null = document.querySelector('button'); //联合声明: HTMLButtonElement | null
const tableBody = document.querySelector('#table-body') as HTMLTableElement; //获取table-body元素，方便之后为其添加子节点
/*  
    TS使用核心：
    定义任何变量的时候要注明类型
    调用任何变量的时候要检查类型
*/
/* 接口主要是为了定义类的结构 */
interface CatType { //定义接口 - 因为该数据可能被复用
    id: string;
    url: string;
    height: number;
    width: number;
    test?: boolean; //属性值后面加个?代表可有可无，否则报错：类“Cat”错误实现接口“CatType”。类型 "Cat" 中缺少属性 "test"，但类型 "CatType" 中需要该属性
}
/*  implements：用类去实现一个接口 */
class Cat implements CatType{
    id: string;
    url: string;
    height: number;
    width: number;

    constructor(id:string, url:string, height:number, width:number ){
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}
/* 在这里定义一个操作类 */
class WebDisplay {
    static addData(data: CatType){ //添加猫， 因为我们需要直接使用操作类WebDisplay下的方法，因此需要将该方法声明为静态属性
        const cat = new Cat(data.id, data.url, data.height, data.width);
        const tableRow = document.createElement('tr'); //创建tr
        tableRow.innerHTML = `
            <td>${cat.id}</td>
            <td><img src="${cat.url}" /></td>
            <td>${cat.url}</td>
            <td>${cat.height}</td>
            <td>${cat.width}</td>
            <td><a href="#">X</a></td>
        `;
        //将tableRow添加到D
        tableBody?.appendChild(tableRow);
    }
    static deleteData(deleteDOM: HTMLAnchorElement){
        /* 这里有个问题，如果点击的是当前行而不是删除图标，则会把整个tbody删除掉 */
        if(deleteDOM.tagName !== 'A') return console.error(`出错啦:: ${deleteDOM.tagName} is not expected`);
        console.log('点击元素::', Object(deleteDOM).__proto__, deleteDOM.tagName); //HTMLAnchorElement
        const td = <HTMLTableCellElement>deleteDOM.parentElement; //HTMLTableCellElement
        const tr = <HTMLTableRowElement>td.parentElement;
        console.log('爷爷元素::', tr, Object(tr).__proto__); //HTMLTableRowElement
        tr?.remove();
    }
}  
/* 此为普通版本也可以正常使用，但是这样写不能发挥TS的作用
async function getJson(url: string){ //参数url隐式具有any类型，因此需要声明类型
    let response = await fetch(url);
    let json = response.json();
    return json;
}
async function getData(){
    let res = await getJson(url);
    let data = res[0];
    WebDisplay.addData(data);
} 
*/
/* 此为TS加强写法 */
async function getJson<T>(url: string): Promise<T>{ //1.参数url隐式具有any类型，因此需要声明类型 4.在这里用泛型表示，写法：<> + T(占位符，也可以自定义) 7.声明返回类型
    let response: Response = await fetch(url); // 2.很显然fetch返回的是一个Response类型，我们声明即可
    // let json = response.json(); // 3.虽然知道json是个Promise，但是不知道Promise里返回的内容是什么，因此可以用泛型表示 
    let json: Promise<T> = response.json(); // 5.接着声明json数据类型Promise，并且用泛型<T>表示数据类型，代表我们知道返回的是Promise，但是不着急定义Promise里返回内容的类型而已
    return json; //6.返回了json，因此需要给函数声明返回类型
}
async function getData(){
    try{
        let res: CatType[] = await getJson<CatType[]>(url); //2.在这里定义通过泛型定义getJson返回的数据类型(也就是明确占位符的内容 )，其实是一个数组，数组里对象应和CatType接口保持一致
        let data: CatType = res[0]; //1.对象的类型为 "unknown" ：因为前面已经使用了占位符，所以这里需要明确占位符的内容
        WebDisplay.addData(data);
    }catch(err: Error | unknown){ //3.err类型为unknow，虽然没有报错，但是不知道对方会抛出什么异常，针对这个例子，我们可以把err类型声明为Error或者unknow
        let msg: string; 
        if(err instanceof Error){
            msg = err.message
        }else{
            msg = String(err)
        }
        console.log(msg);
    }
} 
//button绑定事件-新增
button?.addEventListener<'click'>('click', getData)
//tableBody绑定事件-删除
tableBody?.addEventListener<'click'>('click', (ev: MouseEvent)=>{
    WebDisplay.deleteData(<HTMLAnchorElement>ev.target);
})
```
_html+css：_
<details>
 
<summary>点击查看代码</summary>

_index.html_
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="./style.css" />
	<title>练习</title>
</head>
<body>
	<button class="remind">随机1只喵</button>
	<table>
		<thead>
			<tr>
				<th>图片id</th>
				<th>图片预览</th>
				<th>图片高度</th>
				<th>图片宽度</th>
				<th>图片地址</th>
				<th>删除图片</th>
			</tr>
		</thead>
		<tbody id="table-body">
			<tr>
				<td>idxxx</td>
				<td><img src="./example.jpeg" /></td>
				<td>高度xx</td>
				<td>宽度xx</td>
				<td>地址xx</td>
				<td><a href="#">X</a></td>
			</tr>
		</tbody>
	</table>
	<script src="./index.js"></script>
</body>
</html>
```
_index.css_
```css
body {
    width: 900px;
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button {
    font-size: 1.5rem;
    color: rgb(7, 75, 99);
    width: 200px;
    margin: 10px;
}

table {
    text-align: center;
}

th, td {
    border: 1px solid rgb(118, 156, 148);
    padding: 5px;
}

a {
    text-decoration: none;
    color: red;
    font-weight: bolder;
}

img {
    height: 30px;
    width: 30px;
}

@keyframes changing {
    from {
        border-style: solid;
    }
    to {
        border-style: dotted;
        border-color: red;
    }
}

.remind {
    border-style: solid;
    animation-name: changing;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.green {
    background-color: rgb(106, 181, 118);
}
```
</details>

## 2. 贪吃蛇

## 3. axios封装
[基于 ts 的 axios 封装](https://juejin.cn/post/6969070102868131853)

