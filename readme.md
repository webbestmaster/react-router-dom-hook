# React Router Dom Hook

[![GitHub license](https://img.shields.io/npm/l/react-router-dom-hook)](https://github.com/webbestmaster/react-router-dom-hook/blob/master/license)
[![npm version](https://img.shields.io/npm/v/react-router-dom-hook.svg?style=flat)](https://www.npmjs.com/package/react-router-dom-hook)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-router-dom-hook)
<!-- [![GitHub stars](https://img.shields.io/github/stars/webbestmaster/react-router-dom-hook?style=social&maxAge=2592000)](https://github.com/webbestmaster/react-router-dom-hook/) -->

Hook to work with react-router-dom. Helpful component (NavigationLink) included!

## Install

```bash
npm i react-router-dom-hook
```

## Usage
```typescript jsx
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useUrl, NavigationLink} from 'react-router-dom-hook';

export function ExampleComponent(): JSX.Element {
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
```
