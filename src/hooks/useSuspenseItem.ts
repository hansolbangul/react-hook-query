import { UseItemProps } from "./type.ts";
import { queryInit } from "../config";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseItem<
  ResourceName extends string,
  ResponseType = unknown,
>({ resource, params, options }: UseItemProps<ResourceName, ResponseType>) {
  const config = queryInit().getConfig(resource);

  if (!config) {
    throw new Error(`Resource ${resource} is not initialized.`);
  }

  const mergedParams = { ...config.params, ...params };

  const paramsArray = Object.values(mergedParams).map((value) => String(value));

  const queryKey = [resource, ...paramsArray];

  return useSuspenseQuery<ResponseType>({
    queryKey,
    queryFn: () => config.queryFn(mergedParams),
    ...options,
  });
}
