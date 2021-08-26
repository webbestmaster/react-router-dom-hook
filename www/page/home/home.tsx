/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import {useUrl, NavigationLink} from '../../library/library';

export function Home(): JSX.Element {
    // WARNINGS:
    // 1 - react-router-dom is required
    // 2 - use inside BrowserRouter -> Switch only

    const {
        pathname, // string, current path name
        pushState, // (newPathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void
        pushPathname, // (newPathname: string, options?: UseUrlHookOptionsType) => void
        replaceState, // (newPathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void
        replacePathname, // (newPathname: string, options?: UseUrlHookOptionsType) => void
        queries, // current query map
        setQuery, // (queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void
        getQuery, // (key: keyof QueryMap) => string | null
        deleteQuery, // (key: keyof QueryMap) => void
    } = useUrl<{queryMapKey: string}>(); // generic is optional, default is ObjectToUrlParametersType

    return (
        <NavigationLink
            isSaveQueries={false} // boolean, optional, default is true, save or remove existed query
            queries={{newQuery: 'it-is-me!'}} // ObjectToUrlParametersType, optional, default is {}, new query map, existed query will be replaced
            to="new/path" // string, required, new pathname
        >
            to other page
        </NavigationLink>
    );
}
