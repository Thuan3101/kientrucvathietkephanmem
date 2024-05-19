const { Router } = require("express");
const InquiryController = require("./../controller/inquiry.controller")
const inquiryRouter = Router();
inquiryRouter.get("/whoami", (req, res, err) => {
  return res.json({
    status: 200,
    message: "Hello from inquiry service!",
  });
});

inquiryRouter.post("/create", InquiryController.createNew)

inquiryRouter.get("/my-inquiry", InquiryController.getMyInquiry)
inquiryRouter.get("/:id", InquiryController.getById)
inquiryRouter.get("/", InquiryController.getAllInquiry)
inquiryRouter.patch("/:id", InquiryController.updateInquiry)

module.exports = inquiryRouter;
