const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

/**
 * @swagger
 * /products/image:
 *   post:
 *     summary: Upload an image
 *     description: Uploads an image file
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fileName:
 *                   type: string
 *                   description: Name of the uploaded file
 */
router.post("/image", auth, async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ fileName: res.req.file.filename });
  });
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product details by ID
 *     description: Retrieve product details by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to retrieve
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [array]
 *         description: The type of the id parameter. If set to 'array', the id parameter should be a comma-separated list of IDs.
 *     responses:
 *       '200':
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get("/:id", async (req, res, next) => {
  const type = req.query.type;
  let productIds = req.params.id;

  if (type === "array") {
    // id=32423423423,345345345345345,345345345
    // productIds = ['32423423423', '345345345345345345', '345345345345345']

    let ids = productIds.split(",");
    console.log(ids);
    productIds = ids.map((item) => {
      return item;
    });
  }

  // productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져옵니다.
  try {
    const product = await Product.find({ _id: { $in: productIds } }).populate(
      "writer"
    );
    console.log(product);

    return res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products
 *     description: Retrieve a list of products based on search criteria
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Sort order ('asc' or 'desc')
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of products to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Number of products to skip
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term for filtering products
 *       - in: query
 *         name: filters
 *         schema:
 *           type: object
 *         description: Filters for querying products
 *     responses:
 *       '200':
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get("/", async (req, res, next) => {
  // asc 오름차순  , desc 내림차순
  const order = req.query.order ? req.query.order : "desc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const term = req.query.searchTerm;

  let findArgs = {};
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          //Greater than equal
          $gte: req.query.filters[key][0],
          //Less than equal
          $lte: req.query.filters[key][1],
        };
      } else {
        findArgs[key] = req.query.filters[key];
      }
    }
  }

  if (term) {
    findArgs["$text"] = { $search: term };
  }

  console.log(findArgs);

  try {
    const products = await Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    const productsTotal = await Product.countDocuments(findArgs);
    const hasMore = skip + limit < productsTotal ? true : false;

    return res.status(200).json({
      products,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Product created successfully
 */
router.post("/", auth, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
