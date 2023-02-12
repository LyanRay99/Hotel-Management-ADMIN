const fs = require("fs");

let data = {};

// Đọc file JSON thứ nhất
const file1 = JSON.parse(fs.readFileSync("./src/Data/list_users.json"));
console.log(file1);
data = { ...data, ...file1 };

// Đọc file JSON thứ hai
const file2 = JSON.parse(fs.readFileSync("./src/Data/careers.json"));
data = { ...data, ...file2 };

// Ghi file JSON mới
fs.writeFileSync("dataMain.json", JSON.stringify(data));
