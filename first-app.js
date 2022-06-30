const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/admin", adminRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});
app.listen(3000, () => console.log("App is listening on 3000 port"));
// const server = http.createServer(app);
// server.listen(3000);
