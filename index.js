const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("views"));

app.use("/", (req, res) => {
  res.redirect("main");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
