// Note to self: server.js loads env, connects DB, then starts Express server.
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Note to self: connect to MongoDB using the URI from .env
    await connectDB(process.env.MONGO_URI);

    // Note to self: binding to 127.0.0.1 ensures localhost connections work
    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Server listening on http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
}

startServer();

