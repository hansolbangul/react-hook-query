import { useMutation } from "@tanstack/react-query";
import { queryInit, MutationMap } from "../config";

interface UseMutationProps<ResourceName extends string> {
  resource: ResourceName;
  params?: MutationParams<ResourceName>;
}

type MutationParams<ResourceName extends string> =
  ResourceName extends keyof MutationMap
    ? MutationMap[ResourceName]["params"]
    : never;

export function useMutationItem<
  ResourceName extends string,
  ResponseType = unknown,
>({ resource, params = {} }: UseMutationProps<ResourceName>) {
  const config = queryInit().getMutation(resource);

  if (!config) {
    throw new Error(`Resource ${resource} is not initialized.`);
  }

  const mergedParams = { ...config.params, ...params };

  return useMutation<ResponseType>({
    mutationFn: () => config.mutationFn(mergedParams),
  });
}
