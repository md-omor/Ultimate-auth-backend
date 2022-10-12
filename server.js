const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// import external routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");

// app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "*",
    })
  );
}

// Routes middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

// Database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connnect"))
  .catch((err) => console.log(err.message));

// PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
