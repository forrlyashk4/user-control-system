import React from "react";
import { AuthForm } from "@/features/auth";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const nav = useNavigate();

  return (
    <Flex justify="center" align="center">
      <AuthForm onRedirect={() => nav("/users", { replace: true })} />
    </Flex>
  );
}
