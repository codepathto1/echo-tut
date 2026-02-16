import { mutation, query } from "./_generated/server";

export const getAllUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.query("users").collect();
  },
});

export const addUsers = mutation({
  handler: async (ctx) => {
    ctx.db.insert("users", { name: "Jason" });
  },
});
