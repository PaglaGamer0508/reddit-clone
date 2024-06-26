import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer than 2 characters" })
    .max(128, { message: "Title can't be longer than 128 characters" }),
  subredditId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
