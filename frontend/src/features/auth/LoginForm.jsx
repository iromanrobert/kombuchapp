import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginService from "../../api/login";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const user = await loginService.login({ email, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Kombuchapp account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  value={email}
                  type="email"
                  placeholder="myemail@example.com"
                  onChange={({ target }) => setEmail(target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  value={password}
                  type="password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </Field>
              <Field>
                <Button type="submit">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner /> Signing in..
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </Field>
              <FieldDescription>
                Don&apos;t have an account?{" "}
                <Link to="/register">Sign up here</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="../../src/assets/login-image.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
