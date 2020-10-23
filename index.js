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
