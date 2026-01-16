"use client";

import {cn} from "@/lib/utils";
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
import React, {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Loader} from "lucide-react";

export function LoginForm({className, ...props}: React.ComponentProps<"div">) {
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const {push} = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsloading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.error) {
        switch (res.error) {
          case "Configuration":
            setError("⛔ Your account has been disabled by Admin.");
            break;
          case "CredentialsSignin":
            setError("incorrect email or password");
            break;
          default:
            setError("A system error occurred, please try again.");
        }
        return;
      }

      if (res.ok) {
        push("/");
        return;
      }
    } catch {
      setError("connection failed");
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 text-sm font-medium">
          {error}
        </div>
      )}
       <div className="text-center font-bold">
        <p>admin@admin.com</p>
        <p>Admin1234</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input name="password" id="password" placeholder="********" type="password" required />
              </Field>
              <Field>
                <Button type="submit">
                  {" "}
                  {isLoading ? (
                    <div className="animate-spin">
                      <Loader />
                    </div>
                  ) : (
                    "LOGIN"
                  )}
                </Button>
                <Button
                  onClick={() => signIn("google")}
                  variant="outline"
                  type="button"
                >
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
