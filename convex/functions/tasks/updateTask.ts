import { mutation } from "../../_generated/server";
import { v } from "convex/values";


const UpdateTaskInput = {
  id: v.id("tasks"), // Ensures the ID is validated as an Id<"tasks">
  title: v.string(),
  // userId: v.string(),
};

export default mutation({
  args: UpdateTaskInput,
  handler: async ({ db }, { id, title}) => {
    await db.patch(id, { title});
  },
});