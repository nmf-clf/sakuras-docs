# Learn Next.js

<!-- ![]('./imgs/nextjs-mind.png') -->
<img src="./imgs/nextjs-mind.png"/>

欢迎来到 Next.js 应用路由教程！在这个免费的`interactive(交互式)`课程里，你将通过构建一个全栈的 web 应用程序来学习 Next.js 的核心特性。

我们将要构建的东西：

![](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fdashboard.png&w=1920&q=75)

在这个课程，我们将构建一个简易版本的`financial(财务)仪表盘`，包括：

-   一个公共的 home 页面
-   一个登录页面
-   受身份验证保护的仪表盘页面
-   让用户新增，编辑，删除发票的功能

仪表板还将附带一个数据库，您将在后面的章节中设置该数据库。

在课程结束时，您将拥有开始构建全栈 Next.js 应用程序所需的基本技能。

### 概述

以下是你将在本课程里学到的功能概述：

-   **Styling**: 在 Next.js 中设计应用程序样式的不同方法。
-   **Optimizations**: 如何优化 images、links、fonts。
-   **Routing**：如何使用文件系统路由创建`nested(嵌套的)`布局和页面。
-   **Data fetching**: 如何在 Vercel 上数据库，以及 fetching 获取 和 streaming 流式传输 的最佳实践。
-   **Search and Pagination**: 如何使用 URL Search Params 实现搜索和分页功能。
-   **Mutating Data**: 如何使用 React Server Actions 改变数据并且重新验证 Next.js 缓存。
-   **Error Handling**: 如何处理`general(一般的、普遍的、大致的)`和 `404` not fount 错误。
-   **Form Validation and Accessibility**：如何进行服务器端表单校验和改进可访问性的技巧。
-   **Authentication**: 如何使用 [NextAuth.js](https://next-auth.js.org/) 和中间件为你的应用程序添加用户验证。
-   **Metadata**：如何添加元数据并为社交分享准备应用程序。

### `Prerequisite(预备)`知识

本课程假设您对 React 和 JavaScript 有基本的了解。如果你是 React 的新手，我们建议你先通过我们的 [React 基础](https://nextjs.org/learn/react-foundations) 课程来学习 React 的基础知识，比如组件、道具、状态和钩子，以及更新的功能，比如服务器组件和 Suspense。

#### 系统要求

再开始这门课程之前，确保你的系统满足以下要求：

-   Node.js 18.17.0 及以上版本安装。[下载在这里](https://nodejs.org/en)。
-   此外，你还需要一个 [GitHub 账户](https://github.com/) 和一个 [Vercel 账户](https://vercel.com/signup)。

#### 加入讨论

如果你有关于本课程的问题或者想要提供`feedback(反馈)`，你可以在 [Discord](https://discord.com/invite/Q3AsD4efFC) 或 [GitHub](https://github.com/) 上询问我们的社区。


## 1. 开始

## 2. CSS 样式

## 3. 优化字体和图片

## 4. 创建布局和页面

## 5. 在页面间跳转

## 6. 设置数据库

## 7. 获取数据

```js
import { sql } from "@vercel/postgres"; // 核心
```

依次获取，或者同步获取
Q: 1. 教程里 Promise.all() or Promise.allSettled() 区别，为什么我通过在 promise 里使用 return 方式，.all 失败一个对其他没影响

## 8. 静态和动态渲染

上一章节中的问题：

> 1. 数据请求正在无意中形成瀑布
> 2. 仪表盘是静态的，因此任何数据更新都不会反应到应用上

这一章节中，将要讨论：

> 1. 什么是静态渲染，以及它如何提高你的应用性能？
> 2. 什么是动态渲染，以及什么时候使用它？
> 3. 使仪表盘动态的不同方法
> 4. 模拟缓慢的数据获取，看看会发生什么？

### 什么是静态渲染？

通过静态渲染，数据获取和渲染在构建(部署)时或者`重新验证(revalidation)`期间，在服务器上进行，<br>
然后可以将结果在`内容分发网络(Content Delivery Network：CDN)` 上 `分布(distributed)` 和缓存。

每当用户访问你的应用时，缓存结果被提供。静态渲染`有几个(a couple of)`好处：

1. 更快的网站 - 预渲染内容可以被缓存并且全局分发。这确保了世界上的用户可以更快速、更可靠地访问您网站的内容。
2. `Reduced(降低)`服务器负载 - 因为内容被缓存了，你的服务不必为了每个用户请求动态地生成内容。
3. SEO - 预渲染内容更容易被搜索引擎`crawlers（爬虫）`编入索引，因为在页面加载时内容已经是`available（可用的)`，这可以`lead to(有助于)`提高搜索引擎`rankings(排名)`

静态渲染对于无数据 UI 或者数据是在用户之间分享的是有用的，例如静态博客、海报或者产品页，它可能并不适合对于定期更新的个性化数据的仪表盘。

与静态渲染`opposite(相反的)`则是动态渲染：

### 什么是动态渲染？

通过动态渲染，每当用户在请求时(当用户访问页面的时候)，内容会被服务器渲染。动态渲染有几个好处：

1. `Real-Time(即时)` Data - 动态渲染允许你展示实时或者`frequently updated(经常更新的)`数据，这对于数据经常变更的应用来说是理想的。
2. 用户特定内容 - 提供个性化内容更简单，比如仪表盘或用户配置，并且根据用户`interaction(互动)`更新数据
3. 请求时信息 - 动态渲染允许您访问您只有在请求时才能知道的信息，例如 cookies、URL 查询参数

### 创建动态的仪表盘

默认情况下，`@vercel/postgres` 不会设置它自己的缓存`semantics(语义)`。这允许框架设置它自己的静态和动态行为。

你可以在你的服务器组件里或者数据获取函数里使用 Next.js API `unstable_noStore` 来`opt out of(选择退出)`静态渲染。

在你的`data.ts`里，从 `next/cache` 导入 `unstable_noStore`，并将其称为数据获取函数的顶部：

```js
import { unstable_noStore as noStore } from "next/cache";

export async function fetchLatestInvoices() {
    noStore(); // 加上此函数尚不清楚怎么证明效果
    // ...
}
```

> 注意：`unstable_noStore` 是一个`experimental(实验性的)` API，未来它可能会改变。如果你更喜欢在你的项目里使用稳定的 API，你依然可以使用[Segment Config Option](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) `export const dynamic = "force-dynamic"`。

### 模拟缓慢的数据获取

创建动态仪表盘是很好的第一步。然而，这还有一个在上一章节中我们提及过的问题。<br>
如果一个数据请求比其他所有的请求都慢会发生什么？

让我们模拟一个慢的数据获取。在你的`data.ts` 文件，取消在`fetchRevenue()`里的`console.log`和`setTimeout`注释：

现在在一个新的窗口打开[http://localhost:3000/dashboard](http://localhost:3000/dashboard/)，并且注意页面用了多久才能加载出来。在你的终端，你应该也会看到以下的信息：

```cmd
Fetching revenue data...
Data fetch completed after 3 seconds.
```

这里，你已经添加了一个`artificial(人为的)`3 秒的延迟去模拟缓慢数据加载。结果就是当数据正在获取的时候你的整个页面都`blocked(被阻塞的)`。`

这带给了我们开发人员必须要解决的一个共同的挑战`(Which brings us to a common challenge (that) developers have to solve)`

使用动态渲染，你的应用程序的速度取决于你的最慢的数据的获取速度`(your application is only as fast as your slowest data fetch)`

下一章将学习如何通过添加流提高你的用户体验

## 9. Streaming 流

在上一章节，你动态的创建了你的仪表盘页面，然而，我们讨论了数据获取缓慢会如何影响你的应用的性能。让我们看一下当数据获取缓慢时，你可以如何提高你的用户体验。

在这一章节中，以下是我们要讨论的话题。

> 1. 什么是 `streaming(流)` 并且你应该什么时候使用它？
> 2. 如何通过 `loading.tsx` 和 `Suspense` `implement(实现)` 流式加载
> 3. 什么是`加载骨架(loading skeletons)`
> 4. 什么是`路由组(route groups)`，并且你应该什么时候使用它？
> 5. 在应用程序中如何放置 `Suspense boundaries(Suspense 边界)`

### 什么是 Streaming ？

Streaming 流是一种数据传输`technique(技术)`，它允许您将路由`break down(分解)`为更小的“块”，并在它们准备好时逐步将它们从服务器流式传输到客户端。

通过 Streaming，你可以避免缓慢数据请求阻塞你的整个页面。这允许用户查看页面的部分内容并与之交互，而无需等待所有数据加载完毕，然后才能向用户显示任何 UI

Streaming 与 React's 组件模块配合的很好，因为每个组件都可以被视为一个 chunk 块。

这儿有两种你在 Next.js 实现 streaming 的方式：

> 1. 在页面级别，使用 `loading.tsx` 文件
> 2. 对于特殊的组件，使用 `<Suspense>`

让我们看看它是如何工作的。

### Streaming a whole page with loading.tsx （使用 Streaming 流式传输整个页面）

在`/app/dashboard`文件夹里，创建一个`loading.tsx`文件。

```tsx
export default function Loading() {
    return <div>Loading...</div>;
}
```

刷新`http://localhost:3000/dashboard`，并且你会看到页面有个加载中

这里正在发生一些事情：

1. `loading.tsx` 是一个建立在 Suspense 之上的特殊的 Next.js 文件，它允许你创建备用 UI，以便当页面内容加载的时候作为替换去展示。
2. 因为`<SideNav>`是静态的，因此会立即显示。当动态内容正在加载的时候用户可以与`<SideNav>`互动。
3. 用户无需在导航之前等待页面加载完毕（这被称为`interruptable(可中断)`导航）。

恭喜！你刚才实现了 streaming。但是对于提升用户体验我们还可以做的更多。让我们展示一个加载中骨架，而不是 `Loading...` 文本。

### 创建一个加载中骨架

加载骨架是 UI 的简化版。许多网站使用它们作为占位（或备用），以此来指示用户内容正在加载。任何你在`loading.tsx`里`embed(嵌入)`的 UI，都将作为静态文件的一部分被嵌入，并首先发送。接着，动态渲染的剩余部分，将会被流式的从服务端传送到客户端。

在你的`loading.tsx`文件里，导入一个名为`<DashboardSkeleton>`的新组件：

```ts
import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
    return <DashboardSkeleton />;
}
```

然后，刷新[http://localhost:3000/dashboard](http://localhost:3000/dashboard)，并且你现在会看到骨架屏：

### 修复用路由组加载骨架的 bug

现在，你的加载骨架将很好地适用于发票和用户页面。

由于在文件系统里`loading.tsx`比`/invoices/page.tsx`和`/customers/page.tsx`的级别更高，它也被适用于其他页面，这就是 bug 的原因（当你切换到其他页面时也会看到骨架）。

我们可以用 Route Groups 来改变这一点。在仪表盘文件夹里创建一个名为`/(overview)`的新文件夹。然后，把你的`loading.tsx`和`page.tsx`文件移动到文件夹里。

现在，`loading.tsx`将只适用于仪表盘 overview 页面。

路由组允许你将文件组织到逻辑组里，而不会影响 URL 路径结构。当你使用`parenteses圆括号` `()`创建一个新的文件夹，名称将不会被包含在路由组里。所以`/dashboard/(overview)` 将会变成`/dashboard`

> 有个问题，为什么目录名是`(overview)` 或者其他的名称都可以被作为跟页面被访问到？
> 这里测试发现只要是通过双圆括号括起来的，都算是当前文件夹的跟路由

在这，你正在使用路由组来确保`loading.tsx`只适用于仪表盘 overview 页面。然而，你也可以使用路由组将你的应用程序`separate(分成)`几个部分(例如(营销)路由和(商店)路由)，或者在更大的应用程序中按团队划分

### 流式传输组件 Streaming a component

`so far(到目前为止)`，你正在流式传输整个页面。但是，除此之外，你可以更细致些，使用 `React Suspense` 流式传输特定组件。

Suspense 允许你`defer(延迟)`渲染你应用的一部分，直到一些条件被`met(满足)`，(例如 e.g. 被加载)。你可以使用 Suspense 包裹你的动态组件，
然后，给它传递一个备用组件，当动态组件在加载的时候显示。

如果你记得缓慢数据请求，`fetchRevenue()`，这是一个减缓整个页面速度的请求。为了不阻塞你的页面，你可以使用 Suspense 来只流式的加载这个组件，并且立即展示页面剩余部分的 UI。

为了做到这一点，你将需要数据获取移动到到组件里，让我们更新代码，看看会是什么样子：

删除`/dashboard/(overview)/page.tsx`中 `fetchRevenue()` 及其数据的所有实例：

然后，`import { Suspense } from 'react';`，并且用它包裹`<RevenueChart />`。你可以给它传递一个名为`<RevenueChartSkeleton>`的备用组件。

最后，更新`<RevenueChart>`组件来获取它自己的数据，并删除传递给它的 prop:

现在刷新页面，你应该立即看到仪表板信息，同时显示`<RevenueChart>`的备胎骨架:

### 练习：流式传输`<LatestInvoices>`

现在轮到你了！通过流式的传输`<LatestInvoices>`练习刚才你所学的。

将`fetchLatestInvoices()`从页面向下移动到`<LatestInvoices>`组件。用一个名为`<LatestInvoicesSkeleton>`的回退将组件包裹在 Suspense 边界中。

一旦你准备好了，`expand(扩展)` `toggle(开关)`以查看解决方案代码:

### 分组组件 Grouping components

太棒了！你就快成功了。现在你需要把`<Card>`组件包裹在`Suspense`里，你可以为每个`individual(单独的)`卡获取资源，但这可能会导致卡片加载时`popping effect(弹出效果)`，这可能会给用户带来视觉上的不和谐。

所以，你将怎么`tackle(解决)`这个问题？

为了创建更多`staggerea(错列的、交错的)`效果，你可以使用包裹组件给卡片进行`group(分组)`，这意味着静态的`<SideNav>`将被首先展示，然后是卡片，等等

在你的`page.tsx`文件：

1. 删除你的`<Card>`组件
2. 删除`fetchCardData()`函数
3. 导入一个名为`<CardWrapper />`新的包裹组件
4. 导入一个名为`<CardsSkeleton />`新的包裹组件
5. 把`<CardWrapper />`包裹在 Suspense 里

然后，进入文件`/app/ui/dashboard/cards.tsx`，导入`fetchCardData()`函数，并在`<CardWrapper/>`组件中调用它。确保取消该组件中所有必要代码的注释。

刷新页面，您应该会看到所有卡片同时加载。当您希望同时加载多个组件时，可以使用此模式。

### 决定设置 Suspense 的`boundaries(界限)` 在哪？

Suspense 界限的设置取决于以下几点:

1. 你想要用户体验何种流式页面
2. 你想要`prioritize(优先考虑)`哪些内容
3. 组件是否依赖于数据获取

看看你的仪表盘页面，有没有什么是你会做得不同的?

不要担心，没有正确答案。

-   你可以像使用`loading.tsx`一样流式加载整个页面... 但是如果一个组件有一个很缓慢的数据获取，那将会导致一个很长的等待时间。
-   你可以单独的流式加载每个组件...但这可能会导致 UI 在准备就绪时`popping(弹出)`屏幕。（我理解是那种一个一个弹出来的感觉）
-   你还可以通过流式传输`page sections(页面部分)`来创建交错效果，但是你需要创建包裹组件。

将在何处设置 Suspense 边界将取决你的应用程序，通常情况下，把你的数据获取移入到需要它的组件是一个好办法，并且将那些组件用 Suspense 包裹。但是如果你的应用程序需要，流式传输页面部分或者整个页面也没什么错。

不要害怕体验 Suspense，并且看看那种效果最好，它是一个强大的 API，可以帮你创造更加`delightful(愉快的)`用户体验。

### 展望未来

流式加载和服务器组件给我们提供了处理数据获取和加载状态的新方式，`ultimately with the goal of(最终的目标)`是提升终端用户体验。

在下一章中，你将会学习关于`Partial Prerendering(局部预渲染)`，这是 Next.js 构建的一种新的渲染模型，`with streaming in mind(考虑了流式传输的需求)`

## 10. 部分与预渲染（Partial Prerendering）(Optional)

局部预渲染是一个在 Next.js14 中`introduced(引入)`的实验性`feature(特性)`，此页面的内容可能会随着特性稳定性的提高而更新。你也许想要跳过这个章节，如果你不喜欢使用实验性特性。本章不是完成本课程的必要部分。

在这一章中，我们将讨论以下课题：

> 1. 什么是局部预渲染
> 2. 局部预渲染是如何工作的

### 结合静态和动态内容

目前，如果你在你的路由中`call(调用)`一个动态函数(例如 noStore()， cookies()等)，你的整个路由就会变成动态的。

这是当今大多数 web 应用 的构建方式。你要么为你的整个应用程序选择静态渲染或动态渲染，要么为特定路由选择。

然而，大部分 web 应用并不是完全静态或动态的。你也许有一个路由静态和动态内容都有。例如，考虑一个`ecommerce(电子商务)`网站。
您可能能够呈现产品页面的大部分内容，但是，您可能希望`on-demand(根据需要)`动态获取用户的购物车和推荐产品。

回到你的仪表盘页面，你认为哪些页面会是静态的或是动态的？

一旦你准备好了，点击下面的按钮看下我们将如何分割仪表盘路由：

-   `<SideNav>`组件并不依赖数据，并且对于用户也不是个性化的，所以它可以是静态的。
-   `<Page>`里的组件依赖于经常变化的数据，并且将对用户进行个性化处理，所以它们可以是动态的。

### 什么是局部预渲染？

Next.js14 包含了局部预渲染的预览 - 这是一个实验性的特性，它允许你用静态加载 shell 来渲染路由，同时保持一些部分是动态的。
`in other words(换句话说)`，你可以`isolate(隔离)`路由的动态部分，例如：

当用户访问一个路由时：

-   提供静态 shell，确保快速的初始化加载。
-   shell 留下了一些`holes(洞/孔)`，动态内容将`in asynchronous(以异步方式)`加载。
-   异步的 holes 是`streamed in parallel(并行流)`，减少了页面总体加载时间。

这与你今天的应用程序的行为不同，在今天的应用程序中，整个路由要么完全是静态的，要么是动态的。

`Partial Prerendering combines ultra-quick static edge delivery with fully dynamic capabilities(局部预渲染结合了超快速的静态边缘分发与完全动态的能力)`，并且我们相信它有`potential(潜力)`成为 web 应用程序的默认渲染模型，将静态站点生成和动态交付的最佳特性结合起来。

### 局部预渲染是如何工作的？

局部预渲染利用`React's Concurrent APIs`，并使用`Suspense`来延迟渲染部分应用程序，直到满足某些条件(例如，数据被加载)。

备用组件与其他静态内容一起嵌入到初始静态文件中。在构建时(或在重新验证期间)，路由的静态部分被预呈现，其余部分`is postponed(被延迟)`，直到用户请求路由。

`It's worth noting(值得注意的是)`，在`Suspense`中包装组件并不会使组件本身成为动态的(记住，你使用了 unstable_noStore 来实现这种行为)，而是将`Suspense`用作路由的静态部分和动态部分之间的边界。

局部预渲染的好处在于，您不需要更改代码就可以使用它。只要你使用悬念来包装路由的动态部分，Next.js 就会知道路由的哪些部分是静态的，哪些是动态的。

> 注意:要了解有关如何配置局部预渲染的更多信息，请参阅 [局部预渲染(实验)文档](https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering) 或[尝试局部预渲染模板和演示](https://vercel.com/templates/next.js/partial-prerendering-nextjs)。需要注意的是，这个特性是实验性的，还没有为生产部署做好准备。

### 总结

`To recap(回顾一下)`，你已经做了一些事情来优化你的应用程序中的数据获取，你做了:

1. 在与应用程序代码相同的区域中创建数据库，以减少服务器和数据库之间的延迟。
2. 使用 React server Components 在服务器上获取数据。这允许您将昂贵的数据获取和逻辑保留在服务器上，减少客户端 JavaScript 包，并防止将数据库机密暴露给客户端。
3. 使用 SQL 只获取所需的数据，减少了每个请求传输的数据量和在内存中转换数据所需的 JavaScript 量。
4. 用 JavaScript `Parallelize(并行化)`数据获取——这样做是`sense(有意义的)`。
5. `Implemented(实现)`流式传输，以防止缓慢的数据请求阻塞整个页面，并允许用户开始与 UI 交互，而无需等待所有内容加载。
6. 将数据获取移到需要它的组件，`thus isolating(从而隔离)`路由的哪些部分应该是动态的，以便为部分预呈现`in preparation(做准备)`

在下一章中，我们将介绍在获取数据时可能需要实现的两种常见模式: 搜索和分页。

## 11. 添加搜索和分页

在上一章中，您使用了 Streaming 提升了仪表盘初始加载性能，现在，让我们转到`/invoices`页面，并且学习如何添加搜索和分页。

在这一章中，我们将讨论以下课题：

-   学习如何使用 Next.js APIs: `searchParams`、`usePathname`、and`useRouter`
-   使用 URL search params 实现搜索和分页

### 启动代码

在你的`/dashboard/invoices/page.tsx`文件，复制以下代码：

```tsx
import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page() {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense> */}
            <div className="mt-5 flex w-full justify-center">{/* <Pagination totalPages={totalPages} /> */}</div>
        </div>
    );
}
```

花些时间熟悉你将要使用的页面和组件:

1. `<Search/>`允许用户搜索特定的发票
2. `<Pagination/>`允许用户在发票页面间导航
3. `<Table/>`显示发票数据

你的搜索`funcitonality(功能)`将`span(跨越)`客户端和服务器。当用户在客户端搜索发票，URL 参数将会被更新，数据将在服务器获取，表格会在服务器上重新渲染新数据

### 为什么要使用 URL 搜索参数

如上所述，您将使用 URL 搜索参数来管理搜索状态。如果您习惯于使用客户端状态，那么这种模式可能是新的。

使用 URL 参数实现搜索有几个好处:

-   `Bookmarkable and Shareable URLs(书签和共享URLs)`：由于搜索参数在 URL 中，用户可以将应用程序的当前状态(包括他们的搜索查询和过滤器)收藏为书签，以便将来参考或共享
-   `Server-Side Rendering and Initial Load(服务端呈现和初始加载)`：URL 参数可以直接在服务器上使用，以渲染初始状态，从而更容易处理服务器渲染
-   `Analytics and Tracking(分析和跟踪)`：在 URL 中直接使用搜索查询和过滤器可以更容易地跟踪用户行为，而不需要额外的客户端逻辑

### 添加搜素功能

这些是你将用来实现搜索功能的 Next.js 客户端钩子:

-   `useSearchParams` - 允许您访问当前 URL 的参数。例如，`/dashboard/invoices?page=1&query=pending`搜索参数是什么？应该是这样的: `{page: '1', query: 'pending'}`。
-   `usePathname`：让你读取当前 URL 的路径名。例如，`/dashboard/invoices`，`usePathname`将返回`/dashboard/invoices`。
-   `useRouter`：以`programmatically(编程方式)`在客户端组件中的路由之间进行导航。您可以使用[多种方法](https://nextjs.org/docs/app/api-reference/functions/use-router#userouter)。

以下是对实现步骤的快速概述：

1. `Capture(捕获)`用户的输入
2. 使用搜索参数更新 URL
3. 保持 URL 与输入字段同步
4. 更新表格已反映搜索查询

#### 1. 捕获用户的输入

进入`<Search>`组件`(/app/ui/search.tsx)`，并且你将注意到：

-   `use client` - 这是一个客户端组件，这意味着你可以使用事件监听器和钩子
-   `<input>` - 这是搜索输入框

创建一个新的`handleSearch`函数，并且在`<input>`中添加一个`onChange`事件监听器，当输入值发生变化时，`onChange`将调用`handleSearch`。

通过在开发人员工具中打开控制台来测试它是否正常工作，然后在搜索字段中键入。您应该看到搜索词被记录到控制台中。

太棒了!您正在捕获用户的搜索输入。现在，您需要用搜索词更新 URL。

#### 2. 使用搜索参数更新 URL

从`next/navigation`导入`useSearchParams`钩子，并且将其`assign(赋值)`给一个`variable(变量)`：

```tsx
"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

export default function Search() {
    const searchParams = useSearchParams();

    function handleSearch(term: string) {
        console.log(term);
    }
    // ...
}
```

在`handleSearch`里，使用你刚创建的`searchParams`变量，创建一个新的[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)实例

```tsx
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
  }
  // ...
}
`
```

`URLSearchParams`是一个 Web API,它提供了用于`manipulating(操作)` URL 查询参数的`utility(实用)`方法。你可以使用它来获取参数字符串，而不是创建`complex(复杂的)`字符串`literal(字面值)`，例如?page=1&query=a。

接下来，根据用户的输入`设置`参数字符串。如果输入为空，则需要`删除`它:

现在你有了参数字符串，你可以使用 Next.js 的`useRouter`和`usePathname`钩子去更新 URL。

从`'next/navigation'`中导入`useRouter`和`usePathname`，并在`handleSearch`中使用`useRouter()`中的`replace`方法:

```tsx
"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }
}
```

这是对正在发生的的事情的分析：

-   `${pathname}` 是当前路径，在你的例子中（in your case），是`/dashboard/invoices`。
-   当用户在搜索栏中输入时，`params.toString()`将此输入转换为 url 友好的格式。
-   `replace(${pathname}?${params.toString()})` 通过用户的输入数据更新了 URL，例如，`/dashboard/invoices?query=lee` 如果用户的搜索是`Lee`
-   URL 的更新不需要重新加载页面，感谢 Next.js 的客户端导航（在页面间导航章节中你所学到的）

#### 3. 保持 URL 与输入字段同步

为了确保输入字段与 URL 同步，并在共享时填充，你可以通过从`searchParams`中读取`defaultValue`来传递输入:

```tsx
<input
    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
    placeholder={placeholder}
    onChange={(e) => {
        handleSearch(e.target.value);
    }}
    defaultValue={searchParams.get("query")?.toString()}
/>
```

> defaultValue vs. value / Controlled vs. Uncontrolled \
> 如果您使用 state 来管理输入的值，那么您将使用 `value` 属性使其成为受控组件。这意味着 React 将管理输入的状态。 \
> 但是，由于没有使用 state，所以可以使用 `defaultValue`。这意味着 native 将管理自己的状态。这是可以的，因为您将搜索查询保存到 URL 而不是状态。

#### 4. 更新表格

最后，需要更新表组件以反映搜索查询。

导航回发票页面。

页面组件[接收一个`prop`](https://nextjs.org/docs/app/api-reference/file-conventions/page) ，名为`searchParams`，所以你可以把当前的 URL 参数传递给`<Table>`组件。

```jsx
import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        page?: string,
    },
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">{/* <Pagination totalPages={totalPages} /> */}</div>
        </div>
    );
}
```

如果你导航到`<Table>`组件，你将看到两个`props`，`query` 和 `currentPage`被传递给了`fetchFilteredInvoices()`函数，该函数返回查询匹配的发票。

```tsx
// /app/ui/invoices/table.tsx
export default async function InvoicesTable({ query, currentPage }: { query: string; currentPage: number }) {
    const invoices = await fetchFilteredInvoices(query, currentPage);
    // ...
}
```

这些更改就绪后，继续测试它。如果你搜索了一个搜索词，你将更新 URL，URL 将发送给服务器一个新的请求，数据将在服务器被获取，并且只返回匹配的发票

> _什么时候使用 `useSearchParams()` hook vs `searchParams` prop？_
> 你也许注意到了你使用了两个不同的方式`extract(提取)`查询参数。使用其中一种取决于您是在客户机上工作还是在服务器上工作
>
> -   `<Search>` 是一个客户端组件，因此使用了`useSearchParams()` hook 去访问参数。
> -   `<Table>` 是一个获取它自己数据的服务器组件，所以你可以在页面使用`searchParams` prop 传递给组件。

作为一般规则，如果你想要从客户端读取参数，请使用`useSearchParams()`hook，因为这样可以避免返回到服务器。

#### 最佳实践：防抖

祝贺你！你已经通过 Next.js 实现了搜索！但是你可以做一些事情来优化它。

在你的`handleSearch()`函数中，添加以下注释；

```jsx
// /app/ui/search.tsx
function handleSearch(term: string) {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
        params.set("query", term);
    } else {
        params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
}
```

然后在你的搜索框中输入`Emil`，并且检查开发工具的打印，发生了什么?

```
Searching... E
Searching... Em
Searching... Emi
Searching... Emil
```

你每一次按键都更新了 URL，`therefor(因此)`你的每一次按键都请求了数据库！
这不是问题因为我们的应用程序很小，但是想象一下如果你的应用程序有数千个用户，每次按键都会发送一个新的请求。

`Debouncing` 防抖是一种编程实践，它`limit(限制)`了函数`fire(触发)`的速度。在我们的课程中，你只想在用户已经停止输入的查询数据库。

> _防抖是如何工作的_
>
> 1. _Trigger Event_ 触发事件：当一个应该被防抖的事件(例如键盘的按键事件)触发时，一个定时器启动。
> 2. _Wait_ 等待：如果在定时器到期前，新的事件触发了，则重置定时器。
> 3. _Execution_ 执行：如果定时器达到了倒计时结束，防抖函数被执行。

你可以通过几种方式实现防抖，包括`manually(手动的)`创建你自己的防抖函数。为了保持事情简单，我们将使用`use-debounce`库。

安装`use-dobounce`：

> npm i use-debounce

在你的`<Search>`组件，导入`useBebouncedCallback`函数：

```tsx
// /app/ui/search.tsx
import { useDebouncedCallback } from "use-debounce";

// Inside the Search Component...
const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
        params.set("query", term);
    } else {
        params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
}, 300);
```

这个函数被`handleSearch`包裹，并且只会在用户停止输入的特定的时间之后去执行代码。

现在再一次输入你的搜索框，并且打开开发工具的 concole，你会看到以下

```
Searching... Emil
```

通过防抖，你可以减少发送到你的数据库的请求数量，因此节省资源。

### 添加分页

在介绍了搜索`feature(特征)`之后，你将注意到表格同时只展示了 6 条发票，这是因为`data.ts`里的`fetchFilteredInvoices()`函数每页只返回了最大 6 条发票。

添加分页允许用户浏览不同的页面以查看所有发票。让我们看看如何使用 URL 参数实现分页，就像使用搜索一样

导航到`<Pagination/>`组件，并且你将注意到它是个客户端组件。你不想在客户端获取数据，因为这可能会暴露你的数据库隐私（记住，你没有使用一个 API 层），相反，你可以在服务器上获取数据，并将其作为属性传递给组件。

在`/dashboard/invoices/page.tsx`，导入新函数`fetchInvoicesPages`，并且把从`searchParams`获取的`query`作为参数传递给它。

```tsx
// ...
import { fetchInvoicesPages } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string,
  },
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);

  return (
    // ...
  );
}
```

`fetchInvoicesPages`返回了根据查询参数的总页码，例如，如果有 12 条匹配查询数据的发票，并且每页只显示 6 条发票，那么总页数将会是 2。

然后，传递`totalPages`属性给`<Pagination />`组件。

```tsx
// /app/dashboard/invoices/page.tsx
export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchInvoicesPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
```

导航到`<Pagination />`组件并导入`usePathname`和`useSearchParams` hooks。 我们将使用它来获取当前页并且设置新页面。确保依旧取消了这个组件的注释。
你的应用程序将`temporarily(暂时地)`中断，因为你未实现`<Pagination />`逻辑，让我们现在开始吧。

```tsx
"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/app/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    // ...
}
```

然后，在`<pagination />`组件里创建一个`createPageURL`新函数。和搜索相似，你将使用`URLSearchParams`来设置一个新的页码，并使用`pathName`设置 URL 字符串。

```tsx
"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/app/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    // ...
}
```

以下是正在发生的事情：

-   `createPageURL` 创建了当前搜索参数的实例
-   然后，它将“page”参数更新为提供的页码。
-   最后，它使用路径名和更新的搜索参数构造完整的 URL。

`<Pagination>`组件的其余部分处理样式和不同的状态(first、last、active、disabled 等)。我们不会详细介绍这门课程，但可以随意查看代码，看看`createPageURL`在哪里被调用。

最后，当用户输入新的搜索查询时，你想要重置页码为 1，你可以在你的`<Search />组件`通过更新`handleSearch`函数做到：

```tsx
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
```

### 总结

祝贺你！你已经通过使用 URL 参数和 Next.js APIs 实现了搜索和查询。

总结一下，在本章中：

-   你已经通过 URL 搜索参数处理了搜索和分页，而不是通过客户端状态
-   你在服务器上获取了数据
-   你正在使用`useRouter`路由钩子，来实现`smoother(更平滑的)`客户端转换

这些模式与您在使用客户端 React 时可能使用的模式不同，但希望您现在能够更好地理解使用 URL 搜索参数并将此状态`lifting (提升)`到服务器的好处。

## 12. Mutating Data 改变数据

在上一章中，你使用 URL 搜索参数和 Next.js APIs 实现了搜索和分页。让我们添加处理发票页面，添加创建、更新和删除发票的功能！

在这一章中，以下是我们将讨论的话题：

-   什么是 React Server Actions 并且如何使用它们改变数据
-   如何使用 forms 和 Server Components
-   使用 native `formData` object 的最佳实践，包括类型校验
-   如何使用`revalidatePath` API 重新验证客户端缓存
-   如何使用特定的 IDs 创建动态路由`segments段`

### 什么是 Server Actions？

React Server Actions 允许你在服务器正确的运行异步代码，他们`eliminate(消除)`了创建 API 端点来改变数据的需要。
相反，编写异步函数，这些函数在服务器上执行，并且可以被客户端组件或服务器组件调用。

安全是 web 应用程序一个最重要的`priority(优先事项)`，因为他们`can be vulnerable to various threats(很容易受到各种威胁)`。
这就是 Server Actions 的作用。它们提供有效的安全解决方案，`protecting against(防范了)`不同类型的`acctack(攻击)`，保护您的数据，并确保授权访问。
Server Actions 通过 POST 请求、加密闭包、严格的输入检查、错误消息散列和主机限制等`techniques(技术)`来实现这一点，所有这些技术一起工作，` significantly(显著)``enhance(提高) `了应用程序的安全性。

### 通过 Server Actions 使用 forms

在 React 里，你可以在`<form>`元素里使用`action`属性去调用 actions,action 将自动的实现原生的 [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)对象，包括捕获数据。

例如：

```tsx
// Server Component
export default function Page() {
    // Action
    async function create(formData: FormData) {
        "use server";

        // Logic to mutate data...
    }

    // Invoke the action using the "action" attribute
    return <form action={create}>...</form>;
}
```

在服务器组件调用 Server Action 的一个优点是渐进式增强 - 即使在客户端上禁用了 JavaScript，表单也可以工作。

### Next.js with Server Actions

Server Actions 也与 Next.js 缓存深度`integrated(集成、融合)`，当一个表单通过 Server Action 提交时，你不仅可以通过 action 改变数据，你也可以使用`revalidatePath`和`revalidateTag`等 api 重新验证`associated(相关的)`缓存。

### 创建一个发票

以下是你将创建新发票的一些步骤

1. 创建一个 form 去捕获用户的输入
2. 创建一个 Server Action，并且在 form 中调用
3. 在你的 Server Action 里，从 `formData` 获取数据
4. 校验并`prepare(准备)`要插入到数据库中的数据
5. 插入数据并处理任何错误
6. 重新验证缓存并将用户重定向到发票页面

#### 1. 创建一个新的路由和表单

开始，在`/invoices`目录下创建一个新路由段，名为`/create`和一个`page.tsx`文件:

你将使用这个路由去创建新的发票，在你的`pages.tsx`文件，复制以下代码，然后花点时间学习它：

```tsx
import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Invoices", href: "/dashboard/invoices" },
                    {
                        label: "Create Invoice",
                        href: "/dashboard/invoices/create",
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}
```

你的页面是一个获取了 `customers` 数据并传递给 `Form` 组件的服务器组件，为了节省时间，我们已经为你创建好了`<Form>`组件

导航到`<Form>`组件，并且你将看到表单：

-   有一个带有一列用户列表的`<select>`下拉元素
-   有一个`type="number"`的表示金额的`<input>`元素
-   有两个`type="radio"`的表示状态的`<input>`元素
-   有一个`type="submit"`的按钮

在[http://localhost:3000/dashboard/invoices/create](http://localhost:3000/dashboard/invoices/create)，你应该会看到以下 UI：

2. 创建一个 Server Action

太棒了，现在让我们创建一个当 form 被提交的时候被调用的服务器 Action。

导航到你的`lib`目录，并且创建一个名字是`actions.ts`的新文件，在这个文件的顶部，添加 React`use server`指令：

```ts
"use server";
```

通过添加`'use server'`，你将文件中所有导出的函数`mark(标记)`为服务器函数，这些服务器函数可以接着被客户端或服务器组件导入，
标记他们使得他们` extremely(极其、非常)``versatile(通用) `。

在你的`action.ts`文件，创建一个接收`formData`的异步函数：

```ts
"use server";

