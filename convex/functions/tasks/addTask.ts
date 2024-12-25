import { mutation } from "../../_generated/server";
import { v } from "convex/values";

const TaskInput = {
  title: v.string(),
  // userId: v.string(),
};

export const addTask = mutation({
  args: TaskInput,
  handler: async ({ db }, { title}) => {
    await db.insert("tasks", { title, completed: false });
  },
});
