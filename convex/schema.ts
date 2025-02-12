import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  categories: defineTable({
    name: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  }),

  tasks: defineTable({
    title: v.string(),
    userId: v.string(),
    completed: v.boolean(),
    priority: v.string(),
    description: v.string(),
    status: v.string(),
    categoryId: v.id("categories"),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),

  task_history: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.optional(v.string()),
    status: v.optional(v.string()),
    userId: v.string(), 
    createdAt: v.number(),
    archivedAt: v.number(),
  }),
});
