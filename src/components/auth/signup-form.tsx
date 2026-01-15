"use client";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {signUpAction} from "@/feature/user/action/user/signup.action";
import {signUpSchema} from "@/feature/user/schema/userSchema";
import {useState} from "react";
import z from "zod";
import {Eye, EyeClosed} from "lucide-react";

type FormError = z.inferFlattenedErrors<typeof signUpSchema>["fieldErrors"];

export function SignupForm({...props}: React.ComponentProps<typeof Card>) {
  const [error, setError] = useState<FormError | undefined>(undefined);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  async function handleSignUp(formData: FormData) {
    try {
      const result = await signUpAction(formData);
      if (result?.messages) {
        setError(result.messages);
      }
    } catch (err) {
      throw new Error(`error signup ${err}`);
    }
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSignUp}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                name="username"
                id="name"
                type="text"
                placeholder="John Doe"
                required
              />
              {error?.username && (
                <p className="text-sm text-red-500">{error.username}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {error?.email && (
                <p className="text-sm text-red-500">{error.email}</p>
              )}
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input
                  name="password"
                  id="password"
                  type={show ? "text" : "password"}
                  required
                />
                <div
                  className="absolute top-2 right-2 cursor-pointer text-gray-500"
                  onClick={() => setShow((v) => !v)}
                >
                  {" "}
                  {show ? <Eye size={20} /> : <EyeClosed size={20} />}
                </div>
              </div>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Input
                  name="confirmPassword"
                  id="confirm-password"
                  type={show2 ? "text" : "password"}
                  required
                />
                <div
                  className="absolute top-2 right-2 cursor-pointer text-gray-500"
                  onClick={() => setShow2((v) => !v)}
                >
                  {" "}
                  {show2 ? <Eye size={20} /> : <EyeClosed size={20} />}
                </div>
              </div>
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
