// import express from "express";
const port = 8000;

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

function getTime(req, res, next) {
  req.getMyTime = new Date(Date.now()).toString();
  next();
}

function setCookie(res) {
  try {
    res.cookie("name", "Kritazya");
    return true;
  } catch (e) {
    return false;
  }
}

app.use(cookieParser());
// app.use(express.json());
app.use(getTime);

app.get("/", (req, res) => {
  let responseText = `Welcome Aboard<br>`;
  responseText += `<small>Requested at: ${req.getMyTime}</small> <br> + <br> Cookie Set: ${setCookie(res) ? "Successful" : "failed"}`;

  // req.cookies is an object and template string looks for string and if we don't JSON.stringify then it would display an object which our web brower wouldn't know how to show

  console.log(responseText);
  res.send(responseText);
});

// Avg user instance
app.get(
  "/user/:id",
  (req, res, next) => {
    if (req.params.id === "0") {
      next("route");
    } else next();
  },
  (req, res, next) => {
    // Send regular response
    res.send(
      `Hello Average User.<br> Your cookie was set: ${JSON.stringify(req.cookies)}<br> on URL = ${req.originalUrl}`,
    );
  },
);

// priviliged user instance
app.get("/user/:id", (req, res) => {
  res.send(
    `Hello Admin.<br> Your cookie was set ${JSON.stringify(req.cookies)}<br> on URL = ${req.originalUrl}`,
  );
});

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
