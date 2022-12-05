<!-- ---
sidebarDepth: 1
--- -->
# 全面进阶

![main](https://sakuras.group/sakuras-static/ts/imgs/main.png)
[typescript-xmind](https://sakuras.group/sakuras-static/ts/imgs/main.png)
## 1. 类型基础
### 类型标注
#### 原始类型的类型标注
除了最常见的 number / string / boolean / null / undefined， ECMAScript 2015（ES6）、2020 (ES11) 又分别引入了 2 个新的原始类型：symbol 与 bigint。
```ts
/* 基本数据类型 */
const name: string = 'feifei';
const age: number = 24;
const male: boolean = false;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { name, age, male };
const bigintVar1: bigint = 9007199254740991n; //目标低于 ES2020 时，bigInt 文本不可用
const bigintVar2: bigint = BigInt(9007199254740991);
const symbolVar: symbol = Symbol('unique');

/* null与undefined */
const tmp1: null = null;
const tmp2: undefined = undefined;
const tmp3: string = null; // 仅在关闭 strictNullChecks 时成立，下同
const tmp4: string = undefined;

/* void */
//void 用于描述一个内部没有 return 语句，或者没有显式 return 一个值的函数的返回值，如：
function func1() {}
function func2() {
  return;
}
function func3() {
  return undefined;
}
```
#### 数组的类型标注
```ts
/* 普通 */
const arr1: string[] = [];
const arr2: Array<string> = [];
/* 元组（Tuple） */
const arr4: [string, string, string] = ['lin', 'bu', 'du'];
/* 具名元组 */
const arr7: [name: string, age: number, male?: boolean] = ['feifei', 599, true];
const arr5: [string, number, boolean] = ['feifei', 599, true];
const [name, age, male, other] = arr5; // 长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。
```
#### 对象的类型标注
类似于数组类型，在 TypeScript 中我们也需要特殊的类型标注来描述对象类型，即 interface ，理解为它代表了这个对象对外提供的接口结构。
```ts
interface IDescription {
  name: string;
  age?: number; // ? 修饰接口属性：意味着此为可选值
  male: boolean;
}
const obj1: IDescription = {
  name: 'feifei',
  age: 599,
  male: true,
};
```

::: tip interface 与 type
- `interface(接口)`通常用来描述对象、类的结构。
- `type(类型别名)`通常用来将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型。
- 但大部分场景下接口结构都可以被类型别名所取代，因此，只要你觉得统一使用类型别名让你觉得更整齐，也没什么问题。
:::
- [装箱类型](http://t.zoukankan.com/goloving-p-14442541.html)：Object、Boolean、Number、String、Symbol。
- [拆箱类型](http://t.zoukankan.com/goloving-p-14442541.html)：object、boolean、number、string、symbol。
::: warning object、Object 以及 { }
- 在任何时候都不要，不要，不要使用 `Object` 以及类似的装箱类型。
- 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 `object`。但更推荐进一步区分，也就是使用 `Record< string, unknown>` 或 `Record< string, any>` 表示对象，`unknown[]` 或` any[]` 表示数组，`(...args: any[]) => any`表示函数这样。
- 我们同样要避免使用`{}`。`{}`意味着任何非 null / undefined 的值，从这个层面上看，使用它和使用 `any` 一样恶劣。
:::
#### 字面量类型的类型标注
```ts
const str: "feifei" = "feifei";
const num: 599 = 599;
const bool: true = true;
```
#### 联合类型的类型标注
```ts
/* 基本 */
type lianhe = string | number | boolean;
/* 联合类型 + 字面量类型 */
interface Res {
  code: 10000 | 10001 | 50000;
  status: "success" | "failure";
  data: any;
}
//这个时候，我们就能在访问时获得精确地类型推导了。
declare var res: Res;
if(res.status === '') //success failure
```
::: tip declare
对于 `declare var res: Res`，你可以认为它其实就是快速生成一个符合指定类型，但没有实际值的变量，同时它也不存在于运行时中。
因此 `res` 是一个类型而不是变量，直接访问会提示`undefined`。
:::
#### 枚举类型的类型标注
```ts
enum PageUrl {
  Home_Page_Url = "url1",
  Setting_Page_Url = "url2",
  Share_Page_Url = "url3",
}
const home = PageUrl.Home_Page_Url; //url1
//如果你没有声明枚举的值，它会默认使用数字枚举，并且从 0 开始，以 1 递增：
enum Items {
  Foo, // 0
  Bar, // 1
  Baz //2
} //在这个例子中，Items.Foo , Items.Bar , Items.Baz的值依次是 0，1，2 。
```
#### 函数的类型标注
```ts
function foo(name: string): number { return name.length; }
//我们也可以像对变量进行类型标注那样，对 foo 这个变量进行类型声明：
//函数类型声明混合箭头函数声明时，代码的可读性会非常差。因此，一般不推荐这么使用
const foo: (name: string) => number = function (name) { return name.length; }
type FuncFoo = (name: string) => number;
const foo: FuncFoo = number => { return number.length; }
```
::: tip void 与 undefined
在 TypeScript 中，undefined 类型是一个实际的、有意义的类型值，而 void 才代表着空的、没有意义的类型值。相比之下，void 类型就像是 JavaScript 中的 null 一样。因此在我们没有实际返回值时，使用 void 类型能更好地说明这个函数没有进行返回操作。
:::
#### class 的类型标注
一个函数的主要结构即是参数、逻辑和返回值，对于逻辑的类型标注其实就是对普通代码的标注，所以我们只介绍了对参数以及返回值地类型标注。而到了 Class 中其实也一样，它的主要结构只有构造函数、属性、方法和访问符（Accessor），我们也只需要关注这三个部分即可。
- 修饰符 \
在 TypeScript 中我们能够为 Class 成员添加这些修饰符：public / private / protected / readonly。除 readonly 以外，其他三位都属于访问性修饰符，而 readonly 属于操作性修饰符（就和 interface 中的 readonly 意义一致）。
- 静态成员 \
在 TypeScript 中，你可以使用 static 关键字来标识一个成员为静态成员：
```ts
class Foo {
  private prop: string;
  static staticHandler() { }
  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  protected print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }

  public get propA(): string {
    return `${this.prop}+A`;
  }

  public set propA(value: string) {
    this.propA = `${value}+A`
  }
}
```
::: tip 修饰符
- public：此类成员在类、类的实例、子类中都能被访问。
- private：此类成员仅能在类的内部被访问。
- protected：此类成员仅能在类与子类中被访问，你可以将类和类的实例当成两种概念，即一旦实例化完毕（出厂零件），那就和类（工厂）没关系了，即不允许再访问受保护的成员。
:::
#### 内置类型：any 、unknown 与 never
```ts
log(message?: any, ...optionalParams: any[]): void
// any
let foo;
// foo、bar 均为 any
function func(foo, bar){}
//以上的函数声明在 tsconfig 中启用了 noImplicitAny 时会报错，你可以显式为这两个参数指定 any 类型，或者暂时关闭这一配置（不推荐）。
```
::: tip unknown 、any 和 never 的区别
- any：我身化万千无处不在
- unknown：我虽然身化万千，但我坚信我在未来的某一刻会得到一个确定的类型
- never：什么都没有，never类型不携带任何的类型信息
:::
#### 类型断言
类型断言能够显式告知类型检查程序当前这个变量的类型，可以进行类型分析地修正、类型。它其实就是一个将变量的已有类型更改为新指定类型的操作，它的基本语法是 as NewType
```ts
// 你可以将 any / unknown 类型断言到一个具体的类型：
let unknownVar: unknown;
(unknownVar as { foo: () => {} }).foo();
// 还可以 as 到 any 来为所欲为，跳过所有的类型检查：
const str: string = "feifei";
(str as any).func().foo().prop;
// 也可以在联合类型中断言一个具体的分支：
function foo(union: string | number) {
  if ((union as string).includes("feifei")) { }
  if ((union as number).toFixed() === '599') { }
}
```
- 双重断言
```ts
const str: string = "feifei";
(str as unknown as { handler: () => {} }).handler();
// 使用尖括号断言
(<{ handler: () => {} }>(<unknown>str)).handler();
```
## _2. 类型工具_
<!-- ## 2. 类型工具 -->
### 类型创建
类型工具 | 类型工具 | 常见搭配
-|-|-
类型别名（Type Alias） | 将一组类型/类型结构封装，作为一个新的类型 | 联合类型、映射类型
工具类型（Tool Type） | 在类型别名的基础上，基于泛型去动态创建新类型 | 基本所有类型工具
联合类型（Union Type） | 创建一组类型集合，满足其中一个类型即满足这个联合类型(II) | 类型别名、工具类型
交叉类型（Intersection Type） | 创建一组类型集合，满足其中所有类型才满足映射联合类型（&&） | 类型别名、工具类型
索引签名类型（Index Signature Type） | 声明一个拥有任意属性，键值类型一致的接口结构 | 映射类型
索引类型查询（Indexed Type Query） | 从一个接口结构，创建一个由其键名字符串字面量组成的联合类型 | 映射类型
索引类型访问（Indexed Access Type） | 从一个接口结构，使用键名字符串字面量访问到对应的键值类型 | 类型别名、映射类型
映射类型 （Mapping Type） | 从一个联合类型依次映射到其内部的每一个类型 | 工具类型
::: tip 类型工具 和 工具类型
- 类型工具：在 Typescript 中内置类型实际上是最基础的“积木”。那想要利用好这些“积木”，我们还需要一些实用的类型工具。它们就像是锤子、锯子和斧子，有了它们的帮助，我们甚至可以拼装出摩天大楼！（即以上表格中包括从类型别名到映射类型的这些都属于类型工具）。
- 工具类型：在类型别名中，类型别名可以这么声明自己能够接受泛型（称之为泛型坑位）。一旦接受了泛型，我们就叫它工具类型：虽然现在类型别名摇身一变成了工具类型，但它的基本功能仍然是创建类型，只不过工具类型能够接受泛型参数，实现更灵活的类型创建功能。从这个角度看，工具类型就像一个函数一样，泛型是入参，内部逻辑基于入参进行某些操作，再返回一个新的类型。
:::
### 类型安全保护
#### 类型查询操作符：熟悉又陌生的 typeof
在 TypeScript 中用于类型查询的 typeof ，即 Type Query Operator，这个 typeof 返回的是一个 TypeScript 类型：
```ts
const str = "feifei";
const obj = { name: "feifei" };
const nullVar = null;
const undefinedVar = undefined;
const func = (input: string) => { return input.length > 10; }

type Str = typeof str; // "feifei"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean
```
#### 类型守卫
为了解决类型控制流分析的能力不足， TypeScript 引入了 is 关键字来显式地提供类型信息：
```ts
function isString(input: unknown): input is string {
  return typeof input === "string";
}
function foo(input: string | number) {
  if (isString(input)) {
    // 正确了
    (input).replace("linbudu", "linbudu599")
  }
  if (typeof input === 'number') { }
  // ...
```
isString 函数称为类型守卫，在它的返回值中，我们不再使用 boolean 作为类型标注，而是使用 input is string 这么个奇怪的搭配，拆开来看它是这样的：
- input 函数的某个参数；
- is string，即 is 关键字 + 预期类型，即如果这个函数成功返回为 true，那么 is 关键字前这个入参的类型，就会被这个类型守卫调用方后续的类型控制流分析收集到。
#### 基于 in 与 instanceof 的类型保护
in 操作符 并不是 TypeScript 中新增的概念，而是 JavaScript 中已有的部分，它可以通过 key in object 的方式来判断 key 是否存在于 object 或其原型链上（返回 true 说明存在）。
```ts
interface Foo {
  foo: string;
  fooOnly: boolean;
  shared: number;
}

interface Bar {
  bar: string;
  barOnly: boolean;
  shared: number;
}

function handle(input: Foo | Bar) {
  if ('foo' in input) {
    input.fooOnly;
  } else {
    input.barOnly;
  }
}
```
#### 类型断言守卫
```ts
import assert from 'assert';
let name: any = 'linbudu';
assert(typeof name === 'number');
// number 类型
name.toFixed();
```
TypeScript 3.7 版本专门引入了 asserts 关键字来进行断言场景下的类型守卫，比如前面 assert 方法的签名可以是这样的：
```ts
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}
```
### 泛型
#### 类型别名中的泛型
```ts
type Factory<T> = T | number | string;
// 上面这个类型别名的本质就是一个函数，T 就是它的变量，返回值则是一个包含 T 的联合类型，我们可以写段伪代码来加深一下记忆：
function Factory(typeArg){
  return [typeArg, number, string]
}
```
#### 泛型约束与默认值
像函数可以声明一个参数的默认值一样，泛型同样有着默认值的设定，比如：
```ts
type Factory<T = boolean> = T | number | string;
// 这样在你调用时就可以不带任何参数了，默认会使用我们声明的默认值来填充。
const foo: Factory = false;
```


## _3. 类型系统_
### 结构化类型系统
### 标称类型系统
### 类型系统层级
### 类型逻辑运算
### 上下文类型
### 函数类型
<!-- ## 4. 类型编程 -->
## _4. 类型编程_
### 工具类型的分类
- 属性工具类型
- 结构工具类型
- 集合工具类型
- 模式匹配工具类型
- 模板字符串工具类型