export async function createInvoice(formData: FormData) {}
```

然后，在你的`<Form>`组件，从`action.ts`文件导入`createInvoice`，在`<form>`元素上添加一个`action`属性，并且调用`createInvoice` action：

```tsx
import { customerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';

export default function Form({
  customers,
}: {
  customers: customerField[];
}) {
  return (
    <form action={createInvoice}>
      // ...
  )
}
```

> **值的了解的是：** \
> 在 HTML 里，你像 `action` 属性传递了一个 URL，这个 URL 将被作为你的表单数据应该被提交的`destination(目的地)`，（通常是一个 API 端点） \
> 然而，在 React 里，`aciton` 属性被视为一个特殊的 prop - 意味着 React 构建在它之上，并允许 actions 被调用。 \
> 在后台，Server Actions 创建了一个 `post`API 端点，这就是为什么你在使用 Server Actions 时通常情况下不需要创建 API 端点。

#### 3. 从表单数据提取数据

返回到`actions.ts`文件里，你将需要提取表单数据的值，这有几个你可以使用的方法。对于这个例子，让我们使用[.get(name)](https://developer.mozilla.org/en-US/docs/Web/API/FormData/get)方法。

```ts
"use server";

export async function createInvoice(formData: FormData) {
    const rawFormData = {
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    };
    // Test it out:
    console.log(rawFormData);
}
```

> **小贴士**：如果你正在有很多字段的表单上使用，你也许会想要考虑使用 [entries()](https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries)，例如：\
> `const rawFormData = Object.fromEntries(formData.entries())`

要检查所有内容是否正确连接，请继续并尝试该表单。提交之后，您应该会在终端上看到刚刚输入到表单中的数据。

现在你的数据是 object 类型的，它将会更容易使用。

#### 4. 校验并准备数据

在像你的数据库发送数据之前，你需要确保它们是正确的格式和正确的类型。如果你记得更早之前的课程，你的发票表需要以下格式的数据:

```ts
export type Invoice = {
    id: string; // Will be created on the database
    customer_id: string;
    amount: number; // Stored in cents
    status: "pending" | "paid";
    date: string;
};
```

到目前为止，你只有来自表单的 customer_id、amount 和 status。

##### Type validation and coercion 类型校验和强制转换

校验你的表单数据与数据库期望类型是否一致是很重要的，例如，如果你在你的 action 里添加 `console.log`：

```ts
console.log(typeof rawFormData.amount);
```

你将注意到`amount`是`string`类型，而不是`number`类型。这是因为`input`元素带有`type="number"`属性，实际上返回了 string 而不是 number。

为了处理类型校验，你有一些选择。你可以手动类型校验，使用类型校验库可以节省时间和`effort(精力)`，在你的例子里，我们将使用[zod](https://zod.dev/)，一个 Typescript-first 类型校验库，它可以帮你简化这个任务。

在你的`aciton.ts`文件，导入 zod，并且声明一个与你的 form 对象匹配的 schema，这个 schema 会在表单数据提交到数据库之前校验表单数据：

```ts
"use server";

import { z } from "zod";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(["pending", "paid"]),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    // ...
}
```

`amount` 字段被专门设置为在验证其类型的同时强制(更改)从字符串到数字。

然后你可以将 `rawFormData` 传递给 `CreateInvoice` 来验证类型:

```ts
// ...
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });
}
```

##### Storing values in cents 存储值以(美)分为单位

在数据库中存储以美分为单位的货币值通常是一种好做法，以消除 JavaScript 浮点错误并确保更高的`accuracy(准确性)`。

让我们把金额`convert(换算、转换)`成美分:

```ts
// ...
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });
    const amountInCents = amount * 100;
}
```

##### Creating new dates 创建新日期

最后，让我们以“YYYY-MM-DD”的格式为发票的创建日期创建一个新的日期:

```ts
// ...
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split("T")[0];
}
```

#### 5. 插入数据到你的数据库

现在您已经拥有了数据库所需的所有值，您可以创建一个 SQL 查询来将新的发票插入数据库并传递变量:

```ts
import { z } from "zod";
import { sql } from "@vercel/postgres";
// ...
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split("T")[0];

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
}
```

现在，我们不处理任何错误，我们将在下一章节中做，现在，让我们继续进行下一步。

#### 6. 重新验证和重定向

Next.js 有一个客户端路由器缓存，可以在用户的浏览器中存储一段时间的路由段。与预获取一起，此缓存确保用户可以在路由之间快速导航，同时减少向服务器发出的请求数量。

由于要更新发票路由中显示的数据，因此需要清除此缓存并触发对服务器的新请求。你可以通过 Next.js 中的 `revalidatePath` 函数来实现:

```ts
"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

