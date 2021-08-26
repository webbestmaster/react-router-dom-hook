export type QueryKeyType = number | string | symbol;

export type QuerySimpleValueType = Date | boolean | number | string | null | undefined | void;

export type QueryValueType = Array<QuerySimpleValueType> | QuerySimpleValueType;

export type ObjectToUrlParametersType = Readonly<Record<string, QueryValueType>>;

export type QueryMapType<QueryKey extends QueryKeyType = QueryKeyType> = Readonly<Record<QueryKey, string | void>>;

export type UseUrlHookOptionsType = {
    isSaveQueries?: boolean;
};

export type UseUrlHookOptionsDefinedType = {
    isSaveQueries: boolean;
};

export type UseUrlHookType<QueryMap extends ObjectToUrlParametersType = ObjectToUrlParametersType> = Readonly<{
    deleteQuery: (key: keyof QueryMap) => void;
    getQuery: (key: keyof QueryMap) => string | null;
    pathname: string;
    pushPathname: (pathname: string, options?: UseUrlHookOptionsType) => void;
    pushState: (pathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
    queries: Readonly<QueryMapType<keyof QueryMap>>;
    replacePathname: (pathname: string, options?: UseUrlHookOptionsType) => void;
    replaceState: (pathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
    setQuery: (queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
}>;
