import React from "react";
import { Router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export const App = () => (
  <QueryClientProvider client={client}>
    <Router />
  </QueryClientProvider>
);
