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
  })
});
