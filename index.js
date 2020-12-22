//1. Creational
//1) constructor

/* old school

function Server(name, ip) {
  this.name = name;
  this.ip = ip;
}

Server.prototype.getURL = function () {
  return `https://${this.ip}:80`;
};

*/
/*
class Server {
  constructor(name, ip) {
    this.name = name;
    this.ip = ip;
  }
  getURL = function () {
    return `https://${this.ip}:80`;
  };
}

const aws = new Server("AWS German", "82.21.21.32");

console.log("aws.getURL()=", aws.getURL());
*/

//2) Factory
/*
class SimpleMembership {
  constructor(name) {
    this.name = name;
    this.cost = 50;
  }
}
class StandardMembership {
  constructor(name) {
    this.name = name;
    this.cost = 150;
  }
}
class PremiumMembership {
  constructor(name) {
    this.name = name;
    this.cost = 500;
  }
}

class MemberFactory {
  static list = {
    simple: SimpleMembership,
    standard: StandardMembership,
    premium: PremiumMembership,
  };

  create(name, type = "simple") {
    const Membership = MemberFactory.list[type] || MemberFactory.list.simple;
    const member = new Membership(name);
    member.type = type;
    member.define = function () {
      console.log(`${this.name} (${this.type}): ${this.cost}`);
    };
    return member;
  }
}

const factory = new MemberFactory();
const members = [
  factory.create("bob", "simple"),
  factory.create("ann", "premium"),
  factory.create("bill"),
  factory.create("pete", "wrong type"),
];

console.log("members=", members);
members.forEach((member) => {
  member.define();
});
*/

//3) Prototype
/*
car = {
  wheels: 4,
  init() {
    console.log(
      `I am a car. I have ${this.wheels} wheels, my owner is ${this.owner}`
    );
  },
};

const carWithOwner = Object.create(car, { owner: { value: "Bob" } });
carWithOwner.init();
console.log("carWithOwner.__proto__ === car=", carWithOwner.__proto__ === car);
*/

//4) singleton
/*
class Database {
  constructor(data) {
    if (Database.exists) {
      return Database.instance;
    }
    Database.instance = this;
    Database.exists = true;
    this.data = data;
  }
  getData() {
    return this.data;
  }
}

const mongo = new Database("MongoDB");
console.log("mongo.getData()=", mongo.getData());

const mysql = new Database("MySQL");
console.log("mysql.getData()=", mysql.getData());
*/

//2. Structural
//5) adapter

/*
class OldCalc {
  operations(t1, t2, operation) {
    switch (operation) {
      case "add":
        return t1 + t2;
      case "sub":
        return t1 - t2;
      default:
        return NaN;
    }
  }
}

class NewCalc {
  add(t1, t2) {
    return t1 + t2;
  }
  sub(t1, t2) {
    return t1 - t2;
  }
}

class CalcAdapter {
  constructor() {
    this.calc = new NewCalc();
  }
  operations(t1, t2, operation) {
    switch (operation) {
      case "add":
        return this.calc.add(t1, t2);
      case "sub":
        return this.calc.sub(t1, t2);
      default:
        return NaN;
    }
  }
}

const oldCalc = new OldCalc();
console.log(
  'oldCalc.operations(10, 5, "add")=',
  oldCalc.operations(10, 5, "add")
);

const newCalc = new NewCalc();
console.log("newCalc.add(10, 5)=", newCalc.add(10, 5));

const adapter = new CalcAdapter();
console.log(
  'adapter.operations(25, 10, "sub")=',
  adapter.operations(25, 10, "sub")
);
*/

//6) decarator
/*
class Server {
  constructor(ip, port) {
    this.ip = ip;
    this.port = port;
  }

  get url() {
    return `https://${this.ip}:${this.port}`;
  }
}

function aws(server) {
  server.isAWS = true;
  server.awsInfo = function () {
    return server.url;
  };
  return server;
}

function azure(server) {
  server.isAzure = true;
  server.port += 500;
  return server;
}

const s1 = aws(new Server("12.34.56.78", 8080));
console.log("s1.isAWS=", s1.isAWS);
console.log("s1.awsInfo()=", s1.awsInfo());

const s2 = azure(new Server("98.87.76.12", 1000));
console.log("s2.isAzure=", s2.isAzure);
console.log("s2.url=", s2.url);
*/

