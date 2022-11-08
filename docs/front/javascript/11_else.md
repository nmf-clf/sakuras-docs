# 杂项

### 事件循环
[2分钟了解JavaScript的Event Loop | 面试必备](https://www.bilibili.com/video/BV1kf4y1U7Ln/?spm_id_from=trigger_reload&vd_source=9ec497abd95f8d7ad3a7efffc71c7ee3)
```js
let p1 = new Promise((resolve, reject) =>{
        console.log('1');
        resolve('hello')
    })
    p1
    .then(res =>{
        console.log('2', res);
        setTimeout(() => {
            console.log('3');
            let p2 = new Promise((resolve, reject)=>{
                console.log('6');
                resolve();
            }).
            then(res =>{
                console.log('7');
                setTimeout(() => {
                    console.log('8');
                }, 499);
            })
            setTimeout(() => {
                console.log('10');
            }, 500);
        }, 1000);
    })
    .catch(err =>{
        console.log('4');
    })
    setTimeout(() => {
        console.log('5');
    }, 1000);
    // 1 2 3  6  7 8 10 15
    /*  
        : 栈：后进先出，队列：先进先出
        ：每个函数体都有一个调用过程，当函数体或者xx里面的同步代码执行完毕或者异步代码都放到微任务红任务队列里的时候，该函数体会弹出调用栈，
        ：初始的时候，调用栈为空，微任务队列空，宏任务队列只有一段script脚本（整体代码）
        ：同步代码被压入到调用栈的时候会立即执行，异步代码被压入到调用栈的时候会放到异步任务队列
        ：当代码块内所有的同步代码执行完毕之后，会立即执行微任务队列里的代码
        因此过程是：
        - 初始调用栈为空，微任务队列空，红任务队列有一段script脚本，开始执行此段脚本
        - 将同步代码console.log(0)压入调用栈，执行完毕，弹出             0
        - 将同步代码new Promise压入调用栈，
            - 将console.log(1)压入调用栈，执行完毕，弹出        1
            - 将resolve压入调用栈，执行完毕，弹出
            - new Promise内部的同步代码执行完毕，因此弹出new Promise
        - 将同步代码p1.then压入调用栈，将微任务console.log(2)放入微任务队列，弹出p1.then
        - 将同步代码setTimeout压入调用栈，执行，此时遇到异步回调console.log(5)，将回调任务console.log(5)放入到宏任务队列里，然后弹出setTimeout
        - 将同步代码console.log(9)压入调用栈，执行完毕，弹出

        - 此时整体代码块的同步代码执行完毕，将立即开始执行微任务队列里的内容，由于微任务队列只有一个，因此宏任务队列的任务会等待微任务队列里的任务全部执行完毕才执行
        - 将微任务队列的console.log(2)压入调用栈执行，下一步遇到了setTimeout，
        - 将setTimeout压入调用栈，内部代码console.log(3)被放入宏任务队列等待执行，微任务队列执行完毕，开始执行宏任务队列

        - 此时宏任务队列里...
    */
```