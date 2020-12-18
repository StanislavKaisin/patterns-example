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
