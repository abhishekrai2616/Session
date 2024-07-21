const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const db = require("./models");

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Synchronize Sequelize models with the database
db.sequelize.sync()
  .then(() => {
    console.log("Synced with the database.");
  })
  .catch((err) => {
    console.log("Failed to sync with the database: " + err.message);
  });

// Routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/appointment.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