// ...

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split("T")[0];

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

    revalidatePath("/dashboard/invoices");
}
```

一旦数据库被更新，`/dashboard/invoices` 路径将被重新验证，新的数据将从服务器获取。

`At this point(此时)`，您还希望将用户重定向到 `/dashboard/` 发票页面。你可以通过 Next.js 中的 `redirect` 函数来实现:

```ts
"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ...

export async function createInvoice(formData: FormData) {
    // ...

    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
}
```

祝贺你！你刚才已经实现了第一个 Server Action。通过添加一个新的发票去测试它，如果一切正常：

1. 在提交时，你应该会被重定向到 `/dashboard/invoices` 页面。
2. 你应该会在表格顶部看到新的发票。

### 更新发票

更新发票表单类似于创建发票表单，不同之处在于需要传递发票 `id` 来更新数据库中的记录。让我们看看如何获取和传递发票 `id`。

以下是更新发票的步骤:

1. 用发票 `id` 创建一个新的动态路由段。
2. 从页面参数中读取发票 id。
3. 从数据库中获取特定的发票。
4. 用发票数据预先填充表单。
5. 更新数据库中的发票数据。

#### 1. 用发票 `id` 创建一个新的动态路由段

js 允许你在不知道确切的段名并且想要基于数据创建路由时创建[动态路由段](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)。
这可以是博客文章标题，产品页面等。你可以通过在方括号中包装文件夹名来创建动态路由段。例如`[id]`、`[post]`、`[slug]`。

在 `/invoices` 文件夹中，创建一个名为`[id]`的新动态路由，然后创建一个名为 `edit` 的新路由 `.tsx` 文件。你的文件结构应该是这样的:

```
-   invoices
-     [id]
-       edit
-         page.tsx
```

在`<Table>`组件中，请注意有一个`<UpdateInvoice />`按钮，它从表记录中接收发票的 `id`。

```tsx
export default async function InvoicesTable({ query, currentPage }: { query: string; currentPage: number }) {
    return (
        // ...
        <td className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm">
            <UpdateInvoice id={invoice.id} />
            <DeleteInvoice id={invoice.id} />
        </td>
        // ...
    );
}
```

导航到您的`<UpdateInvoice />`组件，并更新 `Link` 的 `href` 以接受 `id` prop。你可以使用模板字面值来链接到一个动态路由段:

```tsx
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// ...