//7) facade
/*
class Complaints {
  constructor() {
    this.complaints = [];
  }
  reply(complaint) {}
  add(complaint) {
    this.complaints.push(complaint);
    return this.reply(complaint);
  }
}

class ProductComplaints extends Complaints {
  reply({ id, customer, details }) {
    return `Product: ${id}: ${customer} (${details})`;
  }
}

class ServiceComplaints extends Complaints {
  reply({ id, customer, details }) {
    return `Service: ${id}: ${customer} (${details})`;
  }
}
//facade class
class ComplaintRegistry {
  register(customer, type, details) {
    const id = Date.now();
    // console.log("id=", id);
    let complaint;
    if (type === "service") {
      complaint = new ServiceComplaints();
    } else {
      complaint = new ProductComplaints();
    }
    return complaint.add({ id, customer, details });
  }
}

const registry = new ComplaintRegistry();
console.log(registry.register("Vladimir", "service", "unavailable"));
console.log(registry.register("Helen", "product", "too cost"));
*/

//8 flyweight
/*
class Car {
  constructor(model, price) {
    this.model = model;
    this.price = price;
  }
}

class CarFactory {
  constructor() {
    this.cars = [];
  }
  create(model, price) {
    const candidate = this.getCar(model);
    if (candidate) {
      return candidate;
    }
    const newCar = new Car(model, price);
    this.cars.push(newCar);
    return newCar;
  }
  getCar(model) {
    return this.cars.find((car) => car.model === model);
  }
}

const factory = new CarFactory();
const bmwx6 = factory.create("bmw", 10000);
const audi = factory.create("audi", 12000);
const bmwx3 = factory.create("bmw", 8000);

console.log("bmwx6=", bmwx6);
console.log("audi=", audi);
console.log("bmwx3=", bmwx3);
console.log("bmwx3===bmwx6", bmwx3 === bmwx6);
*/

//9 proxy

/*
function networkFetch(url) {
  return `${url} - server response`;
}

cache = new Set();
const proxiedFetch = new Proxy(networkFetch, {
  apply(target, thisArg, args) {
    const url = args[0];
    if (cache.has(url)) {
      return `${url} - answer from cache`;
    } else {
      cache.add(url);
      return Reflect.apply(target, thisArg, args);
    }
  },
});
console.log(proxiedFetch("angular.io"));
console.log(proxiedFetch("react.io"));
console.log(proxiedFetch("angular.io"));
*/

// iii behaviour
//10 chain of responsibility
/*
class MySum {
  constructor(initialValue = 42) {
    this.sum = initialValue;
  }
  add(value) {
    // console.log("value=", value);
    // console.log("this.sum=", this.sum);
    this.sum += value;
    return this;
  }
}

const sum1 = new MySum();
console.log("sum1=", sum1);
console.log(sum1.add(8));
// the chain itself
console.log(sum1.add(8).add(10).add(1).add(9).sum);

const sum2 = new MySum(0);
console.log(sum2.add(1).add(2).add(3).add(4).sum);
*/

// 11 command
/*
class MyMath {
  constructor(initialValue = 0) {
    this.num = initialValue;
  }
  square() {
    return this.num ** 2;
  }
  cube() {
    return this.num ** 3;
  }
}

class Command {
  constructor(subject) {
    this.subject = subject;
    this.commandsExecuted = [];
  }
  execute(command) {
    this.commandsExecuted.push(command);
    return this.subject[command]();
  }
}
const x = new Command(new MyMath(2));
console.log("x=", x);
console.log("x.execute('square')=", x.execute("square"));
console.log("x.execute('cube')=", x.execute("cube"));
console.log("x.commandsExecuted=", x.commandsExecuted);
*/

// 12 iterator
/*
class MyIterator {
  constructor(data) {
    this.index = 0;
    this.data = data;
  }
  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.index < this.data.length) {
          return {
            value: this.data[this.index++],
            done: false,
          };
        } else {
          this.index = 0;
          return {
            done: true,
            value: void 0,
          };
        }
      },
    };
  }
}

function* genertor(collection) {
  let index = 0;
  while (index < collection.length) {
    yield collection[index++];
  }
}

const iterator = new MyIterator(["this", "is", "iterator"]);
for (const value of iterator) {
  console.log("value iterator=", value);
}
console.log("_______________________");
const gen = genertor(["this", "is", "generator"]);

// for (const value of gen) {
//   console.log("value genertor=", value);
// }
console.log("gen.next().value=", gen.next().value);
console.log("gen.next().value=", gen.next().value);
console.log("gen.next().value=", gen.next().value);
console.log("gen.next().value=", gen.next().value);
*/

