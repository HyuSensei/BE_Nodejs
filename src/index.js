require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const webRoute = require("./routes/web");
const cors = require("cors");
const apiRoute = require("./routes/api");
const cookieParser = require("cookie-parser");
const configViewEngine = require("./config/viewEngine");
const connection = require("./config/connectDB");
const session = require("express-session");
const flash = require("express-flash");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

configViewEngine(app);

app.use(express.static(__dirname + "/public"));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

connection();

app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  let carts = req.session.cart;
  let total = 0;
  let sum = 0;
  for (let i = 0; i < carts.length; i++) {
    sum = carts[i].price * carts[i].quantity;
    total += sum;
  }
  res.locals.cart = req.session.cart;
  res.locals.total = total;
  next();
});
app.use((req, res, next) => {
  if (
    !req.cookies.UserId ||
    !req.cookies.name ||
    !req.cookies.username ||
    !req.cookies.email ||
    !req.cookies.phone ||
    !req.cookies.address
  ) {
    res.locals.UserId = "";
    res.locals.name = "";
    res.locals.username = "";
    res.locals.email = "";
    res.locals.phone = "";
    res.locals.address = "";
  }
  res.locals.UserId = req.cookies.UserId;
  res.locals.name = req.cookies.name;
  res.locals.username = req.cookies.username;
  res.locals.email = req.cookies.email;
  res.locals.phone = req.cookies.phone;
  res.locals.address = req.cookies.address;
  next();
});

app.use("/", webRoute);
app.use("/api/v1/", apiRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
