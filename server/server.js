const express = require("express");
const cors = require("cors");

const db_name = "Pet_Database";
const port = 8000;

require("./config/mongoose.config")(db_name);

const app = express();
app.use(cors());
app.use(express.json());

require("./routes/pet.routes")(app);

app.listen(port, () => console.log(`Listening on port ${port}`));