export function UpdateInvoice({ id }: { id: string }) {
    return (
        <Link href={`/dashboard/invoices/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
            <PencilIcon className="w-5" />
        </Link>
    );
}
```

#### 2. 从页面 `params` 读取发票 `id`

返回到你的`<Page>`组件，复制以下代码：

```tsx
import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Invoices", href: "/dashboard/invoices" },
                    {
                        label: "Edit Invoice",
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}
```

注意，它与 `/create invoice` 页面非常相似，只是它(从编辑表单)导入了一个不同的表单 `.tsx` 文件。此表单应该预先填充一个 `defaultValue`，用于表示客户的姓名、发票金额和状态。要预先填充表单字段，需要使用 `id` 获取特定的发票。

`In addition to(除...之外)` 除了 `searchParams` 之外，页面组件还接受一个名为 `params` 的属性，您可以使用它来访问 `id`。更新`<Page>`组件以接收 prop:

```tsx
import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    // ...
}
```

#### 3. 获取指定的发票

然后:

-   导入新函数 `fetchInvoiceById`，并将 `id` 作为参数传入。
-   导入 `fetchCustomers` 以获取下拉列表中的客户姓名。

你可以使用 `Promise.all` 同时获取发票和客户。

```tsx
import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);
    // ...
}
```

你将在终端中看到 `invoice` prop 的临时 TS 错误，因为 `invoice` 可能没有定义。现在不要担心这个问题，在下一章添加错误处理时将解决这个问题。

太棒了！现在，测试一切都`wired(连接，有线的)`正确，访问[http://localhost:3000/dashboard/invoices](http://localhost:3000/dashboard/invoices)
并点击 Pencil 图标来编辑发票。导航后，您应该看到一个预先填充了发票详细信息的表单:

URL 也应该用 `id` 更新，如下所示: `http://localhost:3000/dashboard/invoice/uuid/edit`

> **UUIDs vs. Auto-incrementing Keys - uuids vs 自动递增键**
> 我们使用 uuid 而不是增加键(例如，1、2、3 等)。这使得 URL 更长;然而，uuid 消除了 ID 冲突的风险，是全局唯一的，并减少了枚举攻击的风险——使它们成为大型数据库的理想选择。
> 但是，如果您喜欢更简洁的 url，则可能更喜欢使用自动递增键。

#### 4. 向 Server Action 传递 `id`

最后，您希望将 id 传递给 Server Action，以便可以更新数据库中的正确记录。你不能像这样传递 `id` 作为参数:

```tsx
// Passing an id as argument won't work
<form action={updateInvoice(id)}>
```

相反，你可以使用 JS `bind` 将 `id` 传递给 Server Action。这将确保传递给 Server Action 的任何值都被编码。

```tsx
// /app/ui/invoices/edit-form.tsx
import { updateInvoice } from "@/app/lib/actions";

export default function EditInvoiceForm({ invoice, customers }: { invoice: InvoiceForm; customers: CustomerField[] }) {
    const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

    return (
        <form action={updateInvoiceWithId}>
            <input type="hidden" name="id" value={invoice.id} />
        </form>
    );
}
```

> 注意:在表单中使用隐藏的输入字段也可以(例如`<input type="hidden" name="id" value={发票。id} / >`)。但是，这些值将在 HTML 源中显示为全文，这对于像 id 这样的敏感数据来说并不理想。

然后，在你的 `action.ts` 文件，创建一个新 action `updateInvoice`:

```ts
// /app/lib/actions.ts
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    const amountInCents = amount * 100;

    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
}
```

和 `createInvoice` action 相似，下面是：

1. 从 `formData` 中提取数据
2. 使用 Zod 校验类型
3. 把金额转化为美分
4. 传递变量给 SQL 查询
5. 调用 `revalidatePath` 来清除客户端缓存并发出新的服务器请求。
6. 调用 `redirect` 将用户重定向到发票页面。

通过编辑发票来测试它。在提交表单之后，你应该被重定向到发票页面，并且发票应该被更新。

### 删除发票

为了使用 Server Action 删除发票，将删除按钮包裹在 `<form>`元素里，并且用 `bind` 向 Secver Action 传递`id`。

```tsx
// /app/ui/invoices/buttons.tsx
import { deleteInvoice } from "@/app/lib/actions";

export function DeleteInvoice({ id }: { id: string }) {
    const deleteInvoiceWithId = deleteInvoice.bind(null, id);

    return (
        <form action={deleteInvoiceWithId}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-4" />
            </button>
        </form>
    );
}
```

在你的 `actions.ts` 文件中，创建一个新的 action `deleteInvoice`:

```ts
// /app/lib/actions.ts
export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
}
```

由于该操作是在 `/dashboard/invoices` 路径中调用的，因此不需要调用 `redirect`。调用 `revalidatePath` 将触发一个新的服务器请求并重新呈现表。

### 延伸阅读

为了学习更多 Next.js Further Reading 的错误处，

在本章中，你学习了如何使用 Server Actions 改变数据，也学习了如何使用 `revalidatePath` API 去重新验证 Next.js 缓存，使用 `redirect` 重定向用户到一个新页面。

你还可以阅读更多关于[服务器操作安全性](https://nextjs.org/blog/security-nextjs-server-components-actions)的信息，以获得额外的学习。

## 13. 处理错误

在前一章中，您学习了如何使用 Server Actions 改变数据。让我们看看如何使用 JavaScript 的 `try/catch` 语句和 Next.js api `gracefully(优雅地)`处理错误。

在这章中，以下是我们将讨论的话题：

-   如何使用特殊的`error.tsx`文件来捕获路由段中的错误，并向用户显示一个备用 UI。
-   如何使用 `notFount` 函数 和 `not-found` 文件去处理 404 错误（对于不存在的资源）

### 向 Server Actions 添加 `try/catch`

首先，让我们在你的 Server Actions 中添加 JavaScript 的`try/catch`语句，以允许你优雅地处理错误。

如果你知道怎么做，花一些时间更新你的 Server Actions。或者你可以直接复制下面的代码：

注意如何在 `try/catch` 块之外调用 `redirect`。这是因为重定向通过抛出错误来工作，而错误将被 `catch` 块捕获。为了避免这种情况，可以在 `try/catch` 之后调用 `redirect`。只有在 `try` 成功时才能访问重定向。

现在，让我们检查在 Server Action 中抛出错误时会发生什么。您可以通过提前抛出错误来实现这一点。例如，在 `deleteInvoice` 操作中，在函数的顶部抛出一个错误:

```ts
// /app/lib/actions.ts
export async function deleteInvoice(id: string) {
    throw new Error("Failed to Delete Invoice");

    // Unreachable code block
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath("/dashboard/invoices");
        return { message: "Deleted Invoice" };
    } catch (error) {
        return { message: "Database Error: Failed to Delete Invoice" };
    }
}
```

在开发过程中看到这些错误很有帮助，因为您可以及早发现任何`abrupt(潜在)`的问题。但是，您还希望向用户显示错误，以避免突然失败并允许应用程序继续运行。

这就是 Next.js [error.tsx](https://nextjs.org/docs/app/api-reference/file-conventions/error)。

### 通过 `error.tsx` 处理错误

`error.tsx` 文件可以用来定义路由段的 UI 边界,它可以作为意外错误的`catch-all`，并允许您向用户显示备用 UI。

在 `/dashboard/invoices` 文件夹中，创建一个名为 `error.tsx` 的新文件。并粘贴以下代码:

```tsx
"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center">Something went wrong!</h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    );
}
```

关于上面的代码，你会注意到一些事情:

-   **"use client"** - `error.tsx` 需要是一个客户端组件。
-   它接收两个属性
    -   `error`：这个对象是 JavaScript 原生的 [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) 对象的一个实例。
    -   `reset`：这是一个重置错误边界的函数。当执行时，该函数将尝试重新呈现路由段。

当您再次尝试删除发票时，您应该看到以下 UI:

### 使用 `notFound` 函数处理 404 错误

另外一种你可以优雅地处理错误的方式是通过使用 notFound 函数。虽然`errpr.tsx`用于捕获所有错误，但是当你尝试获取一个不存在的资源时，你可以使用 `notFount`。

例如，访问[http://localhost:3000/dashboard/invoices/2e94d1ed-d220-449f-9f11-f0bbceed9645/edit](http://localhost:3000/dashboard/invoices/2e94d1ed-d220-449f-9f11-f0bbceed9645/edit)。

这是一个数据库中不存在的`fake(假的)` UUID。

您将立即看到 `errot.tsx` `kicks(启动、参与、贡献)`，是因为这是 `/invoices` 的子路由，其中定义了 `error.tsx`。

但是，如果您想更具体，您可以显示 404 错误，告诉用户他们试图访问的资源没有找到。

您可以通过进入 data 中的 `fetchInvoiceById` 函数来确认尚未找到该资源。并且在控制台记录返回的发票：

```ts
// /app/lib/data.ts
export async function fetchInvoiceById(id: string) {
    noStore();
    try {
        // ...

        console.log(invoice); // Invoice is an empty array []
        return invoice[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch invoice.");
    }
}
```

现在你知道了这个发票在你的数据库不存在，让我们使用 `notFound` 去处理它，导航到 `/dashboard/invoices/[id]/edit/page.tsx`，并且从 `'next/navigation'` 导入 `{ notFound }`

然后，如果发票不存在，你可以使用条件调用 `notFound`:

```tsx
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { updateInvoice } from "@/app/lib/actions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

    if (!invoice) {
        notFound();
    }

    // ...
}
```

完美！如果没有找到特定的发票，`<Page>` 现在将抛出一个错误。向用户显示错误 UI。创建一个 `not-found.tsx` 在 `/edit` 文件夹中。

然后，在 `not-found.tsx` 中，添加以下代码:

```tsx
import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <FaceFrownIcon className="w-10 text-gray-400" />
            <h2 className="text-xl font-semibold">404 Not Found</h2>
            <p>Could not find the requested invoice.</p>
            <Link href="/dashboard/invoices" className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
                Go Back
            </Link>
        </main>
    );
}
```

刷新路由，并且你应该会看到下面的 UI：

这是要记住的，`notFound` 将优先于 `error.tsx`，因此当您想要处理更具体的错误时，可以`reach out for it(找到它)`!

### 延伸阅读

为了学习更多 Next.js 的错误处理，请`check out(查看)`以下文档：

-   [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
-   [error.js API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/error)
-   [notFound() API Reference](https://nextjs.org/docs/app/api-reference/functions/not-found)
-   [not-found.js API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)

## 14. 提高可访问性

在上一章中，我们了解了如何捕获错误(包括 404 错误)并向用户显示备用页面。然而，我们仍然需要讨论另外一个`piece of the puzzle(难题)`：表单验证。
让我们看下如何通过 Server Actions 实现服务端验证，以及如何使用 `useFormState` hook 展示表单错误 - 同时保持可访问性。

在本章中，以下是我们将讨论的话题：

-   如何使用 Next.js 的 `eslint-plugin-jsx-a11y` 实现可访问性的最佳实践。
-   如何实现服务端表单验证
-   如何使用 React `useFormState` hook 处理表单错误，并展示给用户。

### 什么是可访问性？

可访问性`refer(指的是)`设计和实现每个人都可以使用的 web 应用程序，包括残疾人。这是一个`vast(广泛的)`主题，涵盖了许多领域，如键盘导航、语义 HTML、图像、颜色、视频等。

虽然我们不会在本课程中深入探讨可访问性，但我们将讨论 Next.js 中可用的可访问性功能和一些常见的实践，以使您的应用程序更易于访问。

如果你想了解更多关于可访问性的知识，我们推荐通过 [web.dev](https://web.dev/) 学习 [Learn Accessibility](https://web.dev/learn/accessibility/) 课程。

### 在 Next.js 里使用 ESLint accessibility plugin

默认情况下，Next.js 包含 `eslint-plugin-jsx-a11y` 插件，以帮助尽早发现可访问性问题。例如，这个插件警告，如果你有图片没有 `alt` 文本，使用 `aria-\*` 和 `role` 属性不正确，等等。

让我们看下它是如何工作的！

在你的 `package.json` 中，添加 `next lint` 作为脚本：

```json
"scripts": {
    "build": "next build",
    "dev": "next dev",
    "seed": "node -r dotenv/config ./scripts/seed.js",
    "start": "next start",
    "lint": "next lint"
},
```

然后在终端运行 `npm run lint`：

```
npm run lint
```

你应该会看到以下警告：

```shell
✔ No ESLint warnings or errors
```

但是，如果您有一个没有 `alt` text 的图像会发生什么?让我们一探究竟吧!

转到 `/app/ui/invoice/table.tsx` 并从图像中删除 `alt` 属性。你可以使用编辑器的搜索功能来快速找到 `<Image>`:

```tsx
<Image
    src={invoice.image_url}
    className="rounded-full"
    width={28}
    height={28}
    alt={`${invoice.name}'s profile picture`} // Delete this line
/>
```

现在再次运行 `npm run lint`，你将看到以下警告：

```shell
./app/ui/invoices/table.tsx
45:25  Warning: Image elements must have an alt prop,
either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
```

如果您尝试将应用程序部署到 Vercel，则该警告也会显示在构建日志中。这是因为 next lint 是作为构建过程的一部分运行的。因此，您可以在本地运行 `lint`，以便在部署应用程序之前捕获可访问性问题。

### 提高表单可访问性

为了提高表单的可访问性，我们已经做了三件事:

-   语义 HTML: 使用语义元素(`<input>`、`<option>`等)代替`<div>`。这允许辅助技术(AT)专注于输入元素，并向用户提供适当的上下文信息，使表单更容易导航和理解。
-   标签：包括`<label>`和 `htmlFor` 属性确保每个表单字段都有一个描述性文本标签。这通过提供上下文改善了 AT 支持，还通过允许用户单击标签以关注相应的输入字段增强了可用性。
-   焦点轮廓：字段的样式是正确的，以便在焦点时显示轮廓。这对于可访问性至关重要`critical(关键的)`，因为它可以`visually(直观地)`指示页面上的活动元素，帮助键盘和屏幕阅读器用户了解他们在表单上的位置。您可以通过按 `tab` 来验证这一点。

这些实践为使表单对许多用户更易于访问`lay(奠定、安放)`了良好的`foundation(基础)`。但是，它们不解决表单验证和错误。

### 表单验证

前往 [http://localhost:3000/dashboard/invoices/create](http://localhost:3000/dashboard/invoices/create) ，提交一份空表格，会发生什么呢?

你会得到一个错误!这是因为您正在向 Server Action 发送空表单值。可以通过在客户端或服务器上验证表单来防止这种情况。

#### 客户端验证

有几种方法可以在客户机上验证表单。最简单的方法是通过向表单中的`<input>`和`<select>`元素添加所需的属性来依赖浏览器提供的表单验证。例如:

```tsx
// /app/ui/invoices/create-form.tsx
<input id="amount" name="amount" type="number" placeholder="Enter USD amount" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
```

再次提交表单，如果尝试提交带有空值的表单，现在应该会看到浏览器发出警告。

这种` approach(方法)``generally(通常) `是可以的，因为一些 at 支持浏览器验证。

客户端验证的`alternative(替代方案)`是服务器端验证。在下一节中，让我们看看如何实现它。现在，如果添加了必需的属性，请删除它们。

#### 服务端验证

通过验证服务器上的表单，你可以：

-   确保你的数据在发送到你的服务器之前是期望的格式
-   降低`malicious(恶意的)`用户`bypassing(绕过)`客户端验证的风险
-   对于被认为有效的数据，有一个正确的来源

在你的 `create-form.tsx` 组件中，从 `react-dom` 导入 `useFormState` hook，由于 `useFormState` 是一个 hook，你将需要把你的表单通过使用 `"use client"` 指令转为客户端组件。

```tsx
// /app/ui/invoices/create-form.tsx
"use client";
// ...
import { useFormState } from "react-dom";
```

在你的表单组件，`useFormState` hook：

-   有两个参数：`(action, initialState)`
-   返回两个值：`[state, dispatch]` - 一个表单状态 和 一个分派函数 dispatch function （类似 [useReducer](https://react.dev/reference/react/useReducer)）

把你的 `createInvoice` 函数作为参数传递给 `useFormState`，并且在你的 `<form action={}>` 属性上，调用 `dispatch`。

```tsx
// /app/ui/invoices/create-form.tsx
import { useFormState } from "react-dom";

export default function Form({ customers }: { customers: CustomerField[] }) {
    const [state, dispatch] = useFormState(createInvoice, initialState);

    return <form action={dispatch}>...</form>;
}
```

`initialState` 可以是你定义的任何东西，在这节中，创建一个对象，包含两个空键: `message` 和 `errors`。

```tsx
// /app/ui/invoices/create-form.tsx
// ...
import { useFormState } from "react-dom";

export default function Form({ customers }: { customers: CustomerField[] }) {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createInvoice, initialState);

    return <form action={dispatch}>...</form>;
}
```

这`initially(一开始、首先)`可能会让人感到`confusing(困惑)`，但一旦更新了服务器操作，就会更`sense(有意义的)`。我们现在就开始吧。\\

在你的 `action.ts` 文件，你可以使用 Zod 去验证表单数据，更新你的 `FormSchema` 如下：

```ts
// /app/lib/action.ts
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: "Please select a customer.",
    }),
    amount: z.coerce.number().gt(0, { message: "Please enter an amount greater than $0." }),
    status: z.enum(["pending", "paid"], {
        invalid_type_error: "Please select an invoice status.",
    }),
    date: z.string(),
});
```

-   `customerId` - 如果客户字段为空，则 Zod 已经抛出错误，因为它需要一个类型字符串。但是，如果用户没有选择客户，让我们添加一条友好的消息。
-   `amount` - 由于您将金额类型从字符串强制转换为数字，因此如果字符串为空，则默认为零。让我们告诉 Zod，我们总是希望使用`.gt()`函数获得大于 0 的量。
-   `status` - 如果状态字段为空，那么 Zod 已经抛出了一个错误，因为它期望“pending”或“paid”。如果用户没有选择状态，我们还可以添加一条友好的消息。

然后，更新你的 `createInvoice` action，接收两个参数：

```ts
// /app/lib/actions.ts
// This is temporary until @types/react-dom is updated
export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    // ...
}
```

-   `formData` - 和之前一样
-   `prevState` - 包含由 `useFormState` hook 传递的表单状态，在本例中你并不会使用这个 action，但是它是一个必须的 prop 属性

然后，将 `Zod parse()` 函数改为 `safeParse()`：

```jsx
// /app/lib/actions.ts
export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    // ...
}
```

`safeParse()` 将返回一个包含成功或错误字段的对象。这将有助于更优雅地处理验证，而无需将此逻辑放入 `try/catch` 块中。

在将信息发送到数据库之前，检查表单字段是否使用条件验证正确。

```ts
export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Invoice.",
        };
    }

    // ...
}
```

如果 `validatedFields` 不成功，我们将提前返回函数，并附带来自 Zod 的错误消息。

> **Tip**: 打印 `validatedFields` 并提交一个空表单来查看它的特征。

最后，因为你在你的 `try/catch` 块之外单独的处理了表单验证，你可以为任何数据库错误返回一个特定的消息，你的最终代码应该像这样:

```ts
export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Invoice.",
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split("T")[0];

    // Insert data into the database
    try {
        await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: "Database Error: Failed to Create Invoice.",
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
}
```

很好，现在让我们在表单组件中显示错误。回到 `create-form.tsx` 组件，您可以使用表单 `state` 访问错误。

添加一个检查每个特定错误的三元操作符。例如，在客户字段之后，您可以添加:

```tsx
// /app/ui/invoices/create-form.tsx
<form action={dispatch}>
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                Choose customer
            </label>
            <div className="relative">
                <select id="customer" name="customerId" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" defaultValue="" aria-describedby="customer-error">
                    <option value="" disabled>
                        Select a customer
                    </option>
                    {customers.map((name) => (
                        <option key={name.id} value={name.id}>
                            {name.name}
                        </option>
                    ))}
                </select>
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
                {state.errors?.customerId &&
                    state.errors.customerId.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
        // ...
    </div>
</form>
```

> **Tip**: 您可以在组件中查看 console.log 状态，并检查是否所有内容都正确连接。检查开发工具中的控制台，因为您的表单现在是一个客户端组件。

在上面的代码中，您还添加了以下 aria 标签:

-   aria- descripbedby ="customer-error":这将在选择元素和错误消息容器之间建立关系。它表明 id="customer-error"的容器描述了选择元素。当用户与选择框交互时，屏幕阅读器将读取此描述，以通知他们错误。
-   id="customer-error":这个 id 属性唯一地标识保存选择输入错误消息的 HTML 元素。这对于 aria- describby 建立关系是必要的。
-   aria-live="polite":当 div 中的错误被更新时，屏幕阅读器应该礼貌地通知用户。当内容发生变化时(例如，当用户更正错误时)，屏幕阅读器将宣布这些变化，但只有在用户空闲时才会宣布，以免打断他们。

### 实践：添加 aria 标签

使用上面的示例，将错误添加到剩余的表单字段中。如果缺少任何字段，还应该在表单底部显示一条消息。你的 UI 应该是这样的:

![img](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fform-validation-page.png&w=1080&q=75)

一旦你准备好了，运行 `npm run lint` 来检查你是否正确使用了 aria 标签。

如果你想挑战一下自己，利用本章学到的知识，将表单验证添加到编辑表单中 `.tsx` 组件。

你将需要：

-   将 `useFormState` 添加到编辑表单中 `.tsx` 组件。
-   编辑 `updateInvoice` 操作以处理来自 `Zod` 的验证错误。
-   在组件中显示错误，并添加 `aria` 标签以提高可访问性。

## 15. 添加身份认证

在前一章中，您通过添加表单验证和改进可访问性完成了发票路由的构建。在本章中，您将向仪表板添加身份验证。

在本章中，以下是我们将讨论的话题：

-   什么是身份验证？
-   如何使用 NextAuth.js 向你的项目添加身份验证
-   如何使用中间件重定向用户，并保护你的路由
-   如何使用 React 的 useFormStatus 和 useFormState 处理 pending 状态和表单错误

### 什么是身份验证？

身份验证是当今许多 web 应用程序的关键部分。这是系统检查用户是否就是他们所说的那个人的方式。

一个安全的网站通常使用多种方法来检查用户的身份。例如，在输入用户名和密码后，该网站可能会向你的设备发送一个验证码，或者使用谷歌认证器(Google Authenticator)等外部应用程序。这种双因素身份验证(2FA)有助于提高安全性。即使有人知道了你的密码，没有你的唯一令牌，他们也无法访问你的账户。

#### Authentication vs. Authorization 身份验证与授权

在 web 开发中，身份验证和授权扮演着不同的角色:

-   身份验证就是要确保用户就是他们所说的那个人。你在用用户名和密码之类的东西来证明你的身份。
-   授权是下一步。一旦确认了用户的身份，授权将决定允许他们使用应用程序的哪些部分。

因此，身份验证检查您是谁，授权`determines(确定、决定)`您可以在应用程序中执行什么操作或访问什么。

### 创建登录路由

首先在应用程序中创建一个名为/login 的新路由，并粘贴以下代码:

```tsx
// /app/login/page.tsx
import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                    </div>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}
```

你将注意到页面导入了`<LoginForm />`，你将在下一章中更新它。

### NextAuth.js

我们将使用 NextAuth.js 添加权限认证和校验。NextAuth.js `abstracts(抽象)`了管理会话、登录和注销以及其他认证方面所涉及的许多复杂性。
虽然您可以手动实现这些功能，但该过程可能`time consuming(非常耗时，consuming:消耗性的)`且`error-prone(容易出错，prone:易发)`。
NextAuth.js 简化了这个过程，为 Next.js 应用中的 auth 提供了一个统一的解决方案。

### 设置 NextAuth.js

通过在终端运行以下命令安装 NextAuth.js:

```shell
npm install next-auth@beta
```

这里，你正在安装测试版的 NextAuth.js，它与 Next.js 14 兼容。

接下来，为您的应用程序生成一个密钥。该密钥用于对 cookie 进行加密，保证用户会话的安全性。你可以在终端上运行以下命令:

```shell
openssl rand -base64 32
```

然后，在 `.env` 文件中，将生成的密钥添加到 `AUTH_SECRET` 变量中:

```shell
AUTH_SECRET=your-secret-key
```

为了使 auth 在生产环境中工作，您还需要更新 Vercel 项目中的环境变量。看看这个关于如何在 [Vercel](https://vercel.com/docs/projects/environment-variables) 上添加环境变量的指南。

#### 添加页面选项

在项目的根目录下创建一个 `auth.config.ts` 文件，导出一个 `authConfig` 对象。该对象将包含 NextAuth.js 的配置选项。现在，它将只包含 `pages` 选项:

```ts
// /auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
};
```

您可以使用 `pages` 选项为自定义登录、注销和错误页面指定路由。这不是必需的，但是通过在 `pages` 选项中添加 `signIn: '/login'`，用户将被重定向到我们的自定义登录页面，而不是 NextAuth.js 的默认页面。

### 通过 Next.js 中间件保护你的路由

接下来，添加逻辑来保护路由。这将阻止用户访问仪表板页面，除非他们已登录。

```ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
```

授权回调用于验证请求是否被授权通过 [Next.js 中间件](https://nextjs.org/docs/app/building-your-application/routing/middleware) 访问页面。它在请求完成之前被调用，它接收一个具有 `auth` 和 `request` 属性的对象。`auth` 属性包含用户的会话，`request` 属性包含传入请求。

`providers` 选项是一个数组，其中列出了不同的登录选项。现在，它是一个空数组来满足 NextAuth 配置。您将在[Adding the Credentials provider](https://nextjs.org/learn/dashboard-app/adding-authentication#what-is-authentication)一节中了解更多信息。

接下来，您需要将 `authConfig` 对象导入到中间件文件中。在项目的根目录下，创建一个名为 `middleware.ts` 的文件。并粘贴以下代码:

```ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
```

这里你用 `authConfig` 对象初始化 `NextAuth.js`，并导出 `auth` 属性。您还可以使用中间件中的 `matcher` 选项来指定它应该在特定的路径上运行。

在此任务中使用中间件的优点是，在中间件验证身份验证之前，受保护的路由甚至不会开始呈现，从而增强了应用程序的安全性和性能。

#### Password hashing 哈希/散列 密码

在将密码存储到数据库中之前对其进行散列是一种很好的做法。散列将密码转换为固定长度的字符串，这看起来是随机的，即使用户的数据暴露，也提供了一层安全性。

在 `seed.js` 文件中，使用了一个名为 `bcrypt` 的包对用户密码进行散列处理，然后将其存储到数据库中。您将在本章后面再次使用它来比较用户输入的密码与数据库中的密码是否匹配。但是，您需要为 `bcrypt` 包创建一个单独的文件。这是因为 `bcrypt` 依赖于 Next.js 中间件中不可用的 Node.js api。

创建一个名为 `auth.ts` 的新文件。它`spreads(扩展)`了你的 `authConfig` 对象:

```ts
// /auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
});
```

#### Adding the Credentials provider 添加凭据提供程序

接下来，你需要为 NextAuth.js 添加 `providers` `选项。providers` 是一个数组，其中列出了不同的登录选项，如 Google 或 GitHub。在本课程中，我们将只关注使用[Credentials provider](https://authjs.dev/getting-started/providers/credentials)。

凭据提供程序允许用户使用用户名和密码登录。

```ts
// /auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({})],
});
```

> 值得了解的是：虽然我们正在使用凭据提供程序，但通常建议使用其他提供程序，如 OAuth 或电子邮件提供程序。请参阅 [NextAuth.js docs](https://authjs.dev/getting-started/authentication/oauth) 获取完整的选项列表。

#### 添加登录`functionality(功能)`

你可以使用 `authorize` 函数处理身份验证逻辑，和 Server Action 相似，你可以在验证用户是否存在数据库之前，使用 `zod` 校验邮件和密码。

```ts
// /auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
            },
        }),
    ],
});
```

验证凭据之后，创建一个从数据库查询用户的新 `getUser` 函数。

```ts
// /auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                }

                return null;
            },
        }),
    ],
});
```

然后，调用 `bcrypt.compare` 检查密码是否匹配:

```ts
// /auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

