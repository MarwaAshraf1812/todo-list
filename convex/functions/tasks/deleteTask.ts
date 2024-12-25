import { mutation } from "../../_generated/server";
import { v } from "convex/values";


const DeleteTaskInput = {
  id: v.id("tasks"),
};

export const deleteTask =  mutation({
  args: DeleteTaskInput,
  handler: async ({ db }, { id}) => {
    await db.delete(id);
  },
});