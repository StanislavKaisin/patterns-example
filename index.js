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

//Prototype
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
