const fs = require("fs");

let data = {};

// Đọc từng file JSON sau đó combine hết vào data
const about = JSON.parse(fs.readFileSync("./src/Data/about.json"));
data = { ...data, ...about };

const careers = JSON.parse(fs.readFileSync("./src/Data/careers.json"));
data = { ...data, ...careers };

const customerRating = JSON.parse(
  fs.readFileSync("./src/Data/customer_rating.json")
);
data = { ...data, ...customerRating };

const faqs = JSON.parse(fs.readFileSync("./src/Data/faqs.json"));
data = { ...data, ...faqs };

const booking = JSON.parse(fs.readFileSync("./src/Data/list_booking.json"));
data = { ...data, ...booking };

const customers = JSON.parse(fs.readFileSync("./src/Data/list_customers.json"));
data = { ...data, ...customers };

const rooms = JSON.parse(fs.readFileSync("./src/Data/list_room.json"));
data = { ...data, ...rooms };

const users = JSON.parse(fs.readFileSync("./src/Data/list_users.json"));
data = { ...data, ...users };

const newsAndEvents = JSON.parse(fs.readFileSync("./src/Data/new&Event.json"));
data = { ...data, ...newsAndEvents };

const sliders = JSON.parse(fs.readFileSync("./src/Data/slider.json"));
data = { ...data, ...sliders };

const terms = JSON.parse(fs.readFileSync("./src/Data/term.json"));
data = { ...data, ...terms };

// Ghi dữ liệu data vào file JSON mới
fs.writeFileSync("dataMain.json", JSON.stringify(data));
