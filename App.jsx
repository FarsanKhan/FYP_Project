import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./components/Auth/Authentication";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./index.css";
import AppRoutes from "./components/AppRoutes";
import Landing from "./components/Home/Landing";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 10000 } },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={<Authentication />} />
          <Route path="/app/*" element={<AppRoutes />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
