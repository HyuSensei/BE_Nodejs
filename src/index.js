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

app.use("/", webRoute);
app.use("/api/v1/", apiRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
