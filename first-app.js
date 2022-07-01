const express = require("express");
const fs = require("fs");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/shop");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const printTime = (req, res, next) => {
  console.log(Date.now());
  next();
};
app.use(printTime);

app.use("/admin", adminRoutes);
app.use(userRoutes);

app.get("/logs", (req, res, next) => {
  dirname = "D:\\Node Projects\\first-step\\logs";
  fs.readdir(dirname, (err, files) => {
    if (err) console.log(err);
    else {
      // console.log("\\nCurrent directory filenames:");
      // files.forEach((file) => {
      //   console.log(file);
      // });
      res.status(200).send(files);
    }
  });
});
app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(3000, () => console.log("App is listening on 3000 port"));
// const server = http.createServer(app);
// server.listen(3000);
