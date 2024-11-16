import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, footer }) => {
  return (
    <div className="flex flex-col h-full w-full" id="auth-layout">
      <div className="absolute top-[-10px]">
        <Link to="/">
          <img src="/logo.png" alt="logo" width={250} height="auto" />
        </Link>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className="flex flex-col p-6 rounded-md gap-8 min-w-[420px]"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        >
          {children}
        </div>
        <div className="mt-5">{footer}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
