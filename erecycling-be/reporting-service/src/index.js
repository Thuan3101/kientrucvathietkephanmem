const port = 8083;
const app = require("./express-app")
async function startServer() {
  try {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Application is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
