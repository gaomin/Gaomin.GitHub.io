---
layout:     default
title:      javascript继承方式总结
category: blog
description: javascript继承方式总结
---

## Javascript继承方式总结

一直想要写篇博客总结下继承，一直没有抽出时间，刚好今天有空，就来一篇。

这篇文章主要讨论下列继承方式：

1.原型链继承

2.借用构造函数

**3.组合继承**

4.原型式继承

5.寄生式继承

**6.寄生组合式继承**

### 1、原型链继承
<pre><code class="JavaScript">
    function SuperType(){
      this.arr = [1,2];
      this.num = 1;
      this.property = true;
    }

    SuperType.prototype.getSuperValue = function(){
      return this.property;
    };

    function SubType(){
      this.subproperty = false;
    }
    //原型链继承
    SubType.prototype = new SuperType();

    SubType.prototype.getSubValue = function(){
      return this.subproperty;
    };

    var instance = new SubType();
    instance.getSuperValue();
    //原型链继承存在的问题
    instance.arr.push(3);
    instance.num = 2;

    console.log(instance.arr); //[1, 2, 3]
    console.log(instance.num); //2

    var instance2 = new SubType();
    console.log(instance2.arr); //[1, 2, 3]
    console.log(instance2.num); //1
</code></pre>

原型链存在的问题

1. SuperType构造函数定义了一个引用类型 arr, SuperType的每个实例会有各自的数组arr,
**当SubType通过原型链继承SuperType后，SubType.prototype 变成了SuperType的一个实例，**因此它拥有了一个自己的arr属性，相当于SubType.prototype.arr，**这时SubType的所有实例都会共享arr属性**

2. 在创建子类型的实例时，不能向超类型的构造函数中传递参数

**鉴于上述问题，实践中很少单独使用原型链**

### 2、借用构造函数
<pre><code>
    function SuperType(){
        this.colors = ["red", "blue", "green"];
    }
    function SubType(){
    //继承SuperType
        SuperType.call(this);
    }

    var instance1 = new SubType();
    instance1.colors.push("black");
    console.log(instance1.colors);    //"red,blue,green,black"
    var instance2 = new SubType();
    console.log(instance2.colors);    //"red,blue,green"
</code></pre>

通过call()/apply()方法，实际执行父类构造函数，对对象初始化，因此每个子类型实例都拥有自己的colors属性。

**借用构造函数可以向父类型传递参数**

借用构造函数存在的问题

1. **如果只使用借用构造函数，父类型原型中定义的方法，对子类是不可见的**，而如果父类型的方法都定义在构造函数中，则无法复用

### 3、组合继承
组合继承，指的是将原型链和借用构造函数组合到一起使用，其背后的思路是使用原型链实现原型属性和方法的继承，而通过借用构造函数实现实例属性的继承，这样既保证了每个实例都有自己的属性，又通过在原型上定义方法实现了函数复用
<pre><code>
    function SuperType(name){
        this.name = name;
        this.colors = ["red", "blue", "green"];
    }
    SuperType.prototype.sayName = function(){
        console.log(this.name);
    }

    function SubType(name, age){
        //继承属性    
        SuperType.call(this, name);
        this.age = age;
    }
    //继承方法  
    SubType.prototype = new SuperType(); 
    SubType.prototype.constructor = SubType;
    SubType.prototype.sayAge = function(){
        console.log(this.age);
    };

    var instance1 = new SubType("Nicholas", 29);
    instance1.colors.push("black");
    console.log(instance1.colors);    //"red,blue,green,black"
    instance1.sayName();    //"Nicholas";
    instance1.sayAge();     //29


    var instance2 = new SubType("Greg", 27);
    console.log(instance2.colors); //"red,blue,green"
    instance2.sayName();    //"Greg";
    instance2.sayAge();     //27
</code></pre>

组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为**JavaScript中最常用的继承模式**，而且instanceof 和 isPrototypeOf也能用于识别基于组合继承创建的对象

### 4、原型式继承
基于已有的对象创建新对象，不必创建自定义类型（构造函数）
<pre><code>
    function object(o){
        function F(){}
        F.prototype = o;
        return new F();
    }

    var person = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    };

    var anotherPerson = object(person);
    anotherPerson.name = "Greg";
    anotherPerson.friends.push("Rob");

    var yetAnotherPerson = object(person);
    yetAnotherPerson.name = "Linda";
    yetAnotherPerson.friends.push("Barbie");
    console.log(person.friends);   //"Shelby,Court,Van,Rob,Barbie"
</code></pre>
在object()函数内部，创建了一个临时的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时对象的实例。从本质上讲，object()对传入的对象进行了一次浅复制
ECMAScript 5 通过新增Object.create()规范了原型式继承，这个方法接受两个参数，作为新对象原型的对象和新对象额外的属性（可选），在传入一个参数的情况下，等同于object()
<pre><code>
    var person = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    };
    var anotherPerson = Object.create(person);
    anotherPerson.name = "Greg";
    anotherPerson.friends.push("Rob");

    var yetAnotherPerson = Object.create(person);
    yetAnotherPerson.name = "Linda";
    yetAnotherPerson.friends.push("Barbie");
    console.log(person.friends); //"Shelby,Court,Van,Rob,Barbie"
</code></pre>

存在的问题
1. 同原型链继承存在的问题一样，包含引用类型的属性始终会被子类实例共享

### 5、寄生式继承
<pre><code>
    function createAnother(original){ 
        varclone=object(original); 
        clone.sayHi = function(){
            console.log("hi");
        };
        return clone;
    }
    var person = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    };
    var anotherPerson = createAnother(person);
    anotherPerson.sayHi(); //"hi"
</code></pre>

存在的问题
1. 使用寄生式继承，函数无法复用，与构造函数存在的问题一样

### 6、寄生组合式继承
组合继承是javascript中最常用的继承方式，不过，它也有不足，组合继承最大的问题就是无论什么情况下，都会**调用两次父类构造函数** 

所谓寄生组合继承，即通过借用构造函数来继承属性，通过原型链的混成形式继承方法

<pre><code>
    function object(o){
        function F(){}
        F.prototype = o;
        return new F();
    }

    function inheritPrototype(subType, superType){
        var prototype = object(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    }

    function SuperType(name){
        this.name = name;
        this.colors = ["red", "blue", "green"];
    }
    SuperType.prototype.sayName = function(){
        console.log(this.name);
    };
    function SubType(name, age){
        SuperType.call(this, name);
        this.age = age;
    }
    //调用inheritPrototype，实现方法继承
    inheritPrototype(SubType, SuperType);
    SubType.prototype.sayAge = function(){
        console.log(this.age);
   };
</code></pre>

inheritPrototype内部，第一步，创建了超类型原型的一个副本，第二步为副本添加constructor属性，从而弥补因重写原型而失去的默认constructor属性，最后一步，将副本赋值给子类型的原型。


**开发人员普遍认为，寄生组合式继承，是引用类型最理想的继承方式**

___




