interface QueryConfig<
  ResponseType = unknown,
  ParamsType = Record<string, any>,
> {
  queryFn: (params?: ParamsType) => Promise<ResponseType>;
  params?: ParamsType;
  queryKey?: (params?: Array<string>) => Array<string>;
}

export type ResourceMap = Record<string, QueryConfig<any, any>>;

class QueryInitializer {
  private resourceMap: ResourceMap = {};

  /**
   * 여러 리소스를 한 번에 초기화하는 함수.
   *
   * @param {Array<{ resource: string; config: QueryConfig }>} configs - 리소스 이름과 설정을 포함한 객체의 배열.
   */
  init<ResourceName extends string, ParamsType extends Record<string, any>>(
    configs: Array<{
      resource: ResourceName;
      config: QueryConfig<any, ParamsType>;
    }>,
  ) {
    configs.forEach(({ resource, config }) => {
      this.resourceMap[resource] = config;
    });
  }

  getConfig<ResourceName extends string>(resource: ResourceName) {
    return this.resourceMap[resource];
  }
}

const queryInitializer = new QueryInitializer();

export function queryInit() {
  return queryInitializer;
}
