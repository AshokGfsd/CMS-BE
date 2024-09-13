const mongoose = require("mongoose");
const app = require("./app");
const { MONGODB_URI, PORT } = require("./utils/config");

console.log("connecting to Mongo DB....");

mongoose.connect(MONGODB_URI).then(() => {
  console.log("connected successfully!");
  app.listen(PORT, () => {
    console.log(`The server is running on http://127.0.0.1:${PORT}`);
  });
});
