import { execSync } from "node:child_process";

execSync(
  "wrangler d1 execute ACCESS_CODES_DB --file=./src/db/schema.sql --env dev --local",
  {
    stdio: "inherit",
  },
);

execSync(
  "wrangler d1 execute ACCESS_CODES_DB --file=./src/db/seed.sql --env dev --local",
  {
    stdio: "inherit",
  },
);
