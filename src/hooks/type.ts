import { MutationMap, ResourceMap } from "../config";
import { UseQueryOptions } from "@tanstack/react-query";
export interface UseItemProps<
  ResourceName extends string,
  ResponseType = unknown,
> {
  resource: ResourceName;
  params?: ResourceParams<ResourceName>;
  options?: UseQueryOptions<ResponseType>;
}

type ResourceParams<ResourceName extends string> =
  ResourceName extends keyof ResourceMap
    ? ResourceMap[ResourceName]["params"]
    : never;

export interface UseMutationProps<ResourceName extends string> {
  resource: ResourceName;
  params?: MutationParams<ResourceName>;
}

type MutationParams<ResourceName extends string> =
  ResourceName extends keyof MutationMap
    ? MutationMap[ResourceName]["params"]
    : never;
