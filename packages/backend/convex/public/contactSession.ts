import { v } from "convex/values";
import { mutation } from "../_generated/server";

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    organizationId: v.string(),
    metadata: v.optional(
      v.object({
        userAgent: v.optional(v.string()),
        ipAddress: v.optional(v.string()),
        language: v.optional(v.string()),
        languages: v.optional(v.array(v.string())),
        timeZone: v.optional(v.string()),
        timezoneOffset: v.optional(v.number()),
        screenResolution: v.optional(v.string()),
        referrer: v.optional(v.string()),
        currentUrl: v.optional(v.string()),
        cookiesEnabled: v.optional(v.boolean()),
        vendor: v.optional(v.string()),
        viewPortSize: v.optional(v.string()),
        platform: v.optional(v.string()),
      }),
    ),
  },
  handler(ctx, args) {
    const timeNow = Date.now();
    const expiresAt = timeNow + SESSION_DURATION_MS;
    const contactSessionId = ctx.db.insert("contactSession", {
      name: args.name,
      email: args.email,
      organizationId: args.organizationId,
      expiresAt: expiresAt,
      metaData: args.metadata,
    });
    return contactSessionId;
  },
});

export const validate = mutation({
  args: {
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);
    if (!contactSession) {
      return { valid: false, reason: "No contact session found!" };
    }
    if (contactSession.expiresAt < Date.now()) {
      return { valid: false, reason: "Session Expired!" };
    }
    return { valid: true };
  },
});
