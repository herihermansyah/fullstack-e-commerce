import z from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(3, "username minimum 5 character"),
    email: z.string().email("The email is invalid."),
    password: z
      .string()
      .min(8, "password minimum 8 character")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),

    confirmPassword: z
      .string()
      .min(8, "minimum 8 character")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
  })
  .refine((item) => item.password === item.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("The email is invalid."),
  password: z.string().min(8, "min 8 character"),
});

export const editInformationSchema = z.object({
  firstName: z.string().trim().min(2, "First name minimal 2 karakter"),
  lastName: z.string().trim().min(2, "Last name minimal 2 karakter"),
  maidenName: z.string().trim().optional().or(z.literal("")), 

  birthDate: z.coerce
    .date({
      error: () => ({message: "Invalid date of birth format"}),
    })
    .refine((date) => date < new Date(), {
      message: "The date of birth cannot be in the future.",
    }),

  phone: z
    .string()
    .min(10, "The telephone number must consist of at least 10 digits.")
    .regex(/^[0-9+]+$/, "Phone numbers can only contain numbers."),
});

export const addAddressSchema = z.object({
  label: z
    .string()
    .trim()
    .min(2, "Label must be at least 2 characters (example: Home, Office)"),
  fullAddress: z.string().trim().min(5, "Full address minimum 5 characters"),
  city: z.string().trim().min(2, "Invalid city name"),
  postalCode: z
    .string()
    .trim()
    .min(5, "Minimum 5 digit postal code")
    .regex(/^[0-9]+$/, "Postal code must be numeric."),
  province: z.string().trim().min(2, "Invalid province"),
  country: z.string().trim().default("INDONESIA"),
});

export const addBanksSchema = z.object({
  bankName: z
    .string()
    .trim()
    .min(2, "Bank name must be at least 2 characters (Example: BCA, Mandiri)"),

  cardType: z.string().trim().min(3, "Card type minimum 3 characters"),
  cardNumber: z
    .string()
    .trim()
    .min(10, "Card number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Card number must be numbers only"),

  cardHolder: z.string().trim().min(3, "Cardholder name must be at least 3 characters"),
  cardExpire: z
    .string()
    .trim()
    .regex(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Format harus MM/YY (Contoh: 12/28)"
    ),
  currency: z
    .string()
    .trim()
    .min(3, "Currency minimum 3 characters")
    .default("IDR"),
});
