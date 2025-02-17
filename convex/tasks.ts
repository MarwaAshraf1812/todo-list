import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCategories = query({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    return await db.query("categories")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();
  },
});

export const deleteCategory = mutation({
  args: { categoryId: v.id("categories") },
  handler: async ({ db }, { categoryId }) => {
      const category = await db.get(categoryId);

      if (!category) {
        throw new Error("Category not found.");
      }

      await db.delete(categoryId);
  }
});

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
      priority: priority || "Low",
      status: status || "Todo",
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
    return await db.query("tasks")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();
  },
});

/**
 * Get tasks for a specific category
 */
export const getTasksByCategory = query({
  args: { 
    categoryId: v.id("categories"),
    userId: v.string()
  },
  handler: async ({ db }, { categoryId, userId }) => {
    return await db.query("tasks")
      .filter(q => 
        q.and(
          q.eq(q.field("categoryId"), categoryId),
          q.eq(q.field("userId"), userId)
        )
      )
      .collect();
  },
});

/**
 * Update a task (e.g., mark as completed, change priority/status)
 */
export const updateTask = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    completed: v.optional(v.boolean()),
    priority: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    status: v.optional(v.string()),
  },
  handler: async ({ db }, { taskId, categoryId, title, description, priority, status }) => {
    const task = await db.get(taskId);
    if (!task) throw new Error("Task not found");

    const isCompleted = status === "Completed";

    await db.patch(taskId, {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(priority !== undefined && { priority }),
      ...(categoryId !== undefined && { categoryId }),
      ...(status !== undefined && { status }),
      completed: isCompleted,
      updatedAt: Date.now(),
    });

    if (isCompleted) {
      const completedTasks = await db
        .query("tasks")
        .filter((q) => q.eq(q.field("completed"), true))
        .order("asc")
        .take(4);

      if (completedTasks.length > 3) {
        const oldestTask = completedTasks[0];

        // ✅ Check if already archived
        const alreadyArchived = await db
          .query("task_history")
          .filter((q) => q.eq(q.field("title"), oldestTask.title))
          .first();

        if (!alreadyArchived) {
          await db.insert("task_history", {
            archivedAt: Date.now(),
            title: oldestTask.title,
            description: oldestTask.description,
            priority: oldestTask.priority,
            status: oldestTask.status,
            userId: oldestTask.userId,
            createdAt: oldestTask.createdAt,
          });

          // ✅ Delete the original task after archiving
          await db.delete(oldestTask._id);
        }
      }
    }
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

// export const archiveTask = mutation({
//   args: { taskId: v.id("tasks") },
//   handler: async ({db}, {taskId}) => {
//     const task = await db.get(taskId);
//     if (!task) throw new Error("Task not found");

//     await db.insert("task_history", {
//       archivedAt: Date.now(),
//       ...task,
//     });

//     await db.delete(taskId);
//   }});


export const getArchivedTasks = query({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    return await db.query("task_history")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();
  },
});

export const deleteAllTasks = mutation({
  handler: async ({ db }) => {
    const tasks = await db.query("task_history").collect();
    for (const task of tasks) {
      await db.delete(task._id);
    }
  }
})
