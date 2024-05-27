const { Router } = require("express");
const InquiryController = require("./../controller/inquiry.controller")
const AuthMiddleware = require('./middleware/auth')
const inquiryRouter = Router();
inquiryRouter.get("/whoami", (req, res, err) => {
  return res.json({
    status: 200,
    message: "Hello from inquiry service!",
  });
});

inquiryRouter.use(AuthMiddleware.protectApi)

inquiryRouter.post("/create", AuthMiddleware.restrictTo('customer'), InquiryController.createNew)

inquiryRouter.get("/my-inquiry", AuthMiddleware.restrictTo('customer'), InquiryController.getMyInquiry)
inquiryRouter.get("/:id", InquiryController.getById)
inquiryRouter.get("/", InquiryController.getAllInquiry)
inquiryRouter.patch("/:id", InquiryController.updateInquiry)

module.exports = inquiryRouter;
