import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TypographyH2, TypographyMuted, TypographyP } from "../ui/typography";
import { Input } from "../ui/input";
import { LoaderButton } from "../ui/button";
import { login, resendVerification } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "../../lib/store";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.data.verified) {
        setUser(res.data);
        navigate("/app");
      } else {
        resendVerification({ email: res.data.email });
        sessionStorage.setItem("notVerified", res.data.email);
        navigate("/not-verified");
      }
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      loginMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout
      footer={
        <TypographyP className="text-base">
          New here?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            <b>Join now</b>
          </Link>
        </TypographyP>
      }
    >
      <div className="flex flex-col gap-2">
        <TypographyH2>Sign in</TypographyH2>
        <TypographyMuted>
          Stay tuned with latest job information
        </TypographyMuted>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col gap-5">
          <Input
            name="email"
            required
            placeholder="Email Address"
            type="email"
          />
          <div>
            <Input
              name="password"
              required
              placeholder="Password"
              type="password"
            />
            <div className="flex justify-end">
              <Link
                to="/reset-password"
                className="text-sm mt-1 text-muted-foreground hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
        <LoaderButton
          isLoading={loginMutation.isPending}
          type="submit"
          size="lg"
          className="bg-blue-500 rounded-full"
        >
          Sign in
        </LoaderButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
