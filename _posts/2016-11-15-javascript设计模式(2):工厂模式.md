---
   layout: default
　　title: javascript设计模式(1)--工厂模式
   categories: javascript设计模式, 创建型设计模式
   tags: javascript设计模式, 创建型设计模式, 工厂模式 
---
## 工厂模式
工厂方法模式(Factory Method Pattern)又称为工厂模式，也叫虚拟构造器(Virtual Constructor)模式或者多态工厂(Polymorphic Factory)模式，它属于类创建型模式。<br/>
**核心工厂方法中， 不显示的使用构造函数。<br/>核心工厂类负责定义创建产品对象的公共接口，而工厂子类则负责生成具体的产品对象，**<br/>
这样做的目的是将产品类的实例化操作延迟到工厂子类中完成，即通过工厂子类来确定究竟应该实例化哪一个具体产品类。

<pre><code>
    //定义 Car 构造函数
    function Car(options) {
        ...
    }
    //定义 Truck 构造函数
    function Truck(options) {
        ...
    }
    //定义 核心 工厂
    function VehicleFactory(){
        ...
    } 

    VehicleFactory.prototype.vehicleClass = Car;

    VehicleFactory.prototype.createVehicle = function(options) {

        return new this.vehicleClass(options);
    }

    //创建生成汽车的工厂子类
    function CarFactory(){}
    CarFactory.prototype = new VehicleFactory();
    CarFactory.prototype.vehicleClass = Car;

    //创建Truck的工厂子类
    function TruckFactory(){}
    TruckFactory.prototype = new VehicleFactory();
    TruckFactory.prototype.vehicleClass = Truck;


    //生成汽车实例
    var carProduct = (new CarFactory()).createVehicle(options);
    
    //生成Truck实例
    var truckProduct = (new TruckFactory()).createVehicle(options);

</code></pre>

**模式结构**
![reflow](/lib/blog-imgs/design_pattern/factory.png)

**优点**

1. 在工厂方法模式中，核心的工厂类不再负责所有产品的创建，而是将具体创建工作交给子类去做。这个核心类仅仅负责给出具体工厂必须实现的接口，而不负责产品类被实例化这种细节，这使得工厂方法模式可以允许系统在不修改工厂角色的情况下引进新产品。

2. 增加新的产品类时无须修改现有系统，并封装了产品对象的创建细节，系统具有良好的灵活性和可扩展性；

**缺点**

1. 增加新产品的同时需要增加新的工厂，导致系统类的个数成对增加，在一定程度上增加了系统的复杂性。

___