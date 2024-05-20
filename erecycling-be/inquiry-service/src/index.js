const {PORT} = require("./common/app-constant")
const app = require("./express-app")
async function startServer() {
  try {
    await require("./utils/db-connection").connect()
    app.listen(PORT, () => {
      console.log(`Inquiry Service is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
