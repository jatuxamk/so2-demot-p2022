let salaisuus = "SuuriSalaisuus!!!";

let token = require("jsonwebtoken").sign({}, salaisuus, { algorithm :  "HS256" });

console.log(token);