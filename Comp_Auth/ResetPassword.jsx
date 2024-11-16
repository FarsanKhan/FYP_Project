import React from "react";
import AuthLayout from "./AuthLayout";
import { TypographyH2, TypographyMuted, TypographyP } from "../ui/typography";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { LoaderButton } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { requestReset } from "../../api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();

  const requestResetMutation = useMutation({
    mutationFn: requestReset,
    onSuccess: (res) => {
      navigate("/login");
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      requestResetMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout
      footer={
        <TypographyP className="text-base">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            <b>Join now</b>
          </Link>
        </TypographyP>
      }
    >
      <div className="flex flex-col gap-2">
        <TypographyH2>Reset Password</TypographyH2>
        <TypographyMuted>
          Provide your email to receive instructions to reset <br /> your
          password.
        </TypographyMuted>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col gap-5">
          <div>
            <Input
              name="email"
              required
              placeholder="Email Address"
              type="email"
            />
            <div className="flex justify-end">
              <Link
                to="/login"
                className="text-sm mt-1 text-muted-foreground hover:underline"
              >
                I have my password
              </Link>
            </div>
          </div>
        </div>
        <LoaderButton
          isLoading={requestResetMutation.isPending}
          type="submit"
          size="lg"
          className="bg-blue-500 rounded-full"
        >
          Reset Password
        </LoaderButton>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