//13 mediator
/*
class User {
  constructor(name) {
    this.name = name;
    this.room = null;
  }
  send(message, to) {
    this.room.send(message, this, to);
  }

  receive(message, from) {
    console.log(`${from.name} => ${this.name}: ${message}`);
  }
}
//mediator itself
class ChatRoom {
  constructor() {
    this.users = {};
  }
  register(user) {
    this.users[user.name] = user;
    user.room = this;
  }
  send(message, from, to) {
    if (to) {
      to.receive(message, from);
    } else {
      Object.keys(this.users).forEach((key) => {
        if (this.users[key] !== from) {
          this.users[key].receive(message, from);
        }
      });
    }
  }
}

const vlad = new User("Vlad");
const lena = new User("Lena");
const igor = new User("Igor");

const room = new ChatRoom();
room.register(vlad);
room.register(lena);
room.register(igor);
vlad.send("Hello!!", lena);
lena.send("Hello!! hello", vlad);
igor.send("hello world");
igor.send("hello Igor", igor);
*/

// 14 observer
/*
class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  unsubscriber(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  fire(action) {
    this.observers.forEach((observer) => {
      observer.update(action);
    });
  }
}
class Observer {
  constructor(state = 1) {
    this.state = state;
    this.initialState = state;
  }
  update(action) {
    switch (action.type) {
      case "INCREMENT":
        this.state = ++this.state;
        break;
      case "DECREMENT":
        this.state = --this.state;
        break;
      case "ADD":
        this.state = this.state + action.payload;
        break;
      default:
        this.state = this.initialState;
    }
  }
}

const stream$ = new Subject();
const obs1 = new Observer();
const obs2 = new Observer(42);

stream$.subscribe(obs1);
stream$.subscribe(obs2);

console.log("obs1.state=", obs1.state);
console.log("obs2.state=", obs2.state);

stream$.fire({ type: "INCREMENT" });
stream$.fire({ type: "INCREMENT" });
stream$.fire({ type: "INCREMENT" });
stream$.fire({ type: "DECREMENT" });
stream$.fire({ type: "ADD", payload: 10 });

console.log("obs1.state=", obs1.state);
console.log("obs2.state=", obs2.state);
*/

//15 state
/*
class Light {
  constructor(light) {
    this.light = light;
  }
}

class RedLight extends Light {
  constructor() {
    super("red");
  }
  sign() {
    return "STOP";
  }
}
class YellowLight extends Light {
  constructor() {
    super("yellow");
  }
  sign() {
    return "PREPARE";
  }
}
class GreenLight extends Light {
  constructor() {
    super("green");
  }
  sign() {
    return "RUN";
  }
}

class TrafficLight {
  constructor() {
    this.states = [new RedLight(), new YellowLight(), new GreenLight()];
    this.current = this.states[0];
  }
  change() {
    const total = this.states.length;
    let index = this.states.findIndex((light) => light === this.current);
    if (index + 1 < total) {
      this.current = this.states[index + 1];
    } else {
      this.current = this.states[0];
    }
  }
  sign() {
    return this.current.sign();
  }
}

const traffic = new TrafficLight();
console.log("traffic.sign(1)=", traffic.sign());
traffic.change();
console.log("traffic.sign(2)=", traffic.sign());
traffic.change();
console.log("traffic.sign(3)=", traffic.sign());
traffic.change();
console.log("traffic.sign(4)=", traffic.sign());
*/

//16 strategy
class Vehicle {
  travelTime() {
    return this.timeTaken;
  }
}
class Bus extends Vehicle {
  constructor() {
    super();
    this.timeTaken = 10;
  }
}
class Taxi extends Vehicle {
  constructor() {
    super();
    this.timeTaken = 5;
  }
}
class Car extends Vehicle {
  constructor() {
    super();
    this.timeTaken = 3;
  }
}

class Commute {
  travel(transport) {
    return transport.travelTime();
  }
}
const commute = new Commute();
console.log("commute.travel(new Taxi)=", commute.travel(new Taxi()));
console.log("commute.travel(new Bus)=", commute.travel(new Bus()));
console.log("commute.travel(new Car)=", commute.travel(new Car()));