// ...

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                // ...

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
```

然后，调用 bcrypt.compare 检查密码是否匹配:

```ts
// /auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

// ...

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                // ...

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
```

最后，如果密码匹配，则返回用户，否则返回 `null` 以防止用户登录。

#### 更新登录表单

现在需要将身份验证逻辑与登录表单连接起来。在你 `action.ts` 文件，创建一个名为 `authenticate` 的新操作。这个操作应该从 `auth.ts` 中导入 `signIn` 函数:

```ts
// /app/lib/actions.ts
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
// ...
export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
```

如果有一个 'CredentialsSignin' 错误，你想显示一个适当的错误消息。您可以在[文档](https://authjs.dev/reference/core/errorss)中了解 `NextAuth.js 错误`。

最后，在登录表单中。你可以使用 `React` 的 `useFormState` 来调用服务器操作并处理表单错误，并使用 `useFormStatus` 来处理表单的 `pending` 状态:

```tsx
// app/ui/login-form.tsx
"use client";

import { lusitana } from "@/app/ui/fonts";
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>Please log in to continue.</h1>
                <div className="w-full">
                    <div>
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" id="email" type="email" name="email" placeholder="Enter your email address" required />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" id="password" type="password" name="password" placeholder="Enter password" required minLength={6} />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <LoginButton />
                <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                    {errorMessage && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}
