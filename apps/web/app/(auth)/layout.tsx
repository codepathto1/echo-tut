import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-w-screen min-h-screen h-full  items-center justify-center flex flex-col">{children}</div>;
};

export default AuthLayout;
