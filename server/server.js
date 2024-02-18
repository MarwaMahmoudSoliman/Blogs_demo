require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const morgan = require("morgan")
const path = require("path");
const  mongoose  = require("mongoose");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
app.use(morgan("dev"))
app.use(cookieParser());

app.use(router);

app.use("/api/blog",express.static(path.join(__dirname,"/uploads")))
mongoose.connect(process.env.DB_CONNECTION_STRING)
        .then(()=>console.log("connected to DB............."))
        .catch((e)=>console.log({Error : e.message}))


app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ status: "error", message: "this resource is not avalible" });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
