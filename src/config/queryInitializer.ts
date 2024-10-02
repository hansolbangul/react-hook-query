type QueryOption<T> = readonly { resource: T; config: any }[];

export class QueryManager<T, Q extends QueryOption<T>> {
  public queryList: Q = [] as unknown as Q;

  constructor(queryList: Q) {
    this.queryList = queryList;
  }

  // 주입된 queryList를 반환하는 함수
  getQueryList() {
    return this.queryList;
  }

  getQueryDetail(resource: T): Extract<Q[number], { resource: T }>["config"] {
    const foundResource = this.queryList.find((q) => q.resource === resource);

    if (!foundResource) {
      throw new Error(`Resource ${resource} not found`);
    }

    return foundResource.config;
  }

  useQueryItem = <T extends Q[number]["resource"]>(resource: T) => {
    // 리소스에 맞는 config 타입을 추론
    type ConfigType = Extract<Q[number], { resource: T }>["config"];

    // const [data, setData] = useState<ConfigType | null>(null);

    // useEffect(() => {
    //     // getQueryDetail을 사용해 resource에 맞는 config를 가져옴
    //     const defaultConfig = queryManager.getQueryDetail(resource);
    //
    //     // 외부에서 config를 받은 경우 병합
    //     const finalConfig = { ...defaultConfig, ...externalConfig };
    //
    //     // 데이터 설정
    //     setData(finalConfig);
    // }, [resource, externalConfig]);

    return resource;
  };
}

// export const queryManager = new QueryManager();
