const AssessmentController = require("./../controller/assessment.controller")
const assessmentRouter = require("express").Router()
const AuthMiddleware = require("./middleware/auth")
assessmentRouter.get("/whoami", (req, res, err) => {
    return res.json({
        status: 200,
        message: "Hello from assessment service!",
    });
});
assessmentRouter.use(AuthMiddleware.protectApi, AuthMiddleware.restrictTo('staff', 'admin'))

assessmentRouter.post("/create", AssessmentController.createNew)
assessmentRouter.get("/", AssessmentController.getAllAssessment)
assessmentRouter.get("/:id", AssessmentController.getById)
assessmentRouter.patch("/:id", AssessmentController.updateById)

module.exports = assessmentRouter;
