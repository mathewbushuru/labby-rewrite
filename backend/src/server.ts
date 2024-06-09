import app from "./app";
import { logDatabaseVersion } from "./config/database";

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`Checklists API running on port ${port}`);
  await logDatabaseVersion();
});
