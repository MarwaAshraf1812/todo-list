import { mutation } from "../../_generated/server";
import { v } from "convex/values";

const TaskInput = {
  title: v.string(),
  userId: v.string(),
  category: v.string(),
  status: v.string(),
  createdAt: v.number(),
};

export const addTask = mutation({
  args: TaskInput,
  handler: async ({ db }, { title, userId, category, status }) => {
    await db.insert("tasks", { title,
      userId,
      completed: false,
      status,
      category,
      createdAt: Date.now(),
    });
  },
});
