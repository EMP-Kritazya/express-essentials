const port = 8000;
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const router = express.Router();

app.listen(port, () => {
  console.log(`Server Started at: http://localhost:${port}`);
});
