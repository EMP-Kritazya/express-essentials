const port = 8000;
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const router = express.Router();

router.use((req, res, next) => {
  console.log("Time:", new Date(Date.now()).toString());
  next();
});

router.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Requested URL: ", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type: ", req.method);
    next();
  },
);

router.get(
  "/user/:id",
  (req, res, next) => {
    if (req.params.id === "0") {
      next("route");
    } else next();
  },
  (req, res, next) => {
    res.send("Hello Average User");
  },
);

router.get("/user/:id", (req, res, next) => {
  console.log(req.params.id);
  res.send("Hello Admin");
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server Started at: http://localhost:${port}`);
});
