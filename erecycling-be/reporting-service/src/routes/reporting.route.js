const { Router } = require("express");
const assessmentRouter = Router();
assessmentRouter.get("/whoami", (req, res, err) => {
  return res.json({
    status: 200,
    message: "Hello from reporting service!",
  });
});

module.exports = assessmentRouter;
