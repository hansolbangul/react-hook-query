import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client.ts";
import { PropsWithChildren } from "react";

export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
