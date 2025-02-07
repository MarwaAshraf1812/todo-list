import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCategories = query({
  handler: async ({ db }) => {
    return await db.query("categories").collect();
  },
})

/**
 * Create a new category
 */
export const createCategory = mutation({
  args: { name: v.string(), userId: v.string() },
  handler: async ({ db }, { name, userId }) => {

    return await db.insert("categories", {
      name,
      userId: userId,
      createdAt: Date.now(),
    });
  },
});

/**
 * Create a new task
 */
export const createTask = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
    categoryId: v.id("categories"),
    description: v.optional(v.string()),
    priority: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async ({ db}, { title, categoryId, priority, status, description, userId }) => {

    return await db.insert("tasks", {
      title,
      userId,
      categoryId,
      completed: false,
      description: description || "",
      priority: priority || "Medium",
      status: status || "Pending",
      createdAt: Date.now(),
    });
  },
});

/**
 * Get all tasks for a specific user
 */
export const getTasksByUser = query({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    return await db.query("tasks").filter((q) => q.eq("userId", userId)).collect();
  },
});

/**
 * Get tasks for a specific category
 */
export const getTasksByCategory = query({
  args: { categoryId: v.id("categories") },
  handler: async ({ db }, { categoryId }) => {
    return await db.query("tasks").filter((q) => q.eq(q.field("categoryId"), categoryId)).collect();
  },
});

/**
 * Update a task (e.g., mark as completed, change priority/status)
 */
export const updateTask = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.optional(v.string()),
    completed: v.optional(v.boolean()),
    priority: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async ({ db }, { taskId, title, completed, priority, status }) => {
    return await db.patch(taskId, {
      ...(title !== undefined && { title }),
      ...(completed !== undefined && { completed }),
      ...(priority !== undefined && { priority }),
      ...(status !== undefined && { status }),
      updatedAt: Date.now(),
    });
  },
});

/**
 * Delete a task
 */
export const deleteTask = mutation({
  args: { taskId: v.id("tasks") },
  handler: async ({ db }, { taskId }) => {
    await db.delete(taskId);
  },
});
