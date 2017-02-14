---
   layout: default
　　title: jQuery源码--Deffered Object
   categories: jQuery源码
   tags: jQuery源码, Deffered Object, promise
---
## Deffered Object

**promise**

ES6中实现了原生的promise对象，在ES6标准出现之前，jQuery通过异步对象，实现了promise。

### 为什么使用promise:

简单来说，pomise解决了两个问题:

1. 使用callback时造成的回调金字塔（回调地狱）问题。

2. 完成了控制反转。

控制反转可以这样理解：

1. 使用callback时，业务方需要调用我方方法时，提供一个callback给业务方。而这个callback什么时候调用和执行次数是由业务方控制的，不受我方控制。当业务方调用callback时出错（不调用，或多次调用），将会造成我方的业务逻辑错误。

2. 而使用promise时， 提供异步对象（Deffered Object）给业务方，我们通过 .then(),.done(),.fail()等方法，将原先的callback内容挂载在Deffered Object上，业务方需要调用我们原有callback逻辑时，调用异步对象的 resolve、reject方法，即会执行我们挂载在Deffered Object上的内容，这个调用过程是由浏览器（jQuery 底层）完成的，即我们把控制由业务方转嫁给了可靠的第三方（浏览器、jQuery 底层），即所谓的控制反转。

### jQuery源码中对promise的实现

jQuery中的promise是异步对象（Deffered Object）的只读镜像对象，所以先看一下 Deffered Object的实现

### allback 队列

### Deffered Object



___





