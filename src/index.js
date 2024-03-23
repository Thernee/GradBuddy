import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

try {
  app.listen(port, () => {
    console.log(`Gradbuddy Server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}