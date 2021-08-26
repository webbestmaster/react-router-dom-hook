export declare type QueryKeyType = number | string | symbol;
export declare type QuerySimpleValueType = Date | boolean | number | string | null | void;
export declare type QueryValueType = Array<QuerySimpleValueType> | QuerySimpleValueType;
export declare type ObjectToUrlParametersType = Readonly<Record<string, QueryValueType>>;
export declare type QueryMapType<QueryKey extends QueryKeyType = QueryKeyType> = Readonly<Record<QueryKey, string | void>>;
export declare type UseUrlHookOptionsType = {
    isSaveQueries?: boolean;
};
export declare type UseUrlHookOptionsDefinedType = {
    isSaveQueries: boolean;
};
export declare type UseUrlHookType<QueryMap extends ObjectToUrlParametersType = ObjectToUrlParametersType> = Readonly<{
    deleteQuery: (key: keyof QueryMap) => void;
    getQuery: (key: keyof QueryMap) => string | null;
    pathname: Readonly<string>;
    pushPathname: (pathname: string, options?: UseUrlHookOptionsType) => void;
    pushState: (pathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
    queries: Readonly<QueryMapType<keyof QueryMap>>;
    replacePathname: (pathname: string, options?: UseUrlHookOptionsType) => void;
    replaceState: (pathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
    setQuery: (queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
}>;
