import z from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(3, "title minimum 3 characters")
    .max(250, "title maximum 100 characters"),
  description: z
    .string()
    .min(5, "description minimum 5 characters")
    .max(1000, "description maximum 1000 characters"),

  price: z.coerce.number().min(1, "price cannot be empty"),
  stock: z.coerce.number().min(1, "stock cannot be empty"),
  minimumOrderQuantity: z.coerce.number().int().min(1).default(1),

  rating: z.coerce.number().min(0).max(5).default(0),

  returnPolicy: z.string().optional().default("no return policy"),
  categoryId: z.string().min(1, "Please select a category"),
});

export const categorySchema = z.object({
  name: z.string().min(3, "name minimum 3 character"),
  slug: z.string().min(3, "slug minimum 3 character"),
});
