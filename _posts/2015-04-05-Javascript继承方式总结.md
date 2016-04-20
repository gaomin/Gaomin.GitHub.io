---
layout:     default
title:      javascript继承方式总结
category: blog
description: javascript继承方式总结
---

##Javascript继承方式总结
一直想要写篇博客总结下继承，一直没有抽出时间，刚好今天有空，就来一篇。

这篇文章主要讨论下列继承方式：

1.原型链继承

2.借用构造函数

3.组合继承

4.原型式继承

5.寄生式继承

6.寄生组合式继承

### 1、原型链继承
<pre>
    <code class="JavaScript">
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
    </code>
</pre>

原型链存在的问题

1. SuperType构造函数定义了一个引用类型 arr, SuperType的每个实例会有各自的数组arr,
**当SubType通过原型链继承SuperType后，SubType.prototype 变成了SuperType的一个实例，**因此它拥有了一个自己的arr属性，相当于SubType.prototype.arr，**这时SubType的所有实例都会共享arr属性**

2. 在创建子类型的实例时，不能向超类型的构造函数中传递参数

**鉴于上述问题，实践中很少单独使用原型链**

### 2、借用构造函数



___




