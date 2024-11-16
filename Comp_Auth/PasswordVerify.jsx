import React, { useEffect } from "react";
import queryString from "query-string";
import AuthLayout from "./AuthLayout";
import { TypographyH2, TypographyMuted } from "../ui/typography";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { LoaderButton } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api";
import toast from "react-hot-toast";

const PasswordVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, resetToken } = queryString.parse(location.search);

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => {
      navigate("/login");
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  useEffect(() => {
    if (!resetToken || !email) {
      navigate("/login");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      if (formData.password !== formData.confirmPassword) {
        toast.error("Password does not match");
        return;
      }
      resetPasswordMutation.mutate({ ...formData, email, resetToken });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-2">
        <TypographyH2>Reset Password</TypographyH2>
        <TypographyMuted>
          Provide your new password to contiue using your account.
        </TypographyMuted>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col gap-5">
          <Input
            name="password"
            required
            placeholder="Password"
            type="password"
          />
          <Input
            name="confirmPassword"
            required
            placeholder="Confirm Password"
            type="password"
          />
        </div>
        <LoaderButton
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

export default PasswordVerify;
