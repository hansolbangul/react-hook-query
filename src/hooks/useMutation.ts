import { useMutation } from "@tanstack/react-query";
import { queryInit } from "../config";
import { UseMutationProps } from "./type.ts";

export function useMutationItem<
  ResourceName extends string,
  ResponseType = unknown,
>({ resource, params }: UseMutationProps<ResourceName>) {
  const config = queryInit().getMutation(resource);

  if (!config) {
    throw new Error(`Resource ${resource} is not initialized.`);
  }

  const mergedParams = { ...config.params, ...params };

  return useMutation<ResponseType>({
    mutationFn: () => config.mutationFn(mergedParams),
  });
}
