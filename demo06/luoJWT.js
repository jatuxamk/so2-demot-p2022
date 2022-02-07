let salaisuus = require("crypto").randomBytes(128).toString("hex");

let token = require("jsonwebtoken").sign({}, salaisuus, { algorithm :  "HS256" });

console.log(salaisuus);