const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
    },
  },
  apis: ["src/index.js"],
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res, next) => {
  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: hello world
   */
  //res.send("Hello World 하이하이");

  //throw new Error("error");

  setImmediate(() => {
    next(new Error("error"));
  });
});

app.post("/upload", (req, res) => {
  /**
   * @swagger
   * /upload:
   *   post:
   *     description: Upload data
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 description: The data to upload.
   *     responses:
   *       200:
   *         description: Successfully uploaded data
   */
  console.log(req.body);
  res.json(req.body);
});

// Error handling => 비동기 요청으로 인한 에러는 처리 불가능
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });

  res.status(res.statusCode || 500);
  res.send(error.message || "Internal Server Error");
  res.send("error");
});

app.use("/users", require("./routes/users"));

app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(port, () => console.log(`Server is running on port ${port}`));
