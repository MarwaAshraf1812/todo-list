import { query } from "../../_generated/server";
import { v } from "convex/values";

export const getTasks = query({
  args: {userId: v.string()},
  handler: async ({ db }, { userId } ) => {
    return await db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
  },
});
