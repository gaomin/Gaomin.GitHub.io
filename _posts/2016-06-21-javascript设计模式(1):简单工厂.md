---
   layout: default
　　title: javascript设计模式(1)--简单工厂
   categories: javascript设计模式, 创建型设计模式
   tags: javascript设计模式, 创建型设计模式, 简单工厂 
---
简单工厂模式是属于创建型模式，又叫做静态工厂方法（Static Factory Method）模式，但不属于23种GOF设计模式之一。
<br/>**简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例。**
<br/>简单工厂模式是工厂模式家族中最简单实用的模式，可以理解为是不同工厂模式的一个特殊实现。<br/>
说的通俗点，就像公司茶水间的饮料机，要咖啡还是牛奶取决于你按哪个按钮。

<pre><code>
//篮球基类
    var Basketball = function(){
        this.intro="篮球";
    };
    Basketball.prototype = {
        getIntro: function(){
            console.log(this.intro);
        }
    };
//足球基类
    var Football = function(){
        this.intro = "足球";
    };
    Football.prototype = {
        getIntro: function(){
            console.log(this.intro);
        }
    };

//工厂
    var PopFactory = function(name){
        switch(name){
            case 'basketball' : 
                return new Basketball()
            case 'football' :
                return new Football();
        }
    }

// PopFactory('basketball').getIntro();   篮球
</code></pre>

**优点**

1. 工厂类集中了所有对象的创建，便于对象创建的统一管理

2. 使用时可以直接根据工厂类去创建所需的实例，而无需了解这些对象是如何创建以及如何组织的。

**缺点**

1. 由于工厂类集中了所有实例的创建逻辑，这就直接导致一旦这个工厂出了问题，所有使用这个工厂的地方都会受到牵连

2. 违背了“开放封闭原则”（系统对扩展开放，对修改关闭），当新增加一个基类的时候必须修改工厂类

**适用场景**

1. 需要根据不同参数产生不同实例，这些实例有一些共性的场景

2. 使用者只需要使用产品，不需要知道产品的创建细节



___