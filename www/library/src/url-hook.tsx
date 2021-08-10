/* global Location */

import {useCallback, useMemo} from 'react';
import {useHistory} from 'react-router-dom';

import {getParametersFromUrl, objectToUrlParameters} from './url-hook-helper';
import {ObjectToUrlParametersType, QueryMapType, UseUrlHookOptionsType, UseUrlHookType} from './url-hook-type';
import {urlHookDefaultOptions} from './url-hook-const';

export function useUrl<
    QueryMap extends ObjectToUrlParametersType = ObjectToUrlParametersType
>(): UseUrlHookType<QueryMap> {
    const routerHistory = useHistory<Location>();
    const {location: routerLocation} = routerHistory;
    const {search, pathname} = routerLocation;

    const queries: QueryMapType<keyof QueryMap> = useMemo(() => {
        return getParametersFromUrl('http://localhost/' + search);
    }, [search]);

    const pushRoute = useCallback(
        (newPathname: string, queriesInner: ObjectToUrlParametersType, options?: UseUrlHookOptionsType): void => {
            const definedOptions = {...urlHookDefaultOptions, ...(options || {})};

            const resultQueryMap = definedOptions.isSaveQueries ? {...queries, ...queriesInner} : queriesInner;

            routerHistory.push({pathname: newPathname, search: objectToUrlParameters(resultQueryMap)});
        },
        [queries, routerHistory]
    );

    const replaceRoute = useCallback(
        (newPathname: string, queriesInner: ObjectToUrlParametersType, options?: UseUrlHookOptionsType): void => {
            const definedOptions = {...urlHookDefaultOptions, ...(options || {})};

            const resultQueryMap = definedOptions.isSaveQueries ? {...queries, ...queriesInner} : queriesInner;

            routerHistory.replace({pathname: newPathname, search: objectToUrlParameters(resultQueryMap)});
        },
        [queries, routerHistory]
    );

    const setQuery = useCallback(
        (queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType): void => {
            pushRoute(pathname, queryMap, options);
        },
        [pushRoute, pathname]
    );

    const getQuery = useCallback(
        (key: keyof QueryMap): string | null => {
            const queryValue: string | void = queries[key];

            return queryValue || null;
        },
        [queries]
    );

    const deleteQuery = useCallback(
        (key: keyof QueryMap): void => {
            const queriesInner = {...queries};

            Reflect.deleteProperty(queriesInner, key);

            pushRoute(pathname, queriesInner, {isSaveQueries: false});
        },
        [pathname, queries, pushRoute]
    );

    const pushPathname = useCallback(
        (newPathname: string, options?: UseUrlHookOptionsType): void => {
            pushRoute(newPathname, {}, options);
        },
        [pushRoute]
    );

    const pushState = useCallback(
        (newPathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType): void => {
            pushRoute(newPathname, queryMap, options);
        },
        [pushRoute]
    );

    const replacePathname = useCallback(
        (newPathname: string, options?: UseUrlHookOptionsType): void => {
            replaceRoute(newPathname, {}, options);
        },
        [replaceRoute]
    );

    const replaceState = useCallback(
        (newPathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType): void => {
            replaceRoute(newPathname, queryMap, options);
        },
        [replaceRoute]
    );

    return useMemo((): UseUrlHookType<QueryMap> => {
        return {
            deleteQuery,
            getQuery,
            pathname,
            pushPathname,
            pushState,
            queries,
            replacePathname,
            replaceState,
            setQuery,
        };
    }, [setQuery, getQuery, deleteQuery, pushPathname, pushState, replacePathname, replaceState, queries, pathname]);
}
