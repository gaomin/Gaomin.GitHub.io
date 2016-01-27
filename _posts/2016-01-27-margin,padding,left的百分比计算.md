---
   layout: default
　　title: margin,padding,left的百分比计算
---
##margin,padding,left中的百分比问题
工作时，我们常常会用到CSS中的margin,padding以及left这些属性的百分比值,这些百分比值是如何计算的呢，基本上没有深究过，这篇文章就来研究下。

我们看下w3cschool的说明：

1.margin, padding

![margin-top,padding-top](/lib/blog-imgs/20160127-margin-padding.jpg)


2.left

![left](/lib/blog-imgs/20160127-left.jpg)

从官方的说明来看，margin和padding的计算方法是一致的，是基于父元素的**宽度**来计算的。left是基于父元素来计算，乍一看是一样的，这里需要强调一个margin/padding说明里提到的**宽度**，为什么强调这个宽度呢，是因为，不仅仅是margin-left/padding-left，margin-right/padding-right这些水平方向上是根据父元素的宽度计算的，margin-top/padding-top，margin-bottom/padding-bottom这些垂直方向上的百分比也是根据父元素的宽度来计算的。

我们看一些Demo

[margin Demo](http://jsbin.com/payujekozi/edit?html,css,output)

当我们分别设置内部div content的 margin-left/margin-top 的百分比为100%时，表现如下图:

![margin-left](/lib/blog-imgs/20160127-margin-demo.jpg)
![margin-top](/lib/blog-imgs/20160127-margin-demo2.jpg)

可以看出垂直方向上的margin-top也是根据父元素宽度计算的

[padding Demo](http://jsbin.com/megefeleka/edit?html,css,output)

3.相关问题

1）基于上面margin、padding的百分比规则，我们可以实现等比例的div（高度随着宽度变化而等比例变化）

[等比例div Demo](http://jsbin.com/morigexowa/edit?html,css,output)

2) 元素的居中问题

[居中问题 Demo](http://jsbin.com/yiborazifo/edit?html,css,output)

在这个Demo中，我们分别对两个div使用了left/top，margin-left/margin-top两种定位方法，可以看出，在水平方向上是保持一致的（都是基于父元素的width计算），而垂直方向上是存在偏差的（因为margin垂直方法仍然根据父元素的width计算）

![居中](/lib/blog-imgs/20160127-center.jpg)

回忆一下我们常用的居中做法：
<pre><code>.content{
    position: relative;
    top: 50%;
    left: 50%;
    margin-top: -1/2 box width;
    margin-left: -1/2 box height;
}
</code></pre>

那么能不能写成这样（margin-left/margin-top和left/top互换）：
<pre><code>.content{
    position: relative;
    margin-top: 50%;
    margin-left: 50%;
    top: -1/2 box width;
    left: -1/2 box height;
}
</code></pre>

通过上面的分析，因为margin基于父元素的width计算，所以，结论是：

1. 水平方向上，margin-left和left可以进行互换，结果是一致的
2. 垂直方向上，由于计算基准不同，margin-top和top不能进行互换

如果只是想实现水平方向的居中，那么margin-left和left可以随便一个写成50%，另一个设置成负的1/2宽度就可以了，
如果是实现垂直方向的居中，就需要注意这个顺序了，只能把left设置成50%；

好了，说了这么多，其实我就是想强调

**margin和padding的计算方法，是基于父元素的宽度来计算的**



___