```

#### 添加退出功能

要将注销功能添加到`<SideNav />`，请在你的 `<form>`元素中的从 `auth.js` 调用 `signOut` 函数:

```tsx
// /ui/dashboard/sidenav.tsx
import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            // ...
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                >
                    <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
```

#### 尝试一下吧

现在，试试吧。您应该能够使用以下凭据登录和退出应用程序:

-   Email: `user@nextmail.com`
-   Password: `123456`

## 15. Adding Metadata 添加元数据

元数据对 SEO 和可共享性至关重要。在本章中，我们将讨论如何在 Next.js 应用程序中添加元数据。

在本章中，以下是我们将讨论的话题：

-   什么是元数据
-   元数据的类型
-   如何使用元数据添加 Open Graph 图像。 -如何使用元数据添加 Open Graph 图像。

### 什么是元数据？

在 web 开发中，元数据提供了关于网页的额外细节。元数据对于访问页面的用户是不可见的。相反，它在幕后工作，`embedded(嵌入)`在页面的 HTML 中，通常在`<head>`元素中。这些隐藏的信息对于搜索引擎和其他需要更好地理解你网页内容的系统来说是`crucial(至关重要的)`。

### 为什么元数据很重要？

元数据在增强网页搜索引擎优化方面发挥着重要作用，使其更容易被搜索引擎和社交媒体平台访问和理解。适当的元数据可以帮助搜索引擎有效地索引网页，提高其在搜索结果中的排名。此外，像 Open Graph 这样的元数据改善了社交媒体上共享链接的外观，使内容对用户更具吸引力和信息量。

### 元数据的类型

元数据有多种类型，每种类型都有其独特的用途。一些常见的类型包括:

**标题元数据**: 负责显示在浏览器选项卡上的网页标题。这对搜索引擎优化至关重要，因为它可以帮助搜索引擎了解网页的内容。

```html
<title>Page Title</title>
```

**描述元数据**: 用此元数据提供网页内容的简要概述，通常显示在搜索引擎结果中。

```html
<meta name="description" content="A brief description of the page content." />
```

**关键词元数据**: 这些元数据包括与网页内容相关的关键字，帮助搜索引擎索引页面。

```html
<meta name="keywords" content="keyword1, keyword2, keyword3" />
```

**Open Graph 图像元数据**: 这些元数据增强了网页在社交媒体平台上共享时的表现方式，提供了标题、描述和预览图像等信息。

```html
<meta property="og:title" content="Title Here" />
<meta property="og:description" content="Description Here" />
<meta property="og:image" content="image_url_here" />
```

**Favicon 元数据**: 该元数据将 Favicon(一个小图标)链接到网页，显示在浏览器的地址栏或选项卡中。

```html
<link rel="icon" href="path/to/favicon.ico" />
```

### 添加元数据

Next.js 有一个元数据 API，可以用来定义应用程序的元数据。有两种方法可以将元数据添加到应用程序中:

-   **Config-based**: 在 layout.js 或 page.js 文件中导出[静态元数据对象](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-object)或动态 [generateMetadata 函数](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function)。
-   **File-based**：基于文件的，Next.js 有一系列专门用于元数据目的的特殊文件:
    -   `favicon.ico`, `apple-icon.jpg` 和 `icon.jpg`: 用于 favicon 和图标
    -   `opengraph-image.jpg` 和 `twitter-image.jpg`: 用于社交媒体图片
    -   `robots.txt`: 提供搜索引擎爬行的说明
    -   `sitemap.xml`: 提供网站结构的信息

您可以灵活地将这些文件用于静态元数据，也可以在项目中以编程方式生成它们。

有了这两个选项，Next.js 将自动为页面生成相关的`<head>`元素。

#### Favicon 和 Open Graph 图像

在 `/public` 文件夹中，您会注意到有两个图像: `favicon.ico` 和 `opengraph-image.jpg`。

将这些图像移动到 `/app` 文件夹的根目录下。

这样做之后，Next.js 将自动识别并使用这些文件作为您的图标和 OG 图像。您可以通过在开发工具中检查应用程序的 `<head>` 元素来验证这一点。

> **最好知道**: 您还可以使用 [`imagerresponse`](https://nextjs.org/docs/app/api-reference/functions/image-response) 构造函数创建动态 OG 图像。

#### 页面标题和描述

您还可以包含来自任何 `layout.js` 或 `page.js` 文件的[`metadata` object](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields)，以添加额外的页面信息，如标题和描述。layout.js 中的任何元数据都将被使用它的所有页面继承。

在根布局中，用以下字段创建一个新的元数据对象:

```tsx
// /app/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Acme Dashboard",
    description: "The official Next.js Course Dashboard, built with App Router.",
    metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout() {
    // ...
}
```

Next.js 会自动将标题和元数据添加到应用程序中。

但是，如果您想为特定页面添加自定义标题该怎么办呢?您可以通过向页面本身添加元数据对象来实现这一点。嵌套页面中的元数据将覆盖父页面中的元数据。

例如，在 `/dashboard/invoices` 页面中，您可以更新页面标题:

```tsx
// /app/dashboard/invoices/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Invoices | Acme Dashboard",
};
```

这是可行的，但是我们要在每个页面重复应用程序的标题。如果有什么变化，比如公司名称，你就必须在每一页上更新它。
D
相反，你可以在 `metadata` 对象使用 `title.template` 字段，以便为页面标题定义模板。此模板可以包含页面标题和您想要包含的任何其他信息。

在根布局中，更新 `metadata` 对象以包含模板:

```tsx
// /app/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | Acme Dashboard",
        default: "Acme Dashboard",
    },
    description: "The official Next.js Learn Dashboard built with App Router.",
    metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};
