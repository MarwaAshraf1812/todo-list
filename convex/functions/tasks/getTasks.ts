import { query } from "../../_generated/server";

export const getTasks = query({
  handler: async ({ db }) => {
    return await db
      .query("tasks")
      .collect();
  },
});
