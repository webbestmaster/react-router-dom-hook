/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

/* global setTimeout */

import {lazy, Suspense, useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Locale, useLocale} from '../../provider/locale/locale-context';
import {Spinner} from '../../layout/spinner/spinner';
import {useUrl, NavigationLink} from '../../library/library';
import {ErrorData} from '../../layout/error-data/error-data';
import {useSystem} from '../../hook/system-hook/system-hook';
import {appRoute} from '../../component/app/app-route';
import {LocaleNameEnum} from '../../provider/locale/locale-context-type';
import {useFormat} from '../../hook/format-hook/format-hook';
import {getTestNodeData, getTestNodeId} from '../../util/auto-test';

import pngImageSrc from './image/marker-icon-2x.png';
import svgImageSrc, {ReactComponent as SvgAsReactComponent} from './image/questions-with-an-official-answer.svg';
import homeStyle from './home.scss';

console.log(ErrorData);

export function Home(): JSX.Element {
    // WARNINGS:
    // 1 - react-router-dom is required
    // 2 - use inside BrowserRouter -> Switch only

    const {
        pathname, // string, current path name
        pushState, // (newPathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void
        pushPathname, // (newPathname: string, options?: UseUrlHookOptionsType) => void
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
        />
    );
}
