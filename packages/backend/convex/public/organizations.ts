import { v } from "convex/values";
import { action } from "../_generated/server";
import { createClerkClient } from "@clerk/backend";

const clerkSecretkey = process.env.CLERK_SECRET_KEY;
if (clerkSecretkey === undefined) throw new Error("Missing CLERK_SECRET_KEY");

const clerkClient = createClerkClient({ secretKey: clerkSecretkey });

export const validate = action({
  args: {
    organizationId: v.string(),
  },
  handler: async (_, args) => {
    try {
      await clerkClient.organizations.getOrganization({ organizationId: args.organizationId });
      return { valid: true, reason: "Valid Organization" };
    } catch (error) {
      console.log(error);
      return { valid: false, reason: "Error Validation Organization!" };
    }
  },
});
