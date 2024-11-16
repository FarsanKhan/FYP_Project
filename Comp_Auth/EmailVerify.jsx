import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { TypographyP } from "../ui/typography";
import queryString from "query-string";
import { Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { verifyUser } from "../../api";
import { FaTimes } from "react-icons/fa";

const EmailVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyToken } = queryString.parse(location.search);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const verifyUserMutation = useMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (error) => {
      setError(error.response.data.error);
    },
  });

  useEffect(() => {
    if (!verifyToken) {
      navigate("/login");
    } else {
      verifyUserMutation.mutate({ verifyToken });
    }
  }, []);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center gap-4">
        {verifyToken && success ? (
          <>
            <div className="flex flex-col pt-3 gap-3 justify-center items-center">
              <div className="flex justify-center items-center w-14 h-14 rounded-full bg-green-600">
                <Check color="white" size="2.5em" />
              </div>
              <TypographyP className="text-center leading-normal">
                Your email has been verified. <br />
                <Link to="/login" className="text-blue-500">
                  Click here to login
                </Link>
              </TypographyP>
            </div>
          </>
        ) : error ? (
          <div className="flex flex-col pt-3 gap-3 justify-center items-center">
            <div className="flex justify-center items-center w-14 h-14 rounded-full bg-red-600">
              <FaTimes color="white" size="2.5em" />
            </div>
            <TypographyP className="text-center leading-normal">
              {error}
            </TypographyP>
          </div>
        ) : (
          <div className="loader-lg"></div>
        )}
      </div>
    </AuthLayout>
  );
};

export default EmailVerify;
