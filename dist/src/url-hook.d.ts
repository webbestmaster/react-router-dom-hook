import { ObjectToUrlParametersType, UseUrlHookType } from './url-hook-type';
export declare function useUrl<QueryMap extends ObjectToUrlParametersType = ObjectToUrlParametersType>(): UseUrlHookType<QueryMap>;