```

模板中的 `%s` 将被替换为特定的页面标题。

现在，在你的 `/dashboard/invoices` 页面，你可以添加页面标题:

```tsx
export const metadata: Metadata = {
    title: "Invoices",
};
```

### 练习：添加元数据

现在，您已经了解了元数据，请练习为其他页面添加标题:

-   `/login` 页面.
-   `/dashboard/` 页面.
-   `/dashboard/customers` 页面.
-   `/dashboard/invoices/create` 页面.
-   `/dashboard/invoices/[id]/edit` 页面.

Nextjs 元数据 API 功能强大且灵活，使您可以完全控制应用程序的元数据。在这里，我们向您展示了如何添加一些基本的元数据，但是您可以添加多个字段，包括 `keywords`, `robots`, `canonical` 等。`Feel free(请随意)`浏览[文档](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)，并向应用程序添加任何您想要的元数据。

## 17. 下一步

恭喜你!你已经完成了 Next.js 仪表板课程，在那里你学习了 Next.js 的主要功能和构建 web 应用程序的最佳实践。

但这仅仅是个开始 —— Next.js 还有许多其他特性。它的目的是帮助你建立小的业余项目，你的下一个创业想法，甚至与你的团队大规模的应用程序。

下面是继续探索 Next.js 的一些资源:

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Next.js Templates](https://vercel.com/templates?framework=next.js):
    -   [Admin Dashboard Template](https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs)
    -   [Next.js Commerce](https://vercel.com/templates/next.js/nextjs-commerce)
    -   [Blog Starter Kit](https://vercel.com/templates/next.js/blog-starter-kit)
    -   [Nextra: Docs Starter Kit](https://vercel.com/templates/next.js/documentation-starter-kits)
    -   [Image Gallery Starter](https://vercel.com/templates/next.js/image-gallery-starter)
-   [Next.js Repository](https://github.com/vercel/next.js)
-   [Vercel YouTube](https://www.youtube.com/@VercelHQ/videos)
    -   [Next.js App Router: Routing, Data Fetching, Caching](https://www.youtube.com/watch?v=gSSsZReIFRk)
    -   [Performance in React and Next.js (Lydia Hallie)](https://www.youtube.com/watch?v=SqVLqvsiAYQ)
    -   [Vercel Product Walkthrough](https://www.youtube.com/watch?v=sPmat30SE4k)

### 分享你的 Next.js 应用程序

我们鼓励您在 x 上分享您在本教程中构建的应用程序。如果您这样做，请在 [`@nextjs`](https://twitter.com/nextjs) 中提到我们的团队，以便我们查看!我们也希望得到你对这门课的反馈。

我们希望你喜欢这门课程，我们鼓励你继续学习——通过构建。
