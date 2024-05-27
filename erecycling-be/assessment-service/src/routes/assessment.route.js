const AssessmentController = require("./../controller/assessment.controller");
const assessmentRouter = require("express").Router();
const AuthMiddleware = require("./middleware/auth");
const productController = require("./../controller/product.controller");
assessmentRouter.get("/whoami", (req, res, err) => {
  return res.json({
    status: 200,
    message: "Hello from assessment service!",
  });
});
assessmentRouter.use(AuthMiddleware.protectApi, AuthMiddleware.restrictTo("staff", "admin"));

assessmentRouter.get("/product", productController.getAllProducts);
assessmentRouter.get("/product/:id", productController.getById);
assessmentRouter.patch("/product/:id", productController.updateById);

assessmentRouter.post("/create", AssessmentController.createNew);
assessmentRouter.get("/", AssessmentController.getAllAssessment);
assessmentRouter.get("/:id", AssessmentController.getById);
assessmentRouter.patch("/:id", AssessmentController.updateById);


module.exports = assessmentRouter;
