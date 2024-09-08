interface QueryConfig<
    ResponseType = unknown,
    ParamsType = Record<string, any>,
> {
  queryFn: (params?: ParamsType) => Promise<ResponseType>;
  params?: ParamsType;
}

interface MutationConfig<
    ResponseType = unknown,
    ParamsType = Record<string, any>,
> {
  mutationFn: (params?: ParamsType) => Promise<ResponseType>;
  params?: ParamsType;
}

export type ResourceMap = Record<string, QueryConfig<any, any>>;
export type MutationMap = Record<string, MutationConfig<any, any>>;

class QueryInitializer {
  private resourceMap: ResourceMap = {};
  private mutationMap: MutationMap = {};

  /**
   * 여러 리소스를 한 번에 초기화하는 함수 (Query 전용).
   *
   * @param {Array<{ resource: string; config: QueryConfig }>} configs - 리소스 이름과 설정을 포함한 객체의 배열.
   */
  initQueries<ResourceName extends string, ParamsType extends Record<string, any>>(
      configs: Array<{
        resource: ResourceName;
        config: QueryConfig<any, ParamsType>;
      }>,
  ) {
    configs.forEach(({ resource, config }) => {
      this.resourceMap[resource] = config;
    });
  }

  /**
   * 여러 리소스를 한 번에 초기화하는 함수 (Mutation 전용).
   *
   * @param {Array<{ resource: string; config: MutationConfig }>} configs - 리소스 이름과 설정을 포함한 객체의 배열.
   */
  initMutations<ResourceName extends string, ParamsType extends Record<string, any>>(
      configs: Array<{
        resource: ResourceName;
        config: MutationConfig<any, ParamsType>;
      }>,
  ) {
    configs.forEach(({ resource, config }) => {
      this.mutationMap[resource] = config;
    });
  }

  getConfig<ResourceName extends string>(resource: ResourceName) {
    return this.resourceMap[resource];
  }

  getMutation<ResourceName extends string>(resource: ResourceName) {
    return this.mutationMap[resource];
  }
}

const queryInitializer = new QueryInitializer();

export function queryInit() {
  return queryInitializer;
}
