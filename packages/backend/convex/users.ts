import { mutation, query } from "./_generated/server";

export const getAllUser = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const addUsers = mutation({
  handler: async (ctx) => {
    ctx.db.insert("users", { name: "Jason" });
  },
});
