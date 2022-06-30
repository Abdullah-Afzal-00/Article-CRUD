const express = require("express");
const data = [
  {
    title: "The title",
    description: "The Descripion",
    body: "The Body",
    tags: ["tag1", "tag2"],
    slug: 1,
  },
  {
    title: "The title",
    description: "The Descripion",
    body: "The Body",
    tags: ["tag1", "tag2"],
    slug: 2,
  },
  {
    title: "The title",
    description: "The Descripion",
    body: "The Body",
    tags: ["tag1", "tag2"],
    slug: 3,
  },
  {
    title: "The title",
    description: "The Descripion",
    body: "The Body",
    tags: ["tag1", "tag2"],
    slug: 4,
  },
  {
    title: "The title",
    description: "The Descripion",
    body: "The Body",
    tags: ["tag1", "tag2"],
    slug: 5,
  },
];

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
    console.log(req.body);
    if (req.body != {}) {
      if (req.body.hasOwnProperty("title") && req.body.title != "") {
        data[req.params.version - 1].title = req.body.title;
      }
      if (
        req.body.hasOwnProperty("description") &&
        req.body.description != ""
      ) {
        data[req.params.version - 1].description = req.body.description;
      }
      if (req.body.hasOwnProperty("tags") && req.body.tags != []) {
        data[req.params.version - 1].tags = req.body.tags;
      }
      if (req.body.hasOwnProperty("body") && req.body.body != "") {
        data[req.params.version - 1].body = req.body.body;
      }
      console.log(data[req.params.version - 1]);
      res.send("Updated");
    } else {
      res.send("The request body is empty");
    }
    //res.send(data[req.params.version - 1]);
    //console.log(data[req.slug -1])
  } else {
    res.send("Invalid Slug");
  }
});
router.delete("/delete-article/:version", (req, res, next) => {
  if (req.params.version > 0 && req.params.version <= data.length) {
    data[req.params.version - 1] = {};
    data[req.params.version - 1].slug = req.params.version;
    res.send("Deleted");
    console.log(data);
    //res.send(data[req.params.version - 1]);
    //console.log(data[req.slug -1])
  } else {
    res.send("Invalid Slug");
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
