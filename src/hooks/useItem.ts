import { useQuery } from "@tanstack/react-query";
import { queryInit, ResourceMap } from "../config";
interface UseItemProps<ResourceName extends string> {
  resource: ResourceName;
  params?: ResourceParams<ResourceName>;
}

type ResourceParams<ResourceName extends string> =
  ResourceName extends keyof ResourceMap
    ? ResourceMap[ResourceName]["params"]
    : never;

export function useItem<ResourceName extends string, ResponseType = unknown>({
  resource,
  params,
}: UseItemProps<ResourceName>) {
  const config = queryInit().getConfig(resource);

  if (!config) {
    throw new Error(`Resource ${resource} is not initialized.`);
  }

  const mergedParams = { ...config.params, ...params };

  const paramsArray = Object.values(mergedParams).map((value) => String(value));

  const queryKey = [resource, ...paramsArray];

  return useQuery<ResponseType>({
    queryKey,
    queryFn: () => config.queryFn(mergedParams),
  });
}
