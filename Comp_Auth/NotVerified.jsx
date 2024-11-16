import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { IoMdMailUnread } from "react-icons/io";
import { iconProps } from "../../lib/utils";
import { TypographyP } from "../ui/typography";

const NotVerified = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const e = sessionStorage.getItem("notVerified");
    if (!e) {
      navigate("/login");
    } else {
      setEmail(e);
    }
  }, []);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center gap-4">
        {email ? (
          <>
            <IoMdMailUnread {...iconProps} size="3em" />
            <div className="text-center">
              <TypographyP className="text-sm leading-normal">
                A verification email has been sent to <b>{email}</b>. <br />
                Please check your inbox and follow the instructions to verify
                <br />
                your account.
              </TypographyP>
            </div>
          </>
        ) : (
          <div className="loader-lg"></div>
        )}
      </div>
    </AuthLayout>
  );
};

export default NotVerified;
