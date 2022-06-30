const express = require("express");
const data = [];

const router = express.Router();

router.post("/create-article", (req, res, next) => {
  console.log("request", req.body);
  if (
    req.body.data.title != "" &&
    req.body.data.description != "" &&
    req.body.data.body != "" &&
    req.body.data.tags != []
  ) {
    let article = {};
    article.title = req.body.data.title;
    article.description = req.body.data.description;
    article.body = req.body.data.body;
    article.tags = req.body.data.tags;
    article.slug = data.length + 1;
    data.push(article);
    res.send("Article Added");
    console.log(data);
  } else {
    res.send("Data is incomplete");
  }
});

router.get("/read-article/:version", (req, res, next) => {
  //console.log(req.body.slug);
  //console.log(data.length);
  //console.log("d", data);
  if (req.params.version > 0 && req.params.version <= data.length) {
    //console.log(data[0]);
    res.send(data[req.params.version - 1]);
    //console.log(data[req.slug -1])
  } else {
    res.send("Slug Not Found");
  }
});

router.put("/update-article/:version", (req, res, next) => {
  if (req.params.version > 0 && req.params.version <= data.length) {
    console.log(req.body.body);
    data[req.params.version - 1].body = req.body.body;
    console.log(data[req.params.version - 1]);
    res.send("Updated");
    //res.send(data[req.params.version - 1]);
    //console.log(data[req.slug -1])
  } else {
    res.send("Slug Not Found");
  }
});
router.delete("/delete-article/:version", (req, res, next) => {
  if (req.params.version > 0 && req.params.version <= data.length) {
    data[req.params.version - 1] = {};
    res.send("Deleted");
    console.log(data);
    //res.send(data[req.params.version - 1]);
    //console.log(data[req.slug -1])
  } else {
    res.send("Slug Not Found");
  }
});

// router.get("/read", (req, res, next) => {
//   console.log("In the another middleware !");
//   res.send(
//     "<form action ='/admin/product' method='POST'><input name='title' type='text'></input><button type = submit>Add Product</button></form>"
//   );
// });

// router.post("/product", (req, res, next) => {
//   console.log(req.body.title);
//   res.redirect("/");
// });

module.exports = router;
