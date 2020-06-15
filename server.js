const express = require("express");
const { response } = require("express");

const app = express();

app.get("/", (request, response) =>
  response.json({ message: "welcome to the contact keeper api..." })
);

// define routes.
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const Port = process.env.Port || 5000;

app.listen(Port, () => console.log(`server started on port ${Port}`));
