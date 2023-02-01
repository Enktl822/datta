const bodyParser = require("body-parser");
const { response, request } = require("express");
const express = require("express"); // export hiij oruulk irlee
const fs = require("fs");

const port = 2022;
const cors = require("cors");
const app = express(); //express gedeg zuiliig ajluulaad app geed nerlej baigaa

app.use(cors());
app.use(bodyParser.json());

app.get("/products", (request, response) => {
  //frontenad -es get gedeg huselt yavuulna  / front-edn ees huselt orj irehdee get gedeg method-oor / arrow function huselt request-eer orj irj bga , response-oor butsah utga damjina
  console.log("get product huselt orj irlee");

  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      response.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      response.status(200).send(data);
    }
  });
});

app.get("/users", (request, response) => {
  console.log("Get products request orj irlee");
  response.json();
});

app.get("/product/:id", (request, response) => {
  const prodId = request.params.id;
  const foundProduct = products.find((product) => product.id === prodId);

  if (foundProduct) {
    response.json(foundProduct);
  } else {
    response.status(404).send({ message: "Product not found" });
  }
});

app.post("/add", (request, response) => {
  console.log("Post request orj irlee : ", request.body);

  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      response.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      products.push(request.body);
      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          response.status(500).send({ message: err });
        } else {
          response
            .status(200)
            .send({ message: "Product added successfully added" });
        }
      });
    }
  });
});

app.get("/users", (request, response) => {
  console.log("Get products request oroj irlee");
  response.send("");
  response.status(200).send("products xaa xaa xaa");
});

app.delete("/product/:id", (request, response) => {
  // console.log("Delete request orj irlee id : ", id);

  // console.log("product : ", product);

  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      response.status(500).send({ message: err });
    } else {
      let products = JSON.parse(data);

      const id = request.params.id;
      const product = products.filter((product) => product.id !== id);
      const deleted = products.filter((product) => product.id === id);
      products = product;
      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          response.status(500).send({ message: err });
        } else {
          response.status(200).send({ success: true, data: products });
        }
      });

      fs.readFile("./data/old.json", (err, data) => {
        if (err) {
          response.status(500).send({ message: err });
        } else {
          const products = JSON.parse(data);
          console.log(products);
          products.push(deleted);
          fs.writeFile("./data/old.json", JSON.stringify(products), (err) => {
            if (err) {
              response.status(500).send({ message: err });
            } else {
              response
                .status(200)
                .send({ message: "Product added successfully added" });
            }
          });
        }
      });

      fs.writeFile("./data/old.json", JSON.stringify(deleted), (err) => {
        if (err) {
          response.status(500).send({ message: err });
        } else {
          response.status(200).send({ success: true, data: products });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is starting in ${port} port`);
});
