import { mutation, query } from "./_generated/server";

export const getAllUser = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const addUsers = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    const orgId = identity.orgId as string;
    if (!orgId) {
      throw new Error("Missing organization");
    }
    throw new Error("Testing Error Handling ");
    ctx.db.insert("users", { name: "Jason" });
  },
});
