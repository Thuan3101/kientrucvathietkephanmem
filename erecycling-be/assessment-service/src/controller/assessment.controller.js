const AssessmentService = require("./../services/assessment.service");
const ProductService = require("./../services/product.service");
class AssessmentController {
  createNew = async (req, res, next) => {
    try {
      const { inquiry, product, title } = req.body;
      const { sku, name, description, model, likeNewPercent, cost, price, images, dateOfPurchase } = product;
      delete product["_id"];
      console.log(product);
      const newProduct = await ProductService.createNewProduct(product);

      const data = {
        inquiry: inquiry._id,
        checker: {
          id: req.user.id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
        },
        product: newProduct._id,
        title: title,
      };

      const result = await AssessmentService.createNewAssessment(data);
      console.log("cccc");

      return res.json({
        status: 200,
        message: "Inquiry created!",
        data: result,
      });
    } catch (err) {
      return res.json({
        status: 500,
        message: err.message,
      });
    }
  };
  getAllAssessment = async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      const result = await AssessmentService.getAllAssessments(token);
      return res.json({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
      return res.json({
        status: 500,
        message: err.message,
      });
    }
  };

  updateById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const token = req.headers["authorization"];
      const doc = await AssessmentService.updateAssessment(id, req.body, token);
      return res.json({
        status: 200,
        message: "data updated",
        data: doc,
      });
    } catch (err) {
      console.log(err.message);
      return res.json({
        status: 500,
        message: err.message,
      });
    }
  };

  getById = async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      const { id } = req.params;
      const data = await AssessmentService.getById(id, token);
      return res.json({
        status: 200,
        message: "OK",
        data,
      });
    } catch (err) {
      console.log(err.message);
      return res.json({
        status: 500,
        message: err.message,
      });
    }
  };

  restrictTo =
    (...roles) =>
    (req, res, next) => {
      //roles ['admin', 'lead-guide']
      if (!roles.includes(req.user.role)) {
        return next(new AppError("You do not have permission to perform this action", 403));
      }
      next();
    };
}

module.exports = new AssessmentController();
