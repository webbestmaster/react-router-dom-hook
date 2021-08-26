import { ReactNode } from 'react';
import { ObjectToUrlParametersType } from './url-hook-type';
export declare type NavigationLinkPropsType<QueryMap> = {
    children?: ReactNode;
    className?: string;
    isSaveQueries?: boolean;
    queries?: QueryMap;
    title?: string;
    to: string;
};
export declare function NavigationLink<QueryMap extends ObjectToUrlParametersType = ObjectToUrlParametersType>(props: NavigationLinkPropsType<QueryMap>): JSX.Element;
