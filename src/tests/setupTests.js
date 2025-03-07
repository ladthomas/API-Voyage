const { execSync } = require("child_process");
const path = require("path");

// reinitialisee la base de données avant chaque test
beforeAll(() => {
  const dbPath = path.resolve(__dirname, "../config/db.sqlite");
  execSync(`rm -f ${dbPath}`);
});
