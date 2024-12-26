import { mutation } from "../../_generated/server";
import { v } from "convex/values";


export const updateTask = mutation({
  args: {
    taskId: v.id("tasks"),
    status: v.string(),
  },
  handler: async ({ db }, { taskId, status }) => {
    return db.patch(taskId, {
      status,
      updatedAt: Date.now(),
    });
  },
});
