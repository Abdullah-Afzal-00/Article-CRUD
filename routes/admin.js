const express = require("express");
const fs = require("fs");
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

const saveError = (e) => {
  var dir = "./logs";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const nameOfFile = new Date();
  console.log(nameOfFile);
  const year = nameOfFile.getFullYear();
  const month = ("0" + (nameOfFile.getMonth() + 1)).slice(-2);
  const day = ("0" + nameOfFile.getDate()).slice(-2);
  const hour = nameOfFile.getHours();
  const minute = nameOfFile.getMinutes();
  const seconds = nameOfFile.getSeconds();
  console.log(`${day}/${month}/${year} ${hour}:${minute}:${seconds}.log`);
  const name =
    day +
    "-" +
    month +
    "-" +
    year +
    "---" +
    hour +
    "-" +
    minute +
    "-" +
    seconds +
    ".log";
  console.log("name ", name);
  console.log("e", e);
  fs.writeFile(`logs\\${name}`, `${e}`, (errr) => console.log(errr));
  // fs.writeFile(`${}/${}/${}-${}:${}:${seconds}.log`, `${e}`, (errr) => console.log(errr));
};

router.post("/", (req, res, next) => {
  console.log("request", req.body);
  if (
    req.body != {} &&
    req.body.data != {} &&
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
    res.status(200).send("Article Added");
    console.log(data);
  } else {
    saveError("Data is incomplete");
    res.status(400).send("Data is incomplete");
  }
});

const isSlugValid = (req, res, next) => {
  if (req.slug > 0 && req.slug <= data.length) next();
  else {
    saveError("caught in middleware");
    res.status(400).send("caught in middleware");
  }
};

const slugEmbed = (req, res, next) => {
  console.log(typeof +req.params.slug);
  let value = +req.params.slug;
  if (req.params.slug === '""') {
    saveError("Not a valid Slug");
    res.status(400).send("Not a valid Slug");
  } else {
    req.slug = req.params.slug;
    console.log(req.slug);
    next();
  }
};
router.get("/:slug", slugEmbed, isSlugValid, (req, res, next) => {
  res.status(200).send(data[req.params.slug - 1]);
});

router.put("/:slug", (req, res, next) => {
  if (req.params.slug > 0 && req.params.slug <= data.length) {
    console.log(req.body);
    if (req.body != {}) {
      if (req.body.hasOwnProperty("title") && req.body.title != "") {
        data[req.params.slug - 1].title = req.body.title;
      }
      if (
        req.body.hasOwnProperty("description") &&
        req.body.description != ""
      ) {
        data[req.params.slug - 1].description = req.body.description;
      }
      if (req.body.hasOwnProperty("tags") && req.body.tags != []) {
        data[req.params.slug - 1].tags = req.body.tags;
      }
      if (req.body.hasOwnProperty("body") && req.body.body != "") {
        data[req.params.slug - 1].body = req.body.body;
      }
      console.log(data[req.params.slug - 1]);
      res.status(200).send("Updated");
    } else {
      saveError("The request body is empty");
      res.status(400).send("The request body is empty");
    }
    //res.send(data[req.params.slug - 1]);
    //console.log(data[req.slug -1])
  } else {
    saveError("Invalid Slug");
    res.status(400).send("Invalid Slug");
  }
});
router.delete("/:slug", (req, res, next) => {
  if (req.params.slug > 0 && req.params.slug <= data.length) {
    data[req.params.slug - 1] = {};
    data[req.params.slug - 1].slug = req.params.slug;
    res.status(200).send("Deleted");
    console.log(data);
    //res.send(data[req.params.version - 1]);
    //console.log(data[req.slug -1])
  } else {
    saveError("Invalid Slug");
    res.status(400).send("Invalid Slug");
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
